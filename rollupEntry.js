const loadConfigFile = require('rollup/dist/loadConfigFile');
const path = require('path');
const rollup = require('rollup');
const mochaCli = require('mocha/lib/cli/cli').main;


mochaCli('-w');
loadConfigFile(path.resolve(__dirname, './rollup.config.js')).then(async ({options, warnings}) => {
  warnings.flush();
  const watcher = rollup.watch(options);
  watcher.on('event', event => {
    if(event.code ==='START') console.log('构建开始');
    if(event.code ==='END') {
      console.log('构建结束');
    }
  });
});