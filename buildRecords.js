const fs = require('fs');
//
// Defining Output and Input Paths
//
const animals = require('./assets/animals.json');
const mutations = require('./assets/mutations.json');
// records.json : stores records for each animal w/ mutations
var outputPath = "./output/records.json";
// breedsList.json : list of all unique breeds found, for search options
//                   also used to correlate breed to platform
var outputPathBreeds = "./output/breedsList.json";

var index = 0;
var records = [];
var breeds = [];

//
// currently have column headers in data, as own record
//
var headerRecord = {
    id: 'ID',
    caseId: 'Case ID',
    animalId: 'Animal ID',
    platform: ['Platform'],
    breed: 'Breed',
    date: 'Date',
    mutations: {}
};
for(mut of mutations){
    headerRecord.mutations[mut._source.mutationId] = mut._source.name;
}
records.push(headerRecord);

//
// creating data entry for each animal in animals.json file
//
for(animal of animals){
    var newEntry = {
        id: '',
        caseId: '',
        animalId: '',
        platform: {},
        breed: '',
        date: '',
        mutations: {}
        /*
        mutations: {
            mutId: '',
            date: '',
            genotype: ''
        }
        //*/
    };
    var dateHolder = '';
    newEntry.id = index;
    newEntry.caseId = animal._source.caseId;
    newEntry.animalId = animal._source.animalId;
    newEntry.breed = animal._source.breed;
    newEntry.platform = animal._source.modifiers;
    /*
    if(animal._source.modifiers.includes('CHC')){
        newEntry.platform.push('PPG');
    }
    //*/

    // adding to breeds list
    var newBreed = [ newEntry.breed, newEntry.platform];
    breeds.push(newBreed);

    //
    // Building mutation-genotype pairs
    //
    if(animal._source.caseId !== 'Case ID') {
        try{
            // each animal 'should' have a corresponding result_interps file
            //
            // file convention:    result_interps_C-19-001160.JSON
            //
            var dateIndex = 0;
            const interps = require('./assets/result_interps_' + animal._source.caseId +'.json');
            for(interp of interps){
                //console.log(interp._source.mutationIds + ' ----' + interp._source.mutationGroupId.substring(3));
                var interpId;
                var testMutID= [];
                //if((interp._source.mutationIds !== null) || (interp._source.mutationIds !== undefined)){
                
                testMutID = interp._source.mutationIds;
                
                if(testMutID === undefined){
                    testMutID = [];
                    testMutID.push('');
                } else if(testMutID[0] === undefined) {
                    testMutID[0] = '';
                }
                
                // ensuring all mutations added to list have valid mutID
                if(testMutID[0].substring(0,3) === "DIS"){
                    interpId = testMutID[0];
                } else if(interp._source.mutationGroupId.substring(3,6) === "DIS"){
                    interpId = interp._source.mutationGroupId.substring(3);
                } else {
                    // logging to track down animal/interp issues
                    //console.log(animal._source.caseId + ' --- ' + interp._id);
                }

                newEntry.mutations[interpId] = interp._source.genotype;

                // setting animal data from interp results date created
                if(dateIndex == 0){
                    dateHolder = interp._source.meta.created;
                    dateIndex++;
                }
            }
        } catch(e) {
            if (e.code !== 'MODULE_NOT_FOUND') {
                throw e;
            }
        }
        newEntry.date = dateHolder;
    }
    
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


//
// finding unique values in breeds list
//
var uniqueBreeds = [];
breeds.sort();
for(var i = 0; i < breeds.length; i++) {
    var newBreed;
    if(i == 0){
        newBreed = {breed: breeds[i][0], platform: breeds[i][1] };
        uniqueBreeds.push(newBreed);
    } else if(breeds[i][0] === breeds[i-1][0]){
        // duplicate breed - don't add to list
        //
    } else {
        newBreed = {breed: breeds[i][0], platform: breeds[i][1] };
        uniqueBreeds.push(newBreed);
    }
}

var outputBreedsList = uniqueBreeds;
//
// writing breeds list file
//
fs.writeFile(outputPathBreeds, JSON.stringify(outputBreedsList), err => {
    if(err) throw err;
    console.log("Done writing " + outputBreedsList.length + " records to: " + outputPathBreeds);
});
//*/