const fs = require('fs');
//
// Defining Output and Input Paths
//
const animals = require('./assets/animals.json');
const mutations = require('./assets/mutations.json');
// records.json : stores records for each animal w/ mutations
var outputPath = "./output/records.json";

var records = [];
//
// creating data entry for each animal in animals.json file
//
for(animal of animals){
    var newEntry = {
        caseId: '',
        platform: {},
        date: '',
        genotype: ''
    };
    var dateHolder = '';
    newEntry.caseId = animal._source.caseId;
    newEntry.platform = animal._source.modifiers;
    newEntry.date = interp._source.meta.created;
    
    records.push(newEntry);
    index++;
}

//
// writing records file to output
//
fs.writeFile(outputPath, JSON.stringify(records), err => {
    if(err) throw err;
    console.log("Done writing " + records.length + " records to: " + outputPath);
});
//*/

