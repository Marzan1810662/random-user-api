const fs = require('fs');

//get a random user from thr json file
module.exports.getRandomUser = (req, res, next) => {
    fs.readFile('userData.json', 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
            res.send("Something went wrong, Try again later!");
            res.end();
        }
        else {
            const users = JSON.parse(data);
            const random = Math.floor(Math.random() * users.length);
            res.send(users[random]);
            res.end();
        }
    });

}