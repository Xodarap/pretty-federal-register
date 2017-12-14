var assert = require('assert');
var _ =require('../lodash.core.js');
var s =require('../stack');
var t =require('../table_of_contents');

describe('Table of Contents', function() {
  describe('#toList', function() {
    it('should generate lists', function () {
      var stack = new s();
      stack.modifyStack('I.', 1,'Test');
      stack.modifyStack('A.', 2, 'second');
      var toc = new t(stack);
      assert.equal('<ul class="pfr-list"><li><a href="#1">Test</a><ul class="pfr-list"><li><a href="#2">second</a><ul class="pfr-list"></ul></li></ul></li></ul>', toc.toList())
    })
  });
});