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

//get all users from the json file
module.exports.getAllUsers = (req, res, next) => {
    const { limit } = req.query;
    console.log(limit);
    fs.readFile('userdata.json', 'utf-8', (err, data) => {
        if(limit) {
            res.send(JSON.parse(data).slice(0,limit))
        }
        else {
            res.send(JSON.parse(data));
            res.end();
        }
    });

}