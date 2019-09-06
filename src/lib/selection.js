/**
 * Selection classes for prosemirror editor
 *
 * @module selection
 */
import { Plugin } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';
import store from '../store';

// End of sentence punctuation
const EOSPunc = /([.?!])/g;
// Styled in Home.js
const sentenceClasses = {
  base: 'editor__sentence',
  selected: 'sentence--selected',
};

function randomID() {
  return Math.floor(Math.random() * 0xffffffff);
}

/**
 * @param {string} text
 * @param {string?} id - id of selected deco
 */
class Selection {
  constructor(text, id, active = false) {
    this.id = id || randomID();
    this.active = active;
    this.text = text;
  }
}

function deco(from, to, selection) {
  let cls = sentenceClasses.base;
  if (selection.active) {
    cls += ` ${sentenceClasses.selected}`;
  }
  return Decoration.inline(from, to, { class: cls }, { selection });
}


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
      // Record blocks of text between each match of "EOSPunc"
      // eslint-disable-next-line no-cond-assign
      while (match = EOSPunc.exec(node.text)) {
        const end = match.index + 1;
        record(start, end, position, node);
        // Assumes one space is between each sentence
        // Should really be position of the first char after end
        start = end + 1;
      }

      // Record remaining text untill end of node/line
      record(start, node.text.length, position, node);
    }
  });

  return result;
}

function splitDeco(doc, activeDecos) {
  return split(doc).map((c) => {
    const active = activeDecos.find(x => x.from === c.from);

    if (active) {
      const selection = active.type.spec.selection;
      return deco(c.from, c.to, new Selection(c.text, selection.id, selection.active));
    }

    return deco(c.from, c.to, new Selection(c.text));
  });
}

function updateSelectionsInStore(decos) {
  const activeDecos = decos
    .find(null, null, spec => spec.selection.active);
  store.commit('setSelections', activeDecos);
}

class SelectionState {
  constructor(decos) {
    this.decos = decos;
  }

  findSelection(id) {
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
      action.selection.active = !action.selection.active;

      const selection = this.findSelection(action.selection.id);
      const newSelection = new Selection(
        action.selection.text,
        action.selection.id,
        action.selection.active,
      );

      decos = decos.remove([selection]);
      decos = decos.add(tr.doc, [deco(selection.from, selection.to, newSelection)]);
    } else {
      // Handle general updates (typing)

      // Maintain active state of current selections
      const activeDecos = decos.find(null, null, spec => spec.selection.active);
      decos = splitDeco(tr.doc, activeDecos);
      decos = DecorationSet.create(tr.doc, decos);
    }

    updateSelectionsInStore(decos);
    return new SelectionState(decos);
  }

  static init(config) {
    const activeDecos = config.selections;
    let decos = splitDeco(config.doc, activeDecos);
    decos = DecorationSet.create(config.doc, decos);
    return new SelectionState(decos);
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
    if (!event.target.className.includes(sentenceClasses.base)) {
      // Ensure click is really on a decorator
      // Using DecorationSet.find (selectionsAt) ProseMirror will return the last decorator
      // on the same line even if it's not under the cursor.
      return null;
    }

    const sel = view.state.selection;
    if (!sel.empty) return null;

    const selections = selectionPlugin.getState(view.state).selectionsAt(sel.from);
    if (!selections[0]) return null;

    const selection = selections && selections[0].spec.selection;
    dispatch(view.state.tr.setMeta(selectionPlugin, { type: 'toggleSelect', selection }));
    return false;
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
