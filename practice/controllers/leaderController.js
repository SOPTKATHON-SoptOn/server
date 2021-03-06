let Leader = require('../models/leader');
let util = require('../modules/util');
let statusCode = require('../modules/statusCode');
let resMessage = require('../modules/responseMessage');
const crypto = require('crypto');

module.exports={
//로그인
signin : async (req, res) => {
    // request body 에서 데이터 가져오기
    const {
        leader_id,
        password
    } = req.body;
    // request data 확인 - 없다면 Null Value 반환
    if (!leader_id || !password) {
        res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
        return;
    }

    const idx1 = await Leader.checkUser(leader_id);
    // // 존재하는 아이디인지 확인 - 없다면 No user 반환
    if (idx1===false) {
        res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_USER));
        return;
    }

    const idx = await Leader.signin(leader_id, password);
    if (idx === false) {
        //비밀번호 틀리면
        res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, resMessage.MISS_MATCH_PW));
            return;
    }
    const leader = await Leader.getUserById(leader_id);
    // 로그인이 성공적으로 마쳤다면 - LOGIN_SUCCESS 전달
    return res.status(statusCode.OK)
        .send(util.success(statusCode.OK, resMessage.LOGIN_SUCCESS, {leader_idx: leader.leader_idx}));
},

//프로필조회
profile: async (req, res) => {
    // request params 에서 데이터 가져오기
    const leader_id = req.params.leader_id;
    const idx1 = await User.checkUser(leader_id);
    // 존재하는 아이디인지 확인 - 없다면 No user 반환
    if (idx1===false) {
        res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_USER));
        return;
    }
    // 성공 - login success와 함께 user Id 반환
    const idx = await Leader.getUserById(leader_id);
    return res.status(statusCode.OK)
        .send(util.success(statusCode.OK, resMessage.READ_PROFILE_SUCCESS, {leader_id:idx.leader_id, leader_name:idx.leader_name}));
},

//전체 회원 조회
profileAll: async(req, res)=>{
    const idx = await Leader.getUserAll();
    return res.status(statusCode.OK)
    .send(util.success(statusCode.OK, resMessage.READ_USER_SUCCESS, idx));
}
}