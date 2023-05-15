var express = require("express");
var router = express.Router();

var userController = require('../controllers/userController');

router.post('/register', (req, res) => {
    userController.register(req, res);
});

router.post('/authenticate', (req, res) => {
    userController.login(req, res);
});

module.exports = router;