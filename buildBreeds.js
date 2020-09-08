const fs = require('fs');
//
// Defining Output and Input Paths
//
const breeds = require('./assets/breeds.json');
// breedsList.json : list of all unique breeds, for search options
//                   also used to correlate breed to platform
const outputPath = "./output/breedsList.json";

let breed;
let records = [];

//
// creating data entry for each breed in breeds.json file
//
for(breed of breeds){
    let newEntry = {
        breedId: '',
        name: '',
        platform: {},
        taxonomy: '',
    };
    newEntry.breedId = breed._source.breedId;
    newEntry.name = breed._source.name;
    newEntry.taxonomy = breed._source.taxonomy;
    
    records.push(newEntry);
}

//
// writing breeds list file
//
fs.writeFile(outputPath, JSON.stringify(records), err => {
    if(err) throw err;
    console.log("Done writing " + records.length + " records to: " + outputPath);
});
//*/