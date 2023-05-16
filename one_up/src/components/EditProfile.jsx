import { redirect } from "react-router-dom";
import {useState, useEffect} from "react";


const RedirectButtons = () => {

    const redirectToEditProfile = () => {
        window.location.href = "/Edit-Profile";
    }

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