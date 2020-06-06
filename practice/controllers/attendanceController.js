let Attendance = require('../models/attendance');
let util = require('../modules/util');
let statusCode = require('../modules/statusCode');
let resMessage = require('../modules/responseMessage');

module.exports={
    //출석체크
    checkin : async (req, res) => {
        const {
            attendance_date, attendance_time, attendance_check
        } = req.body;
        const user_idx = req.headers.user_idx;
        // request data 확인 - 없다면 Bad Request 반환
        if (!attendance_date || !attendance_time || !attendance_check || !user_idx) {
            res.status(statusCode.BAD_REQUEST)
                .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
            return;
        }
       
        const idx = await Attendance.checkin(user_idx,attendance_date, attendance_time, attendance_check);
        if (idx === -1) {
            return res.status(statusCode.DB_ERROR)
                .send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
        }
        return res.status(statusCode.OK)
            .send(util.success(statusCode.OK, resMessage.CREATED_USER, {user_idx: idx}));
    }
}