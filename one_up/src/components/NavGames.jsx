import {Link} from "react-router-dom";
import Playstation4 from "./Playstation4";
import Playstation5 from "./Playstation5";
import XBOX1 from "./XBOX1";
import XBOXS from "./XBOXS";
import NintendoSwitch from "./Nintendo";
import myWallpaper from "../images/1up_light.png";
import Enveloppe from "../images/icons/enveloppe.png";
import App from "../App";

const NavGames = () => {
    return (
        <>
            <header id="main-head">
                <div className="wallpaper">
                    <Link to="/" element={<App/>}>
                        <img id="main-icon" src={myWallpaper} alt="1UP"/>
                    </Link>
                </div>
                <nav className="main-nav">
                    <ul>
                        <li className="item 1">
                            <Link to="/play5" element={<Playstation5/>}>Playstation 5</Link>
                        </li>
                        <li className="item 2">
                            <Link to ="/play4" element={<Playstation4/>}>Playstation 4</Link>
                        </li>
                        <li className="item 3">
                            <Link to="/xbox_one" element={<XBOX1/>}>XBOX One</Link>
                        </li>
                        <li className="item 4">
                            <Link to="/xbox_s" element={<XBOXS/>}>XBOX S</Link>
                        </li>
                        <li className="item 5">
                            <Link to="/nintendo_switch" element={<NintendoSwitch/>}>Nintedo Switch</Link>
                        </li>
                        <li>
                            <Link>
                                <img id="enveloppe" src={Enveloppe} alt="messages"/>
                            </Link>
                        </li>
                        <li className="profile">
                            <span id="logged-name"></span>
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    )
}

export default NavGames;