
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
 * @return {String} 颜色字体
 */
export function getFontStyle (font_color?: Color, background?: Color, msg = '') : string {
  const colorPos = 30 + (ColorEnum[font_color] >= 0 ? ColorEnum[font_color] : 7);
  const backPos = 40 + (ColorEnum[background] || 0);
  const content = Buffer.from(`${backPos};${colorPos}m${msg}`)
  return Buffer.concat([PREFIX, content]).toString()
}
