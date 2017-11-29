//var _ = require('./lodash.core.js');
var bulletExpression = /^((V?I{1,3}V?\.)|([A-Z]\.)|(\d+\.)|([a-z]\.)|(\(\d\))|(\([a-z]\))|(\(v?i{1,3}v?\)))/;
var Node = function (parent) {
  this.children = [];
  this.parent = parent;
  this.currentLevel = 0;

  this.modifyStack = function (newBullet) {
    var newLevel = this.bulletLevel(newBullet);
    if (newLevel > this.currentLevel) {
      //This bullet represents a further indentation
      var newElement = new Node(this);
      this.children.push(newElement);
      this.currentElement = newElement;
      this.currentLevel = newLevel;
    }
    else if (newLevel == this.currentLevel) {
      //This bullet represents a bullet at the same level of indentation
      this.currentElement.parent
      this.stack.pop();
    }
    else {
      //This bullet represents a bullet at a higher level of indentation
      for (var i = 0; i <= (this.currentLevel - newLevel); i++) {
        this.stack.pop();
      }
      this.currentLevel = newLevel;
    }
    this.stack.push(newBullet);
  }

  this.toString = function () {
    return this.stack.join('').replace(/\.$/, '');
  }

  /*
   Returns the level of the hierarchy that this bullet represents.
   Capital Roman Numerals are 0, capital letters are 1, etc.
   */
  this.bulletLevel = function (bullet) {
    var level = _.indexOf(bulletExpression.exec(bullet),
            bullet, 2) - 2;
    if (bullet != '(i)') {
      return level;
    }
    //(i) could be either a letter or a Roman
    if(this.stack[5] != '(h)') {
      return 6;
    }
    return level;
  }

  this.generateTOC = function() {
    sidebar = '<div id="pfr-sidebar"></div>';
    _(this.stack).map(function(bullet) {
      
    })
  }

};

module.exports = Stack;