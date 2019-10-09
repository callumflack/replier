/**
 * Selection classes for prosemirror editor
 *
 * @module selection
 */
import { Plugin } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';
import store from '../store';

// End of sentence punctuation
const EOSPuncRegex = /([.?!]) /g;
const nonWhitespaceRegex = /[^\s\\]/;
// Styled in Home.js
const sentenceClasses = {
  base: 'editor__sentence',
  selected: 'sentence--selected',
  group: 'sentence--group',
};
// Track unique groupIds to set unique group class based number of groups
const groupIds = [];

function randomID() {
  return Math.floor(Math.random() * 0xffffffff);
}

/**
 * @param {object=} lastSelection - Selection Object
 * @param {string=} id - group id
 */
class GroupState {
  constructor() {
    this.reset();
  }

  reset() {
    this.lastSelection = null;
    this.id = randomID();
  }
}

// Track last selected for grouping
// eslint-disable-next-line camelcase
const g_group = new GroupState();

/**
 * @param {string} text
 * @param {string?} id - id of selected deco
 */
class Selection {
  constructor(text, id, active = false, groupId = null) {
    this.id = id || randomID();
    this.groupId = groupId;
    this.active = active;
    this.text = text;
  }
}

function updateSelectionsInStore(decos) {
  const activeDecos = decos
    .find(null, null, spec => spec.selection.active);
  store.commit('setSelections', activeDecos);
}

/**
 * Create a new decoration
 *
 * @param {number} from
 * @param {number} to
 * @param {object} selection - A Selection object
 */
function deco(from, to, selection) {
  let cls = sentenceClasses.base;
  if (selection.active) {
    cls += ` ${sentenceClasses.selected}`;
  }

  if (selection.groupId) {
    let groupIndex = groupIds.indexOf(selection.groupId);

    if (groupIndex === -1) {
      groupIds.push(selection.groupId);
      groupIndex = groupIds.length - 1;
    }

    cls += ` ${sentenceClasses.group}`;
    cls += ` ${sentenceClasses.group}-${(groupIndex % 10) + 1}`;
  }

  return Decoration.inline(from, to, { class: cls }, { selection });
}


/**
 * Create a decorator for each sentence in the document
 */
function split(doc) {
  const result = [];
  // Text start position relative to current node
  let start = 0;

  function record(from, to, position, node) {
    result.push({
      from: from + position,
      to: to + position,
      text: node.text.substring(from, to),
    });
  }

  // For each node in the document
  doc.descendants((node, position) => {
    // position: Node start position relative to whole document
    start = 0;

    if (node.isText) {
      let match;
      // Record blocks of text between each match of "EOSPuncRegex"
      // eslint-disable-next-line no-cond-assign
      while (match = EOSPuncRegex.exec(node.text)) {
        const end = match.index + 1;
        record(start, end, position, node);

        start = end;

        // Ignore whitespace, find next character position
        const nextCharacter = node.text.substring(end).match(nonWhitespaceRegex);
        if (nextCharacter) {
          start += nextCharacter.index;
        }
      }

      // Record remaining text untill end of node/line
      record(start, node.text.length, position, node);
    }
  });

  return result;
}

/**
 * Generate updated state of decorators
 *
 * @param {object} doc
 * @param {array} activeDecos
 * @returns {array} decorators
 */
function splitDeco(doc, activeDecos) {
  return split(doc).map((c) => {
    const active = activeDecos.find(x => x.from === c.from);
    let newSelection;

    if (active) {
      const selection = active.type.spec.selection;
      newSelection = new Selection(c.text, selection.id, selection.active, selection.groupId);
    } else {
      newSelection = new Selection(c.text);
    }

    return deco(c.from, c.to, newSelection);
  });
}

class SelectionState {
  constructor(decos) {
    this.decos = decos;
  }

  /**
   * Find a selected decorator by it's selection state id
   *
   * @param {string} id - selection id
   * @returns {object} decorator
   */
  findDecoOfSelection(id) {
    const current = this.decos.find();
    for (let i = 0; i < current.length; i++) {
      if (current[i].spec.selection.id === id) return current[i];
    }
    return null;
  }

