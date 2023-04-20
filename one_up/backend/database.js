import mysql from "mysql2";
import bcrypt from "bcrypt";


const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: '1up'
}).promise();



//const result = await pool.query("select * from newuser")
//const rows = result[0];
//console.log(rows);

async function signup(email, password, firstname, lastname){
    let hashed = bcrypt.hash(password, 10); //hashing the password to improve security
    const [rows, fields] = await pool.query("select * from newuser where email = ? AND password = ?", [email, hashed]);
    if(rows.length() == 0){
        await pool.query("insert into newuser(username, password, firstname, lastname) values(?, ?, ?, ?)", [email, hashed, firstname, lastname]);
    }else{
        console.log("Error email and password already exists");
    }

}

async function login (email, password){
    const [rows, fields] = await pool.query("select email, password from newuser where email = ? AND password = ?",
    [email, password]);
    return rows;
}

//const exe1 = await pool.query("select * from newuser where country LIKE 'F%' OR 'f%'");
//console.log(exe1);

(async () => {
    const result = await login("nelgie.ferrol94@gmail.com", "password1");
    console.log(result);
})();
