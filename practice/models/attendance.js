const pool = require('../modules/pool');
const table = 'attendance';

const attendance = {
    checkin : async(user_idx, attendance_date, attendance_time, attendance_check) => {
        const fields = 'user_idx, attendance_date, attendance_time, attendance_check';
        const questions = `?,?,?,?`;
        const values = [user_idx, attendance_date, attendance_time, attendance_check];
        const query = `INSERT INTO ${table}(${fields}) VALUES (${questions})`;
    
        try {
            const result = await pool.queryParamArr(query, values);
            const insertId = result.insertId;
            return insertId;
        } catch (err) {
            if (err.errno == 1062) {
                console.log('signup error: ', err.errno, err.code);
                return -1;
            }
            console.log('signup error: ', err);
            throw err;
        }
    }
}

module.exports = attendance;