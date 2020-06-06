var express = require('express');
var router = express.Router();
const seminarControllers = require('../controllers/seminarController.js')

//세미나 코드 설정
router.post('/setcode', seminarControllers.setcode);

//프로필조회
router.get('/profile/:id', seminarControllers.profile);

//전체 회원 조회
router.get('/', seminarControllers.profileAll);

module.exports = router;