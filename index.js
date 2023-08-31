const readline = require("./src/readfile");
const writeFile = require("./src/writefile");
const ProgressBar = require("progress");
const config = require("./config");
const path = require("path");

const {
  files,
  sourceFolder,
  extractFolder,
  logFileName,
  patterns,
  conditionalToExclude
} = config;

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

const logSummary = (start, counter1, counter2) => {
  const periodMs = new Date() - start;
  
  const time = `${parseInt((periodMs / 1000) /  3600)}:${parseInt((periodMs / 1000) /  60)}:${parseInt((periodMs % 60000)/1000)}-${periodMs - parseInt(periodMs / 1000) * 1000}`
  const used = process.memoryUsage().heapUsed / 1024 / 1024;
  
  console.log("---------- Process completed ----------");
  console.log(`Usesd ~ ${Math.round(used * 100) / 100} MB of memory`);
  console.log(`Took ${time}`);
  console.log(`extracted ${counter2} / ${counter1} after excluding condition`);
  console.log("---------------------------------------");
}

processFiles = async () => {
  const logFile = path.join(__dirname, extractFolder,logFileName);

  for (let filename of files) {
    const start = new Date();
    const dataFile = path.join(__dirname, sourceFolder, filename);
    const extractFile = path.join(__dirname, extractFolder,`${filename}.csv`);

    console.log(`\nProcess started for ${filename}, counting number of items...`);
    let counter = 0;
    await readline(dataFile, (line) => {
      counter += 1;
    });   
    console.log(`...There's ${counter} items in file ${filename}`);
    
    console.log("Starting extraction...");
    const bar = new ProgressBar(":bar", { total: counter });
    const wf = new writeFile({
      extractFile,
      logFile,
      headers: patterns.map(el => el[0])
    });
    
    let counter2 =0;
    await readline(dataFile, async (line) => {
      const data = extractData(line);
      if (conditionalToExclude(data)) return; 
      await wf.writeData(data);
      bar.tick();
      counter2 += 1;
    });

    logSummary(start, counter, counter2);
  }
}

processFiles();
