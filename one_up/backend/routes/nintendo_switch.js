import "../database.js";


async function getNintendoSwitchgames(){
    const[rows, fields] = await pool.query("select from games where platform = Nintendo");
    return rows;
}