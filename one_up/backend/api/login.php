<?php 
    include "../connection.php";

    if(isset($_GET["login"])){
        $username = $_GET[""];
        $password = $_GET[""];

        if($username != "" && $password == "") echo "<span id=msg>Password must not be empty !</span>";
        if($username == "" && $password != "") echo "<span id=msg>Email must not be empty !</span>";

        if($username != "" && $password != ""){
            $sql = "SELECT username, password FROM registereduser";
            $userExists = "SELECT username from registereduser where EXISTS (
                SELECT username from registered where username = '$username
            )";
            $result = $conn->query($sql);
            if($result === TRUE){
                echo "<span id=start_session>Login successfull !</span>";
            }else if($userExists === TRUE && $password){
                echo "<span id=start_session>Password is incorrect !</span>";
            }
        }
    }
?>