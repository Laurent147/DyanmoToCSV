const config = {
  files:[
    "43nzou7eva357arzzw6r22et5m.json",
    "hiftxavsga6gtlbkzuoazql45m.json",
    "mokvs7cwxm4vvlhliefq473hue.json",
    "uftp4wielm5m7cma75hw6c53yi.json"
  ],
  sourceFolder: "./data",
  extractFolder: "./ETL_export",
  logFileName: "extract_log.txt",
  patterns: [
    ["createdAt", /"createdAt":{"N":"([^"]*)"}/],
    ["updatedAt", /"updatedAt":{"N":"([^"]*)"}/],
    ["status", /"status":{"S":"([^"]*)"}/],
    ["submission", /"submission":{"M":(.*)},"status"/],
    ["country", /"country":{"S":"([^"]*)"}/],
    ["campaignId", /"campaignId":{"S":"([^"]*)"}/],
    ["promotionId", /"promotionId":{"S":"([^"]*)"}/]
  ],
  conditionalToExclude: (data) =>{
    return data[2] !== "NEW"
  }
}

module.exports = config;
