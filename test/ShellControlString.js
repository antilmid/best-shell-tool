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
  // 测试光标移动字符
  describe('#controlArrowMove()', function() {
    it('期望得到正确的移动字符', function() {
      const n = parseInt(Math.random()*10, 10);
      assert.equal(bst.controlArrowMove('up', n), "\33[" + n + "A");
      assert.equal(bst.controlArrowMove('down', n), "\33[" + n + "B");
      assert.equal(bst.controlArrowMove('right', n), "\33[" + n + "C");
      assert.equal(bst.controlArrowMove('left', n), "\33[" + n + "D");
    });
    it('期望得到带特定消息的消隐字符', function() {
      const n = parseInt(Math.random()*10, 10);
      assert.equal(bst.controlArrowMove('up', n, '特定消息'), "\33[" + n + "A特定消息");
      assert.equal(bst.controlArrowMove('down', n, '特定消息'), "\33[" + n + "B特定消息");
      assert.equal(bst.controlArrowMove('right', n, '特定消息'), "\33[" + n + "C特定消息");
      assert.equal(bst.controlArrowMove('left', n, '特定消息'), "\33[" + n + "D特定消息");
    });
    it('期望的默认值', function() {
      assert.equal(bst.controlArrowMove(), "\33[0B");
    });
  });
  // 测试设置光标位置
  describe('#setArrowPosition()', function() {
    it('期望光标到特定位置', function() {
      const x = parseInt(Math.random()*10, 10);
      const y = parseInt(Math.random()*10, 10);
      assert.equal(bst.setArrowPosition(x, y), "\33["+ y +";" + x + "H");
      assert.equal(bst.setArrowPosition(x, y, 'D特定消息'), "\33["+ y +";" + x + "HD特定消息");
    });
  });
  // 测试清屏
  describe('#clearScreen()', function() {
    it('期望屏幕被清除', function() {
      assert.equal(bst.clearScreen(), "\33[2J");
      assert.equal(bst.clearScreen('特定消息'), "\33[2J特定消息");
    });
  });
  // 光标保存
  describe('#saveArrowPosition()', function() {
    it('期望光标位置被保存', function() {
      assert.equal(bst.saveArrowPosition(), "\33[s");
      assert.equal(bst.saveArrowPosition('特定消息'), "\33[s特定消息");
    });
  });
  // 光标位置读取
  describe('#readArrowPosition()', function() {
    it('期望光标位置被读取', function() {
      assert.equal(bst.readArrowPosition(), "\33[u");
      assert.equal(bst.readArrowPosition('特定消息'), "\33[u特定消息");
    });
  });
  // 隐藏光标
  describe('#hideArrow()', function() {
    it('期望光标被隐藏', function() {
      assert.equal(bst.hideArrow(), "\33[?25l");
      assert.equal(bst.hideArrow('特定消息'), "\33[?25l特定消息");
    });
  });
  // 显示光标
  describe('#showArrow()', function() {
    it('期望光标被显示', function() {
      assert.equal(bst.showArrow(), "\33[?25h");
      assert.equal(bst.showArrow('特定消息'), "\33[?25h特定消息");
    });
  });
  // 清除从光标到行尾的内容
  describe('#clearPositionAfter()', function() {
    it('期望清除从光标到行尾的内容', function() {
      assert.equal(bst.clearPositionAfter(), "\33[K");
      assert.equal(bst.clearPositionAfter('特定消息'), "\33[K特定消息");
    });
  });
});
