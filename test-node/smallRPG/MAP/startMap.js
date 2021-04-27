// 墙
const X = {
  canPass: false,
  color: 'white',
}

// 黄土地
const N = {
  canPass: true,
  color: 'yellow',
}

// 草地
const G = {
  canPass: true,
  color: 'green',
}

// 水域
const W = {
  canPass: false,
  color: 'blue',
}



const maps = [
  [X, X, X, X, X, X, X, X, X, X, X, X, X, X, X],
  [X, X, G, G, G, G, G, G, G, G, G, G, G, X, X],
  [X, G, G, G, G, G, G, G, G, G, G, G, G, G, X],
  [X, G, G, N, N, N, N, N, N, N, N, N, G, G, X],
  [X, G, N, N, N, N, N, N, N, N, N, N, N, G, X],
  [X, G, N, N, N, G, G, G, G, N, N, N, N, G, X],
  [X, G, N, N, N, G, W, W, G, G, N, N, N, G, X],
  [X, G, N, N, G, G, W, W, W, G, N, N, N, G, X],
  [X, G, N, N, G, W, W, W, G, G, N, N, N, G, X],
  [X, G, N, N, N, G, W, W, G, N, N, N, N, G, X],
  [X, G, N, N, N, G, W, G, G, N, N, N, N, G, X],
  [X, G, N, N, N, N, G, G, N, N, N, N, N, G, X],
  [X, G, N, N, N, N, N, N, N, N, N, N, N, G, X],
  [X, X, N, N, N, N, N, N, N, N, N, N, N, X, X],
  [X, X, X, X, X, X, X, X, X, X, X, X, X, X, X],
]

const events = [
  {
    eventName: 'nihao',
    x: 2,
    y: 2,
    char: '(M)',
    charColor: 'black',
    async action (gb) {
      await gb.MESSAGE.showMsg('你好，我是这里的向导，欢迎来到shell世界。<space>');
      await gb.INPUT.isPress(' ');
      await gb.MESSAGE.showMsg('这是一个简单的世界<space>');
      await gb.INPUT.isPress(' ');
      await gb.MESSAGE.showMsg('');
    }
  }
]

module.exports = {
  events,
  maps
}