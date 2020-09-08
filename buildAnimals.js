const fs = require('fs');
//
// Defining Output and Input Paths
//
const animals = require('./assets/animals.json');
// animals.json : stores records for each animal
const outputPath = "./output/animalsList.json";

let records = [];
let animal;

//
// creating data entry for each animal in animals.json file
//
for(animal of animals){
    let newEntry = {
        caseId: '',
        animalId: '',
        platform: [],
        breed: '',
        callName: '',
        sex: '',
    };
    newEntry.caseId = animal._source.caseId;
    newEntry.animalId = animal._source.animalId;
    newEntry.platform = animal._source.modifiers;
    newEntry.breed = animal._source.breed;
    newEntry.callName = animal._source.callName;
    newEntry.sex = animal._source.sex;
    
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

