var express = require('express');
var router = express.Router();
const attendanceControllers = require('../controllers/attendanceController')

//출석체크
router.post('/checkin', attendanceControllers.checkin);


module.exports = router;