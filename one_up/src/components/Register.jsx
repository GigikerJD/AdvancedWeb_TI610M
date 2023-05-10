import "../styles/signup.css";
import { Link } from "react-router-dom";
import React from "react";
import { useState } from "react";
import Login from "./Login";

const Register = () => {
  const [fname, setFirstName] = useState("");
  const [lname, setLastName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Firstname: ", fname);
    console.log("Lastname: ", lname);
    console.log("Username: ", username);
    console.log("Email: ", email);
    console.log("Password: ", password);
  };
    return(
        <form method="post" className="signup-form" onSubmit={handleSubmit}>
            <div id="logs-to-others">

            </div>
            <div className="priorInfo">
                <div id="names">
                    <input type="text" name="fname" id="fname" placeholder="Firstname" onChange={(e) => setFirstName(e.target.value)} required/>
                    <input type="text" name="lname" id="lname" placeholder="Lastname" onChange={(e) => setLastName(e.target.value)} required/>
                    <input type="text" name="username" id="username" placeholder="Username" onChange={(e) => setUserName(e.target.value)} required/>
                </div>
                <div id="essentials">
                    <input type="email" name="email" id="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required/>
                    <input type="password" name="password" id="password" placeholder="Type your password here" onChange={(e) => setPassword(e.target.value)} required/>

                </div>
            </div>
            <button type="submit" id="su_button">Sign Up</button>
            <div id="go_to_login">            
                Already member ? <Link to="/home/login" element={<Login/>} id="log">Login</Link>
            </div>
        </form>
         
    );

};

export default Register;

