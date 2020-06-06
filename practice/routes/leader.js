var express = require('express');
var router = express.Router();
const leaderControllers = require('../controllers/leaderController')

//로그인
router.post('/signin', leaderControllers.signin);

//프로필조회
router.get('/profile/:id', leaderControllers.profile);

//전체 회원 조회
router.get('/', leaderControllers.profileAll);

module.exports = router;