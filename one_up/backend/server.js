import express from "express";
import mysql from "mysql2";
import cors from "cors";
import bcrypt from "bcrypt";


const app = express();
app.use(cors());


//MySQL connection
const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345678",
    database: "1up"
}).promise();

//Retrieve games based on their platform
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

export async function NintendoSwitch(){
    const[rows, fields] = await conn.query("select * from game where platform = ?", ["Nintendo Switch"]);
    return rows;
}

// Define API endpoint for login
app.use(express.json());
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const sql = "SELECT username, password FROM registereduser WHERE username = ? AND password = ?";
  try {
    const [result, fields] = await conn.query(sql, [username, password]);
    if (result.length > 0) {
      res.json({ success: true, message: "Login successful" });
    } else {
      res.status(401).json({ success: false, message: "Incorrect username or password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

//In case, we may need to all some accounts
app.get('/accounts', async (req, res) => {
  try{
    const accounts = await conn.query("select * from registereduser");
    res.json(accounts);
  }catch(error){
    console.error(error);
    res.status(500).json({error : "Internal Backend Service"})
  }
});
  

app.get("/api/ps5", async (req, res) => {
  try{
    const gamesRes = await PS5();
    res.json(gamesRes);
  }catch(error){
    console.error(error);
    res.status(500).json({error: "Internal Server Error"});
  }
})

app.get("/api/ps4", async(req, res) => {
  try{
    const gamesRes = await PS4();
    res.json(gamesRes);
  }catch(error){
    console.error(error);
    res.status(500).json({error: "Internal Server Error"});
  }
})

app.get("/api/xbox1", async(req, res) => {
  try{
    const gamesRes = await XBOX1();
    res.json(gamesRes);
  }catch(error){
    console.error(error);
    res.status(500).json({error: "Internal Server Error"});
  }
})

app.get("/api/xboxs", async(req, res) => {
  try{
    const gamesRes = await XBOXS();
    res.json(gamesRes);
  }catch(error){
    console.error(error);
    res.status(500).json({error: "Internal Server Error"});
  }
})

app.get("/api/nintendo", async(req, res) => {
  try{
    const gamesRes = await NintendoSwitch();
    res.json(gamesRes);
  }catch(error){
    console.error(error);
    res.status(500).json({error: "Internal Server Error"});
  }
})

// Start the server
app.listen(8000, () => {
  console.log('Server started on port 8000');
});