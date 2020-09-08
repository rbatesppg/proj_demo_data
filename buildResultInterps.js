const fs = require('fs');
//
// Defining Output and Input Paths
//
const resultInterps = require('./assets/result_interpretations.json');
const animalsList = require('./output/animalsList.json');
// records.json : stores records for each resultInterp w/ mutations
const outputPath = "./output/resultInterpsList.json";

let notMatched = 0;

let records = [];
let resultInterp;
let animal;
//
// creating data entry for each resultInterp in resultInterps.json file
//
for(resultInterp of resultInterps){
    let newEntry = {
        caseId: '',
        mutationIds: {},
        mutationGroupId: '',
        platform: {},
        breed: '',
        date: '',
        genotype: '',
        isPublished: ''
    };
    newEntry.caseId = resultInterp._source.caseId;
    newEntry.mutationIds = resultInterp._source.mutationIds;
    newEntry.mutationGroupId = resultInterp._source.mutationGroupId;
    newEntry.date = resultInterp._source.meta.created;
    newEntry.genotype = resultInterp._source.genotype;
    newEntry.isPublished = resultInterp._source.isPublished;

    // getting breed and platform from animal Index record, by caseId
    let matchAnimal = false;
    for(animal of animalsList){
        if(animal.caseId === newEntry.caseId){
            newEntry.platform = animal.platform;
            newEntry.breed = animal.breed;
            matchAnimal = true;
        }
    }
    if(!matchAnimal){
        console.log(newEntry.caseId + " : not matched with animal record.")
        notMatched++;
    }
    
    
    records.push(newEntry);
}

console.log("*************** " + notMatched + " records not matched with animal*********");

//
// writing records file to output
//
fs.writeFile(outputPath, JSON.stringify(records,null,2), err => {
    if(err) throw err;
    console.log("Done writing " + records.length + " records to: " + outputPath);
});
//*/

