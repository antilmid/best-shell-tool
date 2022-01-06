/// <reference types="node" />
import { Direct, Color } from './ShellControlString';
import { ParseStruct } from './CommandParse';
export interface AddCommandOperate {
    /**
     * @description: 声明一个参数
     * @param {string} argName 参数名称
     * @param {string} notes 参数注释
     * @return {AddCommandOperate} 返回操作链
     */
    arg: (argName: string, notes: string) => AddCommandOperate;
    /**
     * @description: 声明一个默认参数
     * @param {string} notes 参数注释
     * @return {AddCommandOperate} 返回操作链
     */
    defaultArg: (notes: string) => AddCommandOperate;
    /**
     * @description: 注册操作函数
     * @param {(command:ParseStruct)=>Promise<number>} fn 操作函数
     * @return {AddCommandOperate} 返回操作链
     */
    action: (fn: (command: ParseStruct) => Promise<number>) => AddCommandOperate;
}
export interface Commander {
    command: [string, string];
    defaultArg: string | null;
    args: {
        [key: string]: string;
    };
    action: (command: ParseStruct) => void;
}
export interface StandOutOperate {
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
    private __commandChain__;
    private __localLock__;
    private __isRaw__;
    private __procEventOn__;
    oninput: (data: any) => {} | null;
    dataFormat: (data: Buffer) => any | null;
    __DEV__: boolean;
    /**
     * @description: 创建一个新的输入输出操作器
     * @param { NodeJS.Process} process process构造器
     * @return {IOStand} 输入输出操作器
     */
    constructor(_process?: NodeJS.Process);
    /**
     * @description: 处理一个异步动作
     * @param {()=>Promise<any>} fn 要处理的动作
     * @return {Promise<void>}
     */
    doSomething(fn: () => Promise<any>): Promise<void>;
    /**
     * @description: 列出所有已经注册过的命令
     * @return {void}
     */
    listAllCommand(): void;
    /**
     * @description: 列出一个命令
     * @param {Commander} commander 要列出的命令
     * @return {void}
     */
    listCommand(commander: Commander): void;
    /**
     * @description: 根据命令名查找已经注册的命令
     * @param {string} command 要查找的命令名称
     * @return {Commander|null} 查找结果
     */
    findCommander(command: string): Commander | null;
    /**
     * @description: 等待一次输入，配合await使用更佳
     * @return {Promise<any>} 输入结果
     */
    awaitInput(): Promise<any>;
    /**
     * @description: 写出一个数据
     * @param {string} data 要写出的数据
     * @return {boolean} 写出状态
     */
    write(data?: string): boolean;
    /**
     * @description: 链式写出
     * @param {string} msg 要写出内容
     * @return {StandOutOperate} 链式操作
     */
    writeChain(_msg?: string): StandOutOperate;
    /**
     * @description: 新增一个命令
     * @param {string} cmd 命令名
     * @param {string} notes 备注
     * @return {AddCommandOperate} 新增命令操作
     */
    addCommand(cmd: string, notes?: string): AddCommandOperate;
    /**
     * @description: 暂停输入
     * @return {NodeJS.ReadStream & {fd:0}}
     */
    pause(): NodeJS.ReadStream & {
        fd: 0;
    };
    /**
     * @description: 恢复输入
     * @return {NodeJS.ReadStream & {fd: 0;}}
     */
    resume(): NodeJS.ReadStream & {
        fd: 0;
    };
    /**
     * @description: 退出控制台
     * @return {never}
     */
    exit(): never;
    /**
     * @description: 开启命令交互模式
     * @return {void}
     */
    start(): void;
    /**
     * @description: 释放该对象（当该对象不再使用时，一定要释放）
     * @return {void}
     */
    release(): void;
    useRaw(): void;
    closeRaw(): void;
}
