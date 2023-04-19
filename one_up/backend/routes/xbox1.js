import "../database.js";


async function getXbox1games(){
    const[rows, fields] = await pool.query("select from games where platform = XBOX1");
    return rows;
}