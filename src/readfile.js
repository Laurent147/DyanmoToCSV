const events = require('events');
const fs = require('fs');
const readline = require('readline');

async function processLineByLine(filePath, cb) {
  const start = new Date();
  try {
    const rl = readline.createInterface({
      input: fs.createReadStream(filePath),
      crlfDelay: Infinity
    });

    rl.on('line', (line) => {
      if (cb) cb(line);
    });

    await events.once(rl, 'close');

  } catch (err) {
    console.error(err);
  }
};

module.exports = processLineByLine;
