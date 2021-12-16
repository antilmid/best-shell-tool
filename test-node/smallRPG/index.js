const startMap =  require('./MAP/startMap');
const Map = require('./core/Map');
const Message = require('./core/Message');
const Input = require('./core/Input');
const Render = require('./core/Render');
const bst = require('../../dist');
const ios = new bst.IOStand;






const GL = {
  $Ios: ios,
  $Game_Map: new Map(startMap.maps, startMap.events),
  $Game_Message: null,
  $Game_Render: null,
  $Game_Input: null,
  $Game_Character: {
    x: 12,
    y: 12,
    char: '(P)',
    charColor: 'red',
    onUp () {
      if( GL.$Game_Map.judgePass(this.x, this.y - 1) ) this.y -= 1;
      else {
        const event = GL.$Game_Map.getEvent(this.x, this.y - 1);
        event && event.action(GL);
      }
    },
    onDOWN () {
      if( GL.$Game_Map.judgePass(this.x, this.y + 1) ) this.y += 1;
      else {
        const event = GL.$Game_Map.getEvent(this.x, this.y + 1);
        event && event.action(GL);
      }
    },
    onLeft () {
      if( GL.$Game_Map.judgePass(this.x - 1, this.y) ) this.x -= 1;
      else {
        const event = GL.$Game_Map.getEvent(this.x - 1, this.y);
        event && event.action(GL);
      }
    },
    onRight () {
      if( GL.$Game_Map.judgePass(this.x + 1, this.y) ) this.x += 1;
      else {
        const event = GL.$Game_Map.getEvent(this.x + 1, this.y);
        event && event.action(GL);
      }
    },
  },
}

GL.$Game_Message = new Message(GL);
GL.$Game_Render = new Render(GL);
GL.$Game_Input = new Input(GL);
GL.$Game_Map.events.push(GL.$Game_Character);

GL.$Game_Message.register();
GL.$Game_Render.start();



// ios.useRaw();
// ios.oninput = key => {
//   const buffer = Buffer.from(key);
//   INPUT.feedOfInput && INPUT.feedOfInput(key);
//   if(!MESSAGE.isShowing && !INPUT.inputing) {
//     // 上
//     if(buffer[2] && buffer[2] === 65) CHARACTER.onUp();
//     // 下
//     if(buffer[2] && buffer[2] === 66) CHARACTER.onDOWN();
//     // 左
//     if(buffer[2] && buffer[2] === 68) CHARACTER.onLeft();
//     // 右
//     if(buffer[2] && buffer[2] === 67) CHARACTER.onRight();
//   } else {
//     if(key === ' ') MESSAGE.skipShow();
//   }
// }
// ios.start();

// // render();
// setInterval(()=>{
//   if(RENDER_FLAG) render();
// }, 1000);










// console.log(MAP)