# Best Shell tool
`dev以来需要用--legacy-peer-deps来解决冲突`

---
### 1. 关于BST
BST实现的是一个shell & command的操作库，分别提供了shell控制字符串操作、shell终端操作、command parse操作和基础shell功能组件四大能力。

BST期望做到简化命令行编程能力，更快、更简单地开发命令行工具和cli。在后续的介绍过程中，会带大家实现几个命令行小功能，来了解BST开发命令行工具的过程。

---
### 2. shell控制字符模块。
该模块提供了生成控制字符的能力。如下：

1.） **getFontStyle** 
获取带字体样式的shell消息,我们可以通过这个能力，获取带字体颜色和背景颜色的shell消息字符串。
直接用console或stdout输出这个消息，就可以看到带颜色的文字。
`getFontStyle(fontColor, backColor, msg):string`

示例：
```javascript
console.log(bst.getFontStyle('blue', '', '我是蓝色字'))
console.log(bst.getFontStyle('red', '', '我是红色字'))
console.log(bst.getFontStyle('yellow', 'blue', '我是黄色字蓝色背景'))
```

输出：
![001](./img/字体样式.jpg)

2. **clearAllProps** 获取清除所有属性的shell消息
3. **getHighlightString** 获取高亮的shell消息
4. **getUnderLineString** 获取下划线的shell消息
5. **getBlinkString** 获取闪烁字体的shell消息
6. **getRDisplayString** 获取反显的shell消息
7. **getCancelHideString** 获取消隐的shell消息
8. **controlArrowMove** 控制shell光标移动的shell消息
9. **setArrowPosition** 设置shell光标位置的shell消息
10. **clearScreen** 清屏
11. **saveArrowPosition** 保存光标位置
12. **readArrowPosition** 取出光标位置
13. **hideArrow** 隐藏光标
14. **showArrow** 显示光标
15. **clearPositionAfter** 清除光标之后这一行的消息
16. **getFmtString** 获取格式化字体