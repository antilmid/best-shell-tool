// 定义Parser后的数据结构
export interface ParseStruct {
  command?: string,
  defaultArgs?: string,
  args?: {
    [argsName:string]:any
  }
}

export type Mode = 'strict' | 'normal';

const COMMAND_START = /[a-zA-Z]/g;
const COMMAND_CONTENT = /[a-zA-Z0-9]/g;
const ARG_START = /[a-zA-Z]/g;
const ARG_CONTENT = /[a-zA-Z0-9]/g;
const ARG_VALUE_STRING = /[^\\"]/g;
const ARG_VALUE_FREE = /[^ ]/g;
// const ARG_DEFAULT_VALUE_FREE = /[^ -]/g;

/**
 * @description: 格式化自由输入参数
 * @param {string} str 要格式化的参数
 * @return {string} 格式化后的参数
 */
export function formatFree(str:string) {
  const newstr = str.replace(/\\(.*?);/g, (matched, $0) => {
    const num = parseInt($0, 10);
    if (Number.isNaN(num)) {
      if ($0 === 'space') {
        return ' ';
      }
      if ($0 === 'minus') {
        return '-';
      }
      if ($0 === 'backslash') {
        return '\\';
      }
      if ($0 === 'slash') {
        return '/';
      }
      if ($0 === 'semicolon') {
        return ';';
      }
      throw Error('无效的字符串标识');
    }
    return String.fromCharCode(num);
  });
  return newstr;
}

/**
 * @description: 断言语法分析过程中的错误状态
 * @param {string} state 语法状态
 * @param {Mode} mode 分析模式 strict模式下直接抛出Error, normal模式下用console输出错误。
 * @return {boolean} 是否报错
 */
function assertState(state:string, mode:Mode = 'strict') {
  let err = '';
  if (state === 'none') {
    err = 'command开头必须是英文字母';
  } else if (state === 'command') {
    err = 'command只能由英文字母和数字组成';
  } else if (state === 'have-command-argValueFree') {
    err = '已经存在defaultArgs默认参数';
  } else if (state === 'have-command-argStart') {
    err = '没有填写参数名或参数填写不正确';
  } else if (state === 'have-command-none') {
    err = '参数量输入过多';
  } else if (state === 'have-command-argValueString') {
    err = '参数量输入过多，导致无法闭合';
  }
  // 报错
  if (err && mode === 'strict') {
    throw Error(err);
  }
  if (err && mode === 'normal') {
    console.log(err);
    return true;
  }
  return false;
}

/**
 * @description: 断言语法分析结束时的错误状态
 * @param {string} state 语法状态
 * @param {Mode} mode 分析模式 strict模式下直接抛出Error, normal模式下用console输出错误。
 * @return {boolean} 是否报错
 */
function assertEndState(state:string, mode:Mode = 'strict') {
  let err = '';
  if (state === 'none') {
    err = '没有语句可以执行';
  } else if (state === 'have-command-argValueString') {
    err = '字符串语句没有闭合';
  } else if (state === 'have-command-argStart') {
    err = '参数填写不完全';
  }
  // 报错
  if (err && mode === 'strict') {
    throw Error(err);
  }
  if (err && mode === 'normal') {
    console.log(err);
    return true;
  }
  return false;
}

/**
 * @description: CommandX语法转换成对象
 * @param {string} str 要转换的文字
 * @param {Mode} mode 语法检查模式
 * @param {boolean} isDebugger 是否开启语法分析debugger
 * @return {ParseStruct} 转换后的语法对象结构
 */
export function parser(str:string, mode:Mode = 'normal', isDebugger:boolean = false) {
  str = str.replace(/[\r\n\t]/g, '');
  let state = 'none';
  let cache = '';
  let pos = 0;
  let cacheArgName = '';
  let isErr = false;
  const dataStruct:ParseStruct = {
    args: {},
  };
  while (pos < str.length) {
    if (state === 'none' && str[pos].match(COMMAND_START)) { //
      state = 'command';
      cache = str[pos];
    } else if (state === 'none' && str[pos].match(' ')) {
      state = 'none';
    } else if (state === 'command' && str[pos].match(COMMAND_CONTENT)) {
      cache += str[pos];
    } else if (state === 'command' && str[pos].match(' ')) {
      state = 'have-command-none';
      dataStruct.command = cache;
    } else if (state === 'have-command-none' && str[pos].match('-')) {
      state = 'have-command-argStart';
    } else if (state === 'have-command-argStart' && str[pos].match(ARG_START)) {
      state = 'have-command-argContent';
      cache = str[pos];
    } else if (state === 'have-command-argContent' && str[pos].match(ARG_CONTENT)) {
      cache += str[pos];
    } else if (state === 'have-command-argContent' && str[pos].match(' ')) {
      state = 'have-command-argsDone';
      dataStruct.args[cache] = true;
      cacheArgName = cache;
    } else if (state === 'have-command-argsDone' && str[pos].match(' ')) {
      cache = '';
    } else if (state === 'have-command-argsDone' && str[pos].match('-')) {
      state = 'have-command-argStart';
    } else if (state === 'have-command-argsDone' && str[pos].match('"')) {
      state = 'have-command-argValueString';
      cache = '';
    } else if (state === 'have-command-none' && str[pos].match('"') && !cacheArgName) { // ===
      state = 'have-command-argValueString';
      cache = '';
    } else if (state === 'have-command-argValueString' && str[pos].match(ARG_VALUE_STRING)) {
      state = 'have-command-argValueString';
      cache += str[pos];
    } else if (state === 'have-command-argValueString' && str[pos].match(/\\/g)) {
      state = 'have-command-argValueChangeMeanString';
    } else if (state === 'have-command-argValueChangeMeanString') {
      state = 'have-command-argValueString';
      cache += str[pos];
    } else if (state === 'have-command-argValueString' && str[pos].match('"') && cacheArgName) {
      state = 'have-command-argValueEnd';
      dataStruct.args[cacheArgName] = cache;
      cacheArgName = '';
    } else if (state === 'have-command-argValueString' && str[pos].match('"') && !dataStruct.defaultArgs) {
      state = 'have-command-argValueEnd';
      dataStruct.defaultArgs = cache;
    } else if (state === 'have-command-argValueEnd' && str[pos].match(' ')) {
      state = 'have-command-none';
    } else if (state === 'have-command-none' && str[pos].match(ARG_VALUE_FREE) && !cacheArgName && !dataStruct.defaultArgs) {
      state = 'have-command-argValueFree';
      cache = str[pos];
    } else if (state === 'have-command-argsDone' && str[pos].match(ARG_VALUE_FREE) && cacheArgName) {
      state = 'have-command-argValueFree';
      cache = str[pos];
    } else if (state === 'have-command-argValueFree' && str[pos].match(ARG_VALUE_FREE)) {
      cache += str[pos];
    } else if (state === 'have-command-argValueFree' && str[pos].match(' ') && cacheArgName) {
      state = 'have-command-none';
      dataStruct.args[cacheArgName] = formatFree(cache);
      cacheArgName = '';
    } else if (state === 'have-command-argValueFree' && str[pos].match(' ') && !dataStruct.defaultArgs) {
      state = 'have-command-none';
      dataStruct.defaultArgs = formatFree(cache);
      cacheArgName = '';
    } else {
      isErr = assertState(state, mode);
      if (isErr) break;
      if (isDebugger) console.log(`【错误】:${state}`);
    }
    pos += 1;
  }

  // 语法分析结束
  if (!isErr) {
    if (state === 'command') {
      state = 'have-command-none';
      dataStruct.command = cache;
    } else if (state === 'have-command-argValueFree' && cacheArgName) {
      state = 'have-command-none';
      dataStruct.args[cacheArgName] = formatFree(cache);
      cacheArgName = '';
    } else if (state === 'have-command-argValueFree' && !dataStruct.defaultArgs) {
      state = 'have-command-none';
      dataStruct.defaultArgs = formatFree(cache);
      cacheArgName = '';
    } else if (state === 'have-command-argContent') {
      state = 'have-command-none';
      dataStruct.args[cache] = true;
    } else if (state === 'have-command-argsDone') {
      state = 'have-command-none';
    } else if (state === 'have-command-none') {
      state = 'have-command-none';
    } else if (state === 'have-command-argValueEnd') {
      state = 'have-command-none';
    } else {
      assertEndState(state, mode);
      if (isDebugger) console.log(`【意外结尾错误】:${state}`);
    }
  }
  return dataStruct;
}

/**
 * @description: 替换所有转义反斜杠
 * @param {string} str 要替换的字符
 * @return {string} 替换的结果
 */
function replaceBackslash(str:string) {
  return str.replace(/\\/, '\\\\');
}

/**
 * @description: 命令结构数据转换为CommandX语法
 * @param {ParseStruct} data 要转换的结构对象
 * @return {string} 转换后的CommandX语法
 */
export function data2Commandx(data:ParseStruct) {
  let commdx = '';
  if (data.command !== undefined)commdx += data.command;
  if (data.defaultArgs !== undefined)commdx += ` "${replaceBackslash(data.defaultArgs)}"`;
  Object.entries(data.args || {}).map(([key, value]) => {
    if (value === true) commdx += ` -${key}`;
    else if (value !== undefined) commdx += ` -${key} "${replaceBackslash(value)}"`;
    else return false;
    return true;
  });
  return commdx;
}
