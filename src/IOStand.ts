/* eslint-disable no-underscore-dangle */
import {
  getFontStyle,
  clearAllProps,
  getHighlightString,
  getUnderLineString,
  getBlinkString,
  getRDisplayString,
  getCancelHideString,
  controlArrowMove,
  setArrowPosition,
  clearScreen,
  saveArrowPosition,
  readArrowPosition,
  hideArrow,
  showArrow,
  clearPositionAfter,
  Direct,
  Color,
} from './ShellControlString';

import { ParseStruct, parser } from './CommandParse';

export interface AddCommandOperate {
  arg: (notes:string) => AddCommandOperate;
  defaultArg: (notes:string) => AddCommandOperate;
  action: (fn:(command:ParseStruct)=>Promise<number>)=>AddCommandOperate;
}

export interface Commander {
  command: [string, string];
  defaultArg: string | null;
  args: {
    [key:string]:string
  },
  action: (command:ParseStruct)=>void;
}

export interface StandOutOperate {
  /**
   * @description: 附加消息
   * @param {string} msg 要附加的消息
   * @return {StandOutOperate}
   */
  msg?: (msg?:string) => StandOutOperate,

  /**
   * @description: 设置字体样式
   * @param {Color | ''} fontColor 字体颜色
   * @param {Color | ''} background 背景色
   * @return {StandOutOperate}
   */
  setFont?: (fontColor?: Color | '', background?: Color | '', msg?:string) => StandOutOperate,

  /**
   * @description: 清除所有控制属性
   * @param {string} msg 附加消息
   * @return {StandOutOperate}
   */
  clearProps?: (msg?:string) => StandOutOperate,

  /**
   * @description: 高亮文本
   * @param {string} msg 消息
   * @return {StandOutOperate}
   */
  highlight?: (msg?:string) => StandOutOperate,

  /**
   * @description: 下划线
   * @param {string} msg 消息
   * @return {StandOutOperate}
   */
  underline?: (msg?:string) => StandOutOperate,

  /**
   * @description: 闪烁
   * @param {string} msg 消息
   * @return {StandOutOperate}
   */
  blink?: (msg?:string) => StandOutOperate,

  /**
   * @description: 反显
   * @param {string} msg 消息
   * @return {StandOutOperate}
   */
  rdisplay?: (msg?:string) => StandOutOperate,

  /**
   * @description: 消隐
   * @param {string} msg 消息
   * @return {StandOutOperate}
   */
  cancelHide?: (msg?:string) => StandOutOperate,

  /**
   * @description: 控制光标移动
   * @param {Direct} direct 移动方向
   * @param {number} lines 移动行数
   * @param {string} msg 附加消息
   * @return {StandOutOperate}
   */
  arrowMove?: (direct?:Direct, lines?:number, msg?:string) => StandOutOperate,

  /**
   * @description: 设置鼠标位置
   * @param {number | ''} x 横坐标移动距离
   * @param {number | ''} y 纵坐标移动距离
   * @param {string} msg 附加消息
   * @return {StandOutOperate}
   */
  setArrow?: (x?:number | '', y?:number | '', msg?:string) => StandOutOperate,

  /**
   * @description: 清屏
   * @param {string} msg 附加消息
   * @return {StandOutOperate}
   */
  clear?: (msg?:string) => StandOutOperate,

  /**
   * @description: 保存光标位置
   * @param {string} msg 附加消息
   * @return {StandOutOperate}
   */
  saveArrow?: (msg?:string) => StandOutOperate,

  /**
   * @description: 读取恢复光标位置
   * @param {string} msg 附加消息
   * @return {StandOutOperate}
   */
  readArrow?: (msg?:string) => StandOutOperate,

  /**
   * @description: 隐藏光标
   * @param {string} msg 附加消息
   * @return {StandOutOperate}
   */
  hideArrow?: (msg?:string) => StandOutOperate,

  /**
   * @description: 显示光标
   * @param {string} msg 附加消息
   * @return {StandOutOperate}
   */
  showArrow?: (msg?:string) => StandOutOperate,

