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
iostand.writeChain().setFont('red', '', 'haha')

// console.log(iostand.writeChain)
