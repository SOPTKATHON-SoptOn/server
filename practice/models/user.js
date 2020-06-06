const pool = require('../modules/pool');
const table = 'user';
const crypto = require('crypto');

//const salt = crypto.randomBytes(32).toString('hex');

const user = {
    signup : async(user_name, user_part, user_birth, user_id, password, user_fn, user_score) => {
        const fields = 'user_name, user_part, user_birth, user_id, password, user_fn,user_score';
        const questions = `?,?,?,?,?,?,default`;
        //const hashed = crypto.pbkdf2Sync(password, salt.toString(), 1, 32, 'sha512').toString('hex');
        const values = [user_name, user_part, user_birth, user_id, password, user_fn,user_score];
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
    },
    checkUser : async (user_id) => {
        const query = `SELECT * FROM ${table} where user_id="${user_id}"`;
        try {
            const result = await pool.queryParamArr(query);

            if (result.length>0){
                return true;
            } else{
                return false;
            }

        } catch (err) {
            console.log('checkUser error: ', err);
            throw err;
        }
    },
    signin : async (user_id, password) => {
        const query = `SELECT * FROM ${table} where user_id="${user_id}"`;
    
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
    getUserById : async (user_id) => {
        const query = `SELECT * FROM ${table} where user_id="${user_id}"`;
        try {
            const result = await pool.queryParamArr(query);
            return result[0];
        } catch (err) {
            console.log('getUserById error: ', err);
            throw err;
        }
    },
    getUserName : async (user_id) => {
        const query = `SELECT user_name FROM ${table} where user_id="${user_id}"`;
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

module.exports = user;