import "../database.js";

async function getXboxXgames(){
    const[rows, fields] = await pool.query("select from games where platform = XBOX X");
    return rows;
}