  selectionsAt(pos) {
    return this.decos.find(pos, pos);
  }

  apply(tr) {
    // eslint-disable-next-line
    const action = tr.getMeta(selectionPlugin); const
      actionType = action && action.type;
    if (!action && !tr.docChanged) return this;

    let { decos } = this;
    decos = decos.map(tr.mapping, tr.doc);

    // Update list of decorations
    if (actionType === 'toggleSelect') {
      const active = !action.selection.active;
      action.selection.active = active;

      const selectedDeco = this.findDecoOfSelection(action.selection.id);
      const newSelection = new Selection(
        action.selection.text,
        action.selection.id,
        action.selection.active,
      );

      if (!active) {
        // If deselecting (not active) clear last selection
        // to avoid updating it on next selection
        g_group.lastSelection = null;
      } else {
        if (!action.wasGroupClick) {
          // New selection without a group
          g_group.reset();
        } else {
          if (g_group.lastSelection) {
            // Add new selection to group

            // Update last selected deco to be in group the if it's not
            const prevSelectedDeco = this.findDecoOfSelection(g_group.lastSelection.id);
            const prevSelection = prevSelectedDeco.type.spec.selection;

            if (!prevSelection.groupId) {
              // Add group id to last selection
              const updatedPrevSelection = new Selection(
                prevSelection.text,
                prevSelection.id,
                prevSelection.active,
                g_group.id,
              );

              decos = decos.remove([prevSelectedDeco]);
              decos = decos.add(tr.doc, [
                deco(prevSelectedDeco.from, prevSelectedDeco.to, updatedPrevSelection),
              ]);
            }
          }

          newSelection.groupId = g_group.id;
        }

        g_group.lastSelection = newSelection;
      }

      decos = decos.remove([selectedDeco]);
      decos = decos.add(tr.doc, [deco(selectedDeco.from, selectedDeco.to, newSelection)]);
    } else {
      // Handle general updates (typing)

      // Maintain active state of current selections
      const activeDecos = decos.find(null, null, spec => spec.selection.active);
      decos = splitDeco(tr.doc, activeDecos);
      decos = DecorationSet.create(tr.doc, decos);
    }

    updateSelectionsInStore(decos);
    return new SelectionState(decos, this.groupIds);
  }

  static init(config) {
    const activeDecos = config.selections;
    let decos = splitDeco(config.doc, activeDecos);
    decos = DecorationSet.create(config.doc, decos);
    return new SelectionState(decos, this.groupIds);
  }
}

export const selectionPlugin = new Plugin({
  state: {
    init: SelectionState.init,
    apply(tr, prev) { return prev.apply(tr); },
  },
  props: {
    decorations(state) { return this.getState(state).decos; },
  },
});

// Selection UI

export function selectionUI(dispatch) {
  function handleClick(view, _, event) {
    // Remember to return true to stop prosemirror parent selection on ctrl clicking

    // Only handle left clicks
    if (event.button !== 0) return true;

    // If click is not on a decoration element
    // Using DecorationSet.find (selectionsAt) ProseMirror will return the last decorator
    // on the same line even if it's not under the cursor.
    const wasDecorationClick = event.target.className.includes(sentenceClasses.base);
    if (!wasDecorationClick) return true;

    const sel = view.state.selection;
    if (!sel.empty) return true;

    const selections = selectionPlugin.getState(view.state).selectionsAt(sel.from);
    const selection = selections && selections[0].spec.selection;

    if (!selection) return true;

    // Ctrl for Windows & Linux, Cmd (metaKey) for Mac
    const wasGroupClick = event.ctrlKey || event.metaKey;
    dispatch(view.state.tr.setMeta(selectionPlugin, { type: 'toggleSelect', selection, wasGroupClick }));

    return true;
  }

  return new Plugin({
    props: {
      decorations(state) {
        return this.getState(state);
      },
      handleClick,
      handleDoubleClick: handleClick,
      handleTripleClick: handleClick,
    },
  });
}
