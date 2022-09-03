const { request } = require('express');
const express = require('express');
const usersControllers = require('../controllers/users.controller');

const router = express.Router();

router.route("/random").get(usersControllers.getRandomUser);
router.route("/all").get(usersControllers.getAllUsers);
router.route("/save").post(usersControllers.saveUserInfo);
router.route("/update/:id").patch(usersControllers.updateSingleUserInfo);

module.exports = router;