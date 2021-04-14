/// <reference types="node" />
export declare const PREFIX: Buffer;
declare type Color = 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'purple' | 'celeste' | 'white';
declare type Direct = 'up' | 'down' | 'right' | 'left' | '上' | '下' | '左' | '右';
/**
 * @description: 获取字体样式
 * @param {Color} font_color 字体颜色
 * @param {Color} background 背景色
 * @return {String} 格式化后的消息
 */
export declare function getFontStyle(font_color?: Color, background?: Color, msg?: string): string;
/**
 * @description: 清除所有控制属性
 * @param {string} msg 消息
 * @return {string} 格式化后的消息
 */
export declare function clearAllProps(msg?: string): string;
/**
 * @description: 获取高亮消息（不建议使用此方案）
 * @param {string} msg 消息
 * @return {string} 格式化后的消息
 */
export declare function getHighlightString(msg?: string): string;
/**
 * @description: 获取下划线消息
 * @param {string} msg 消息
 * @return {string} 格式化后的消息
 */
export declare function getUnderLineString(msg?: string): string;
/**
 * @description: 获取下闪烁消息
 * @param {string} msg 消息
 * @return {string} 格式化后的消息
 */
export declare function getBlinkString(msg?: string): string;
/**
 * @description: 获取反显消息
 * @param {string} msg 消息
 * @return {string} 格式化后的消息
 */
export declare function getRDisplayString(msg?: string): string;
/**
 * @description: 获取消隐消息
 * @param {string} msg 消息
 * @return {string} 格式化后的消息
 */
export declare function getCancelHideString(msg?: string): string;
/**
 * @description: 控制光标移动
 * @param {Direct} direct 移动方向
 * @param {number} lines 移动行数
 * @param {string} msg 附加消息
 * @return {string} 格式化后的消息
 */
export declare function controlArrowMove(direct?: Direct, lines?: number, msg?: string): string;
export {};
