const path = require('path');
const fs = require('fs');
let firstTime = true;

class Writefile {
  constructor(params) {
    const { extractFile, logFile, headers } = params; 
    this.writer = fs.createWriteStream(extractFile, { flags: 'a' });
    this.logs = fs.createWriteStream(logFile, { flags: 'a' });

    const headerText = headers.reduce((acc, cur) => `${acc},"${cur}"`, '').substring(1);

    this.writer.write(`${headerText}`);
    this.logs.write(`Process start running at ${new Date()}\n`);

    this.counter = 0;
  }
  counter;
  writer;
  logs;

  writeData = async (data) =>{
    try {
      let record = '';
      let val = '';

      val = data[0];
      if (val?.indexOf('"') > -1) { val = val.replace(/"/g,'') };
      record = `\n"${val}"`;

      for(let i = 1; i < data.length; i = i + 1) {  
        val = data[i];

        if (val?.indexOf('"') > -1) { val = val.replace(/"/g,'') };
        record += `,"${val}"`
      }
      
      await this.writer.write(record);
    } catch (err) {
      await this.logs.write(`${err?.message}\n`);
    }
  }
} 

module.exports = Writefile;
