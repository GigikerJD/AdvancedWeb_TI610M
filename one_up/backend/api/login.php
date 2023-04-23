<?php 
    include "../connection.php";

    if(isset($_GET["log-button"])){
        $username = $_GET["username"];
        $password = $_GET["password"];


        if($username != "" && $password != ""){
            $sql = "SELECT username, password FROM registereduser where username = '$username' AND password = '$password'";
            $userExists = "SELECT username from registereduser where EXISTS (
                SELECT username from registered where username = '$username
            )";
            $result = $conn->query($sql);
            if($result === TRUE){
                echo "<span id=start_session>Login successfull !</span>";
            }
        }
    }

    var_export([$username, $password, $sql, $result], true)
?>