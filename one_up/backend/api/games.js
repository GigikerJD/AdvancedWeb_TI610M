import axios from "axios";
import mysql from "mysql2";


const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345678",
    database: "1up"
}).promise();


export async function PS5(){
    const[rows, fields] = await conn.query("select * from game where platform = ?", ["PS5"]);
    return rows;
}

export async function PS4(){
    const[rows, fields] = await conn.query("select * from game where platform = ?", ["PS4"]);
    return rows;
}

export async function XBOX1(){
    const[rows, fields] = await conn.query("select * from game where platform = ?", ["XBOX 1"]);
    return rows;
}

export async function XBOXS(){
    const[rows, fields] = await conn.query("select * from game where platform = ?", ["XBOX S"]);
    return rows;
}