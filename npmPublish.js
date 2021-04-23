const fs = require('fs');
const bst = require('./dist');

const iostand = new bst.IOStand();
iostand.writeChain().setFont('blue', '', '更新和编译readme.md\n');
const readme = fs.readFileSync('./README.md', { encoding: 'utf-8' });
const newReadme = readme.replace(/\]\(\.\/img/g, '](https://github.com/antilmid/best-shell-tool/blob/master/img');
fs.writeFileSync('./npm_publish/README.md', newReadme);
iostand.writeChain().setFont('blue', '', '准备完成，开始发包\n');
