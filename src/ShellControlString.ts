// 控制字符前缀buffer
export const PREFIX = Buffer.from([0x1b, 0x5b]);

// 颜色管理
type Color = 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'purple' | 'celeste' | 'white';
const ColorMap = {
  black: 0,
  red: 1,
  green: 2,
  yellow: 3,
  blue: 4,
  purple: 5,
  celeste: 6,
  white: 7,
};

// 方向管理
type Direct = 'up' | 'down' | 'right' | 'left' | '上' | '下' | '左' | '右';
const MapDirect = {
  up: 'A',
  上: 'A',
  down: 'B',
  下: 'B',
  right: 'C',
  右: 'C',
  left: 'D',
  左: 'D',
};

interface StandOutOperate {
  /**
   * @description: 附加消息
   * @param {string} msg 要附加的消息
   * @return {StandOutOperate}
   */
  msg?: (msg?:string) => StandOutOperate,

  /**
   * @description: 结束并获得格式化后的字符
   * @return {string}
   */
  end?: () => string,

  /**
   * @description: 设置字体样式
   * @param {Color | ''} fontColor 字体颜色
   * @param {Color | ''} background 背景色
   * @return {StandOutOperate}
   */
  setFont?: (fontColor?: Color | '', background?: Color | '', msg?:string) => StandOutOperate,

  /**
   * @description: 清除所有控制属性
   * @param {string} msg 附加消息
   * @return {StandOutOperate}
   */
  clearProps?: (msg?:string) => StandOutOperate,

  /**
   * @description: 高亮文本
   * @param {string} msg 消息
   * @return {StandOutOperate}
   */
  highlight?: (msg?:string) => StandOutOperate,

  /**
   * @description: 下划线
   * @param {string} msg 消息
   * @return {StandOutOperate}
   */
  underline?: (msg?:string) => StandOutOperate,

  /**
   * @description: 闪烁
   * @param {string} msg 消息
   * @return {StandOutOperate}
   */
  blink?: (msg?:string) => StandOutOperate,

  /**
   * @description: 反显
   * @param {string} msg 消息
   * @return {StandOutOperate}
   */
  rdisplay?: (msg?:string) => StandOutOperate,

  /**
   * @description: 消隐
   * @param {string} msg 消息
   * @return {StandOutOperate}
   */
  cancelHide?: (msg?:string) => StandOutOperate,

  /**
   * @description: 控制光标移动
   * @param {Direct} direct 移动方向
   * @param {number} lines 移动行数
   * @param {string} msg 附加消息
   * @return {StandOutOperate}
   */
  arrowMove?: (direct?:Direct, lines?:number, msg?:string) => StandOutOperate,

  /**
   * @description: 设置鼠标位置
   * @param {number | ''} x 横坐标移动距离
   * @param {number | ''} y 纵坐标移动距离
   * @param {string} msg 附加消息
   * @return {StandOutOperate}
   */
  setArrow?: (x?:number | '', y?:number | '', msg?:string) => StandOutOperate,

  /**
   * @description: 清屏
   * @param {string} msg 附加消息
   * @return {StandOutOperate}
   */
  clear?: (msg?:string) => StandOutOperate,

  /**
   * @description: 保存光标位置
   * @param {string} msg 附加消息
   * @return {StandOutOperate}
   */
  saveArrow?: (msg?:string) => StandOutOperate,

  /**
   * @description: 读取恢复光标位置
   * @param {string} msg 附加消息
   * @return {StandOutOperate}
   */
  readArrow?: (msg?:string) => StandOutOperate,

  /**
   * @description: 隐藏光标
   * @param {string} msg 附加消息
   * @return {StandOutOperate}
   */
  hideArrow?: (msg?:string) => StandOutOperate,

  /**
   * @description: 显示光标
   * @param {string} msg 附加消息
   * @return {StandOutOperate}
   */
  showArrow?: (msg?:string) => StandOutOperate,

  /**
   * @description: 清除光标所在位置之后这一行的所有内容
   * @param {string} msg 附加消息
   * @return {StandOutOperate}
   */
  clearAfter?: (msg?:string) => StandOutOperate,
}

/**
 * @description: 获取字体样式
 * @param {Color | ''} fontColor 字体颜色
 * @param {Color | ''} background 背景色
 * @param {string} msg 附加消息
 * @return {String} 格式化后的消息
 */
export function getFontStyle(fontColor?: Color | '', background?: Color | '', msg:string = '') : string {
  const colorPos = 30 + ColorMap[fontColor];
  const backPos = 40 + ColorMap[background];
  const content = Buffer.from(`${background ? backPos : ''};${fontColor ? colorPos : ''}m${msg}`);
  return Buffer.concat([PREFIX, content]).toString();
}

/**
 * @description: 清除所有控制属性
 * @param {string} msg 消息
 * @return {string} 格式化后的消息
 */
export function clearAllProps(msg:string = '') {
  const content = Buffer.from(`0m${msg}`);
  return Buffer.concat([PREFIX, content]).toString();
}

/**
 * @description: 获取高亮消息（不建议使用此方案）
 * @param {string} msg 消息
 * @return {string} 格式化后的消息
 */
export function getHighlightString(msg:string = '') {
  const content = Buffer.from(`1m${msg}`);
  return Buffer.concat([PREFIX, content]).toString();
}

