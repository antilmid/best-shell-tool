"use strict";function __awaiter(r,i,c,s){return new(c=c||Promise)(function(e,n){function t(r){try{a(s.next(r))}catch(r){n(r)}}function o(r){try{a(s.throw(r))}catch(r){n(r)}}function a(r){var n;r.done?e(r.value):((n=r.value)instanceof c?n:new c(function(r){r(n)})).then(t,o)}a((s=s.apply(r,i||[])).next())})}function __generator(e,t){var o,a,i,c={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]},r={next:n(0),throw:n(1),return:n(2)};return"function"==typeof Symbol&&(r[Symbol.iterator]=function(){return this}),r;function n(n){return function(r){return function(n){if(o)throw new TypeError("Generator is already executing.");for(;c;)try{if(o=1,a&&(i=2&n[0]?a.return:n[0]?a.throw||((i=a.return)&&i.call(a),0):a.next)&&!(i=i.call(a,n[1])).done)return i;switch(a=0,(n=i?[2&n[0],i.value]:n)[0]){case 0:case 1:i=n;break;case 4:return c.label++,{value:n[1],done:!1};case 5:c.label++,a=n[1],n=[0];continue;case 7:n=c.ops.pop(),c.trys.pop();continue;default:if(!(i=0<(i=c.trys).length&&i[i.length-1])&&(6===n[0]||2===n[0])){c=0;continue}if(3===n[0]&&(!i||n[1]>i[0]&&n[1]<i[3])){c.label=n[1];break}if(6===n[0]&&c.label<i[1]){c.label=i[1],i=n;break}if(i&&c.label<i[2]){c.label=i[2],c.ops.push(n);break}i[2]&&c.ops.pop(),c.trys.pop();continue}n=t.call(e,c)}catch(r){n=[6,r],a=0}finally{o=i=0}if(5&n[0])throw n[1];return{value:n[0]?n[1]:void 0,done:!0}}([n,r])}}}Object.defineProperty(exports,"__esModule",{value:!0});var PREFIX=Buffer.from([27,91]),ColorMap={black:0,red:1,green:2,yellow:3,blue:4,purple:5,celeste:6,white:7},MapDirect={up:"A","上":"A",down:"B","下":"B",right:"C","右":"C",left:"D","左":"D"};function getFontStyle(r,n,e){void 0===e&&(e="");var t=30+ColorMap[r],o=40+ColorMap[n],e=Buffer.from((n?o:"")+(r?";"+t:"")+"m"+e);return Buffer.concat([PREFIX,e]).toString()}function clearAllProps(r){void 0===r&&(r="");r=Buffer.from("0m"+r);return Buffer.concat([PREFIX,r]).toString()}function getHighlightString(r){void 0===r&&(r="");r=Buffer.from("1m"+r);return Buffer.concat([PREFIX,r]).toString()}function getUnderLineString(r){void 0===r&&(r="");r=Buffer.from("4m"+r);return Buffer.concat([PREFIX,r]).toString()}function getBlinkString(r){void 0===r&&(r="");r=Buffer.from("5m"+r);return Buffer.concat([PREFIX,r]).toString()}function getRDisplayString(r){void 0===r&&(r="");r=Buffer.from("7m"+r);return Buffer.concat([PREFIX,r]).toString()}function getCancelHideString(r){void 0===r&&(r="");r=Buffer.from("8m"+r);return Buffer.concat([PREFIX,r]).toString()}function controlArrowMove(r,n,e){void 0===r&&(r="down"),void 0===n&&(n=0),void 0===e&&(e="");e=Buffer.from(""+n+MapDirect[r]+e);return Buffer.concat([PREFIX,e]).toString()}function setArrowPosition(r,n,e){void 0===e&&(e="");e=Buffer.from((0===n||n?n:"")+(0===r||r?";"+r:"")+"H"+e);return Buffer.concat([PREFIX,e]).toString()}function clearScreen(r){void 0===r&&(r="");r=Buffer.from("2J"+r);return Buffer.concat([PREFIX,r]).toString()}function saveArrowPosition(r){void 0===r&&(r="");r=Buffer.from("s"+r);return Buffer.concat([PREFIX,r]).toString()}function readArrowPosition(r){void 0===r&&(r="");r=Buffer.from("u"+r);return Buffer.concat([PREFIX,r]).toString()}function hideArrow(r){void 0===r&&(r="");r=Buffer.from("?25l"+r);return Buffer.concat([PREFIX,r]).toString()}function showArrow(r){void 0===r&&(r="");r=Buffer.from("?25h"+r);return Buffer.concat([PREFIX,r]).toString()}function clearPositionAfter(r){void 0===r&&(r="");r=Buffer.from("K"+r);return Buffer.concat([PREFIX,r]).toString()}function bindControlFunc$1(e,t,o){return function(){for(var r=[],n=0;n<arguments.length;n++)r[n]=arguments[n];return t.value+=e.apply(void 0,r),o}}function getFmtString(r){void 0===r&&(r="");var n={value:clearAllProps()+r},e={msg:function(r){return n.value+=r=void 0===r?"":r,e},end:function(){return n.value+clearAllProps()}};return e.setFont=bindControlFunc$1(getFontStyle,n,e),e.clearProps=bindControlFunc$1(clearAllProps,n,e),e.highlight=bindControlFunc$1(getHighlightString,n,e),e.underline=bindControlFunc$1(getUnderLineString,n,e),e.blink=bindControlFunc$1(getBlinkString,n,e),e.rdisplay=bindControlFunc$1(getRDisplayString,n,e),e.cancelHide=bindControlFunc$1(getCancelHideString,n,e),e.arrowMove=bindControlFunc$1(controlArrowMove,n,e),e.setArrow=bindControlFunc$1(setArrowPosition,n,e),e.clear=bindControlFunc$1(clearScreen,n,e),e.saveArrow=bindControlFunc$1(saveArrowPosition,n,e),e.readArrow=bindControlFunc$1(readArrowPosition,n,e),e.hideArrow=bindControlFunc$1(hideArrow,n,e),e.showArrow=bindControlFunc$1(showArrow,n,e),e.clearAfter=bindControlFunc$1(clearPositionAfter,n,e),e}var COMMAND_START=/[a-zA-Z]/g,COMMAND_CONTENT=/[a-zA-Z0-9]/g,ARG_START=/[a-zA-Z]/g,ARG_CONTENT=/[a-zA-Z0-9]/g,ARG_VALUE_STRING=/[^\\"]/g,ARG_VALUE_FREE=/[^ ]/g;function formatFree(r){return r.replace(/\\(.*?);/g,function(r,n){var e=parseInt(n,10);if(Number.isNaN(e)){if("space"===n)return" ";if("minus"===n)return"-";if("backslash"===n)return"\\";if("slash"===n)return"/";if("semicolon"===n)return";";throw Error("无效的字符串标识")}return String.fromCharCode(e)})}function assertState(r,n){void 0===n&&(n="strict");var e="";if("none"===r?e="command开头必须是英文字母":"command"===r?e="command只能由英文字母和数字组成":"have-command-argValueFree"===r?e="已经存在defaultArgs默认参数":"have-command-argStart"===r?e="没有填写参数名或参数填写不正确":"have-command-none"===r?e="参数量输入过多":"have-command-argValueString"===r&&(e="参数量输入过多，导致无法闭合"),e&&"strict"===n)throw Error(e);return!(!e||"normal"!==n)&&(console.log(e),!0)}function assertEndState(r,n){void 0===n&&(n="strict");var e="";if("none"===r?e="没有语句可以执行":"have-command-argValueString"===r?e="字符串语句没有闭合":"have-command-argStart"===r&&(e="参数填写不完全"),e&&"strict"===n)throw Error(e);return!(!e||"normal"!==n)&&(console.log(e),!0)}function parser(r,n,e){void 0===n&&(n="normal"),void 0===e&&(e=!1),r=r.replace(/[\r\n\t]/g,"");for(var t="none",o="",a=0,i="",c=!1,s={args:{}};a<r.length;){if("none"===t&&r[a].match(COMMAND_START))t="command",o=r[a];else if("none"===t&&r[a].match(" "))t="none";else if("command"===t&&r[a].match(COMMAND_CONTENT))o+=r[a];else if("command"===t&&r[a].match(" "))t="have-command-none",s.command=o;else if("have-command-none"===t&&r[a].match("-"))t="have-command-argStart";else if("have-command-argStart"===t&&r[a].match(ARG_START))t="have-command-argContent",o=r[a];else if("have-command-argContent"===t&&r[a].match(ARG_CONTENT))o+=r[a];else if("have-command-argContent"===t&&r[a].match(" "))t="have-command-argsDone",s.args[o]=!0,i=o;else if("have-command-argsDone"===t&&r[a].match(" "))o="";else if("have-command-argsDone"===t&&r[a].match("-"))t="have-command-argStart";else if("have-command-argsDone"===t&&r[a].match('"'))t="have-command-argValueString",o="";else if("have-command-none"===t&&r[a].match('"')&&!i)t="have-command-argValueString",o="";else if("have-command-argValueString"===t&&r[a].match(ARG_VALUE_STRING))t="have-command-argValueString",o+=r[a];else if("have-command-argValueString"===t&&r[a].match(/\\/g))t="have-command-argValueChangeMeanString";else if("have-command-argValueChangeMeanString"===t)t="have-command-argValueString",o+=r[a];else if("have-command-argValueString"===t&&r[a].match('"')&&i)t="have-command-argValueEnd",s.args[i]=o,i="";else if("have-command-argValueString"===t&&r[a].match('"')&&!s.defaultArgs)t="have-command-argValueEnd",s.defaultArgs=o;else if("have-command-argValueEnd"===t&&r[a].match(" "))t="have-command-none";else if("have-command-none"!==t||!r[a].match(ARG_VALUE_FREE)||i||s.defaultArgs)if("have-command-argsDone"===t&&r[a].match(ARG_VALUE_FREE)&&i)t="have-command-argValueFree",o=r[a];else if("have-command-argValueFree"===t&&r[a].match(ARG_VALUE_FREE))o+=r[a];else if("have-command-argValueFree"===t&&r[a].match(" ")&&i)t="have-command-none",s.args[i]=formatFree(o),i="";else if("have-command-argValueFree"===t&&r[a].match(" ")&&!s.defaultArgs)t="have-command-none",s.defaultArgs=formatFree(o),i="";else{if(c=assertState(t,n))break;e&&console.log("【错误】:"+t)}else t="have-command-argValueFree",o=r[a];a+=1}return c||("command"===t?(t="have-command-none",s.command=o):"have-command-argValueFree"===t&&i?(t="have-command-none",s.args[i]=formatFree(o),i=""):"have-command-argValueFree"!==t||s.defaultArgs?"have-command-argContent"===t?(t="have-command-none",s.args[o]=!0):"have-command-argsDone"===t||"have-command-none"===t||"have-command-argValueEnd"===t?t="have-command-none":(assertEndState(t,n),e&&console.log("【意外结尾错误】:"+t)):(t="have-command-none",s.defaultArgs=formatFree(o),i="")),s}function replaceBackslash(r){return r.replace(/\\/,"\\\\")}function data2Commandx(r){var e="";return void 0!==r.command&&(e+=r.command),void 0!==r.defaultArgs&&(e+=' "'+replaceBackslash(r.defaultArgs)+'"'),Object.entries(r.args||{}).map(function(r){var n=r[0],r=r[1];if(!0===r)e+=" -"+n;else{if(void 0===r)return!1;e+=" -"+n+' "'+replaceBackslash(r)+'"'}return!0}),e}var cmp=Object.freeze({__proto__:null,formatFree:formatFree,parser:parser,data2Commandx:data2Commandx});function bindControlFunc(e,t,o){return function(){for(var r=[],n=0;n<arguments.length;n++)r[n]=arguments[n];return t(e.apply(void 0,r)),o}}var IOStand$1=function(){function r(r){var o=this;void 0===r&&(r=process),this.process=r,this.__setter__=null,this.__commandChain__=[],this.__localLock__=!1,this.__isRaw__=!1,this.__procEventOn__=function(r){var n,e,t=o.dataFormat?o.dataFormat(r):r;o.__localLock__||o.oninput||(n=parser(r.toString()),(e=o.findCommander(n.command))&&!n.args.help?o.doSomething(function(){return __awaiter(o,void 0,void 0,function(){return __generator(this,function(r){switch(r.label){case 0:return[4,e.action(n)];case 1:return r.sent(),[2]}})})}):e&&n.args.help?o.listCommand(e):n.command&&o.writeChain("").setFont("red","","不存在 "+n.command+" 命令\n").clearProps()),!0===o.__isRaw__&&3===r[0]&&o.exit(),o.__setter__&&o.__setter__(t),o.oninput&&o.oninput(t)},this.oninput=null,this.dataFormat=function(r){return r.toString()},this.addCommand("help").defaultArg("要查看帮助的命令（可以不填写）").action(function(r){var n;return r.defaultArgs?(n=o.findCommander(r.defaultArgs))?o.listCommand(n):o.writeChain("").setFont("yellow","","没有找到 "+r.defaultArgs+" 命令\n").clearProps():o.listAllCommand(),Promise.resolve(1)}),this.resume(),this.process.stdin.on("data",this.__procEventOn__),this.pause()}return r.prototype.doSomething=function(n){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(r){switch(r.label){case 0:return this.useRaw(),[4,n()];case 1:return r.sent(),this.process.stdin.setRawMode(!1),this.closeRaw(),[2]}})})},r.prototype.listAllCommand=function(){var n=this;this.__commandChain__.map(function(r){return n.listCommand(r),0})},r.prototype.listCommand=function(r){var e="";Object.entries(r.args).map(function(r){var n=r[0],r=r[1];return e+="    -"+n+" "+r+"\n",0}),this.writeChain("").setFont("yellow","",(r.command[0]||"")+"    "+(r.command[1]||"")+"\n").msg(r.defaultArg?"    -[默认参数] "+r.defaultArg+"\n":"").msg(e).clearProps("\n")},r.prototype.findCommander=function(r){for(var n=0;n<this.__commandChain__.length;n+=1){var e=this.__commandChain__[n];if(e.command[0]===r)return e}return null},r.prototype.awaitInput=function(){var t=this;return this.resume(),this.__localLock__=!0,new Promise(function(n,e){try{t.__setter__=function(r){n(r),t.__localLock__=!1,t.pause()}}catch(r){e(r)}})},r.prototype.write=function(r){return this.process.stdout.write(r=void 0===r?"":r)},r.prototype.writeChain=function(r){function n(r){e.write(r)}var e=this,t={msg:function(r){return n(r=void 0===r?"":r),t}};return n(r=void 0===r?"":r),t.setFont=bindControlFunc(getFontStyle,n,t),t.clearProps=bindControlFunc(clearAllProps,n,t),t.highlight=bindControlFunc(getHighlightString,n,t),t.underline=bindControlFunc(getUnderLineString,n,t),t.blink=bindControlFunc(getBlinkString,n,t),t.rdisplay=bindControlFunc(getRDisplayString,n,t),t.cancelHide=bindControlFunc(getCancelHideString,n,t),t.arrowMove=bindControlFunc(controlArrowMove,n,t),t.setArrow=bindControlFunc(setArrowPosition,n,t),t.clear=bindControlFunc(clearScreen,n,t),t.saveArrow=bindControlFunc(saveArrowPosition,n,t),t.readArrow=bindControlFunc(readArrowPosition,n,t),t.hideArrow=bindControlFunc(hideArrow,n,t),t.showArrow=bindControlFunc(showArrow,n,t),t.clearAfter=bindControlFunc(clearPositionAfter,n,t),t},r.prototype.addCommand=function(r,n){var e={command:[r,n=void 0===n?"":n],defaultArg:null,args:{},action:function(){}},t=this;return{arg:function(r,n){return e.args[r]=n=void 0===n?"":n,this},defaultArg:function(r){return e.defaultArg=r=void 0===r?"":r,this},action:function(r){if(e.action=r,t.findCommander(e.command[0]))throw Error("已经存在"+e.command[0]+"，无法重复添加");return t.__commandChain__.push(e),this}}},r.prototype.pause=function(){return this.process.stdin.pause()},r.prototype.resume=function(){return this.process.stdin.resume()},r.prototype.exit=function(){return this.process.exit()},r.prototype.start=function(){this.__localLock__=!!this.__isRaw__,this.resume()},r.prototype.release=function(){this.process.stdin.removeListener("data",this.__procEventOn__)},r.prototype.useRaw=function(){this.__localLock__=!0,this.__isRaw__=!0,this.process.stdin.setRawMode(!0)},r.prototype.closeRaw=function(){this.__localLock__=!1,this.__isRaw__=!1,this.process.stdin.setRawMode(!1)},r}(),version=1;function process$1(r,n,e){void 0===n&&(n=100),void 0===e&&(e=24);for(var t=getFontStyle("","white"," "),o=getFontStyle("","green"," "),a=parseInt((r/n*e).toString(),10),i="",c=0;c<e;c+=1)i+=c<a?o:t;return getFmtString().hideArrow().arrowMove("上",1).clearAfter(i).clearProps().msg(r.toString()).msg("/").msg(n.toString()).end()}var tl=Object.freeze({__proto__:null,version:version,process:process$1}),IOStand=IOStand$1,cmParser=cmp,tool=tl;exports.IOStand=IOStand$1,exports.PREFIX=PREFIX,exports.clearAllProps=clearAllProps,exports.clearPositionAfter=clearPositionAfter,exports.clearScreen=clearScreen,exports.cmParser=cmParser,exports.controlArrowMove=controlArrowMove,exports.getBlinkString=getBlinkString,exports.getCancelHideString=getCancelHideString,exports.getFmtString=getFmtString,exports.getFontStyle=getFontStyle,exports.getHighlightString=getHighlightString,exports.getRDisplayString=getRDisplayString,exports.getUnderLineString=getUnderLineString,exports.hideArrow=hideArrow,exports.readArrowPosition=readArrowPosition,exports.saveArrowPosition=saveArrowPosition,exports.setArrowPosition=setArrowPosition,exports.showArrow=showArrow,exports.tool=tool;
