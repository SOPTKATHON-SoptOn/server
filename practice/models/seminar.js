const pool = require('../modules/pool');
const table = 'seminar';

const seminar = {
    setcode : async(leader_idx, seminar_date, seminar_time, seminar_code) => {
        const fields = 'leader_idx, seminar_date, seminar_time, seminar_code';
        const questions = `?,?,?,?`;
        const values = [leader_idx, seminar_date, seminar_time, seminar_code];
        const query = `INSERT INTO ${table}(${fields}) VALUES (${questions})`;
        console.log(query);
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
    },
    signin : async (leader_id, password) => {
        const query = `SELECT * FROM ${table} where leader_id="${leader_id}"`;
    
        try {
            const result = await pool.queryParamArr(query);
            //const hashed = crypto.pbkdf2Sync(password, result[0].salt.toString(), 1, 32, 'sha512').toString('hex');

            //console.log(hashed); //확인용
            console.log(result[0].password); //확인용

            if (result[0].password === password){
                return true;
            } else{
                return false;
            }

        } catch (err) {
            console.log('signin error: ', err);
            throw err;
        }
    },
    getUserById : async (leader_id) => {
        const query = `SELECT * FROM ${table} where leader_id="${leader_id}"`;
        try {
            const result = await pool.queryParamArr(query);
            return result[0];
        } catch (err) {
            console.log('getUserById error: ', err);
            throw err;
        }
    },
    getUserName : async (leader_id) => {
        const query = `SELECT leader_name FROM ${table} where leader_id="${leader_id}"`;
        try {
            const result = await pool.queryParamArr(query);
            return result[0];
        } catch (err) {
            console.log('getUserName error: ', err);
            throw err;
        }
    },
    getUserAll : async () => {
        const query = `SELECT * FROM ${table}`;
        try {
            const result = await pool.queryParamArr(query);
            return result;
        } catch (err) {
            console.log('getUserAll error: ', err);
            throw err;
        }
    },
}

module.exports = seminar;