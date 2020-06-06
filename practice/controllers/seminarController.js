let Seminar = require('../models/seminar');
let util = require('../modules/util');
let statusCode = require('../modules/statusCode');
let resMessage = require('../modules/responseMessage');

module.exports={
    //회원가입
setcode : async (req, res) => {
    const {
        seminar_date, seminar_time, seminar_code
    } = req.body;
    const leader_idx = req.headers.leader_idx;
    console.log(leader_idx,seminar_date, seminar_time, seminar_code);
    // request data 확인 - 없다면 Bad Request 반환
    if (!seminar_date || !seminar_time || !seminar_code || !leader_idx) {
        res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
        return;
    }
   
    const idx = await Seminar.setcode(leader_idx,seminar_date, seminar_time, seminar_code);
    if (idx === -1) {
        return res.status(statusCode.DB_ERROR)
            .send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
    }
    return res.status(statusCode.OK)
        .send(util.success(statusCode.OK, resMessage.CREATED_USER, {leader_idx: idx}));
}
}