const fs = require('fs').promises;

fs.writeFile('message.txt', "Ce faci coiule")
    .then(function () {
        console.log("write file");
    })