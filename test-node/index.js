const bst = require('../dist')

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


const iostand = new bst.IOStand();
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

function process (current, total, len = 10) {
  const back = bst.getFontStyle('', 'white', ' ')
  const active = bst.getFontStyle('', 'green', ' ')
  const activeNum = parseInt((current / total) * len, 10)
  let processStr = ''
  for(let i = 0; i < len; i++) {
    if(i < activeNum) processStr += active
    else processStr += back
  }
  console.log(
    bst.getFmtString()
    .hideArrow()
    .arrowMove('上', 1)
    .clearAfter(processStr)
    .clearProps()
    .msg(current)
    .msg('/')
    .msg(total)
    .end()
  )
}

let count = 0
let total = 21
console.log('准备加载进度\n')
setTimeout(()=>{
  const timer = setInterval(()=>{
    if(count === total) clearInterval(timer)
    process(count, total, 25)
    count++
  }, 1000)
}, 1000)
