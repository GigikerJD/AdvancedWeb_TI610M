import "../styles/footer.css";

const Footer = () => (
    <>
        <div className="inside-footer">
            <footer id="main-footer">
               <div className="icons">
                <ul>
                    <li>
                        <img src="../images/social-icons/facebook.png" alt="Facebook" className="social-icon"/>
                    </li>
                    <li>
                        <img src="../images/social-icons/instagram.png" className="social-icon" alt="Instagram" />
                    </li>
                    <li>
                        <img src="../images/social-icons/twitter.png" className="social-icon" alt="Twitter" />
                    </li>
                    <li>
                        <img src="../images/social-icons/youtube.png" className="social-icon" alt="Youtube" />
                    </li>
                </ul>
               </div>
            </footer>
        </div>
    </>
);

export default Footer;