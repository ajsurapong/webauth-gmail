const mysql = require("mysql");
const config = require("./key").mysql;

const con = mysql.createConnection(config);
//TODO: consider check connection everytime before executing sql
//TODO: consider using mysql pool
//see https://codeforgeek.com/nodejs-mysql-tutorial/

module.exports = {
    checkUser: (email) => {
        //query mysql db for this email at current year
        const year = new Date().getFullYear();
        const sql = "SELECT * FROM user WHERE email=? AND year=?";
        con.query(sql, [email, year], (err, result) => {
            con.end();
            if(err) {
                res.status(500).end();
                return -1;
            }

            if (result.length != 1) {
                //not found
                return -1;                
            }
            else {
                //correct login
                return result[0].role;
            }    
        });
    }
};