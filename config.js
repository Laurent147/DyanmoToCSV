const config = {
  files:[
    // "test.json"
    "3kawyenxaqymbglwxp5bp6jnnu.json",
    "hojwhs7lhu5fzb2gwejo2as7gu.json",
    "s47ac4tbh4zjfjcsjwg2caumu4.json",
    "vwdnzz63keyz3l6qsidlrm2gbu.json"
  ],
  sourceFolder: "./data",
  extractFolder: "./ETL_export",
  logFileName: "extract_log.txt",
  patterns: [
    ["id", /"id":{"S":"([^"]*)"}/],
    ["name", /"name":{"S":"([^"]*)"}/],
    ["createdBy", /"createdBy":{"S":"([^"]*)"}/],
    ["teams", /"teams":{"L":\[([^\]]*)\]}/],
    ["artist", /"artist":{"M":{(.*)}},/],
    ["featuredArtists", /"featuredArtists":{"L":\[([^\]]*)\]}/],
    ["description", /"description":{"S":"([^"]*)"}/],
    ["published", /"published":{"S":"([^"]*)"}/],
    ["unpublished", /"unpublished":{"BOOL":([^}]*)}/],
    ["templateType", /"templateType":{"S":"([^"]*)"}/],
    ["templateOption", /"templateOption":{"S":"([^"]*)"}/],
    ["clonedFrom", /"clonedFrom":{"S":"([^"]*)"}/],
    ["promotionType", /"promotionType":{"S":"([^"]*)"}/],
    ["widgets", /"widgets":{"L":\[([^\]]*)\]}/],
    ["territory", /"territory":{"S":"(.*)"},"favIconUrl/], // JSON //
    ["createdDate", /"createdDate":{"N":"([^"]*)"}/],
    ["lastUpdated", /"lastUpdated":{"N":"([^"]*)"}/],
    ["lastUpdatedBy", /"lastUpdatedBy":{"S":"([^"]*)"}/],
    ["launchDate", /"launchDate":{"N":"([^"]*)"}/],
    ["endDate", /"endDate":{"N":"([^"]*)"}/],
    ["themeObject", /"themeObject":{"S":"(.*)"},"endDate"/], // JSON //
    ["css", /"css":{"S":"([^"]*)"}/],
    ["router", /"router":{"S":"(.*)"},"widgets"/], // JSON //
    ["path", /"path":{"L":\[([^\]]*)\]}/],
    ["slug", /"slug":{"S":"([^"]*)"}/],
  ],
  // conditionalToExclude: (data) =>{
  //   return data[2] !== "NEW"
  // }
}

module.exports = config;
