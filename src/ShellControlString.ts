
// 控制字符前缀buffer
export const PREFIX = Buffer.from([0x1b, 0x5b]);

// 颜色管理
type Color = 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'purple' | 'celeste' | 'white';
enum ColorEnum {
  black,
  red,
  green,
  yellow,
  blue,
  purple,
  celeste,
  white
}

// 方向管理
type Direct = 'up' | 'down' | 'right' | 'left' | '上' | '下' | '左' | '右';
const MapDirect = {
  'up': 'A',
  '上': 'A',
  'down': 'B',
  '下': 'B',
  'right': 'C',
  '右': 'C',
  'left': 'D',
  '左': 'D'
}

/**
 * @description: 获取字体样式
 * @param {Color} font_color 字体颜色
 * @param {Color} background 背景色
 * @return {String} 格式化后的消息
 */
export function getFontStyle (font_color?: Color, background?: Color, msg:string = '') : string {
  const colorPos = 30 + (ColorEnum[font_color] >= 0 ? ColorEnum[font_color] : 7);
  const backPos = 40 + (ColorEnum[background] || 0);
  const content = Buffer.from(`${backPos};${colorPos}m${msg}`);
  return Buffer.concat([PREFIX, content]).toString();
}

/**
 * @description: 清除所有控制属性
 * @param {string} msg 消息
 * @return {string} 格式化后的消息
 */
export function clearAllProps (msg:string = '') {
  const content = Buffer.from(`0m${msg}`);
  return Buffer.concat([PREFIX, content]).toString();
}

/**
 * @description: 获取高亮消息（不建议使用此方案）
 * @param {string} msg 消息
 * @return {string} 格式化后的消息
 */
export function getHighlightString (msg:string = '') {
  const content = Buffer.from(`1m${msg}`);
  return Buffer.concat([PREFIX, content]).toString();
}

/**
 * @description: 获取下划线消息
 * @param {string} msg 消息
 * @return {string} 格式化后的消息
 */
export function getUnderLineString (msg:string = '') {
  const content = Buffer.from(`4m${msg}`);
  return Buffer.concat([PREFIX, content]).toString();
}

/**
 * @description: 获取下闪烁消息
 * @param {string} msg 消息
 * @return {string} 格式化后的消息
 */
export function getBlinkString (msg:string = '') {
  const content = Buffer.from(`5m${msg}`);
  return Buffer.concat([PREFIX, content]).toString();
}

/**
 * @description: 获取反显消息
 * @param {string} msg 消息
 * @return {string} 格式化后的消息
 */
export function getRDisplayString (msg:string = '') {
  const content = Buffer.from(`7m${msg}`);
  return Buffer.concat([PREFIX, content]).toString();
}

/**
 * @description: 获取消隐消息
 * @param {string} msg 消息
 * @return {string} 格式化后的消息
 */
export function getCancelHideString (msg:string = '') {
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
export function controlArrowMove (direct:Direct = 'down', lines:number = 0, msg:string = '') {
  const content = Buffer.from(`${lines}${MapDirect[direct]}${msg}`);
  return Buffer.concat([PREFIX, content]).toString();
}

/**
 * @description: 设置鼠标位置
 * @param {number} x 横坐标移动距离
 * @param {number} y 纵坐标移动距离
 * @param {string} msg 附加消息
 * @return {string} 格式化后的消息
 */
export function setArrowPosition (x:number = 0, y:number = 0, msg:string = '') {
  const content = Buffer.from(`${y};${x}H${msg}`);
  return Buffer.concat([PREFIX, content]).toString();
}

/**
 * @description: 清屏
 * @param {string} msg 附加消息
 * @return {string} 格式化后的消息
 */
export function clearScreen (msg:string = '') {
  const content = Buffer.from(`2J${msg}`);
  return Buffer.concat([PREFIX, content]).toString();
}

/**
 * @description: 保存光标位置
 * @param {string} msg 附加消息
 * @return {string} 格式化后的消息
 */
 export function saveArrowPosition (msg:string = '') {
  const content = Buffer.from(`s${msg}`);
  return Buffer.concat([PREFIX, content]).toString();
}

/**
 * @description: 恢复光标位置
 * @param {string} msg 附加消息
 * @return {string} 格式化后的消息
 */
 export function readArrowPosition (msg:string = '') {
  const content = Buffer.from(`u${msg}`);
  return Buffer.concat([PREFIX, content]).toString();
}

/**
 * @description: 隐藏光标
 * @param {string} msg 附加消息
 * @return {string} 格式化后的消息
 */
 export function hideArrow (msg:string = '') {
  const content = Buffer.from(`?25l${msg}`);
  return Buffer.concat([PREFIX, content]).toString();
}

/**
 * @description: 显示光标
 * @param {string} msg 附加消息
 * @return {string} 格式化后的消息
 */
 export function showArrow (msg:string = '') {
  const content = Buffer.from(`?25h${msg}`);
  return Buffer.concat([PREFIX, content]).toString();
}

/**
 * @description: 清除从光标到行尾的内容
 * @param {string} msg 附加消息
 * @return {string} 格式化后的消息
 */
 export function clearPositionAfter (msg:string = '') {
  const content = Buffer.from(`K${msg}`);
  return Buffer.concat([PREFIX, content]).toString();
}