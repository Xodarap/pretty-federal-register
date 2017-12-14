var assert = require('assert');
var _ = require('../lodash.core.js');
var s = require('../stack');
describe('Stack', function () {
  describe('#BulletLevel', function () {
    tests = [
      {
        input: ['I.', 'A.', '1.', 'a.', '(1)', '(a)', '(i)'],
        output: ['*I.', '**A.', '***1.', '****a.', '*****(1)', '******(a)', '*******(i)']
      },
      {
        input: ['I.', 'A.', '1.', 'a.', '(1)', '(f)', '(i)', '(h)', '(v)'],
        output: ['*I.', '**A.', '***1.', '****a.', '*****(1)',
          '******(f)', '*******(i)', '******(h)', '*******(v)']
      },
      {
        input: ['I.', 'A.', 'II.'],
        output: ['*I.', '**A.', '*II.']
      },
      {
        input: ['I.', '1.'],
        output: ['*I.', '**(Placeholder)', '***1.']
      },
      {
        input: ['I.', 'A.', '1.', 'a.', '(1)', '(a)', '(b)', '(i)', 'B.'],
        output: ['*I.', '**A.', '***1.', '****a.', '*****(1)',
          '******(a)', '******(b)', '*******(i)', '**B.']
      },
      {
        input: ['I.', 'A.', '1.', 'a.', '(1)', '(a)', '(b)', '(i)', '(c)', 'B.'],
        output: ['*I.', '**A.', '***1.', '****a.', '*****(1)',
          '******(a)', '******(b)', '*******(i)', '******(c)', '**B.']
      },
      {
        input: ['I.', 'A.', '1.', 'a.', '(1)', '(a)', '(b)', '(i)', 'B.'],
        output: ['*I.', '**A.', '***1.', '****a.', '*****(1)',
          '******(a)', '******(b)', '*******(i)', '**B.']
      },
      {
        input: ['I.', 'A.', '1.', 'a.', '(1)', '(a)', '(b)', '(i)', '(c)', 'B.'],
        output: ['*I.', '**A.', '***1.', '****a.', '*****(1)',
          '******(a)', '******(b)', '*******(i)', '******(c)', '**B.']
      },
      {
        input: ['I.', 'A.', '1.', 'a.', '(1)', '(a)', '(b)', '(i)', 'B.'],
        output: ['*I.', '**A.', '***1.', '****a.', '*****(1)',
          '******(a)', '******(b)', '*******(i)', '**B.']
      },
      {
        input: ['I.', 'H.', 'I.'],
        output: ['*I.', '**H.', '**I.']
      }
    ];
    _(tests).each(function (test) {
      it('Test: ' + test.input.join(), function () {
        var stack = new s();
        _(test.input).each(function (bullet) {
          stack.modifyStack(bullet);
        })
        assert.deepEqual(test.output,
            stack.toTree());
      });
    });
  });
});