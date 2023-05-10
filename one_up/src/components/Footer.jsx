import "../styles/footer.css";
import Facebook from "../images/social-icons/facebook.png";
import Instagram from "../images/social-icons/instagram.png";
import Twitter from "../images/social-icons/twitter.png";
import Youtube from "../images/social-icons/youtube.png";
import {Link} from "react-router-dom";


const Footer = () => (
    <>
        <footer id="main-footer">
            <div className="icons">
                <ul>
                    <li>
                        <Link to="https://facebook.com">
                            <img src={Facebook} className="social-icon" alt="Facebook"/>
                        </Link>
                    </li>
                    <li>
                        <Link to="https://instagram.com">
                            <img src={Instagram} className="social-icon" alt="Instagram" />
                        </Link>
                    </li>
                    <li>
                        <Link to="https://twitter.com">
                            <img src={Twitter} className="social-icon" alt="Twitter" />
                        </Link>
                    </li>
                    <li>
                        <Link to="https://youtube.com">
                            <img src={Youtube} className="social-icon" alt="Youtube" />
                        </Link>
                    </li>
                </ul>
            </div>
        </footer>
    </>
);

export default Footer;