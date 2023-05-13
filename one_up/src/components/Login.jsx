/* eslint-disable react/no-unescaped-entities */
import "../styles/login.css";
import {Link} from "react-router-dom";
import { useEffect, useState } from "react";
import Register from "./Register";
import axios from "axios";


const Login = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/login", {
        username,
        password
      });
      if (response.data.success) {
        // Login successful
        console.log("Login successful");
        // Perform any necessary actions, such as redirecting the user to another page or storing authentication tokens.
      } else {
        // Login failed
        console.log("Error: " + response.data.message);
        // Display an error message to the user, e.g., using state variables.
      }
    } catch (error) {
      console.log(error);
      // Handle any network or server errors.
    }
  };
  


    useEffect(() => {
        const logButton = document.getElementById("log-button");
        const user = document.getElementById("username");
        const password = document.getElementById("password");
        if(user.value != "" && password.value != ""){
          logButton.disabled = false;
        }else{ logButton.disabled = true;}
    }, [username, password])

    return(
        <>
        <h1>"Give your game a new life"</h1>
            <form method="POST" className="main-form">
                <h3 id="login-title">Connexion</h3>

                <input type="text" 
                    name="username" 
                    id="username" 
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}/>

                <input type="password" 
                    name="password" 
                    id="password" 
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}/>
                
                <button type="button"
                    name="log-button" 
                    id="log-button" 
                    onClick={handleSubmit}>
                        Log in
                </button>
                Not a member ?<Link to="/home/register" element={<Register/>} id="log">Sign up</Link>
            </form>
        </>
    )
}

export default Login;