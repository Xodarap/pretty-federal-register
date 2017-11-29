var assert = require('assert');
var _ =require('../lodash.core.js');
var s =require('../stack');
describe('Stack', function() {
  describe('#BulletLevel', function() {
    it('should parse levels', function() {

      var stack = new s();
      stack.modifyStack('I.');
      stack.modifyStack('A.');
      assert.deepEqual(['*I.', '**A.'], stack.toTree());
      assert.equal('I.A.', stack.toString());
    });
    it('should Handle skipping levels', function() {
      var stack = new s();
      stack.modifyStack('I.');
      stack.modifyStack('1.');
      assert.deepEqual(['*I.', '**(Placeholder)', '***1.'], stack.toTree());
      //assert.equal('I.A.', stack.toString());
    });
    // var stack = new Stack();
    // stack.modifyStack('I.');
    // stack.modifyStack('A.');
    // stack.toTree();
    it('should handle ambiguous Roman numerals1', function() {
      var stack = new s();
      var expected = ['I.', 'A.', '1.', 'a.', '(1)','(a)','(i)']
      _(expected).each(function(bullet) {
        stack.modifyStack(bullet);
      })
      assert.deepEqual(['*I.', '**A.', '***1.', '****a.', '*****(1)','******(a)','*******(i)'],
          stack.toTree());
    });
    it('should handle ambiguous Roman numerals2', function() {
      var stack = new s();
      var expected = ['I.', 'A.', '1.', 'a.', '(1)','(h)','(i)']
      _(expected).each(function(bullet) {
        stack.modifyStack(bullet);
      })
      assert.deepEqual(['*I.', '**A.', '***1.', '****a.', '*****(1)',
        '******(h)','******(i)'], stack.toTree());
    });
    it('should handle ambiguous Roman numerals2-1', function() {
      var stack = new s();
      var expected = ['I.', 'A.', '1.', 'a.', '(1)','(f)', '(i)','(h)','(v)']
      _(expected).each(function(bullet) {
        stack.modifyStack(bullet);
      })
      assert.deepEqual(['*I.', '**A.', '***1.', '****a.', '*****(1)',
        '******(f)','*******(i)','******(h)','*******(v)'], stack.toTree());
    });
    it('should handle ambiguous Roman numerals3', function() {
      var stack = new s();
      var expected = ['I.', 'A.', 'II.']
      _(expected).each(function(bullet) {
        stack.modifyStack(bullet);
      })
      assert.deepEqual(['*I.', '**A.', '*II.'], stack.toTree());
      assert.equal('II.', stack.toString());
    });
    it('should handle ambiguous Roman numerals4', function() {
      var stack = new s();
      var expected = ['I.', 'A.', '1.', 'a.', '(1)','(a)','(b)','(i)', 'B.']
      _(expected).each(function(bullet) {
        stack.modifyStack(bullet);
      })
      assert.deepEqual(['*I.', '**A.', '***1.', '****a.', '*****(1)',
        '******(a)','******(b)','*******(i)', '**B.'],
          stack.toTree());
    });
    it('should handle ambiguous Roman numerals5', function() {
      var stack = new s();
      var expected = ['I.', 'A.', '1.', 'a.', '(1)','(a)','(b)','(i)', '(c)','B.']
      _(expected).each(function(bullet) {
        stack.modifyStack(bullet);
      })
      assert.deepEqual(['*I.', '**A.', '***1.', '****a.', '*****(1)',
        '******(a)','******(b)','*******(i)','******(c)', '**B.'],
          stack.toTree());
    });
    it('should handle ambiguous Roman numerals5', function() {
      var stack = new s();
      var expected = ['I.', 'A.', '1.', 'a.', '(1)','(a)','(b)','(i)', '(c)','B.']
      _(expected).each(function(bullet) {
        stack.modifyStack(bullet);
      })
      assert.deepEqual(['*I.', '**A.', '***1.', '****a.', '*****(1)',
        '******(a)','******(b)','*******(i)','******(c)', '**B.'],
          stack.toTree());
    });

    it('should generate lists', function () {
      var stack = new s();
      stack.modifyStack('I.', 1,'Test');
      stack.modifyStack('A.', 2, 'second');
      assert.equal('<ul class="pfr-list"><li><a href="#1">Test</a><ul class="pfr-list"><li><a href="#2">second</a><ul class="pfr-list"></ul></li></ul></li></ul>', stack.toList())
    })
  });
});