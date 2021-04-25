import * as ShellControlString from './ShellControlString';

export const version = 1;

/**
 * @description: 输出进度条
 * @param {number} current 当前进度
 * @param {number} total 总共
 * @param {number} len 进度条块数量
 * @return {string} 进度条文本
 */
export function process(current:number, total:number = 100, len:number = 24):string {
  const back = ShellControlString.getFontStyle('', 'white', ' ');
  const active = ShellControlString.getFontStyle('', 'green', ' ');
  const proc = (current / total) * len;
  const activeNum = parseInt(proc.toString(), 10);
  let processStr = '';
  for (let i = 0; i < len; i += 1) {
    if (i < activeNum) processStr += active;
    else processStr += back;
  }
  return ShellControlString.getFmtString()
    .hideArrow()
    .arrowMove('上', 1)
    .clearAfter(processStr)
    .clearProps()
    .msg(current.toString())
    .msg('/')
    .msg(total.toString())
    .end();
}
