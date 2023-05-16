import express from "express";
import mysql from "mysql2";
import cors from "cors";
import bcrypt from "bcrypt";


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

//edit profile API
app.get("/users",)


//Messages APIs
// Retrieve all messages
app.get('/messages', (req, res) => {
  const sql = 'SELECT * FROM messages';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Update a message
app.put('/messages/:id', (req, res) => {
  const { message } = req.body;
  const { id } = req.params;
  const sql = 'UPDATE messages SET message = ? WHERE id = ?';
  db.query(sql, [message, id], (err, result) => {
    if (err) throw err;
    console.log('Message updated!');
    res.send(result);
  });
});

// Retrieve all messages between two users
app.get('/messages/:sender/:receiver', (req, res) => {
  const { sender, receiver } = req.params;
  const sql = 'SELECT * FROM messages WHERE (sender = ? AND receiver = ?) OR (sender = ? AND receiver = ?) ORDER BY sent_at';
  db.query(sql, [sender, receiver, receiver, sender], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.get('/conversations/:user', (req, res) => {
  const {user} = req.params;
  db.query(`SELECT DISTINCT user1, user2 FROM conversation WHERE user1='${user}' OR user2='${user}' ORDER BY last_message_sent_at DESC`, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error fetching conversations');
    } else {
      res.json(result);
    }
  });
});

app.get('/conversations/:user1/:user2', (req, res) => {
  const { user1, user2 } = req.params;
  db.query(`SELECT DISTINCT id,user1,user2 FROM conversation WHERE (user1 = '${user1}' and user2 = '${user2}') OR (user1 = '${user2}' and user2 = '${user1}')`, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error fetching conversations');
    } else {
      res.json(result);
    }
  });
});

app.put('/conversations/:id',(req, res) => {
  const {id} = req.params;
  const last_message_sent_at = new Date().toISOString();
  db.query(`UPDATE conversation SET last_message_sent_at = '${last_message_sent_at}' WHERE id = ${id} `, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error fetching conversations');
    } else {
      res.json(result);
    }
  });
});

// Create or update a conversation
app.post('/conversations', (req, res) => {
  const { sender, receiver } = req.body;
  const sent_at = new Date();
  const sql = `INSERT INTO conversation (user1, user2, last_message_sent_at) VALUES (?,?,?)`;
  db.query(sql, [sender, receiver, sent_at], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error creating or updating conversation');
    } else {
      console.log('Conversation created or updated!');
      res.send(result);
    }
  });
});

app.post('/offers', (req, res) => {
  const { sender, receiver,message, price } = req.body;
  const sent_at = new Date();
  const sql = `INSERT INTO messages (sender, receiver, message, sent_at, offer) VALUES (?,?,?,?,?)`;
  db.query(sql, [sender, receiver, message, sent_at, price], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error creating or updating conversation');
    } else {
      console.log('Conversation created or updated!');
      res.send(result);
    }
  })
})



// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// Start the server
app.listen(8000, () => {
  console.log('Server started on port 8000');
});