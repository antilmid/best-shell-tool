export declare const version = 1;
/**
 * @description: 输出进度条
 * @param {number} current 当前进度
 * @param {number} total 总共
 * @param {number} len 进度条块数量
 * @return {string} 进度条文本
 */
export declare function process(current: number, total?: number, len?: number): string;
