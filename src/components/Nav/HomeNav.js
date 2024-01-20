import { Link, NavLink } from "react-router-dom";
import "./HomeNav.css";
import { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const HomeNav = () => {
  const [show, setShow] = useState(false);
  const handleMenuClick = () => {
    setShow(!show);
  };

  //   close menu when click outside
  window.onclick = function (event) {
    if (!event.target.matches(".home__nav__menu") && show) {
      setShow(false);
    }
  };

  return (
    <div className={`home__nav`}>
      <div className="home__nav__web">
        <Link className="home__nav__item home__nav__logo" to="/">
          {/* <img
            src="https://www.freepnglogos.com/uploads/netflix-logo-0.png"
            alt="Netflix Logo"
          /> */}
          <h1>Lectura</h1>
        </Link>
        <NavLink className="home__nav__item" to="/" end>
          Home
        </NavLink>
        <NavLink className="home__nav__item" to="about">
          About
        </NavLink>
        <NavLink className="home__nav__item" to="contact">
          Contact
        </NavLink>
        <NavLink className="home__nav__item" to="login">
          Login
        </NavLink>
        <NavLink className="home__nav__item home__nav__signup" to="signup">
          Signup
        </NavLink>
        <div
          className={`home__nav__item home__nav__menu`}
          onClick={handleMenuClick}
        >
          {show ? <AiOutlineClose /> : <AiOutlineMenu />}
        </div>
      </div>
      <div className={`home__nav__mobile  ${show ? "active" : ""}`}>
        <NavLink className="home__nav__item" to="/" end>
          Home
        </NavLink>
        <NavLink className="home__nav__item" to="about">
          About
        </NavLink>
        <NavLink className="home__nav__item" to="contact">
          Contact
        </NavLink>
        <NavLink className="home__nav__item" to="login">
          Login
        </NavLink>
        <NavLink className="home__nav__item" to="signup">
          Signup
        </NavLink>
      </div>
    </div>
  );
};

export default HomeNav;
