import axios from "axios";
import mysql from "mysql2";

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345678",
    database: "1up"
}).promise();

export async function login(username, password){
    const[rows, fields] = await conn.query("select * from registereduser where username = ? OR email = ?", [username, username]);
    if(rows.length > 0){
        if(password == "") console.log("Wrong password");
        else console.log("Login successful");
    }
    else console.error("Account does not exist");
}
