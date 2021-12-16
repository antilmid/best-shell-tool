const bst = require("../dist");

// console.log(
//   bst.getFmtString('我是普通消息')
//   .setFont('red')
//   .msg('我是一个警告消息奥')
//   .clearProps('我又变回了普通消息')
//   .setFont('', 'yellow', '我是黄底警告')
//   .clearProps('我又变回了普通消息')
//   .end()
// )

// 测试倒计时
// let t = 0;
// console.log(bst.clearScreen())
// const timer = setInterval(()=>{
//   console.log(
//     bst.getFmtString(t)
//     .arrowMove('上', 1)
//     .hideArrow()
//     .clearAfter()
//     .end()
//   )
//   t++;
// }, 1000)

// 测试倒计时2
// let t = 0;
// const timer = setInterval(()=>{
//   console.log(
//     bst.getFmtString()
//     .clear()
//     .setArrow(0, 0, t)
//     .end()
//   )
//   t++;
// }, 1000)

// var stdin = process.openStdin();
// stdin.on('data', (dt)=>{
//   console.log(dt)
//   process.stdout.write('\nhahahah')
// })
// let setter = null;
// function awaitInput () {
//   return new Promise((res, rej)=>{
//     try {
//       setter = (data) => {
//         res(data);
//       }
//     } catch (error) {
//       rej(error);
//     }
//   })
// }
// process.stdin.on('data', (dt)=>{
//   setter && setter(dt)
// });

// (async () => {
//   const a = await awaitInput();
//   console.log('haha',a)
//   const b = await awaitInput();
//   console.log('heh',b)
// })();
// process.stdin.on('close',()=>{})

// console.log(bst)

// const iostand = new bst.IOStand();
// iostand.start();
// iostand.exit();
// iostand.start();
// function waitN (n) {
//   return new Promise((res)=>{
//     let t = 0;
//     const timer = setInterval(()=>{
//       if(n === 0) {
//         clearInterval(timer);
//         res();
//       }
//       console.log(
//         bst.getFmtString()
//         .clear()
//         .setArrow(0, 0, n)
//         .end()
//       )
//       t++;
//       n--;
//     }, 1000)
//   })
// };

// (async () => {
//   await waitN(10);
//   console.log('>>>')
//   process.stdin.write('\t\n')
//   let a = await iostand.awaitInput();
//   console.log('你输入了',a);
// })()

// iostand.write('hello')
// iostand.writeChain().setFont('red', '', 'haha')

// console.log(iostand.writeChain)

// console.log(bst.getFontStyle('blue', '', '我是蓝色字'))
// console.log(bst.getFontStyle('red', '', '我是红色字'))
// console.log(bst.getFontStyle('yellow', 'blue', '我是黄色字蓝色背景'))

// console.log(bst.getFontStyle('blue')+'我是蓝色')
// console.log(bst.getFontStyle('blue')+bst.clearAllProps('我的蓝色属性没有被继承过来'))

// console.log(bst.clearAllProps('我是普通字'))
// console.log(bst.getHighlightString('我是高亮字'))
// console.log(bst.getFontStyle('red') + bst.getHighlightString('我是红色高亮字'))

// console.log(bst.clearAllProps('我是普通字'))
// console.log(bst.getCancelHideString('我是消隐状态'))
// console.log(bst.getFontStyle('red') + bst.getCancelHideString('我是红色字消隐状态'))

// console.log(bst.saveArrowPosition('hello world'))
// console.log(bst.readArrowPosition('?之前的文字呢'))
// console.log('hi, js')

// console.log(
//   bst.getFmtString('我是普通字体')
//   .setFont('red', '', '我是红色字体')
//   .clearProps()
//   .underline('没想到我带下划线了')
//   .setFont('blue', '', '我蓝了')
//   .end()
// )

// function process (current, total, len = 10) {
//   const back = bst.getFontStyle('', 'white', ' ')
//   const active = bst.getFontStyle('', 'green', ' ')
//   const activeNum = parseInt((current / total) * len, 10)
//   let processStr = ''
//   for(let i = 0; i < len; i++) {
//     if(i < activeNum) processStr += active
//     else processStr += back
//   }
//   console.log(
//     bst.getFmtString()
//     .hideArrow()
//     .arrowMove('上', 1)
//     .clearAfter(processStr)
//     .clearProps()
//     .msg(current)
//     .msg('/')
//     .msg(total)
//     .end()
//   )
// }

