/*
 The stack data structure stores our current position in the indentation hierarchy
 */
function inChrome() {
  try {
    return !module;
  } catch (e) {
    return true;
  }
}
if (!inChrome()) {
  var _ = require('./lodash.core.js');
}

var Display = function () {
  this.toHierarchicalLink = function (node) {
    var previous = '';
    if (node.parent != undefined) {
      previous = this.toHierarchicalLink(node.parent);
    }
    var bullet = '';
    if(node.bullet) {
      bullet = '<a href="#' + node.headerId + '" title="' + node.text + '">' +
          node.bullet + '</a>';
    }
    return previous + bullet;
  }

  this.toString = function (node) {
    var previous = '';
    if (node.parent != undefined) {
      previous = this.toString(node.parent);
    }
    var bullet = node.bullet ? node.bullet : '';
    return previous + bullet;
  }

  this.toLink = function (node) {
    return '<a href="#' + node.headerId + '">' +
        this.toString(node) + '</a>';
  }

};

if (!inChrome()) {
  module.exports = Stack;
}