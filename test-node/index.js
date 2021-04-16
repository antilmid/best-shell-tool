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

console.log(
  // bst.getFontStyle('', 'yellow', '我是黄底警告')
)