import "../styles/login.css";
import {Link} from "react-router-dom";
import { useEffect, useState } from "react";
import Register from "./Register";
import Home from "./Home";

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`.api/login.php?username=${username}&password=${password}`)
          .then(response => response.text())
          .then(data => {
            console.log(data);
          })
          .catch(error => {
            console.log(error);
          });
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
            <form method="GET" className="main-form">
                <h3 id="login-title">Login Form</h3>

                <input type="text" 
                    name="username" 
                    id="username" 
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}/>

                <input type="password" 
                    name="password" 
                    id="password" 
                    placeholder="Type password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}/>
                
                <button type="button"
                    name="log-button" 
                    id="log-button" 
                    disabled={true}
                    onClick={handleSubmit}>
                        Log in
                </button>
                <Link to="/home/register" element={<Register/>} id="log">Not a member ?</Link>
            </form>
        </>
    )
}

export default Login;