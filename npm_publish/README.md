<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Best Shell tool](#best-shell-tool)
    - [1. 关于BST](#1-%E5%85%B3%E4%BA%8Ebst)
    - [2. shell控制字符模块](#2-shell%E6%8E%A7%E5%88%B6%E5%AD%97%E7%AC%A6%E6%A8%A1%E5%9D%97)
      - [**2.1 getFontStyle**](#21-getfontstyle)
      - [**2.2 clearAllProps**](#22-clearallprops)
      - [**2.3 getHighlightString**](#23-gethighlightstring)
      - [**2.4 getUnderLineString**](#24-getunderlinestring)
      - [**2.5 getBlinkString**](#25-getblinkstring)
      - [**2.6 getRDisplayString**](#26-getrdisplaystring)
      - [**2.7 getCancelHideString**](#27-getcancelhidestring)
      - [**2.8 controlArrowMove**](#28-controlarrowmove)
      - [**2.9 setArrowPosition**](#29-setarrowposition)
      - [**2.10 clearScreen**](#210-clearscreen)
      - [**2.11 saveArrowPosition**](#211-savearrowposition)
      - [**2.12 readArrowPosition**](#212-readarrowposition)
      - [**2.13 hideArrow**](#213-hidearrow)
      - [**2.14 showArrow**](#214-showarrow)
      - [**2.15 clearPositionAfter**](#215-clearpositionafter)
      - [**2.16 getFmtString**](#216-getfmtstring)
      - [2.17 基于控制字符实现一个 进度条 功能](#217-%E5%9F%BA%E4%BA%8E%E6%8E%A7%E5%88%B6%E5%AD%97%E7%AC%A6%E5%AE%9E%E7%8E%B0%E4%B8%80%E4%B8%AA-%E8%BF%9B%E5%BA%A6%E6%9D%A1-%E5%8A%9F%E8%83%BD)
    - [3. CommandX语法和语法解析器](#3-commandx%E8%AF%AD%E6%B3%95%E5%92%8C%E8%AF%AD%E6%B3%95%E8%A7%A3%E6%9E%90%E5%99%A8)
      - [**3.1 CommandX语法**](#31-commandx%E8%AF%AD%E6%B3%95)
      - [**3.2 parser函数**](#32-parser%E5%87%BD%E6%95%B0)
      - [**3.3 data2Commandx函数**](#33-data2commandx%E5%87%BD%E6%95%B0)
      - [**3.4 formatFree函数**](#34-formatfree%E5%87%BD%E6%95%B0)
    - [4. IOStand标准输入输出库](#4-iostand%E6%A0%87%E5%87%86%E8%BE%93%E5%85%A5%E8%BE%93%E5%87%BA%E5%BA%93)
      - [**4.1 write**](#41-write)
      - [**4.2 writeChain**](#42-writechain)
      - [**4.3 start**](#43-start)
      - [**4.4 addCommand**](#44-addcommand)
      - [**4.5 listAllCommand**](#45-listallcommand)
      - [**4.6 awaitInput**](#46-awaitinput)
      - [**4.7 pause**](#47-pause)
      - [**4.8 resume**](#48-resume)
      - [**4.9 exit**](#49-exit)
      - [**4.10 release**](#410-release)
    - [5. Tool工具](#5-tool%E5%B7%A5%E5%85%B7)
      - [**5.1 process进度条**](#51-process%E8%BF%9B%E5%BA%A6%E6%9D%A1)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

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

<br>

### 4. IOStand标准输入输出库

<br>

BST提供了一个标准输入输出管理，用它可以轻松管理shell控制台的输入输出。

#### **4.1 write**

<br>

IOStand的write函数是输出一条消息到控制台。<br> 
`write(data:string = ''):boolean`

示例:
```javascript
const bst = require('best-shell-tool')

const iostand = new bst.IOStand()
iostand.write('hello world\n')
```

此时你会发现控制台输出了`hello world`,和`console.log`效果类似，不同的是他不会自动在语句后换行。

<br>

#### **4.2 writeChain**

<br>

IOStand的writeChain函数是链式输出一条消息到控制台。里面会返回一条操作链。<br> 
`writeChain(_msg:string = ''):StandOutOperate`<br>
其中StandOutOperate定义如下:
```ts
interface StandOutOperate {
  /**
   * @description: 附加消息
   * @param {string} msg 要附加的消息
   * @return {StandOutOperate}
   */
  msg?: (msg?:string) => StandOutOperate,

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

示例:
```javascript
const bst = require('best-shell-tool')

const iostand = new bst.IOStand()
iostand.writeChain('我是普通字体')
  .setFont('red', '', '我是红色字体')
  .setFont('yellow', '', '我是黄色字体\n')
```

输出:<br>
![图八](https://github.com/antilmid/best-shell-tool/blob/master/img/writeChain输出.jpg)

<br>

#### **4.3 start**

<br>

start函数是开启命令交互模式，你可以使用`oninput`事件来监听输入，注意，当你注册了`oninput`事件，那么start就不会启用CommandX命令交互模式。<br>

如下示例，我们注册了oninput事件来监听输入。<br>

示例:
```javascript
const bst = require('best-shell-tool')

const iostand = new bst.IOStand()
iostand.oninput = (data) => {
  console.log('你输入了:', data)
}
iostand.start()
```

如果我们直接使用start，相当于是一个CommandX交互模式，你需要通过`addCommand`函数来注册命令。如下示例所示。<br>

示例:
```javascript
const iostand = new bst.IOStand()

iostand.addCommand('hello')
  .action(()=>{
    console.log('hello world')
  })
iostand.start()
```

输出:<br>
![图九](https://github.com/antilmid/best-shell-tool/blob/master/img/commandX.jpg)<br>
![图十](https://github.com/antilmid/best-shell-tool/blob/master/img/commandX1.jpg)<br>
![图十一](https://github.com/antilmid/best-shell-tool/blob/master/img/commandX2.jpg)<br>

#### **4.4 addCommand**

<br>

addCommand是添加一条CommandX命令，这样在开启start交互后，就会根据CommandX寻找已经注册过的action去执行。<br>
`addCommand(cmd:string, notes:string = ''):AddCommandOperate`

其中AddCommandOperate如下:
```ts
interface AddCommandOperate {
  /**
   * @description: 声明一个参数
   * @param {string} argName 参数名称
   * @param {string} notes 参数注释
   * @return {AddCommandOperate} 返回操作链
   */
  arg: (argName:string, notes:string) => AddCommandOperate;

  /**
   * @description: 声明一个默认参数
   * @param {string} notes 参数注释
   * @return {AddCommandOperate} 返回操作链
   */
  defaultArg: (notes:string) => AddCommandOperate;

  /**
   * @description: 注册操作函数
   * @param {(command:ParseStruct)=>Promise<number>} fn 操作函数
   * @return {AddCommandOperate} 返回操作链
   */
  action: (fn:(command:ParseStruct)=>Promise<number>)=>AddCommandOperate;
}
```

示例:
```javascript
const bst = require('best-shell-tool')

const iostand = new bst.IOStand()
iostand.addCommand('say', '输出一句话到控制台')
  .defaultArg('要说的话')
  .arg('prefix', '前缀')
  .arg('suffyx', '后缀')
  .action((cmd)=>{
    const prefix = cmd.args.prefix || '';
    const suffix = cmd.args.suffix || '';
    const content = cmd.defaultArgs || '';
    console.log(prefix,content,suffix)
  })
iostand.start()
```

输出:<br>
![图十二](https://github.com/antilmid/best-shell-tool/blob/master/img/commandX3.jpg)<br>

值得注意的是，IOStand里面其实默认注册了一个help命令，通过它可以在控制台查询已经注册过的命令使用方式。<br>
其次，action注册的函数如果返回的是Promise，相当于你是一个异步函数，它会等你执行完成再监听输入。<br>
如果已经存在某个命令，则不能再注册该命令。<br>

#### **4.5 listAllCommand**

<br>

listAllCommand函数是列出已经注册过的CommandX命令。<br>
`listAllCommand():void`

示例:
```javascript
const bst = require('best-shell-tool')

const iostand = new bst.IOStand()
iostand.addCommand('say', '输出一句话到控制台')
  .defaultArg('要说的话')
  .arg('prefix', '前缀')
  .arg('suffyx', '后缀')
  .action((cmd)=>{
    const prefix = cmd.args.prefix || '';
    const suffix = cmd.args.suffix || '';
    const content = cmd.defaultArgs || '';
    console.log(prefix,content,suffix)
  })
iostand.listAllCommand()
```

输出:
```
help    
    -[默认参数] 要查看帮助的命令（可以不填写）

say    输出一句话到控制台
    -[默认参数] 要说的话
    -prefix 前缀
    -suffyx 后缀
```

<br>

#### **4.6 awaitInput**

<br>

awaitInput是等待一次输入，等待的这次输入不会受到CommandX交互的影响。<br>
`awaitInput():Promise<any>`

示例:
```javascript
const bst = require('best-shell-tool')

const iostand = new bst.IOStand();
(async () => {
  const inp = await iostand.awaitInput()
  console.log('你输入了:', inp)
})();
```

<br>

#### **4.7 pause**

<br>

pause同process.stdin.pause，暂停控制台。<br>
`pause():NodeJS.ReadStream & {fd:0;}`

<br>

#### **4.8 resume**

<br>

resume同process.stdin.resume，恢复控制台输入。<br>
`resume():NodeJS.ReadStream & {fd: 0;}`

<br>

#### **4.9 exit**

<br>

exit同process.exit，退出控制台。<br>
`exit():never`

<br>

#### **4.10 release**

<br>

release是释放IOStand对象，当不再用到IOStand时候，请一定要使用该函数释放<br>
`release():void`

<br>

---

<br>

### 5. Tool工具

<br>

Tool提供了一些集成好的小工具，但是目前只提供了一个进度条功能，后续会根据大家的需求进行增加迭代。

<br>

#### **5.1 process进度条**

<br>

process提供的是显示一个进度条能力。<br>
`function process(current:number, total:number = 100, len:number = 24):string`

示例:
```javascript
const bst = require('best-shell-tool')

const process = bst.tool.process;
const iostand = new bst.IOStand();

iostand.addCommand('wait', '等待')
  .defaultArg('要等待的时间')
  .action((cmd)=>{
    console.log('')
    return new Promise((res) => {
      const waitTime = parseInt(cmd.defaultArgs, 10) || 0
      let current = 0
      const timer = setInterval(()=>{
        console.log(process(current, waitTime))
        if(current === waitTime) {
          clearInterval(timer)
          console.log('已经结束等待')
          res()
        }
        current += 1
      }, 1000)
    })
  })

iostand.start()
```

<br>

---