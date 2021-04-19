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

interface StandOutOperate {
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

  oninput: (data:any)=>{} | null;

  dataFormat: (data:Buffer) => any | null;

  constructor(_process = process) {
    this.process = _process;
    // eslint-disable-next-line no-underscore-dangle
    this.__setter__ = null;
    this.oninput = null;
    this.dataFormat = (data:Buffer) => data.toString();
  }

  start() {
    this.process.stdin.on('data', (dt) => {
      const formated = this.dataFormat ? this.dataFormat(dt) : dt;
      // eslint-disable-next-line no-underscore-dangle
      if (this.__setter__) this.__setter__(formated);
      if (this.oninput) this.oninput(formated);
    });
  }

  awaitInput() {
    return new Promise((res, rej) => {
      try {
        // eslint-disable-next-line no-underscore-dangle
        this.__setter__ = (data) => {
          res(data);
        };
      } catch (error) {
        rej(error);
      }
    });
  }

  write(data:string = '') {
    this.process.stdout.write(data);
  }

  writeChain(_msg:string = '') {
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

  exit() {
    this.process.exit();
  }
}
