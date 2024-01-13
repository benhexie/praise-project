import { Link, NavLink } from "react-router-dom";
import "./Nav.css";
import { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const Nav = () => {
  const [show, setShow] = useState(false);
  const handleMenuClick = () => {
    setShow(!show);
  };

  //   close menu when click outside
  window.onclick = function (event) {
    if (!event.target.matches(".nav__menu") && show) {
      setShow(false);
    }
  };

  return (
    <div className={`nav`}>
      <div className="nav__web">
        <Link className="nav__item nav__logo" to="/">
          {/* <img
            src="https://www.freepnglogos.com/uploads/netflix-logo-0.png"
            alt="Netflix Logo"
          /> */}
          <h1>Praise</h1>
        </Link>
        <NavLink className="nav__item" to="/" end>
          Home
        </NavLink>
        <NavLink className="nav__item" to="about">
          About
        </NavLink>
        <NavLink className="nav__item" to="contact">
          Contact
        </NavLink>
        <NavLink className="nav__item" to="login">
          Login
        </NavLink>
        <NavLink className="nav__item" to="signup">
          Signup
        </NavLink>
        <div className={`nav__item nav__menu`} onClick={handleMenuClick}>
          {show ? <AiOutlineClose /> : <AiOutlineMenu />}
        </div>
      </div>
      <div className={`nav__mobile  ${show ? "active" : ""}`}>
        <NavLink className="nav__item" to="/" end>
          Home
        </NavLink>
        <NavLink className="nav__item" to="about">
          About
        </NavLink>
        <NavLink className="nav__item" to="contact">
          Contact
        </NavLink>
        <NavLink className="nav__item" to="login">
          Login
        </NavLink>
        <NavLink className="nav__item" to="signup">
          Signup
        </NavLink>
      </div>
    </div>
  );
};

export default Nav;
