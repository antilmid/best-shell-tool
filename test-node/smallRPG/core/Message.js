class Message {
  constructor (GL, sy = 6) {
    this.GL = GL;
    // 消息框长度
    this.sx = GL.$Game_Map.sx;
    // 消息框高度
    this.sy = sy;
    // 状态 idle 、 printing 、 waiting
    this.state = 'idle'; 
    // 输出位置
    this.position = 0;
    // 将要输出的消息
    this.massage = '';
    // 状态回调
    this.callback = () => {};

    // // 显示完成反馈函数
    // this.feedOfMsg = null;
    // // 即将显示的字符
    // this.willShow = '';
    // // 当前写出位置
    // this.pos = 0;
    // // 正在显示的字符
    // this.show = '';
    // // 是否正在显示
    // this.isShowing = false;
    // this.timer = setInterval(() => {
    //   if(this.pos >= this.willShow.length) {
    //     if(this.feedOfMsg) this.feedOfMsg();
    //   }else{
    //     this.show += this.willShow[this.pos];
    //     this.pos+=1;
    //   }
    // }, 100);
  }

  register () {
    const updateInfo = {
      needUpdate: true,
      update: () => {
        this.render();
      }
    };
    this.GL.$Game_Render.updateQueue.push(updateInfo);
  }

  // skipShow () {
  //   if(this.isShowing === true) {
  //     this.pos = this.willShow.length;
  //     this.show = this.willShow;
  //   }
  // }

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
    const ios = this.GL.$Ios;
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
        } else {
          ios.writeChain()
            .setFont('green', '', '   ')
            .clearProps();
        }



        // if(y === 0 || y === this.sy - 1) {
        //   ios.writeChain()
        //     .setFont('green', '', '===')
        //     .clearProps();
        // } else if(x === 0) {
        //   ios.writeChain()
        //     .setFont('green', '', '|| ')
        //     .clearProps();
        // } else if(x === this.sx - 1) {
        //   ios.writeChain()
        //     .setFont('green', '', ' ||')
        //     .clearProps();
        // } else if(pos < msg.length) {
        //   if(msg[pos].charCodeAt() > 255) {
        //     ios.writeChain()
        //     .setFont('green', '', ` ${msg[pos]}`)
        //     .clearProps();
        //     pos+=1;
        //   }else{
        //     ios.writeChain()
        //     .setFont('green', '', `${msg[pos]}`)
        //     .clearProps();
        //     pos+=1;
        //     // 英文第二个字符
        //     if(pos < msg.length && msg[pos].charCodeAt() <= 255){
        //       ios.writeChain()
        //       .setFont('green', '', `${msg[pos]}`)
        //       .clearProps();
        //       pos+=1;
        //     }else{
        //       ios.writeChain()
        //       .setFont('green', '', ` `)
        //       .clearProps();
        //     }
        //     // 英文第三个字符
        //     if(pos < msg.length && msg[pos].charCodeAt() <= 255){
        //       ios.writeChain()
        //       .setFont('green', '', `${msg[pos]}`)
        //       .clearProps();
        //       pos+=1;
        //     }else{
        //       ios.writeChain()
        //       .setFont('green', '', ` `)
        //       .clearProps();
        //     }
        //   }
        // } else {
        //   ios.writeChain()
        //     .setFont('green', '', '   ')
        //     .clearProps();
        // }
      }
    }
  }
}

module.exports = Message;