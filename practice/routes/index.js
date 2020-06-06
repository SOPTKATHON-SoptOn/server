var express = require('express');
var router = express.Router();

router.use('/user', require('./user'));
router.use('/leader', require('./leader'));
router.use('/seminar', require('./seminar'));
// router.use('/post', require('./post'));
module.exports = router;