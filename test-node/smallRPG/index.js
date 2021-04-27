const startMap =  require('./MAP/startMap');
const bst = require('../../dist');
const ios = new bst.IOStand;

class Map {
  constructor (sx, sy) {
    if(sx instanceof Array) {
      this.sx = sx[0].length;
      this.sy = sx.length;
      this.data = sx;
      this.events = sy;
    }else{
      this.sx = sx;
      this.sy = sy;
      this.data = [];
      this.events = [];
      for(let y = 0; y < sy; y+=1){
        this.data[y].push([]);
        for(let x = 0; x < sx; x+=1){
          const mapdata = {
            canPass: true,
            color: 'yellow',
          };
          this.data[y][x].push(mapdata);
        }
      }
    }
  }
  foreach (callback = (data, isNewLine, x, y)=>void 0) {
    let isNewLine = false;
    for(let y = 0; y < this.sy; y+=1){
      isNewLine = true;
      for(let x = 0; x < this.sx; x+=1){
        callback(this.data[y][x], isNewLine, x, y);
        isNewLine = false;
      }
    }
  }
  getEvent (x, y) {
    for(let i = 0; i < this.events.length; i+=1){
      if(this.events[i].x === x && this.events[i].y === y) return this.events[i];
    }
    return null;
  }
  judgePass (x, y) {
    if(x < 0 || y < 0 || x >= this.sx || y >= this.sx) return false;
    if( this.getEvent(x, y) ) return false;
    return this.data[y][x].canPass;
  }
  update () {
    this.events.map(event => {
      event.update && event.update();
    })
  }
}

class Message {
  constructor (map, sy = 6) {
    // 消息框长度
    this.sx = map.sx;
    // 消息框高度
    this.sy = sy;
    // 显示完成反馈函数
    this.feedOfMsg = null;
    // 即将显示的字符
    this.willShow = '';
    // 当前写出位置
    this.pos = 0;
    // 正在显示的字符
    this.show = '';
    // 是否正在显示
    this.isShowing = false;
    this.timer = setInterval(() => {
      if(this.pos >= this.willShow.length) {
        if(this.feedOfMsg) this.feedOfMsg();
      }else{
        this.show += this.willShow[this.pos];
        this.pos+=1;
      }
    }, 100);
  }
  skipShow () {
    if(this.isShowing === true) {
      this.pos = this.willShow.length;
      this.show = this.willShow;
    }
  }
  showMsg (msg = '') {
    return new Promise(res=>{
      this.feedOfMsg = ()=>{
        this.isShowing = false;
        res();
      }
      this.isShowing = true;
      this.pos = 0;
      this.willShow = msg;
      this.show = '';
    })
  }
  render () {
    let msg = this.show;
    let pos = 0;
    for(let y = 0; y < this.sy; y+=1){
      ios.write('\n');
      for(let x = 0; x < this.sx; x+=1) {
        if(y === 0 || y === this.sy - 1) {
          ios.writeChain()
            .setFont('green', '', '===')
            .clearProps();
        } else if(x === 0) {
          ios.writeChain()
            .setFont('green', '', '|| ')
            .clearProps();
        } else if(x === this.sx - 1) {
          ios.writeChain()
            .setFont('green', '', ' ||')
            .clearProps();
        } else if(pos < msg.length) {
          if(msg[pos].charCodeAt() > 255) {
            ios.writeChain()
            .setFont('green', '', ` ${msg[pos]}`)
            .clearProps();
            pos+=1;
          }else{
            ios.writeChain()
            .setFont('green', '', `${msg[pos]}`)
            .clearProps();
            pos+=1;
            // 英文第二个字符
            if(pos < msg.length && msg[pos].charCodeAt() <= 255){
              ios.writeChain()
              .setFont('green', '', `${msg[pos]}`)
              .clearProps();
              pos+=1;
            }else{
              ios.writeChain()
              .setFont('green', '', ` `)
              .clearProps();
            }
            // 英文第三个字符
            if(pos < msg.length && msg[pos].charCodeAt() <= 255){
              ios.writeChain()
              .setFont('green', '', `${msg[pos]}`)
              .clearProps();
              pos+=1;
            }else{
              ios.writeChain()
              .setFont('green', '', ` `)
              .clearProps();
            }
          }
        } else {
          ios.writeChain()
            .setFont('green', '', '   ')
            .clearProps();
        }
      }
    }
  }
}

class Input {
  constructor () {
    this.feedOfInput = null;
    this.inputing = false;
  }
  isPress (key) {
    return new Promise(res=>{
      this.inputing = true;
      this.feedOfInput = (_key) => {
        if(_key === key) {
          res();
          this.inputing = false;
          this.feedOfInput = null;
        }
      }
    });
  }
}

// 可渲染标志
let RENDER_FLAG = true;
// 当前地图
let MAP = new Map(startMap.maps, startMap.events);
// 对话框
let MESSAGE = new Message(MAP);
// 输入管理器
let INPUT = new Input();
// 角色
let CHARACTER = {
  x: 12,
  y: 12,
  char: '(P)',
  charColor: 'red',
  onUp () {
    if( MAP.judgePass(this.x, this.y - 1) ) this.y -= 1;
    else {
      const event = MAP.getEvent(this.x, this.y - 1);
      event && event.action({MAP, MESSAGE, CHARACTER, ios, INPUT});
    }
  },
  onDOWN () {
    if( MAP.judgePass(this.x, this.y + 1) ) this.y += 1;
    else {
      const event = MAP.getEvent(this.x, this.y + 1);
      event && event.action({MAP, MESSAGE, CHARACTER, ios, INPUT});
    }
  },
  onLeft () {
    if( MAP.judgePass(this.x - 1, this.y) ) this.x -= 1;
    else {
      const event = MAP.getEvent(this.x - 1, this.y);
      event && event.action({MAP, MESSAGE, CHARACTER, ios, INPUT});
    }
  },
  onRight () {
    if( MAP.judgePass(this.x + 1, this.y) ) this.x += 1;
    else {
      const event = MAP.getEvent(this.x + 1, this.y);
      event && event.action({MAP, MESSAGE, CHARACTER, ios, INPUT});
    }
  },
};
MAP.events.push(CHARACTER);

// render函数
function render () {
  MAP.update();
  ios.writeChain().clear().setArrow(0, 20);
  MAP.foreach((dt, isNew, x, y)=>{
    const event = MAP.getEvent(x, y);
    if(isNew) ios.write('\n');
    ios.writeChain()
      .setFont(`${event ? event.charColor : ''}`, dt.color, `${event ? event.char : '   '}`)
      .clearProps();
  });
  MESSAGE.render();
  ios.write('\n');
}


ios.useRaw();
ios.oninput = key => {
  const buffer = Buffer.from(key);
  INPUT.feedOfInput && INPUT.feedOfInput(key);
  if(!MESSAGE.isShowing && !INPUT.inputing) {
    // 上
    if(buffer[2] && buffer[2] === 65) CHARACTER.onUp();
    // 下
    if(buffer[2] && buffer[2] === 66) CHARACTER.onDOWN();
    // 左
    if(buffer[2] && buffer[2] === 68) CHARACTER.onLeft();
    // 右
    if(buffer[2] && buffer[2] === 67) CHARACTER.onRight();
  } else {
    if(key === ' ') MESSAGE.skipShow();
  }
}
ios.start();

// render();
setInterval(()=>{
  if(RENDER_FLAG) render();
}, 100);










// console.log(MAP)