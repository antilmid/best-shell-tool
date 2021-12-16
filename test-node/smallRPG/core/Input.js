class Input {
  constructor (GL) {
    this.feedOfInput = null;
    this.inputing = false;
    this.GL = GL;
    this.GL.$Ios.oninput = this.oninput;
  }

  oninput = (key) => {
    const buffer = Buffer.from(key);
    // 上
    if(buffer[2] && buffer[2] === 65) this.GL.$Game_Character.onUp();
    // 下
    if(buffer[2] && buffer[2] === 66) this.GL.$Game_Character.onDOWN();
    // 左
    if(buffer[2] && buffer[2] === 68) this.GL.$Game_Character.onLeft();
    // 右
    if(buffer[2] && buffer[2] === 67) this.GL.$Game_Character.onRight();
  }
  
  // isPress (key) {
  //   return new Promise(res=>{
  //     this.inputing = true;
  //     this.feedOfInput = (_key) => {
  //       if(_key === key) {
  //         res();
  //         this.inputing = false;
  //         this.feedOfInput = null;
  //       }
  //     }
  //   });
  // }
}
module.exports = Input;