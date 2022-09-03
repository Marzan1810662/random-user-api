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
        if (err) {
            console.log(err);
            res.send("Something went wrong, Try again later!");
            res.end();
        }
        else {
            if (limit) {
                res.send(JSON.parse(data).slice(0, limit))
            }
            else {
                res.send(JSON.parse(data));
                res.end();
            }
        }
    });

}

//save a user info in the json file
module.exports.saveUserInfo = (req, res, next) => {
    let allUsers;
    const newUser = req.body;
    const { picture, name, gender, phone, address } = newUser;

    if (picture && name && gender && phone && address) {
        fs.readFile('userdata.json', 'utf-8', (err, data) => {
            if (err) {
                console.log(err);
                res.send("Something went wrong, Try again later!");
                res.end();
            }
            else {
                allUsers = JSON.parse(data);
                newUser._id = allUsers.length + 1
                allUsers.push(newUser);

                fs.writeFile('userData.json', JSON.stringify(allUsers, null, 2), (err) => {
                    if (err) {
                        console.log(err);
                        res.send("Something went wrong, Try again later!");
                        res.end();
                    }
                    else {
                        res.send("user info saved");
                        res.end();
                    }
                });
            }

        });
    }
    else {
        res.send('Please provide all the properties.');
        res.end();
    }
}

// update a user information with id in the json file

module.exports.updateSingleUserInfo = (req, res, next) => {
    const { id } = req.params;
    const info = req.body;
    fs.readFile("userData.json", (err, data) => {
        if (err) {
            console.log(err);
            res.send("Something went wrong. Try again later");
            res.end();
        }
        else {
            const updatedUser = JSON.parse(data).find(user => user._id === Number(id))
            if (updatedUser) {
                for (const i in info) {
                    for (const j in updatedUser) {
                        if (i.toLowerCase() == j.toLowerCase()) {
                            updatedUser[j] = info[i]
                        }
                    }
                }
                console.log(updatedUser);
                const allUser = JSON.parse(data);
                allUser[Number(id) - 1] = updatedUser;
                // console.log(allUser)
                fs.writeFile("userData.json", JSON.stringify(allUser, null, 2), (err) => {
                    if (err) {
                        console.log(err);
                        res.send("Something went wrong. Try again later");
                        res.end();
                    }
                    else {
                        {
                            res.send(`update user with id ${id}`);
                            res.end();
                        }
                    }
                })
            }
            else {
                res.send(`No user found with id ${id}`);
                res.end();
            }
        }
    })

}