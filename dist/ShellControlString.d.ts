/// <reference types="node" />
export declare const PREFIX: Buffer;
export declare type Color = 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'purple' | 'celeste' | 'white';
export declare type Direct = 'up' | 'down' | 'right' | 'left' | '上' | '下' | '左' | '右';
interface StandOutOperate {
    /**
     * @description: 附加消息
     * @param {string} msg 要附加的消息
     * @return {StandOutOperate}
     */
    msg?: (msg?: string) => StandOutOperate;
    /**
     * @description: 结束并获得格式化后的字符
     * @return {string}
     */
    end?: () => string;
    /**
     * @description: 设置字体样式
     * @param {Color | ''} fontColor 字体颜色
     * @param {Color | ''} background 背景色
     * @return {StandOutOperate}
     */
    setFont?: (fontColor?: Color | '', background?: Color | '', msg?: string) => StandOutOperate;
    /**
     * @description: 清除所有控制属性
     * @param {string} msg 附加消息
     * @return {StandOutOperate}
     */
    clearProps?: (msg?: string) => StandOutOperate;
    /**
     * @description: 高亮文本
     * @param {string} msg 消息
     * @return {StandOutOperate}
     */
    highlight?: (msg?: string) => StandOutOperate;
    /**
     * @description: 下划线
     * @param {string} msg 消息
     * @return {StandOutOperate}
     */
    underline?: (msg?: string) => StandOutOperate;
    /**
     * @description: 闪烁
     * @param {string} msg 消息
     * @return {StandOutOperate}
     */
    blink?: (msg?: string) => StandOutOperate;
    /**
     * @description: 反显
     * @param {string} msg 消息
     * @return {StandOutOperate}
     */
    rdisplay?: (msg?: string) => StandOutOperate;
    /**
     * @description: 消隐
     * @param {string} msg 消息
     * @return {StandOutOperate}
     */
    cancelHide?: (msg?: string) => StandOutOperate;
    /**
     * @description: 控制光标移动
     * @param {Direct} direct 移动方向
     * @param {number} lines 移动行数
     * @param {string} msg 附加消息
     * @return {StandOutOperate}
     */
    arrowMove?: (direct?: Direct, lines?: number, msg?: string) => StandOutOperate;
    /**
     * @description: 设置鼠标位置
     * @param {number | ''} x 横坐标移动距离
     * @param {number | ''} y 纵坐标移动距离
     * @param {string} msg 附加消息
     * @return {StandOutOperate}
     */
    setArrow?: (x?: number | '', y?: number | '', msg?: string) => StandOutOperate;
    /**
     * @description: 清屏
     * @param {string} msg 附加消息
     * @return {StandOutOperate}
     */
    clear?: (msg?: string) => StandOutOperate;
    /**
     * @description: 保存光标位置
     * @param {string} msg 附加消息
     * @return {StandOutOperate}
     */
    saveArrow?: (msg?: string) => StandOutOperate;
    /**
     * @description: 读取恢复光标位置
     * @param {string} msg 附加消息
     * @return {StandOutOperate}
     */
    readArrow?: (msg?: string) => StandOutOperate;
    /**
     * @description: 隐藏光标
     * @param {string} msg 附加消息
     * @return {StandOutOperate}
     */
    hideArrow?: (msg?: string) => StandOutOperate;
    /**
     * @description: 显示光标
     * @param {string} msg 附加消息
     * @return {StandOutOperate}
     */
    showArrow?: (msg?: string) => StandOutOperate;
    /**
     * @description: 清除光标所在位置之后这一行的所有内容
     * @param {string} msg 附加消息
     * @return {StandOutOperate}
     */
    clearAfter?: (msg?: string) => StandOutOperate;
}
/**
 * @description: 获取字体样式
 * @param {Color | ''} fontColor 字体颜色
 * @param {Color | ''} background 背景色
 * @param {string} msg 附加消息
 * @return {String} 格式化后的消息
 */
export declare function getFontStyle(fontColor?: Color | '', background?: Color | '', msg?: string): string;
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
/**
 * @description: 设置鼠标位置
 * @param {number | ''} x 横坐标移动距离
 * @param {number | ''} y 纵坐标移动距离
 * @param {string} msg 附加消息
 * @return {string} 格式化后的消息
 */
export declare function setArrowPosition(x: number | '', y: number | '', msg?: string): string;
/**
 * @description: 清屏
 * @param {string} msg 附加消息
 * @return {string} 格式化后的消息
 */
export declare function clearScreen(msg?: string): string;
/**
 * @description: 保存光标位置
 * @param {string} msg 附加消息
 * @return {string} 格式化后的消息
 */
export declare function saveArrowPosition(msg?: string): string;
/**
 * @description: 恢复光标位置
 * @param {string} msg 附加消息
 * @return {string} 格式化后的消息
 */
export declare function readArrowPosition(msg?: string): string;
/**
 * @description: 隐藏光标
 * @param {string} msg 附加消息
 * @return {string} 格式化后的消息
 */
export declare function hideArrow(msg?: string): string;
/**
 * @description: 显示光标
 * @param {string} msg 附加消息
 * @return {string} 格式化后的消息
 */
export declare function showArrow(msg?: string): string;
/**
 * @description: 清除从光标到行尾的内容
 * @param {string} msg 附加消息
 * @return {string} 格式化后的消息
 */
export declare function clearPositionAfter(msg?: string): string;
export declare function getFmtString(_msg?: string): StandOutOperate;
export {};
