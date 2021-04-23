# Best Shell tool
`dev以来需要用--legacy-peer-deps来解决冲突`

![npm version](https://img.shields.io/npm/v/best-shell-tool)
![npm version](https://img.shields.io/node/v/best-shell-tool)
![npm bundle size](https://img.shields.io/bundlephobia/min/best-shell-tool)
![github activity](https://img.shields.io/github/commit-activity/m/antilmid/best-shell-tool)
![languages](https://img.shields.io/github/languages/top/antilmid/best-shell-tool)
![gitHub watchers](https://img.shields.io/github/watchers/antilmid/best-shell-tool?style=social)
![gitHub stars](https://img.shields.io/github/stars/antilmid/best-shell-tool?style=social
)


---
### 1. 关于BST
<br>
BST实现的是一个shell & command的操作库，分别提供了shell控制字符串操作、shell终端操作、command parse操作和基础shell功能组件四大能力。

BST期望做到简化命令行编程能力，更快、更简单地开发命令行工具和cli。在后续的介绍过程中，会带大家实现几个命令行小功能，来了解BST开发命令行工具的过程。

---
<br>

### 2. shell控制字符模块
<br>

该模块提供了生成控制字符的能力。所谓控制字符其实就是改变终端或文件显示的一些行为。一个控制符是由 CONTRL + key 组成的（同时按下）。控制字符同样可以通过转义以八进制或十六进制的方式显示。

<br>

#### **2.1 getFontStyle**
<br>
获取带字体样式的shell消息,我们可以通过这个能力，获取带字体颜色和背景颜色的shell消息字符串。直接用console或stdout输出这个消息，就可以看到带颜色的文字。

`getFontStyle(fontColor:Color, backColor:Color, msg:string):string`

关于Color的定义如下TS所示：
```ts
type Color = 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'purple' | 'celeste' | 'white';
```

示例：
```javascript
const bst = require('best-shell-tool')

console.log(bst.getFontStyle('blue', '', '我是蓝色字'))
console.log(bst.getFontStyle('red', '', '我是红色字'))
console.log(bst.getFontStyle('yellow', 'blue', '我是黄色字蓝色背景'))
```

输出：

![图一](https://github.com/antilmid/best-shell-tool/blob/master/img/字体样式.jpg)

<br>

#### **2.2 clearAllProps**

<br>

获取清除所有属性的shell消息。通过这个可以清除前文所设置的所有属性样式。

`clearAllProps(msg:string):string`

示例：
```javascript
const bst = require('best-shell-tool')

console.log(bst.getFontStyle('blue')+'我是蓝色')
console.log(bst.getFontStyle('blue')+bst.clearAllProps('我的蓝色属性没有被继承过来'))
```

输出：

![图二](https://github.com/antilmid/best-shell-tool/blob/master/img/清除样式.jpg)

<br>

#### **2.3 getHighlightString** 

<br>

获取高亮的shell消息，其实个人感觉就是稍微加粗了一下。

`getHighlightString(msg:string):string`

示例：
```javascript
const bst = require('best-shell-tool')

console.log(bst.clearAllProps('我是普通字'))
console.log(bst.getHighlightString('我是高亮字'))
console.log(bst.getFontStyle('red') + bst.getHighlightString('我是红色高亮字'))
```

输出：

![图三](https://github.com/antilmid/best-shell-tool/blob/master/img/高亮文字.jpg)

<br>

#### **2.4 getUnderLineString** 

<br>

获取下划线的shell消息

`getUnderLineString(msg:string):string`

示例：
```javascript
const bst = require('best-shell-tool')

console.log(bst.clearAllProps('我是普通字'))
console.log(bst.getUnderLineString('我是下划线字'))
console.log(bst.getFontStyle('red') + bst.getUnderLineString('我是红色下划线字'))
```

输出：

![图四](https://github.com/antilmid/best-shell-tool/blob/master/img/下划线字.jpg)

<br>

#### **2.5 getBlinkString** 

<br>

获取闪烁字体的shell消息，故名思议，该功能实现了shell文字闪烁，一般在shell交互能力中，用于表示已经选中的选项。

`getUnderLineString(msg:string):string`

示例：
```javascript
const bst = require('best-shell-tool')

console.log(bst.clearAllProps('我是普通字'))
console.log(bst.getBlinkString('我是闪烁字'))
console.log(bst.getFontStyle('red') + bst.getBlinkString('我是红色闪烁字'))
```

<br>

#### **2.6 getRDisplayString** 

<br>

获取反显的shell消息，所谓反显，就是模拟文字被选中的状态，一般呈现为 背景=字体颜色， 字体颜色=背景。

`getRDisplayString(msg:string):string`

示例：
```javascript
const bst = require('best-shell-tool')

console.log(bst.clearAllProps('我是普通字'))
console.log(bst.getRDisplayString('我是反显状态'))
console.log(bst.getFontStyle('red') + bst.getRDisplayString('我是红色字反显状态'))
```

输出：

![图五](https://github.com/antilmid/best-shell-tool/blob/master/img/反显状态.jpg)

<br>

#### **2.7 getCancelHideString** 

<br>

获取消隐的shell消息，消隐的消息在控制台是看不见的，但是占位符是真实存在的，并且文字也是可以真实复制的。

`getCancelHideString(msg:string):string`

示例：
```javascript
const bst = require('best-shell-tool')

console.log(bst.clearAllProps('我是普通字'))
console.log(bst.getCancelHideString('我是消隐状态'))
```

<br>

#### **2.8 controlArrowMove** 

<br>

控制shell光标移动的shell消息，通过方向指令和移动数量来控制光标的移动，可以实现在不同位置做输出的功能。

`controlArrowMove(direct:Direct, lines:number, msg:string):string`

关于Direct的定义如下TS所示：
```ts
type Direct = 'up' | 'down' | 'right' | 'left' | '上' | '下' | '左' | '右';
```

示例：
```javascript
const bst = require('best-shell-tool')

console.log('00 01 02 03')
console.log('10 11 12 13')
console.log('20 21 22 23')
console.log('30 31 32 33')
console.log(bst.controlArrowMove('上', 2, '我是移动后的'))
```

输出：

![图六](https://github.com/antilmid/best-shell-tool/blob/master/img/控制移动.jpg)

<br>


#### **2.9 setArrowPosition** 

<br>

设置shell光标位置的shell消息，和controlArrowMove相比，这个是直接通过指定坐标点来移动光标。

`setArrowPosition(x:number | '', y:number | '', msg:string):string`

<br>


#### **2.10 clearScreen** 

<br>

清屏，顾名思义，清除之前屏幕所有的内容。

`clearScreen(msg:string):string`

<br>


#### **2.11 saveArrowPosition** 

<br>

保存当前光标位置

`saveArrowPosition(msg:string):string`

<br>

#### **2.12 readArrowPosition** 

<br>

取出之前保存的光标位置

`saveArrowPosition(msg:string):string`

<br>

#### **2.13 hideArrow** 

<br>

隐藏光标，就是把shell的那个小黑点隐藏。

`hideArrow(msg:string):string`

<br>

#### **2.14 showArrow** 

<br>

显示光标

`showArrow(msg:string):string`

<br>

#### **2.15 clearPositionAfter** 

<br>

清除光标之后这一行的消息。在制作进度条的时候可以用它时时清除一行后的消息，保留之前输出的消息。

`clearPositionAfter(msg:string):string`

<br>

#### **2.16 getFmtString** 

<br>

获取格式化字符串。和前面的不同，这个是链式获取一串格式化消息，通过end结束链式调用，拿到格式化消息。其中每次返回的`StandOutOperate`操作对象，里面的所有操作链都能和前面的函数一一对应。

`function getFmtString(_msg:string):StandOutOperate`

关于StandOutOperate的定义如下TS所示：
```ts
interface StandOutOperate {
  /**
   * @description: 附加消息
   * @param {string} msg 要附加的消息
   * @return {StandOutOperate}
   */
  msg?: (msg?:string) => StandOutOperate,

  /**
   * @description: 结束并获得格式化后的字符
   * @return {string}
   */
  end?: () => string,

  /**
   * @description: 设置字体样式
   * @param {Color | ''} fontColor 字体颜色
   * @param {Color | ''} background 背景色
   * @return {StandOutOperate}
   */
  setFont?: (fontColor?: Color | '', background?: Color | '', msg?:string) => StandOutOperate,

  /**
   * @description: 清除所有控制属性
   * @param {string} msg 附加消息
   * @return {StandOutOperate}
   */
  clearProps?: (msg?:string) => StandOutOperate,

  /**
   * @description: 高亮文本
   * @param {string} msg 消息
   * @return {StandOutOperate}
   */
  highlight?: (msg?:string) => StandOutOperate,

  /**
   * @description: 下划线
   * @param {string} msg 消息
   * @return {StandOutOperate}
   */
  underline?: (msg?:string) => StandOutOperate,

  /**
   * @description: 闪烁
   * @param {string} msg 消息
   * @return {StandOutOperate}
   */
  blink?: (msg?:string) => StandOutOperate,

  /**
   * @description: 反显
   * @param {string} msg 消息
   * @return {StandOutOperate}
   */
  rdisplay?: (msg?:string) => StandOutOperate,

  /**
   * @description: 消隐
   * @param {string} msg 消息
   * @return {StandOutOperate}
   */
  cancelHide?: (msg?:string) => StandOutOperate,

  /**
   * @description: 控制光标移动
   * @param {Direct} direct 移动方向
   * @param {number} lines 移动行数
   * @param {string} msg 附加消息
   * @return {StandOutOperate}
   */
  arrowMove?: (direct?:Direct, lines?:number, msg?:string) => StandOutOperate,

  /**
   * @description: 设置鼠标位置
   * @param {number | ''} x 横坐标移动距离
   * @param {number | ''} y 纵坐标移动距离
   * @param {string} msg 附加消息
   * @return {StandOutOperate}
   */
  setArrow?: (x?:number | '', y?:number | '', msg?:string) => StandOutOperate,

  /**
   * @description: 清屏
   * @param {string} msg 附加消息
   * @return {StandOutOperate}
   */
  clear?: (msg?:string) => StandOutOperate,

  /**
   * @description: 保存光标位置
   * @param {string} msg 附加消息
   * @return {StandOutOperate}
   */
  saveArrow?: (msg?:string) => StandOutOperate,

  /**
   * @description: 读取恢复光标位置
   * @param {string} msg 附加消息
   * @return {StandOutOperate}
   */
  readArrow?: (msg?:string) => StandOutOperate,

  /**
   * @description: 隐藏光标
   * @param {string} msg 附加消息
   * @return {StandOutOperate}
   */
  hideArrow?: (msg?:string) => StandOutOperate,

  /**
   * @description: 显示光标
   * @param {string} msg 附加消息
   * @return {StandOutOperate}
   */
  showArrow?: (msg?:string) => StandOutOperate,

  /**
   * @description: 清除光标所在位置之后这一行的所有内容
   * @param {string} msg 附加消息
   * @return {StandOutOperate}
   */
  clearAfter?: (msg?:string) => StandOutOperate,
}
```

示例：
```javascript
const bst = require('best-shell-tool')

console.log(
  bst.getFmtString('我是普通字体')
  .setFont('red', '', '我是红色字体')
  .clearProps()
  .underline('没想到我带下划线了')
  .setFont('blue', '', '我蓝了')
  .end()
)
```

输出：

![图七](https://github.com/antilmid/best-shell-tool/blob/master/img/格式化链.jpg)

<br>

#### 2.17 基于控制字符实现一个 进度条 功能

<br>

这里是一个简单的实战教学，基于前文提供的api制作一个简单的`进度条`功能。当然，因为这个`进度条`工具很常用，BST自带的组件库里面已经封装了`进度条`。这里的实现只是为了大家更好的掌握和熟悉`BST-控制字符模块`的功能。

示例：
```javascript
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
```

---

<br>

### 3. CommandX语法和语法解析器

<br>

CommandX是作者定义的一种简单命令交互语法，它是一种简化、弱化后的shell命令模式，设计之初的目的是为了解决node开发命令行工具时，希望对用户开放命令交互的愿景，CommandX语法通过cmParse可以将对应的命令解析成命令对象的形式。形式定义如下：

```ts
interface ParseStruct {
  command?: string,
  defaultArgs?: string,
  args?: {
    [argsName:string]:any
  }
}
```

<br>

#### **3.1 CommandX语法**

<br>

这一节将简单介绍一些CommandX语法编写，和对应转换成命令对象形式的样例。
* 无参数直接命令<br>
  commandX语法<br>
  `command`<br><br>
  转换成js对象后
  ```javascript
  { args: {}, command: 'command' }
  ```

  <br>

* 带参数命令<br>
  commandX语法<br>
  `command -arg1 你好世界 -arg2 我是参数2`<br><br>
  转换成js对象后
  ```javascript
  { args: { arg1: '你好世界', arg2: '我是参数2' }, command: 'command' }
  ```

  <br>

* 布尔值参数使用<br>
  commandX语法<br>
  `command -arg1 -arg2 arg1是布尔值`<br><br>
  转换成js对象后
  ```javascript
  { args: { arg1: true, arg2: 'arg1是布尔值' }, command: 'command' }
  ```

  <br>

* 默认参数值语法<br>
  commandX语法<br>
  `command 我是默认值 -other 我不是默认值`<br><br>
  转换成js对象后
  ```javascript
  { args: { other: '我不是默认值' }, command: 'command', defaultArgs: '我是默认值' }
  ```
  <br>
  
  commandX语法<br>
  `command -other 我不是默认值 我是默认值`<br><br>
  转换成js对象后
  ```javascript
  { args: { other: '我不是默认值' }, command: 'command', defaultArgs: '我是默认值' }
  ```

  <br>

* 双引号限定字符串<br>
  commandX中，带上双引号的字符串叫作双引号限定字符串，该类型字符串中，反斜杠（`\`）和双引号（`"`）属于特殊字符，需要用转义字符才能使他正确转换。
  commandX语法<br>
  `command "她说：\"我爱你\""`<br><br>
  转换成js对象后
  ```javascript
  { args: {}, command: 'command', defaultArgs: '她说："我爱你"' }
  ```

  <br>

* 自由非限定字符<br>
  commandX中，不被双引号（`"`）包裹的字符串被称作自由非限定字符，对于这类字符是不能使用双引号（`"`）和减号（`-`）开头。所以在自由非限定字符模式下，提供了unicode直接编码转换。用`\U;`的模式可以指定任意一个Unicode对应的字符。比如`\65;`就会被转换为字符`A`。对于一些特殊字符，可以直接使用`\S`标识转换的模式，如常用的空格可以用`\space;`转换。标识的对应关系如下：<br>
    * `\space;` === ` `
    * `\backslash;` === `\`
    * `\slash;` === `/`
    * `\semicolon;` === `;`

    <br>

  commandX语法<br>
  `command \65;\66;\67;`<br><br>
  转换成js对象后
  ```javascript
  { args: {}, command: 'command', defaultArgs: 'ABC' }
  ```

  <br>

#### **3.2 parser函数**

<br>

parser函数是BST CommandParse模块提供的CommandX语法解析函数，用它可以将CommandX语法编译成js对象。参数`str`是要解析commandX语法，参数`mode`是指定报错模式，如果为`normal`，使用`console.log`进行错误提示。如果为`strict`，错误直接抛出。参数`isDebugger`是用来调试编译的语法分析，如果为`true`，则在每一次意外的语法分析，输出当前语法分析状态机的状态<br>
`function parser(str:string, mode:Mode = 'normal', isDebugger:boolean = false):ParseStruct`

关于ParseStruct的定义如下TS所示：
```ts
interface ParseStruct {
  command?: string,
  defaultArgs?: string,
  args?: {
    [argsName:string]:any
  }
}
```

示例: 
```javascript
const bst = require('best-shell-tool')

const res = bst.cmParser.parser('command -arg hello,world')
console.log(res)
```

输出:
```javascript
{ args: { arg: 'hello,world' }, command: 'command' }
```

<br>

#### **3.3 data2Commandx函数**

<br>

data2Commandx函数是parser的一个逆向过程，它能将命令对象转换成CommandX语法。<br>
`function data2Commandx(data:ParseStruct):string`

关于ParseStruct的定义如下TS所示：
```ts
interface ParseStruct {
  command?: string,
  defaultArgs?: string,
  args?: {
    [argsName:string]:any
  }
}
```

示例: 
```javascript
const bst = require('best-shell-tool')

const data = {
  args: { isOpen: true, x: '10', y: '20' },
  command: 'command',
  defaultArgs: 'hello,world'
}
const res = bst.cmParser.data2Commandx(data)
console.log(res)
```

输出:<br>
`command "hello,world" -isOpen -x "10" -y "20"`

<br>

#### **3.4 formatFree函数**

<br>

formatFree函数是一个用来将自由非限定字符串转化为js字符串，CommandX的parser对于自由非限定字符串就是使用该函数实现。<br>
`function formatFree(str:string):string`

---