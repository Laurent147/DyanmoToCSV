const readline = require('./readfile');
const writeFile = require('./writefile');
const ProgressBar = require('progress');

const extractFolder = './ETL_export/';
const logFile = `${extractFolder}extract_log.txt`;

const files = [
  // 'test.json'
  '43nzou7eva357arzzw6r22et5m.json',
  // 'hiftxavsga6gtlbkzuoazql45m.json',
  // 'mokvs7cwxm4vvlhliefq473hue.json',
  // 'uftp4wielm5m7cma75hw6c53yi.json'
]

const patterns = [
  ["createdAt", /"createdAt":{"N":"([^"]*)"}/],
  ["updatedAt", /"updatedAt":{"N":"([^"]*)"}/],
  ["status", /"status":{"S":"([^"]*)"}/],
  ["submission", /"submission":{"M":(.*)},"status"/],
  ["country", /"country":{"S":"([^"]*)"}/],
  ["campaignId", /"campaignId":{"S":"([^"]*)"}/],
  ["promotionId", /"promotionId":{"S":"([^"]*)"}/]
]

const extractData = (line) => {
  const record = [];
  for (let [key, pattern] of patterns) { 
    const res = line.match(pattern);
    let val = null;
    if (res && res.length >= 2) val = res[1];

    record.push(val);
  }
  return record;
}

const logSummary = (start) => {
  const periodMs = new Date() - start;
  
  const time = `${parseInt((periodMs / 1000) /  3600)}:${parseInt((periodMs / 1000) /  60)}:${parseInt((periodMs % 60000)/1000)}-${periodMs - parseInt(periodMs / 1000) * 1000}`
  const used = process.memoryUsage().heapUsed / 1024 / 1024;
  
  console.log('---------- Process completed ----------');
  console.log(`Usesd approximately ${Math.round(used * 100) / 100} MB of memory`);
  console.log(`Took: ${time}`);
  console.log('---------------------------------------');
}

processFiles = async () => {
  for (let filename of files) {
    const start = new Date();
    
    let counter = 0;
    await readline(`./data/${filename}`, (line) => {
      counter += 1;
    });

    const bar = new ProgressBar(':bar', { total: counter });

    const wf = new writeFile({
      extractFile: `${extractFolder}${filename}.csv`,
      logFile,
      headers: patterns.map(el => el[0])
    });

    await readline(`./data/${filename}`, async (line) => {
      const data = extractData(line);
      if (data[2] === 'NEW') await wf.writeData(data);
      bar.tick();
    });

    logSummary(start);
  }
}

processFiles();
