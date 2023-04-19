import "../database.js";

async function getPS4games(){
    const[rows, fields] = await pool.query("select from games where platform = PS4");
    return rows;
}