<?php 
    include "../connection.php";

    if(isset($_GET["log-button"])){
        $username = $_GET["username"];
        $password = $_GET["password"];


        if($username != "" && $password != ""){
            $userExist = "SELECT username from registereduser WHERE username ='$username'";
            
            $userExistResult = $conn->query($userExist);
            if($userExistResult->num_rows > 0){
                $sql = "SELECT username, password FROM registered WHERE username = '$username' AND password='$password'";
                $result = $conn->query($sql);
                if($result->num_rows > 0) echo "Login successful";
                else echo "Incorrect password"; 
            }
        }else echo "User does not exist";
    }
?>