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
var bulletExpression = /^((V?I{1,3}V?\.)|([A-Z]\.)|(\d+\.)|([a-z]\.)|(\(\d\))|(\([a-z]\))|(\(v?i{1,3}v?\)))/;
var Stack = function () {
  this.currentElement = {children: []};
  this.root = this.currentElement;
  this.stack = [];
  this.currentLevel = 0;

  this.modifyStack = function (newBullet, headerId, text) {
    var newLevel = this.bulletLevel(newBullet);
    var newElement = {children: [], bullet: newBullet};
    if (newLevel > this.currentLevel) {
      //This bullet represents a further indentation
      newElement.parent = this.currentElement;
      this.currentElement.children.push(newElement);
      this.currentElement = newElement;
      this.currentLevel = newLevel;
    }
    else if (newLevel == this.currentLevel) {
      //This bullet represents a bullet at the same level of indentation
      newElement.parent = this.currentElement.parent;
      if (this.currentElement.parent == undefined) {
        newElement.parent = this.currentElement;
        this.currentElement.children.push(newElement);
      else {
        this.currentElement.parent.children.push(newElement);
      }
      this.currentElement = newElement;
    }
    else {
      //This bullet represents a bullet at a higher level of indentation
      for (var i = 0; i < (this.currentLevel - newLevel); i++) {
        this.currentElement = this.currentElement.parent;
      }
      newElement.parent = this.currentElement.parent;
      ;
      this.currentElement.parent.children.push(newElement);
      this.currentElement = newElement;
      this.currentLevel = newLevel;
    }
  }

  this.toString = function (node) {
    if (node == undefined) {
      node = this.currentElement;
    }
    var previous = '';
    if (node.parent != undefined) {
      previous = this.toString(node.parent);
    }
    var bullet = node.bullet ? node.bullet : '';
    return previous + bullet;
  }

  this.toTree = function () {
    return this.printNode(this.root, this).slice(1);
  }

  //note -> [node]
  this.printNode = function (node, that) {
    var children = _(node.children).map(function (child) {
      return that.printNode(child, that);
    }).flatten()
        .map(function (bullet) {
          return '*' + bullet;
        }).value();
    //console.log('returning:' + [node.bullet].concat(children))
    return [node.bullet].concat(children);
  }

  /*
   Returns the level of the hierarchy that this bullet represents.
   Capital Roman Numerals are 0, capital letters are 1, etc.
   */
  this.bulletLevel = function (bullet) {
    var level = _.indexOf(bulletExpression.exec(bullet),
            bullet, 2) - 2;

    //(i) could be either a letter or a Roman
    if (bullet != '(i)') {
      return level;
    }

    var relevantElement;
    if (this.currentLevel == 5) {
      relevantElement = this.currentElement;
    }
    else {
      relevantElement = this.currentElement.parent;
    }
    if (relevantElement.bullet != '(h)') {
      return 6;
    }
    return level;
  }

  this.generateTOC = function () {
    sidebar = '<div id="pfr-sidebar"></div>';
  }

  this.generateList = function (node) {
    return '<li>'
  }

};

var bulletItem = function (parent, bullet) {
  this.parent = parent;
  this.children = [];
  this.bullet = bullet;
}

if (!inChrome()) {
  module.exports = Stack;
}