/**
 * @description: 获取下划线消息
 * @param {string} msg 消息
 * @return {string} 格式化后的消息
 */
export function getUnderLineString(msg:string = '') {
  const content = Buffer.from(`4m${msg}`);
  return Buffer.concat([PREFIX, content]).toString();
}

/**
 * @description: 获取下闪烁消息
 * @param {string} msg 消息
 * @return {string} 格式化后的消息
 */
export function getBlinkString(msg:string = '') {
  const content = Buffer.from(`5m${msg}`);
  return Buffer.concat([PREFIX, content]).toString();
}

/**
 * @description: 获取反显消息
 * @param {string} msg 消息
 * @return {string} 格式化后的消息
 */
export function getRDisplayString(msg:string = '') {
  const content = Buffer.from(`7m${msg}`);
  return Buffer.concat([PREFIX, content]).toString();
}

/**
 * @description: 获取消隐消息
 * @param {string} msg 消息
 * @return {string} 格式化后的消息
 */
export function getCancelHideString(msg:string = '') {
  const content = Buffer.from(`8m${msg}`);
  return Buffer.concat([PREFIX, content]).toString();
}

/**
 * @description: 控制光标移动
 * @param {Direct} direct 移动方向
 * @param {number} lines 移动行数
 * @param {string} msg 附加消息
 * @return {string} 格式化后的消息
 */
export function controlArrowMove(direct:Direct = 'down', lines:number = 0, msg:string = '') {
  const content = Buffer.from(`${lines}${MapDirect[direct]}${msg}`);
  return Buffer.concat([PREFIX, content]).toString();
}

/**
 * @description: 设置鼠标位置
 * @param {number | ''} x 横坐标移动距离
 * @param {number | ''} y 纵坐标移动距离
 * @param {string} msg 附加消息
 * @return {string} 格式化后的消息
 */
export function setArrowPosition(x:number | '', y:number | '', msg:string = '') {
  const content = Buffer.from(`${y !== 0 && !y ? '' : y};${x !== 0 && !x ? '' : x}H${msg}`);
  return Buffer.concat([PREFIX, content]).toString();
}

/**
 * @description: 清屏
 * @param {string} msg 附加消息
 * @return {string} 格式化后的消息
 */
export function clearScreen(msg:string = '') {
  const content = Buffer.from(`2J${msg}`);
  return Buffer.concat([PREFIX, content]).toString();
}

/**
 * @description: 保存光标位置
 * @param {string} msg 附加消息
 * @return {string} 格式化后的消息
 */
export function saveArrowPosition(msg:string = '') {
  const content = Buffer.from(`s${msg}`);
  return Buffer.concat([PREFIX, content]).toString();
}

/**
 * @description: 恢复光标位置
 * @param {string} msg 附加消息
 * @return {string} 格式化后的消息
 */
export function readArrowPosition(msg:string = '') {
  const content = Buffer.from(`u${msg}`);
  return Buffer.concat([PREFIX, content]).toString();
}

/**
 * @description: 隐藏光标
 * @param {string} msg 附加消息
 * @return {string} 格式化后的消息
 */
export function hideArrow(msg:string = '') {
  const content = Buffer.from(`?25l${msg}`);
  return Buffer.concat([PREFIX, content]).toString();
}

/**
 * @description: 显示光标
 * @param {string} msg 附加消息
 * @return {string} 格式化后的消息
 */
export function showArrow(msg:string = '') {
  const content = Buffer.from(`?25h${msg}`);
  return Buffer.concat([PREFIX, content]).toString();
}

/**
 * @description: 清除从光标到行尾的内容
 * @param {string} msg 附加消息
 * @return {string} 格式化后的消息
 */
export function clearPositionAfter(msg:string = '') {
  const content = Buffer.from(`K${msg}`);
  return Buffer.concat([PREFIX, content]).toString();
}

function bindControlFunc(func, cache, self) {
  return function binded(...arg) {
    cache.value += func(...arg);
    return self;
  };
}

export function getFmtString(_msg:string = '') {
  const cache = {
    value: clearAllProps() + _msg,
  };
  const op:StandOutOperate = {
    msg(msg:string = '') {
      cache.value += msg;
      return op;
    },
    end() {
      return cache.value + clearAllProps();
    },
  };
  op.setFont = bindControlFunc(getFontStyle, cache, op);
  op.clearProps = bindControlFunc(clearAllProps, cache, op);
  op.highlight = bindControlFunc(getHighlightString, cache, op);
  op.underline = bindControlFunc(getUnderLineString, cache, op);
  op.blink = bindControlFunc(getBlinkString, cache, op);
  op.rdisplay = bindControlFunc(getRDisplayString, cache, op);
  op.cancelHide = bindControlFunc(getCancelHideString, cache, op);
  op.arrowMove = bindControlFunc(controlArrowMove, cache, op);
  op.setArrow = bindControlFunc(setArrowPosition, cache, op);
  op.clear = bindControlFunc(clearScreen, cache, op);
  op.saveArrow = bindControlFunc(saveArrowPosition, cache, op);
  op.readArrow = bindControlFunc(readArrowPosition, cache, op);
  op.hideArrow = bindControlFunc(hideArrow, cache, op);
  op.showArrow = bindControlFunc(showArrow, cache, op);
  op.clearAfter = bindControlFunc(clearPositionAfter, cache, op);
  return op;
}
