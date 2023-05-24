var path = require('node:path');

var multer = require('multer');
var express = require("express");

var router = express.Router();

var userController = require('../controllers/userController');

const upload = multer({
	storage: multer.diskStorage({
		destination(req, file, callback) {
			callback(null, path.resolve(__dirname, "../../public/", "uploads"));
		},
		filename(req, file, callback) {
			callback(null, `${Date.now()}-${file.originalname}`);
		}
	}), // Armazenamento em disco(na máquina que o software ta rodando)
});

router.post('/register', upload.single('profileImage'), (req, res) => {
    userController.register(req, res);
});

router.post('/authenticate', (req, res) => {
    userController.login(req, res);
});

router.post('/:idUser/createPrediction', (req, res) => {
    userController.createPrediction(req, res);
});

router.get('/:idUser/lastPrediction', (req, res) => {
    userController.getLastPrediction(req, res);
});

router.get('/:idUser/lastPredictions', (req, res) => {
    userController.getLastSixPredictions(req, res);
});

router.get('/:idUser/assertivenessRate', (req, res) => {
    userController.getAssertivenessRate(req, res);
});

module.exports = router;