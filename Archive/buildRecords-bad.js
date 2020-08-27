const fs = require('fs');

const animals = require('./assets/animals.json');
var outputPath = "records.json";

var index = 0;
var records = [];


for(animal of animals){
    var newEntry = {
        id: '',
        mutationId: '',
        name: ''
    };
    newEntry.id = index;
    newEntry.mutationId = animal._source.mutationId;
    newEntry.name = animal._source.name;    

    records.push(newEntry);
    //records[index] = newEntry;
    //console.log(newEntry);
    //console.log(records);
    console.log(newEntry.name);
    index++;
}

//*
//console.log(records);

fs.writeFile(outputPath, JSON.stringify(records), err => {
    if(err) throw err;
    console.log("Done writing " + index + " records to: " + outputPath);
});
//*/