// let count = 0
// let total = 21
// console.log('准备加载进度\n')
// setTimeout(()=>{
//   const timer = setInterval(()=>{
//     if(count === total) clearInterval(timer)
//     process(count, total, 25)
//     count++
//   }, 1000)
// }, 1000)

// const iostand = new bst.IOStand();
// iostand.oninput = (data) => {
//   console.log(bst.cmParser.parser(data.toString(), "normal", true));
// };
// iostand.start();

// a = { args: { arg1: "你好世界", arg2: "我是参数2" }, command: "command" };

// const res = bst.cmParser.parser('command -arg hello,world');
// console.log(res)

// const data = {
//   args: { isOpen: true, x: '10', y: '20' },
//   command: 'command',
//   defaultArgs: 'hello,world'
// };
// const res = bst.cmParser.data2Commandx(data);
// console.log(res);

// const iostand = new bst.IOStand();
// iostand.addCommand('test', '测试命令')
//   .defaultArg('要测试的地址')
//   .action(()=>{});

// iostand.addCommand('async', '异步命令')
//   .defaultArg('要测试的地址')
//   .action(()=>{
//     return new Promise((res)=>{
//       let i = 0;
//       const timer = setInterval(()=>{
//         console.log(i)
//         if(i === 10){
//           clearInterval(timer);
//           res();
//           // process.stdin.push('\n', 'utf-8')
//         }
//         i++;
//       }, 1000);
//     })
//   });

// iostand.listAllCommand()
// iostand.start()

// const ios = new bst.IOStand();
// (async () => {
//   const inp = await ios.awaitInput();
//   console.log('你输入了', inp)
// })()

// process.stdin.resume()
// process.on('message', (...a)=>{
//   console.log('inp:',a)
// })
// console.log(process.argv)

// const iostand = new bst.IOStand();

// (async () => {
//   const inp = await iostand.awaitInput()
//   console.log('你输入了:', inp)
// })();
// iostand.start()


// const process = bst.tool.process;
// const iostand = new bst.IOStand();


// iostand.addCommand('wait', '等待')
//   .defaultArg('要等待的时间')
//   .action((cmd)=>{
//     console.log('')
//     return new Promise((res) => {
//       const waitTime = parseInt(cmd.defaultArgs, 10) || 0
//       let current = 0
//       const timer = setInterval(()=>{
//         console.log(process(current, waitTime))
//         if(current === waitTime) {
//           clearInterval(timer)
//           console.log('已经结束等待')
//           res()
//         }
//         current += 1
//       }, 1000)
//     })
//   })

// iostand.start()

// const MAP = [
//   [' ', ' ', ' ', ' ', ' '],
//   [' ', 'X', ' ', 'X', ' '],
//   [' ', ' ', ' ', 'X', ' '],
//   [' ', 'X', ' ', ' ', 'X'],
//   ['X', ' ', ' ', ' ', ' '],
// ]

// const PLAYER = {
//   x: 0,
//   y: 0,
// };

// const iostand = new bst.IOStand();


// function render () {}

// const PLAYER = {
//   x: 0,
//   y: 0,
//   init () {
//     MAP[y][x] = 'O';
//     render();
//   },
//   up
// }

// let fs = require('fs')

// function getChar() {
//   let buffer = Buffer.alloc(1)
//   fs.read(0, buffer, 0, 1, null, (...a)=>{
//     console.log(a)
//   })
//   return buffer.toString('utf8')
// }

// console.log(getChar())

// keypress(process.stdin);
// process.stdin.on('data', function (ch, key) {
//   if(ch[0] === 3) process.stdin.setRawMode(false);
//   console.log('got "keypress"', ch[0], ch, ch.toString());
//   // if (key && key.ctrl && key.name == 'c') {
//   //   process.stdin.pause();
//   // }
// });

// process.stdin.setRawMode(true);

// setTimeout(()=>{process.stdin.setRawMode(false);}, 10000)

// process.stdin.resume();

// const BAND_ROAD = 'XW';


// const MAP = [
//   [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
//   ['X', 'X', ' ', 'X', ' ', ' ', ' ', ' ', ' ', ' '],
//   [' ', ' ', ' ', 'X', ' ', ' ', ' ', ' ', ' ', ' '],
//   [' ', 'X', ' ', ' ', 'X', ' ', ' ', ' ', ' ', ' '],
//   ['X', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
//   [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
//   ['X', 'X', ' ', 'X', ' ', ' ', ' ', ' ', ' ', ' '],
//   [' ', ' ', ' ', 'X', ' ', ' ', ' ', ' ', ' ', ' '],
//   [' ', 'X', ' ', ' ', 'X', ' ', ' ', ' ', ' ', ' '],
//   ['X', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
// ]

