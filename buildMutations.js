const fs = require('fs');
//
// Defining Output and Input Paths
//
const mutations = require('./assets/mutations.json');
const mutations_groups = require('./assets/mutation_groups.json');
var outputPath = "./output/mutationsList.json";
var outputPathIds = "./output/mutationsIds.json";
var outputPathGroups = "./output/mutationsGroups.json";

var index = 0;
// stores primary mutation list for use in search query form
var records = [];
// correlates mutationId (DIS-###..) with designated integer indexes (0-n)
var recordsIds = {};
// correlates mutationId (DIS-###..) with platform type (CHC, CS, ADX, PPG)
var recordsGroups = {};
var recordsGroupsNames = {};
var mut;

//
// creating list recordsGroups to correlate mutId and platform type
//
for(mut of mutations_groups){
    recordsGroups[mut._id.substring(3)] = mut._source.modifiers;
    recordsGroupsNames[mut._source.name] = mut._source.modifiers;
}


// 
// Forming mutationsList
//
for(mut of mutations){
    var newEntry = {
        id: '',
        mutationId: '',
        name: '',
        platform: []
    };
    //
    // setting values based on mutations.json results
    //
    newEntry.id = index;
    newEntry.mutationId = mut._id;
    newEntry.name = mut._source.name;
    // handling Platform 
    if(recordsGroups[mut._id] != undefined){
        newEntry.platform = recordsGroups[mut._id];
    } else if(recordsGroupsNames[mut._source.name] != undefined){
        newEntry.platform = recordsGroupsNames[mut._source.name];
    } else if (mut._source.name.includes("(Cat)")){
        newEntry.platform = ['CS'];
    } else {
        newEntry.platform = ['All'];
    }

    // populating the mutationId <> index # map
    recordsIds[mut._id] = index;

    records.push(newEntry);
    index++;
}


//
// Writing Output Files
//
fs.writeFile(outputPath, JSON.stringify(records), err => {
    if(err) throw err;
    console.log("Done writing " + index + " records to: " + outputPath);
});

//
// Writing    mutId <> Index   Output Files
//
fs.writeFile(outputPathIds, JSON.stringify(recordsIds), err => {
    if(err) throw err;
    console.log("Done writing " + index + " records to: " + outputPathIds);
});

//
// Writing    mutId <> Platform   Output Files
//
fs.writeFile(outputPathGroups, JSON.stringify(recordsGroups), err => {
    if(err) throw err;
    console.log("Done writing " + index + " records to: " + outputPathGroups);
});

