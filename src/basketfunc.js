// basketfunc.js
const file = require('fs');

file.readFile('../tests/0021600681_gamedetail.json','utf8', function(err, data){
    if (err){
        throw err;
    }
    else{
        const obj = JSON.parse(data);
        //console.log(obj);
        console.log(obj);
        formatOutput(obj);
    }
});

function formatOutput(JSONObj){
    let result = [];
    result.push("Game ID: " + JSONObj.g.nextgid + " " + JSONObj.g.gdte);
    result.push("\n=====");
    console.log(result.toString());
}