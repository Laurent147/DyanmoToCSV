# Dynamo export to CSV converter

> note the below folder are the default folder used in the config file but can be changed to whatever you want as long as it's aligned with the config file.

1. Create a folder `data/` in the root and add dynamoDB exported JSON files.
2. Create a folder `ETL_export/` 
3. Update the config file

```javascript
const config = {
  files:[
    "test.json"
  ],
  sourceFolder: "./data",
  extractFolder: "./ETL_export",
  logFileName: "extract_log.txt",
  patterns: [
    ["id", /"id":{"S":"([^"]*)"}/],
    ["teams", /"teams":{"L":\[([^\]]*)\]}/],
    ["artist", /"artist":{"M":{(.*)}},/],
    ["createdDate", /"createdDate":{"N":"([^"]*)"}/],
    ["themeObject", /"themeObject":{"S":"(.*)"},"endDate"/], // JSON //
  ],
  conditionalToExclude: (data) =>{
    // Data is an array of extracted pattern in the order they were defined above
    //This field is optional
    return data[2] !== "NEW"
  }
}
```