// const MAP = createMap(10, 10, 1, 6, 1, 10)

// const CHARACTER = {
//   x: 0,
//   y: 0,
//   inMap: MAP,
//   onUp () {
//     if(this.y > 0 && !BAND_ROAD.includes(this.inMap[this.y - 1][this.x]) ) this.y -= 1;
//   },
//   onDown () {
//     if(this.y < this.inMap.length - 1 && !BAND_ROAD.includes(this.inMap[this.y + 1][this.x]) ) this.y += 1;
//   },
//   onLeft () {
//     if(this.x > 0 && !BAND_ROAD.includes(this.inMap[this.y][this.x - 1]) ) this.x -= 1;
//   },
//   onRight () {
//     if(this.x < this.inMap[this.y].length - 1 && !BAND_ROAD.includes(this.inMap[this.y][this.x + 1]) ) this.x += 1;
//   }
// }
// const ios = new bst.IOStand;
// ios.useRaw();
// ios.start();

// ios.oninput = (key) => {
//   if(key === 'w') CHARACTER.onUp();
//   if(key === 's') CHARACTER.onDown();
//   if(key === 'a') CHARACTER.onLeft();
//   if(key === 'd') CHARACTER.onRight();
// }

// function render () {
//   const em = {
//     ' ': 'yellow',
//     'X': 'white',
//     'G': 'green',
//     'W': 'blue'
//   }
//   ios.writeChain().clear().setArrow(0,20,'')
//   for(let y = 0; y < MAP.length; y+=1){
//     for(let x = 0; x < MAP[y].length; x+=1){
//       const char = MAP[y][x];
//       const isCharacter = y === CHARACTER.y && x === CHARACTER.x;
//       ios.writeChain()
//         .setFont('', em[char] || '', isCharacter ? ' o ' : '   ')
//         .clearProps();
//     }
//     ios.write('\n');
//   }
// }

// function createMap (xw, yw, X = 1, G = 1, W = 1, N = 1) {
//   const mp = [];
//   for(let y = 0; y < yw; y+=1){
//     const xarr = [];
//     mp.push(xarr);
//     for(let x = 0; x < xw; x+= 1){
//       const allValue = X + G + W + N;
//       const randNum = Math.random()*100;
//       const xRate = {
//         min: 0,
//         max: (X/allValue)*100
//       }
//       const gRate = {
//         min: xRate.max,
//         max: xRate.max + (G/allValue)*100
//       }
//       const wRate = {
//         min: gRate.max,
//         max: gRate.max + (W/allValue)*100
//       }
//       const nRate = {
//         min: wRate.max,
//         max: wRate.max + (N/allValue)*100
//       }
//       if(randNum > xRate.min && randNum <= xRate.max) xarr.push('X');
//       if(randNum > gRate.min && randNum <= gRate.max) xarr.push('G');
//       if(randNum > nRate.min && randNum <= nRate.max) xarr.push(' ');
//       if(randNum > wRate.min && randNum <= wRate.max) xarr.push('W');
//     }
//   }
//   return mp;
// }

// function createModal (xw=10, yw=10, msg = '') {
//   const modal = [];
//   for(){}
// }
// setInterval(render, 100)
// console.log(MAP)

// process.stdout.on('resize')
// const fs = require('fs');
// setInterval(()=>{
//   fs.writeSync(0, bst.getFmtString().clear('hello world\nhello world\nhello world\nhello world\nhello world\nhello world\nhello world\nhello world\nhello world\nhello world\nhello world\n').end());
// }, 1)


// 输入: [1,2,3]
// 输出:
// [
//   [1,2,3],
//   [1,3,2],
//   [2,1,3],
//   [2,3,1],
//   [3,1,2],
//   [3,2,1]
// ]










function resolve (nums = []) {
  let path = [], res = [];
  function permutation (nums = []) {
    for(let i = 0; i < nums.length; i+=1){
      if(!path.includes(nums[i])) {
        path.push(nums[i]);
        permutation(nums);
      } else {
        res.push(path);
        path = [];
      }
    }
  }
  permutation(nums);
  return res;
}