  /**
   * @description: 清除光标所在位置之后这一行的所有内容
   * @param {string} msg 附加消息
   * @return {StandOutOperate}
   */
  clearAfter?: (msg?:string) => StandOutOperate,
}

function bindControlFunc(func, writter, self) {
  return function binded(...arg) {
    writter(func(...arg));
    return self;
  };
}

export default class IOStand {
  process: NodeJS.Process;

  private __setter__: any;

  private __commandChain__: Commander[];

  private __localLock__ : boolean;

  oninput: (data:any)=>{} | null;

  dataFormat: (data:Buffer) => any | null;

  /**
   * @description: 创建一个新的输入输出操作器
   * @param { NodeJS.Process} process process构造器
   * @return {IOStand} 输入输出操作器
   */
  constructor(_process : NodeJS.Process = process) {
    this.process = _process;
    this.__setter__ = null;
    this.__commandChain__ = [];
    this.__localLock__ = false;
    this.oninput = null;
    this.dataFormat = (data:Buffer) => data.toString();
    // 初始化help命令
    this.addCommand('help')
      .defaultArg('要查看帮助的命令（可以不填写）')
      .action((cmd) => {
        if (cmd.defaultArgs) {
          const commander = this.findCommander(cmd.defaultArgs);
          if (commander) {
            this.listCommand(commander);
          } else {
            this.writeChain('')
              .setFont('yellow', '', `没有找到 ${cmd.defaultArgs} 命令\n`)
              .clearProps();
          }
        } else {
          this.listAllCommand();
        }
        return Promise.resolve(1);
      });
    // 注册data事件
    this.resume();
    this.process.stdin.on('data', (dt) => {
      const formated = this.dataFormat ? this.dataFormat(dt) : dt;
      // eslint-disable-next-line no-underscore-dangle
      if (!this.__localLock__ && !this.oninput) {
        const cmd = parser(dt.toString());
        const commander = this.findCommander(cmd.command);
        if (commander && !cmd.args.help) {
          this.doSomething(async () => { await commander.action(cmd); });
        } else if (commander && cmd.args.help) {
          this.listCommand(commander);
        } else if (cmd.command) {
          this.writeChain('')
            .setFont('red', '', `不存在 ${cmd.command} 命令\n`)
            .clearProps();
        }
      }
      if (this.__setter__) this.__setter__(formated);
      if (this.oninput) this.oninput(formated);
    });
    this.pause();
  }

  /**
   * @description: 处理一个异步动作
   * @param {()=>Promise<any>} fn 要处理的动作
   * @return {Promise<void>}
   */
  async doSomething(fn:()=>Promise<any>):Promise<void> {
    this.__localLock__ = true;
    await fn();
    this.__localLock__ = false;
  }

  /**
   * @description: 列出所有已经注册过的命令
   * @return {void}
   */
  listAllCommand():void {
    this.__commandChain__.map((commander) => {
      this.listCommand(commander);
      return 0;
    });
  }

  /**
   * @description: 列出一个命令
   * @param {Commander} commander 要列出的命令
   * @return {void}
   */
  listCommand(commander:Commander):void {
    let argTips = '';
    Object.entries(commander.args).map(([argName, argNote]) => {
      argTips += `    -${argName} ${argNote}\n`;
      return 0;
    });
    this.writeChain('')
      .setFont('yellow', '', `${commander.command[0] || ''}    ${commander.command[1] || ''}\n`)
      .msg(commander.defaultArg ? `    -[默认参数] ${commander.defaultArg}\n` : '')
      .msg(argTips)
      .clearProps('\n');
  }

  /**
   * @description: 根据命令名查找已经注册的命令
   * @param {string} command 要查找的命令名称
   * @return {Commander|null} 查找结果
   */
  findCommander(command:string):Commander|null {
    for (let i = 0; i < this.__commandChain__.length; i += 1) {
      const commander = this.__commandChain__[i];
      if (commander.command[0] === command) return commander;
    }
    return null;
  }

