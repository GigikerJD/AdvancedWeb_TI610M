import {Link} from "react-router-dom";
import { useEffect } from "react";
import Playstation4 from "./Playstation4";
import Playstation5 from "./Playstation5";
import XBOX1 from "./XBOX1";
import XBOXS from "./XBOXS";
import NintendoSwitch from "./Nintendo";
import myWallpaper from "../images/1up_light.png";
import Enveloppe from "../images/icons/enveloppe.png";
import Home from "./Home";
import {Routes, Route} from "react-router-dom";
import "../styles/header.css";
import "../styles/navgames.css";
import UserProfile from "../images/icons/user.png";
import RedirectButtons from "./EditProfile";
 

const NavGames = () => {

    useEffect(() => {
        const userPicture = document.getElementById("profile");
        userPicture.style.cursor = "pointer";
    });


    return (
        <>
            <header id="main-head1">
                <div className="wallpaper1">
                    <Link to="/navgames" element={<Home/>}>
                        <img id="main-icon1" src={myWallpaper} alt="1UP"/>
                    </Link>
                </div>
                <nav className="main-nav1">
                    <ul>
                        <li className="item 1">
                            <Link to="/home/play5" element={<Playstation5/>}>Playstation 5</Link>
                        </li>
                        <li className="item 2">
                            <Link to ="/home/play4" element={<Playstation4/>}>Playstation 4</Link>
                        </li>
                        <li className="item 3">
                            <Link to="/home/xbox_one" element={<XBOX1/>}>XBOX One</Link>
                        </li>
                        <li className="item 4">
                            <Link to="/home/xbox_s" element={<XBOXS/>}>XBOX S</Link>
                        </li>
                        <li className="item 5">
                            <Link to="/home/nintendo_switch" element={<NintendoSwitch/>}>Nintendo Switch</Link>
                        </li>
                        <li>
                            <Link to="/Conversation">
                                <img id="enveloppe" src={Enveloppe} alt="messages"/>
                                
                            </Link>
                        </li>
                        <li>
                            <Link to="/Edit-Profile">
                            <img id="profile" src={UserProfile} alt="user" /><br/>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    )
}

export default NavGames;