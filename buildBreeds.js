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
    };
    var dateHolder = '';
    newEntry.id = index;
    newEntry.caseId = animal._source.caseId;
    newEntry.animalId = animal._source.animalId;
    newEntry.breed = animal._source.breed;
    
    // adding to breeds list
    var newBreed = [ newEntry.breed, newEntry.platform];
    breeds.push(newBreed);


    
    records.push(newEntry);
    index++;
}

//
// writing breeds list file
//
fs.writeFile(outputPathBreeds, JSON.stringify(outputBreedsList), err => {
    if(err) throw err;
    console.log("Done writing " + outputBreedsList.length + " records to: " + outputPathBreeds);
});
//*/