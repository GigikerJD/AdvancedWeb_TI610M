import "../styles/signup.css";

const Register = () => (
    <>
        <form method="post" className="signup-form">
            <div id="logs-to-others">

            </div>
            <div className="priorInfo">
                <div id="names">
                    Firstname : <input type="text" name="fname" id="fname" placeholder="Firstname" required/>
                    <input type="text" name="lname" id="lname" placeholder="Lastname" required/>
                    <input type="text" name="pseudo" id="pseudo" placeholder="Pseudoname" required/>
                </div>
                <div id="essentials">
                    <input type="email" name="email" id="email" placeholder="Email" required/>
                    <input type="password" name="password" id="password" placeholder="Type your password here" required/>
                </div>
            </div>
            <button type="submit">Sign Up</button>
        </form>     
    </>
);

export default Register;

