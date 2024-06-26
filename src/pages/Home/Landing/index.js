import { Link, useLocation } from "react-router-dom";
import "./Landing.css";
import { FaEnvelope, FaPhone } from "react-icons/fa";
import AboutImage from "../../../assets/svgs/Globe.svg";
import ContactImage from "../../../assets/svgs/CallCenter.svg";
import DarkAboutImage from "../../../assets/svgs/GlobeDark.svg";
import DarkContactImage from "../../../assets/svgs/CallCenterDark.svg";
import { useEffect, useRef } from "react";
import lecturaLoogo from "../../../assets/svgs/lectura-logo.svg";
import { useSelector } from "react-redux";

const Landing = () => {
  const aboutSectionRef = useRef(null);
  const contactSectionRef = useRef(null);
  const location = useLocation().pathname;
  const theme = useSelector((state) => state.general.theme);

  useEffect(() => {
    if (/\/about/.test(location))
      aboutSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    else if (/\/contact/.test(location))
      contactSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    else window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="landing">
      <header className="landing__section landing__header">
        <img src={lecturaLoogo} alt="Lectura" />
        <h1>Welcome to Lectura!</h1>
        <p>Your Gateway to Academic Excellence and Expertise</p>
      </header>

      <section
        className="landing__section about__section"
        ref={aboutSectionRef}
      >
        <img
          src={theme === "dark" ? DarkAboutImage : AboutImage}
          alt="About Lectura"
        />
        <h2>About Lectura</h2>
        <p>
          Lectura is a revolutionary academic platform dedicated to connecting
          educators and administrators seamlessly. Our mission is to provide a
          comprehensive solution for academic management, fostering a culture of
          excellence in education.
        </p>
      </section>

      <section className="landing__section features__section">
        <h2>Key Features</h2>
        <ul>
          <li>Comprehensive lecturer profiles with detailed qualifications</li>
          <li>
            Admin and Super Admin functionalities for streamlined management
          </li>
          <li>
            Intuitive search and ranking system for optimal lecturer selection
          </li>
          <li>Secure user authentication ensuring data confidentiality</li>
          <li>Scoring system to highlight academic achievements</li>
        </ul>
      </section>

      <section
        className="landing__section contact__section"
        ref={contactSectionRef}
      >
        <img
          src={theme === "dark" ? DarkContactImage : ContactImage}
          alt="Contact Us"
        />
        <h2>Contact Us</h2>
        <p>Have questions or feedback? Reach out to our team!</p>
        <div className="contact__info">
          <Link to={"mailto:"}>
            <FaEnvelope /> info@lectura.com
          </Link>
          <Link to={"tel:+2348022779300"}>
            <FaPhone /> +234 802 277 9300
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Landing;
