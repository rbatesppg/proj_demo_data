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
        animalId: '',
        callName: '',
        mutationIds: [],
        mutationGroupId: '',
        platform: {},
        breed: '',
        sex: '',
        date: '',
        genotype: '',
        isPublished: ''
    };
    if(resultInterp._source.caseId !== undefined){
        newEntry.caseId = resultInterp._source.caseId;
    }
    if(resultInterp._source.mutationIds !== undefined){
        newEntry.mutationIds = resultInterp._source.mutationIds;
    }
    if(resultInterp._source.mutationGroupId !== undefined){
        newEntry.mutationGroupId = resultInterp._source.mutationGroupId;
    }
    if(resultInterp._source.meta.created !== undefined){
        newEntry.date = resultInterp._source.meta.created;
    }
    if(resultInterp._source.genotype !== undefined){
        newEntry.genotype = resultInterp._source.genotype;
    }
    if(resultInterp._source.isPublished !== undefined){
        newEntry.isPublished = resultInterp._source.isPublished;
    }

    // getting breed and platform from animal Index record, by caseId
    let matchAnimal = false;
    for(animal of animalsList){
        if(animal.caseId === newEntry.caseId){
            if(animal.platform !== undefined){
                newEntry.platform = animal.platform;
            }
            if(animal.breed !== undefined){
                newEntry.breed = animal.breed;
            }
            if(animal.animalId !== undefined){
                newEntry.animalId = animal.animalId;
            }
            if(animal.callName !== undefined){
                newEntry.callName = animal.callName;
            }
            if(animal.sex !== undefined){
                newEntry.sex = animal.sex;
            }
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

