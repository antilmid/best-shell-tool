const bst = require('./dist');

const iostand = new bst.IOStand();
// iostand.start();
// iostand.useRaw();
(async () => {
  const a = await iostand.awaitInput();
  console.log(a);
})();
