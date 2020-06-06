var express = require('express');
var router = express.Router();
const userControllers = require('../controllers/userController')
//회원가입
router.post('/signup', userControllers.signup);

//로그인
router.post('/signin', userControllers.signin);

//프로필조회
router.get('/profile/:id', userControllers.profile);

//전체 회원 조회
router.get('/', userControllers.profileAll);

module.exports = router;