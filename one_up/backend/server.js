import express from "express";
import mysql from "mysql2";
import cors from "cors";
import bcrypt from "bcrypt";
import bodyParser from "body-parser";


const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


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
      res.json({ success: false, message: "Incorrect username or password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

//In case, we may need to all some accounts
app.get('/accounts', async (req, res) => {
  try{
    const [accounts, fields] = await conn.query("select * from registereduser");
    res.json(accounts);
  }catch(error){
    console.error(error);
    res.status(500).json({error : "Internal Backend Service"})
  }
});
  
app.put('/accounts', async (req, res) => {
  const {Mail, city,Postcode,password} = req.body;
  console.log(Mail)
  const sql = 'UPDATE registereduser SET email = ?,city = ?,postcode = ?,password = ? Where username="user1"';
  conn.query(sql, [Mail,city,Postcode,password], (err, result) => {
    if (err) throw err;
    console.log('Message updated!');
    res.send(result);
  });
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

//edit profile API



//Messages APIs


// Retrieve all messages
app.get('/messages', async (req, res) => {
  const sql = 'SELECT * FROM messages';
  try{
    const [accounts, fields] = await conn.query(sql); 
    res.json(accounts);
  }catch(error){
    console.error(error);
    res.status(500).json({error : "Internal Backend Service"})
  }
});

// Update a message
app.put('/messages/:id', async (req, res) => {
  const { message } = req.body;
  const { id } = req.params;
  const sql = 'UPDATE messages SET message = ? WHERE id = ?';
  try{
    const [accounts, fields] = await conn.query(sql, [message, id]);
    res.json(accounts);
  }catch(error){
    console.error(error);
    res.status(500).json({error : "Internal Backend Service"})
  }
});

// Retrieve all messages between two users
app.get('/messages/:sender/:receiver', async (req, res) => {
  const { sender, receiver } = req.params;
  const sql = 'SELECT * FROM messages WHERE (sender = ? AND receiver = ?) OR (sender = ? AND receiver = ?) ORDER BY sent_at';
  try{
    const [accounts, fields] = await conn.query(sql, [sender, receiver, receiver, sender]);
    res.json(accounts);
  }catch(error){
    console.error(error);
    res.status(500).json({error : "Internal Backend Service"})
  }
});

/*
app.get('/conversation/:user', async (req, res) => {
  const { user } = req.params;
  const sql = `SELECT DISTINCT user1, user2 FROM conversation WHERE user1='${user}' OR user2='${user}' ORDER BY last_message_sent_at DESC`;
  try {
    const [result, fields] = await conn.query(sql);
    res.send(result);
  } catch (err) {
    console.error(error);
    res.status(500).send('Error fetching conversations');
  }
});*/

app.get('/conversation/:user', async (req, res) => {
  const { user } = req.params;
  try{
    const [accounts, fields] = await conn.query(`SELECT * FROM conversation WHERE user1='${user}' OR user2='${user}'`);
    res.json(accounts);
  }catch(error){
    console.error(error);
    res.status(500).json({error : "Internal Backend Service"})
  }
});

app.get('/conversation/:user1/:user2', async (req, res) => {
  const { user1, user2 } = req.params;
  try{
    const [accounts, fields] = await conn.query(`SELECT DISTINCT id,user1,user2 FROM conversation WHERE (user1 = '${user1}' and user2 = '${user2}') OR (user1 = '${user2}' and user2 = '${user1}')`);
      res.json(accounts);
    }catch(error){
      console.error(error);
      res.status(500).json({error : "Internal Backend Service"})
    }
  });


app.put('/conversation/:id', async (req, res) => {
  const {id} = req.params;
  const last_message_sent_at = new Date().toISOString();
  try{
    const [accounts, fields] = await conn.query(`UPDATE conversation SET last_message_sent_at = '${last_message_sent_at}' WHERE id = ${id} `);
    res.json(accounts);
  }catch(error){
    console.error(error);
    res.status(500).json({error : "Internal Backend Service"})
  }
});

// Create a conversation
app.post('/conversation', async (req, res) => {
  const { sender, receiver } = req.body;
  const sent_at = new Date();
  const sql = `INSERT INTO conversation (user1, user2, last_message_sent_at) VALUES (?,?,?)`;
  try{
    const [accounts, fields] = await conn.query(sql, [sender, receiver, sent_at]);
    res.json(accounts);
  }catch(error){
    console.error(error);
    res.status(500).json({error : "Internal Backend Service"})
  }
});

app.post('/messages', async (req, res) => {
  const { sender, receiver, message, offer} = req.body;
  const sent_at = new Date();
  const sql = `INSERT INTO messages (sender, receiver, message, sent_at, offer) VALUES (?, ?, ?, ?, ?)`;
  try{
    const [accounts, fields] = await conn.query(sql, [sender, receiver, message, sent_at, offer]);
    res.json(accounts);
  }catch(error){
    console.error(error);
    res.status(500).json({error : "Internal Backend Service"})
  }
});

app.post('/offers', async (req, res) => {
  const { sender, receiver,message, price } = req.body;
  const sent_at = new Date();
  const sql = `INSERT INTO messages (sender, receiver, message, sent_at, offer) VALUES (?,?,?,?,?)`;
  try{
    const [accounts, fields] = await conn.query(sql, [sender, receiver, message, sent_at, price]);
    res.json(accounts);
  }catch(error){
    console.error(error);
    res.status(500).json({error : "Internal Backend Service"})
  }
});


// Start the server
app.listen(8000, () => {
  console.log('Server started on port 8000');
});