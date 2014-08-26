var selectBranch = require("organic-dna-branches").selectBranch

var findDnaValue = function(dna, query) {
  if(query.charAt(0) == "@")
    query = query.substr(1)
  try {
    return selectBranch(dna, query)
  } catch(e){
    console.log(dna, query)
    throw e
  }
}
var walk = function(dna, rootDNA){
  for(var key in dna) {
    // resolves key: "@namespace.branch"
    if(typeof dna[key] == "string" && dna[key].charAt(0) == "@") {
      dna[key] = findDnaValue(rootDNA, dna[key])
    } else
    // resolves key: [ ... ]
    if(typeof dna[key] == "object" && Array.isArray(dna[key])) {
      for(var i = 0; i<dna[key].length; i++) {
        if(dna[key][i]["@"]) {
          // resolves "@": "namespace.branch"
          dna[key][i] = findDnaValue(rootDNA, dna[key][i]["@"])
        } else
        if(typeof dna[key][i] == "string" && dna[key][i].charAt(0) == "@") {
          // resolves "@namespace.branch"
          dna[key][i] = findDnaValue(rootDNA, dna[key][i])
        } else
        if(typeof dna[key][i] == "object")
          // resolves { ... }
          walk(dna[key][i], rootDNA)
      }
    } else
    // resolves key: { ... }
    if(typeof dna[key] == "object")
      walk(dna[key], rootDNA)
  }
}
module.exports = function(rootDNA){
  walk(rootDNA, rootDNA)
}