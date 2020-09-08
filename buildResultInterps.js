const fs = require('fs');
//
// Defining Output and Input Paths
//
const resultInterps = require('./assets/result_interpretations.json');
// records.json : stores records for each resultInterp w/ mutations
const outputPath = "./output/resultInterpsList.json";

let records = [];
let resultInterp;
//
// creating data entry for each resultInterp in resultInterps.json file
//
for(resultInterp of resultInterps){
    let newEntry = {
        caseId: '',
        mutationIds: {},
        mutationGroupId: '',
        platform: {},
        date: '',
        genotype: ''
    };
    newEntry.caseId = resultInterp._source.caseId;
    newEntry.mutationIds = resultInterp._source.mutationIds;
    newEntry.mutationGroupId = resultInterp._source.mutationGroupId;
    newEntry.platform = resultInterp._source.modifiers;
    newEntry.date = resultInterp._source.meta.created;
    newEntry.genotype = resultInterp._source.genotype;
    
    records.push(newEntry);
}

//
// writing records file to output
//
fs.writeFile(outputPath, JSON.stringify(records), err => {
    if(err) throw err;
    console.log("Done writing " + records.length + " records to: " + outputPath);
});
//*/

