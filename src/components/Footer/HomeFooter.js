import "./HomeFooter.css";
import { Link } from "react-router-dom";
import {
  FaTwitter,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const HomeFooter = () => {
  return (
    <div className="home__footer">
      <div className="home__footer__content">
        <div className="home__footer__content__section">
          <h3>Company</h3>
          <ul>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/careers">Careers</Link>
            </li>
          </ul>
        </div>
        <div className="home__footer__content__section">
          <h3>Community</h3>
          <ul>
            <li>
              <Link to="/blog">Blog</Link>
            </li>
            <li>
              <Link to="/support">Support</Link>
            </li>
            <li>
              <Link to="/privacy">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/terms">Terms of Use</Link>
            </li>
          </ul>
        </div>
        <div className="home__footer__content__section">
          <h3>Connect</h3>
          <ul>
            <li>
              <a
                href="https://www.facebook.com/lectura"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookF />
                Facebook
              </a>
            </li>
            <li>
              <a
                href="https://www.twitter.com/lectura"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter />
                Twitter
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/lectura"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram />
                Instagram
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/lectura"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedinIn />
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>
      <small>&copy; 2024 Lectura. All rights reserved.</small>
    </div>
  );
};

export default HomeFooter;
