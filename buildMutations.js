const fs = require('fs');
//
// Defining Output and Input Paths
//
const mutations_groups = require('./assets/mutation_groups.json');
const outputPathIdtoNameMap = "./output/mutationsIdtoNameMap.json";
const outputPathIdtoIndexMap = "./output/mutationsIdtoIndexMap.json";
const outputPathGroupIdtoIndexMap = "./output/mutationsGroupIdtoIndexMap.json";
const outputPath = "./output/mutationsList.json";

let index = 0;
// stores primary mutation list for use in search query form
let records = [];
let mut;

let idtoNameMap = {};
let idtoIndexMap = {};
let groupIdtoIndexMap = {};

// 
// Forming mutationsList
//
for(mut of mutations_groups){
    let newEntry = {
        index: '',
        mutationId: '',
        mutationGroupId: '',
        name: '',
        platform: [],
    };
    newEntry.index = index;
    newEntry.mutationId = mut._source.mutationIds[0];
    newEntry.mutationGroupId = mut._source.mutationGroupId;
    newEntry.name = mut._source.name;
    newEntry.platform = mut._source.modifiers;

    records.push(newEntry);

    // index/id maps
    idtoNameMap[newEntry.mutationId] = newEntry.name;
    idtoIndexMap[newEntry.mutationId] = index;
    groupIdtoIndexMap[newEntry.mutationGroupId] = index;



    index++;
}


//
// Writing Output Files
//
fs.writeFile(outputPath, JSON.stringify(records,null, 2), err => {
    if(err) throw err;
    console.log("Done writing " + index + " records to: " + outputPath);
});

// 
// Writing Maps Output Files
//
fs.writeFile(outputPathIdtoNameMap, JSON.stringify(idtoNameMap,null, 2), err => {
    if(err) throw err;
    console.log("Done writing " + index + " records to: " + outputPathIdtoNameMap);
});
fs.writeFile(outputPathIdtoIndexMap, JSON.stringify(idtoIndexMap,null, 2), err => {
    if(err) throw err;
    console.log("Done writing " + index + " records to: " + outputPathIdtoIndexMap);
});
fs.writeFile(outputPathGroupIdtoIndexMap, JSON.stringify(groupIdtoIndexMap,null, 2), err => {
    if(err) throw err;
    console.log("Done writing " + index + " records to: " + outputPathGroupIdtoIndexMap);
});
