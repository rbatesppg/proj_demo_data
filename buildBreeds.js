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
let canineRecords = [];
let felineRecords = [];
let avianRecords = [];

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

    if(newEntry.taxonomy.includes("AVES")){
        newEntry.platform = ["ADX"];
        avianRecords.push(newEntry);
    } else if(newEntry.taxonomy.includes("FELIS")){
        newEntry.platform = ["CS"];
        felineRecords.push(newEntry);
    } else if(newEntry.taxonomy.includes("CANIS")){
        newEntry.platform = ["CHC","PPG"];
        canineRecords.push(newEntry);
    } else {
        console.log(newEntry.name + " : where does this breed belong?");
    }
}
avianRecords.sort((a,b)=> (a.name > b.name) ? 1 : -1);
felineRecords.sort((a,b)=> (a.name > b.name) ? 1 : -1);
canineRecords.sort((a,b)=> (a.name > b.name) ? 1 : -1);
for(let record of canineRecords){
    records.push(record);
}
for(let record of felineRecords){
    records.push(record);
}
for(let record of avianRecords){
    records.push(record);
}

//
// writing breeds list file
//
fs.writeFile(outputPath, JSON.stringify(records,null,2), err => {
    if(err) throw err;
    console.log("Done writing " + records.length + " records to: " + outputPath);
});
//*/