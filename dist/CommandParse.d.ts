export interface ParseStruct {
    command?: string;
    defaultArgs?: string;
    args?: {
        [argsName: string]: any;
    };
}
export declare type Mode = 'strict' | 'normal';
/**
 * @description: 格式化自由输入参数
 * @param {string} str 要格式化的参数
 * @return {string} 格式化后的参数
 */
export declare function formatFree(str: string): string;
/**
 * @description: CommandX语法转换成对象
 * @param {string} str 要转换的文字
 * @param {Mode} mode 语法检查模式
 * @param {boolean} isDebugger 是否开启语法分析debugger
 * @return {ParseStruct} 转换后的语法对象结构
 */
export declare function parser(str: string, mode?: Mode, isDebugger?: boolean): ParseStruct;
