const assert = require('assert');
const bst = require('../dist/index')

describe('ShellControlString', function() {
  describe('#getFontStyle()', function() {
    // this.slow('1ms');
    it('期望的是蓝底红色字体', function() {
      assert.equal(bst.getFontStyle('red', 'blue', '红字蓝底'), "\033[44;31m红字蓝底");
    });
    it('期望的是白底黑色字体', function() {
      assert.equal(bst.getFontStyle('black', 'white', '白底黑字'), "\033[47;30m白底黑字");
    });
    it('默认值应该是黑底白字', function() {
      assert.equal(bst.getFontStyle(), "\033[40;37m");
    });
  });
});
