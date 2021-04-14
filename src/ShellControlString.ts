
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