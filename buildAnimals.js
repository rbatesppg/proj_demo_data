const fs = require('fs');
//
// Defining Output and Input Paths
//
const animals = require('./assets/animals.json');
const mutations = require('./assets/mutations.json');
// records.json : stores records for each animal w/ mutations
var outputPath = "./output/animals.json";

var index = 0;
var records = [];

//
// creating data entry for each animal in animals.json file
//
for(animal of animals){
    var newEntry = {
        caseId: '',
        animalId: '',
        platform: [],
        breed: '',
    };
    var dateHolder = '';
    newEntry.id = index;
    newEntry.caseId = animal._source.caseId;
    newEntry.animalId = animal._source.animalId;
    newEntry.breed = animal._source.breed;
    newEntry.platform = animal._source.modifiers;
    
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

