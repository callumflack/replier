/**
 * Comment classes for prosemirror editor
 *
 * @module comment
 */
import { Plugin } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';

const punc = /([.?!])/g;

class Comment {
  constructor(text, id, active = false) {
    this.id = id;
    this.text = text;
    this.active = active;
  }
}

function randomID() {
  return Math.floor(Math.random() * 0xffffffff);
}

function deco(from, to, comment) {
  let cls = 'editor__sentence';
  if (comment.active) {
    cls += ' sentence--selected';
  }
  return Decoration.inline(from, to, { class: cls }, { comment });
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
      // Record blocks of text between each match of "punc"
      // eslint-disable-next-line no-cond-assign
      while (match = punc.exec(node.text)) {
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

function splitDeco(doc, oldActive) {
  return split(doc).map((c) => {
    const active = oldActive.some(old => old.from === c.from);
    return deco(c.from, c.to, new Comment(c.text, randomID(), active));
  });
}


class CommentState {
  constructor(version, decos) {
    this.version = version;
    this.decos = decos;
  }

  findComment(id) {
    const current = this.decos.find();
    for (let i = 0; i < current.length; i++) {
      if (current[i].spec.comment.id === id) return current[i];
    }
    return null;
  }

  commentsAt(pos) {
    return this.decos.find(pos, pos);
  }

  apply(tr) {
    // eslint-disable-next-line
    const action = tr.getMeta(commentPlugin); const
      actionType = action && action.type;
    if (!action && !tr.docChanged) return this;

    let { decos } = this;
    decos = decos.map(tr.mapping, tr.doc);

    if (actionType === 'toggleSelect') {
      action.comment.active = !action.comment.active;

      const comment = this.findComment(action.comment.id);
      const newComment = new Comment(action.comment.text, action.comment.id, action.comment.active);

      decos = decos.remove([this.findComment(action.comment.id)]);
      decos = decos.add(tr.doc, [deco(comment.from, comment.to, newComment)]);

      return new CommentState(this.version, decos);
    }

    // Handle general updates (typing)

    // Maintain active active state of comments
    const oldActive = decos.find(null, null, spec => spec.comment.active);
    decos = splitDeco(tr.doc, oldActive);
    decos = DecorationSet.create(tr.doc, decos);

    return new CommentState(this.version, decos);
  }

  static init(config) {
    const decos = config.comments.comments.map(c => deco(c.from, c.to, new Comment(c.text, c.id)));
    return new CommentState(config.comments.version, DecorationSet.create(config.doc, decos), []);
  }
}

export const commentPlugin = new Plugin({
  state: {
    init: CommentState.init,
    apply(tr, prev) { return prev.apply(tr); },
  },
  props: {
    decorations(state) { return this.getState(state).decos; },
  },
});

// Comment UI

export function commentUI(dispatch) {
  return new Plugin({
    props: {
      decorations(state) {
        return this.getState(state);
      },
      // eslint-disable-next-line
      handleClick(view, _, event) {
        const sel = view.state.selection;
        if (!sel.empty) return null;
        const comments = commentPlugin.getState(view.state).commentsAt(sel.from);
        if (!comments[0]) return null;
        const comment = comments && comments[0].spec.comment;
        dispatch(view.state.tr.setMeta(commentPlugin, { type: 'toggleSelect', comment }));
        return false;
      },
    },
  });
}
