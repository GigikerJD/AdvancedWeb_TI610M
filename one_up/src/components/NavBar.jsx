import "../styles/header.css";
import {Link} from "react-router-dom";
import myWallpaper from "../images/1up_light.png";
import App from "../App";

const NavBar = () => {
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
                        <li className="blur">
                            <Link to="/home/login">Log in</Link>
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    )
}

export default NavBar;