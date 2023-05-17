/* eslint-disable react/no-unescaped-entities */
import "../styles/login.css";
import {Link} from "react-router-dom";
import { useEffect, useState } from "react";
import Register from "./Register";
import axios from "axios";
import Footer from "./Footer";

const Login = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/login", {
        username,
        password
      });
      if (response.data.success) {
        console.log("Login successful");
        setMsg("Login successful");
        setTimeout(() => {
          window.location.href = "http://localhost:5173/navgames";
        }, 3000);
      } else {
        alert("Login failed");
        setMsg("Login failed");
      }
    } catch (error) {
      console.log(error);
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
                <span>{msg}</span>

                Not a member ?<Link to="/home/register" element={<Register/>} id="log">Sign up</Link>
            </form>

            <Footer/>
        </>
    )
}

export default Login;