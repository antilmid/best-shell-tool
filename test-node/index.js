const bst = require('../dist')

console.log(
  bst.getFmtString('我是普通消息')
  .setFont('red')
  .msg('我是一个警告消息奥')
  .clearProps('我又变回了普通消息')
  .setFont('', 'yellow', '我是黄底警告')
  .clearProps('我又变回了普通消息')
  .end()
)

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
let t = 0;
const timer = setInterval(()=>{
  console.log(
    bst.getFmtString()
    .clear()
    .setArrow(0, 0, t)
    .end()
  )
  t++;
}, 1000)