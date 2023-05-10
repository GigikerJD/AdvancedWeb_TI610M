import axios from "axios";
import mysql from "mysql2";
import bcrypt from "bcrypt";
import express from "express";


const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345678",
    database: "1up"
}).promise();

export async function login(username, password){
    const[rows, fields] = await conn.query("select * from registereduser where username = ? OR email = ?", [username, username]);
    if(rows.length > 0){
        const user = rows[0];
        if(user.password === password) return "Login successful";
        else return "Wrong password";
    }else return "Account does not exist";
}

export async function signup(username, email, password){
    const sqlquery = await conn.query("insert into registereduser (username, email, password) values(?,?,?)",
    [username, email, bcrypt.hash(password, 10)]); //the password needs to hashed in order to prevent under hacking attacks
    if(sqlquery.success === true) return "New user created";
    else return "Wrong information inserted";
}




