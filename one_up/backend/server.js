import express from "express";
import bcrypt from "bcrypt";
import { login } from "./api/users";


const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

// Define API endpoint for login
app.get('/login', async (req, res) => {
    const { username, password } = req.body;
    const response = await login(username, password);
    res.json({ success: true, message: response });
  });
  

  app.get("/ps5", )

// Start the server
app.listen(5173, () => {
  console.log('Server started on port 5173');
});