import "../styles/login.css";
import {Link} from "react-router-dom";
import { useEffect, useState } from "react";
import Register from "./Register";

const Login = () => {

    const [username, setUsername] = useState(["", ""]);
    const [password, setPassword] = useState(["", ""]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Username : ", username);
        console.log("Password : ", password);
    }

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
                
                <button type="button" id="log-button" onClick={handleSubmit}>Log in</button>
                <Link to="/home/register" element={<Register/>} id="log">Not a member ?</Link>
            </form>
        </>
    )
}


export default Login;