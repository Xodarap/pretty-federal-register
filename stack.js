/*
 The stack data structure stores our current position in the indentation hierarchy
 */
var Stack = function () {
  this.stack = [];
  this.currentLevel = 0;

  this.modifyStack = function (newBullet) {
    var newLevel = this.bulletLevel(newBullet);
    if (newLevel > this.currentLevel) {
      //This bullet represents a further indentation
      this.currentLevel = newLevel;
    }
    else if (newLevel == this.currentLevel) {
      //This bullet represents a bullet at the same level of indentation
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
    return _.indexOf(bulletExpression.exec(bullet),
            bullet, 2) - 2;
  }
};