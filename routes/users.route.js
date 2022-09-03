const { request } = require('express');
const express = require('express');
const usersControllers = require('../controllers/users.controller');

const router = express.Router();

router.route("/random").get(usersControllers.getRandomUser);

module.exports = router;