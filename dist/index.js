"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var PREFIX=Buffer.from([27,91]),ColorMap={black:0,red:1,green:2,yellow:3,blue:4,purple:5,celeste:6,white:7},MapDirect={up:"A","上":"A",down:"B","下":"B",right:"C","右":"C",left:"D","左":"D"};function getFontStyle(r,e,n){void 0===n&&(n="");var o=30+ColorMap[r],t=40+ColorMap[e],n=Buffer.from((e?t:"")+(r?";"+o:"")+"m"+n);return Buffer.concat([PREFIX,n]).toString()}function clearAllProps(r){void 0===r&&(r="");r=Buffer.from("0m"+r);return Buffer.concat([PREFIX,r]).toString()}function getHighlightString(r){void 0===r&&(r="");r=Buffer.from("1m"+r);return Buffer.concat([PREFIX,r]).toString()}function getUnderLineString(r){void 0===r&&(r="");r=Buffer.from("4m"+r);return Buffer.concat([PREFIX,r]).toString()}function getBlinkString(r){void 0===r&&(r="");r=Buffer.from("5m"+r);return Buffer.concat([PREFIX,r]).toString()}function getRDisplayString(r){void 0===r&&(r="");r=Buffer.from("7m"+r);return Buffer.concat([PREFIX,r]).toString()}function getCancelHideString(r){void 0===r&&(r="");r=Buffer.from("8m"+r);return Buffer.concat([PREFIX,r]).toString()}function controlArrowMove(r,e,n){void 0===r&&(r="down"),void 0===e&&(e=0),void 0===n&&(n="");n=Buffer.from(""+e+MapDirect[r]+n);return Buffer.concat([PREFIX,n]).toString()}function setArrowPosition(r,e,n){void 0===n&&(n="");n=Buffer.from((0===e||e?e:"")+(0===r||r?";"+r:"")+"H"+n);return Buffer.concat([PREFIX,n]).toString()}function clearScreen(r){void 0===r&&(r="");r=Buffer.from("2J"+r);return Buffer.concat([PREFIX,r]).toString()}function saveArrowPosition(r){void 0===r&&(r="");r=Buffer.from("s"+r);return Buffer.concat([PREFIX,r]).toString()}function readArrowPosition(r){void 0===r&&(r="");r=Buffer.from("u"+r);return Buffer.concat([PREFIX,r]).toString()}function hideArrow(r){void 0===r&&(r="");r=Buffer.from("?25l"+r);return Buffer.concat([PREFIX,r]).toString()}function showArrow(r){void 0===r&&(r="");r=Buffer.from("?25h"+r);return Buffer.concat([PREFIX,r]).toString()}function clearPositionAfter(r){void 0===r&&(r="");r=Buffer.from("K"+r);return Buffer.concat([PREFIX,r]).toString()}function bindControlFunc$1(n,o,t){return function(){for(var r=[],e=0;e<arguments.length;e++)r[e]=arguments[e];return o.value+=n.apply(void 0,r),t}}function getFmtString(r){void 0===r&&(r="");var e={value:clearAllProps()+r},n={msg:function(r){return e.value+=r=void 0===r?"":r,n},end:function(){return e.value+clearAllProps()}};return n.setFont=bindControlFunc$1(getFontStyle,e,n),n.clearProps=bindControlFunc$1(clearAllProps,e,n),n.highlight=bindControlFunc$1(getHighlightString,e,n),n.underline=bindControlFunc$1(getUnderLineString,e,n),n.blink=bindControlFunc$1(getBlinkString,e,n),n.rdisplay=bindControlFunc$1(getRDisplayString,e,n),n.cancelHide=bindControlFunc$1(getCancelHideString,e,n),n.arrowMove=bindControlFunc$1(controlArrowMove,e,n),n.setArrow=bindControlFunc$1(setArrowPosition,e,n),n.clear=bindControlFunc$1(clearScreen,e,n),n.saveArrow=bindControlFunc$1(saveArrowPosition,e,n),n.readArrow=bindControlFunc$1(readArrowPosition,e,n),n.hideArrow=bindControlFunc$1(hideArrow,e,n),n.showArrow=bindControlFunc$1(showArrow,e,n),n.clearAfter=bindControlFunc$1(clearPositionAfter,e,n),n}function bindControlFunc(n,o,t){return function(){for(var r=[],e=0;e<arguments.length;e++)r[e]=arguments[e];return o(n.apply(void 0,r)),t}}var IOStand$1=function(){function r(r){void 0===r&&(r=process),this.process=r,this.__setter__=null,this.oninput=null,this.dataFormat=function(r){return r.toString()}}return r.prototype.start=function(){var e=this;this.process.stdin.on("data",function(r){r=e.dataFormat?e.dataFormat(r):r;e.__setter__&&e.__setter__(r),e.oninput&&e.oninput(r)})},r.prototype.awaitInput=function(){var r=this;return new Promise(function(e,n){try{r.__setter__=function(r){e(r)}}catch(r){n(r)}})},r.prototype.write=function(r){this.process.stdout.write(r=void 0===r?"":r)},r.prototype.writeChain=function(r){function e(r){n.write(r)}var n=this,o={msg:function(r){return e(r=void 0===r?"":r),o}};return e(r=void 0===r?"":r),o.setFont=bindControlFunc(getFontStyle,e,o),o.clearProps=bindControlFunc(clearAllProps,e,o),o.highlight=bindControlFunc(getHighlightString,e,o),o.underline=bindControlFunc(getUnderLineString,e,o),o.blink=bindControlFunc(getBlinkString,e,o),o.rdisplay=bindControlFunc(getRDisplayString,e,o),o.cancelHide=bindControlFunc(getCancelHideString,e,o),o.arrowMove=bindControlFunc(controlArrowMove,e,o),o.setArrow=bindControlFunc(setArrowPosition,e,o),o.clear=bindControlFunc(clearScreen,e,o),o.saveArrow=bindControlFunc(saveArrowPosition,e,o),o.readArrow=bindControlFunc(readArrowPosition,e,o),o.hideArrow=bindControlFunc(hideArrow,e,o),o.showArrow=bindControlFunc(showArrow,e,o),o.clearAfter=bindControlFunc(clearPositionAfter,e,o),o},r.prototype.exit=function(){this.process.exit()},r}(),COMMAND_START=/[a-zA-Z]/g,COMMAND_CONTENT=/[a-zA-Z0-9]/g,ARG_START=/[a-zA-Z]/g,ARG_CONTENT=/[a-zA-Z0-9]/g,ARG_VALUE_STRING=/[^\\"]/g,ARG_VALUE_FREE=/[^ -]/g;function formatFree(r){return r.replace(/\\(.*?);/g,function(r,e){var n=parseInt(e,10);if(Number.isNaN(n)){if("space"===e)return" ";if("minus"===e)return"-";if("backslash"===e)return"\\";if("slash"===e)return"/";if("semicolon"===e)return";";throw Error("无效的字符串标识")}return String.fromCharCode(n)})}function assertState(r,e){void 0===e&&(e="strict");var n="";if("none"===r?n="command开头必须是英文字母":"command"===r?n="command只能由英文字母和数字组成":"have-command-argValueFree"===r?n="已经存在defaultArgs默认参数":"have-command-argStart"===r?n="没有填写参数名或参数填写不正确":"have-command-none"===r?n="参数量输入过多":"have-command-argValueString"===r&&(n="参数量输入过多，导致无法闭合"),n&&"strict"===e)throw Error(n);return!(!n||"normal"!==e)&&(console.log(n),!0)}function assertEndState(r,e){void 0===e&&(e="strict");var n="";if("none"===r?n="没有语句可以执行":"have-command-argValueString"===r&&(n="字符串语句没有闭合"),n&&"strict"===e)throw Error(n);return!(!n||"normal"!==e)&&(console.log(n),!0)}function parser(r,e,n){void 0===e&&(e="normal"),void 0===n&&(n=!1),r=r.replace(/[\r\n\t]/g,"");for(var o="none",t="",a=0,i="",c=!1,l={args:{}};a<r.length;){if("none"===o&&r[a].match(COMMAND_START))o="command",t=r[a];else if("none"===o&&r[a].match(" "))o="none";else if("command"===o&&r[a].match(COMMAND_CONTENT))t+=r[a];else if("command"===o&&r[a].match(" "))o="have-command-none",l.command=t;else if("have-command-none"===o&&r[a].match("-"))o="have-command-argStart";else if("have-command-argStart"===o&&r[a].match(ARG_START))o="have-command-argContent",t=r[a];else if("have-command-argContent"===o&&r[a].match(ARG_CONTENT))t+=r[a];else if("have-command-argContent"===o&&r[a].match(" "))o="have-command-argsDone",l.args[t]=!0,i=t;else if("have-command-argsDone"===o&&r[a].match(" "))t="";else if("have-command-argsDone"===o&&r[a].match("-"))o="have-command-argStart";else if("have-command-argsDone"===o&&r[a].match('"'))o="have-command-argValueString",t="";else if("have-command-none"===o&&r[a].match('"')&&!i)o="have-command-argValueString",t="";else if("have-command-argValueString"===o&&r[a].match(ARG_VALUE_STRING))o="have-command-argValueString",t+=r[a];else if("have-command-argValueString"===o&&r[a].match(/\\/g))o="have-command-argValueChangeMeanString";else if("have-command-argValueChangeMeanString"===o)o="have-command-argValueString",t+=r[a];else if("have-command-argValueString"===o&&r[a].match('"')&&i)o="have-command-argValueEnd",l.args[i]=t,i="";else if("have-command-argValueString"===o&&r[a].match('"')&&!l.defaultArgs)o="have-command-argValueEnd",l.defaultArgs=t;else if("have-command-argValueEnd"===o&&r[a].match(" "))o="have-command-none";else if("have-command-none"!==o||!r[a].match(ARG_VALUE_FREE)||i||l.defaultArgs)if("have-command-argsDone"===o&&r[a].match(ARG_VALUE_FREE)&&i)o="have-command-argValueFree",t=r[a];else if("have-command-argValueFree"===o&&r[a].match(ARG_VALUE_FREE))t+=r[a];else if("have-command-argValueFree"===o&&r[a].match(" ")&&i)o="have-command-none",l.args[i]=formatFree(t),i="";else if("have-command-argValueFree"===o&&r[a].match(" ")&&!l.defaultArgs)o="have-command-none",l.defaultArgs=formatFree(t),i="";else{if(c=assertState(o,e))break;n&&console.log("【错误】:"+o)}else o="have-command-argValueFree",t=r[a];a+=1}return c||("command"===o?(o="have-command-none",l.command=t):"have-command-argValueFree"===o&&i?(o="have-command-none",l.args[i]=formatFree(t),i=""):"have-command-argValueFree"!==o||l.defaultArgs?"have-command-argContent"===o?(o="have-command-none",l.args[t]=!0):"have-command-argsDone"===o||"have-command-none"===o||"have-command-argValueEnd"===o?o="have-command-none":(assertEndState(o,e),n&&console.log("【意外结尾错误】:"+o)):(o="have-command-none",l.defaultArgs=formatFree(t),i="")),l}function replaceBackslash(r){return r.replace(/\\/,"\\\\")}function data2Commandx(r){var n="";return void 0!==r.command&&(n+=r.command),void 0!==r.defaultArgs&&(n+=' "'+replaceBackslash(r.defaultArgs)+'"'),Object.entries(r.args||{}).map(function(r){var e=r[0],r=r[1];if(!0===r)n+=" -"+e;else{if(void 0===r)return!1;n+=" -"+e+' "'+replaceBackslash(r)+'"'}return!0}),n}var cmp=Object.freeze({__proto__:null,formatFree:formatFree,parser:parser,data2Commandx:data2Commandx}),IOStand=IOStand$1,cmParser=cmp;exports.IOStand=IOStand$1,exports.PREFIX=PREFIX,exports.clearAllProps=clearAllProps,exports.clearPositionAfter=clearPositionAfter,exports.clearScreen=clearScreen,exports.cmParser=cmParser,exports.controlArrowMove=controlArrowMove,exports.getBlinkString=getBlinkString,exports.getCancelHideString=getCancelHideString,exports.getFmtString=getFmtString,exports.getFontStyle=getFontStyle,exports.getHighlightString=getHighlightString,exports.getRDisplayString=getRDisplayString,exports.getUnderLineString=getUnderLineString,exports.hideArrow=hideArrow,exports.readArrowPosition=readArrowPosition,exports.saveArrowPosition=saveArrowPosition,exports.setArrowPosition=setArrowPosition,exports.showArrow=showArrow;
