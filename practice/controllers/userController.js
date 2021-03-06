let User = require('../models/user');
let util = require('../modules/util');
let statusCode = require('../modules/statusCode');
let resMessage = require('../modules/responseMessage');
const crypto = require('crypto');

module.exports={
    //회원가입
signup : async (req, res) => {
    const {
        user_name, user_part, user_id, password, user_fn,user_score, user_birth
    } = req.body;
    // request data 확인 - 없다면 Bad Request 반환
    if (!user_name || !user_part || !user_id || !password || !user_fn || !user_birth) {
        res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
        return;
    }
    //already ID
    const idx1 = await User.checkUser(user_id);
    if (idx1===true) {
        res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, resMessage.ALREADY_ID));
        return;
    }

    //const salt = crypto.randomBytes(32).toString('hex');
   
    const idx = await User.signup(user_name, user_part, user_birth, user_id, password, user_fn, user_score);
    if (idx === -1) {
        return res.status(statusCode.DB_ERROR)
            .send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
    }
    return res.status(statusCode.OK)
        .send(util.success(statusCode.OK, resMessage.CREATED_USER, {userId: idx}));
},

//로그인
signin : async (req, res) => {
    // request body 에서 데이터 가져오기
    const {
        user_id,
        password
    } = req.body;
    // request data 확인 - 없다면 Null Value 반환
    if (!user_id || !password) {
        res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
        return;
    }

    const idx1 = await User.checkUser(user_id);
    // // 존재하는 아이디인지 확인 - 없다면 No user 반환
    if (idx1===false) {
        res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_USER));
        return;
    }

    const idx = await User.signin(user_id, password);
    if (idx === false) {
        //비밀번호 틀리면
        res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, resMessage.MISS_MATCH_PW));
            return;
    }
    const user = await User.getUserById(user_id);
    // 로그인이 성공적으로 마쳤다면 - LOGIN_SUCCESS 전달
    return res.status(statusCode.OK)
        .send(util.success(statusCode.OK, resMessage.LOGIN_SUCCESS, {user_idx: user.user_idx}));
},

//프로필조회
profile: async (req, res) => {
    // request params 에서 데이터 가져오기
    const user_id = req.params.user_id;
    const idx1 = await User.checkUser(user_id);
    // 존재하는 아이디인지 확인 - 없다면 No user 반환
    if (idx1===false) {
        res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_USER));
        return;
    }
    // 성공 - login success와 함께 user Id 반환
    const idx = await User.getUserById(user_id);
    return res.status(statusCode.OK)
        .send(util.success(statusCode.OK, resMessage.READ_PROFILE_SUCCESS, {user_id:idx.user_id, user_name:idx.user_name, user_score:idx.user_score}));
},

//전체 회원 조회
profileAll: async(req, res)=>{
    const idx = await User.getUserAll();
    return res.status(statusCode.OK)
    .send(util.success(statusCode.OK, resMessage.READ_USER_SUCCESS, idx));
}
}