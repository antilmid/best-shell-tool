const assert = require('assert');
const bst = require('../dist/index')

describe('ShellControlString', function() {
  this.slow('20ms');
  // 测试字体样式
  describe('#getFontStyle()', function() {
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
  // 测试清除所有属性
  describe('#clearAllProps()', function() {
    it('期望得到清除字符', function() {
      assert.equal(bst.clearAllProps(), "\33[0m");
    });
    it('期望得到带特定消息的清除字符', function() {
      assert.equal(bst.clearAllProps('特定消息'), "\33[0m特定消息");
    });
  });
  // 测试高亮属性
  describe('#getHighlightString()', function() {
    it('期望得到高亮字符', function() {
      assert.equal(bst.getHighlightString(), "\33[1m");
    });
    it('期望得到带特定消息的高亮字符', function() {
      assert.equal(bst.getHighlightString('特定消息'), "\33[1m特定消息");
    });
  });
  // 测试下划线属性
  describe('#getUnderLineString()', function() {
    it('期望得到下划线字符', function() {
      assert.equal(bst.getUnderLineString(), "\33[4m");
    });
    it('期望得到带特定消息的下划线字符', function() {
      assert.equal(bst.getUnderLineString('特定消息'), "\33[4m特定消息");
    });
  });
  // 测试闪烁属性
  describe('#getBlinkString()', function() {
    it('期望得到闪烁字符', function() {
      assert.equal(bst.getBlinkString(), "\33[5m");
    });
    it('期望得到带特定消息的闪烁字符', function() {
      assert.equal(bst.getBlinkString('特定消息'), "\33[5m特定消息");
    });
  });
  // 测试反显属性
  describe('#getRDisplayString()', function() {
    it('期望得到反显字符', function() {
      assert.equal(bst.getRDisplayString(), "\33[7m");
    });
    it('期望得到带特定消息的反显字符', function() {
      assert.equal(bst.getRDisplayString('特定消息'), "\33[7m特定消息");
    });
  });
  // 测试消隐属性
  describe('#getCancelHideString()', function() {
    it('期望得到消隐字符', function() {
      assert.equal(bst.getCancelHideString(), "\33[8m");
    });
    it('期望得到带特定消息的消隐字符', function() {
      assert.equal(bst.getCancelHideString('特定消息'), "\33[8m特定消息");
    });
  });
});
