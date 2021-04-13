/// <reference types="node" />
export declare const PREFIX: Buffer;
declare type Color = 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'purple' | 'celeste' | 'white';
/**
 * @description: 获取字体样式
 * @param {Color} font_color 字体颜色
 * @param {Color} background 背景色
 * @return {String} 颜色字体
 */
export declare function getFontStyle(font_color?: Color, background?: Color, msg?: string): string;
export {};
