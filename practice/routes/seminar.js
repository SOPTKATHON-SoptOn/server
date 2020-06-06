var express = require('express');
var router = express.Router();
const seminarControllers = require('../controllers/seminarController.js')

//세미나 코드 설정
router.post('/setcode', seminarControllers.setcode);


module.exports = router;