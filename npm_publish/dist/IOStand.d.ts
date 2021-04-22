/// <reference types="node" />
import { Direct, Color } from './ShellControlString';
interface StandOutOperate {
    /**
     * @description: 附加消息
     * @param {string} msg 要附加的消息
     * @return {StandOutOperate}
     */
    msg?: (msg?: string) => StandOutOperate;
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
export default class IOStand {
    process: NodeJS.Process;
    private __setter__;
    oninput: (data: any) => {} | null;
    dataFormat: (data: Buffer) => any | null;
    constructor(_process?: NodeJS.Process);
    start(): void;
    awaitInput(): Promise<unknown>;
    write(data?: string): void;
    writeChain(_msg?: string): StandOutOperate;
    exit(): void;
}
export {};
