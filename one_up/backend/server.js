import express from "express";
import bcrypt from "bcrypt";
import { login } from "./api/users";



const app = express();
const port = process.env.PORT || 5000;

const games = require("./api/games");

app.use(express.json());

// Define API endpoint for login
app.get('/login', async (req, res) => {
    const { username, password } = req.body;
    const response = await login(username, password);
    res.json({ success: true, message: response });
  });
  

app.get("/api/ps5", async(req, res) => {
  try{
    const gamesRes = await games.PS5();
    res.json(games);
  }catch(error){
    console.error(error);
    res.status(500).json({error: "Internal Server Error"});
  }
})

app.get("/api/ps4", async(req, res) => {
  try{
    const gamesRes = await games.PS4();
    res.json(games);
  }catch(error){
    console.error(error);
    res.status(500).json({error: "Internal Server Error"});
  }
})

app.get("/api/xbox1", async(req, res) => {
  try{
    const gamesRes = await games.XBOX1();
    res.json(games);
  }catch(error){
    console.error(error);
    res.status(500).json({error: "Internal Server Error"});
  }
})

app.get("/api/xboxs", async(req, res) => {
  try{
    const gamesRes = await games.XBOXS();
    res.json(games);
  }catch(error){
    console.error(error);
    res.status(500).json({error: "Internal Server Error"});
  }
})

app.get("/api/nintendo", async(req, res) => {
  try{
    const gamesRes = await games.NintendoSwitch();
    res.json(games);
  }catch(error){
    console.error(error);
    res.status(500).json({error: "Internal Server Error"});
  }
})

// Start the server
app.listen(5173, () => {
  console.log('Server started on port 5173');
});