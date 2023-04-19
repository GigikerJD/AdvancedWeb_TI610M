import "../database.js";

async function getPS5games(){
    const[rows, fields] = await pool.query("select from games where platform = PS5");
    return rows;
}
