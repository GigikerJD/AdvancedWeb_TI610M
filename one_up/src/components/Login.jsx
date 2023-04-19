import "../styles/login.css";
import {Link} from "react-router-dom";
import { useState } from "react";
import Register from "./Register";


const Login = () => {

    return(
        <>
            <form method="GET" className="main-form">
                <h3 id="login-title">Login Form</h3>
                <input type="text" name="username" id="username" placeholder="Username"/>
                <input type="password" name="password" id="password" placeholder="Type password"/>
                <button type="submit" className="log-button">Log in</button>
                <Link to={Register} id="log">Not a member ?</Link>
            </form>
        </>
    )
}


export default Login;