  /**
   * @description: 等待一次输入，配合await使用更佳
   * @return {Promise<any>} 输入结果
   */
  awaitInput():Promise<any> {
    this.resume();
    this.__localLock__ = true;
    return new Promise((res, rej) => {
      try {
        // eslint-disable-next-line no-underscore-dangle
        this.__setter__ = (data) => {
          res(data);
          this.__localLock__ = false;
          this.pause();
        };
      } catch (error) {
        rej(error);
      }
    });
  }

  /**
   * @description: 写出一个数据
   * @param {string} data 要写出的数据
   * @return {boolean} 写出状态
   */
  write(data:string = ''):boolean {
    return this.process.stdout.write(data);
  }

  /**
   * @description: 链式写出
   * @param {string} msg 要写出内容
   * @return {StandOutOperate} 链式操作
   */
  writeChain(_msg:string = ''):StandOutOperate {
    const writter = (data:string) => {
      this.write(data);
    };
    const op:StandOutOperate = {
      msg(msg:string = '') {
        writter(msg);
        return op;
      },
    };
    writter(_msg);
    op.setFont = bindControlFunc(getFontStyle, writter, op);
    op.clearProps = bindControlFunc(clearAllProps, writter, op);
    op.highlight = bindControlFunc(getHighlightString, writter, op);
    op.underline = bindControlFunc(getUnderLineString, writter, op);
    op.blink = bindControlFunc(getBlinkString, writter, op);
    op.rdisplay = bindControlFunc(getRDisplayString, writter, op);
    op.cancelHide = bindControlFunc(getCancelHideString, writter, op);
    op.arrowMove = bindControlFunc(controlArrowMove, writter, op);
    op.setArrow = bindControlFunc(setArrowPosition, writter, op);
    op.clear = bindControlFunc(clearScreen, writter, op);
    op.saveArrow = bindControlFunc(saveArrowPosition, writter, op);
    op.readArrow = bindControlFunc(readArrowPosition, writter, op);
    op.hideArrow = bindControlFunc(hideArrow, writter, op);
    op.showArrow = bindControlFunc(showArrow, writter, op);
    op.clearAfter = bindControlFunc(clearPositionAfter, writter, op);
    return op;
  }

  /**
   * @description: 新增一个命令
   * @param {string} cmd 命令名
   * @param {string} notes 备注
   * @return {AddCommandOperate} 新增命令操作
   */
  addCommand(cmd:string, notes:string = ''):AddCommandOperate {
    const commader:Commander = {
      command: [cmd, notes],
      defaultArg: null,
      args: {},
      action: () => {},
    };
    const that = this;
    return {
      arg(argName, _notes = '') {
        commader.args[argName] = _notes;
        return this as AddCommandOperate;
      },
      defaultArg(_notes = '') {
        commader.defaultArg = _notes;
        return this as AddCommandOperate;
      },
      action(fn) {
        commader.action = fn;
        const memo = that.findCommander(commader.command[0]);
        if (memo) {
          throw Error(`已经存在${commader.command[0]}，无法重复添加`);
        } else {
          that.__commandChain__.push(commader);
        }

        return this as AddCommandOperate;
      },
    } as AddCommandOperate;
  }

  /**
   * @description: 暂停输入
   * @return {NodeJS.ReadStream & {fd:0}}
   */
  pause():NodeJS.ReadStream & {fd:0;} {
    return this.process.stdin.pause();
  }

  /**
   * @description: 恢复输入
   * @return {NodeJS.ReadStream & {fd: 0;}}
   */
  resume():NodeJS.ReadStream & {fd: 0;} {
    return this.process.stdin.resume();
  }

  /**
   * @description: 退出控制台
   * @return {never}
   */
  exit():never {
    return this.process.exit();
  }

  /**
   * @description: 开启命令交互模式
   * @return {void}
   */
  start():void {
    this.__localLock__ = false;
    this.resume();
  }
}
