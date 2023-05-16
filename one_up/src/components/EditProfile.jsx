import { redirect } from "react-router-dom";
import {useState, useEffect} from "react";


const RedirectButtons = () => {

    useEffect(() => {
        const edit = document.getElementsByClassName("box");
        edit.onClick = window.location.href = "";
    })

    return(
        <>
            <button className="box"
                onClick={redirectToEditProfile}
                >
                Edit Profile
            </button>
        </>
    );
}

export default RedirectButtons;