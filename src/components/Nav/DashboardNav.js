import { Link, NavLink, useLocation } from "react-router-dom";
import "./DashboardNav.css";
import { GoHome, GoHomeFill } from "react-icons/go";
import { RiUser3Line, RiUser3Fill } from "react-icons/ri";
import { IoLogOutOutline } from "react-icons/io5";
import { AiOutlineMenu } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { useEffect, useState } from "react";

const DashboardNav = () => {
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    setShowMenu(false);
  }, [location])

  return (
    <div className={`dashboard__nav ${showMenu ? "show" : ""}`}>
      {showMenu ? (
        <AiOutlineClose
          className="dashboard__nav__menu__icon"
          onClick={() => setShowMenu(!showMenu)}
        />
      ) : (
        <AiOutlineMenu
          className="dashboard__nav__menu__icon"
          onClick={() => setShowMenu(!showMenu)}
        />
      )}
      <div className={`dashboard__nav__menu`}>
        <NavLink to={"/dashboard"} className={"dashboard__nav__link"}>
          {/\/dashboard$/i.test(location.pathname) ? (
            <GoHomeFill className="dashboard__nav__link__icon" />
          ) : (
            <GoHome className="dashboard__nav__link__icon" />
          )}
          <span>Dashboard</span>
        </NavLink>
        <NavLink to={"/dashboard/profile"} className={"dashboard__nav__link"}>
          {/\/profile$/i.test(location.pathname) ? (
            <RiUser3Fill className="dashboard__nav__link__icon" />
          ) : (
            <RiUser3Line className="dashboard__nav__link__icon" />
          )}
          <span>Profile</span>
        </NavLink>
        <Link
          to={"/login"}
          className={"dashboard__nav__link dashboard__nav__logout"}
        >
          <IoLogOutOutline className="dashboard__nav__link__icon" />
          <span>Logout</span>
        </Link>
      </div>
      <div
        className="dashboard__nav__overlay"
        onClick={() => setShowMenu(false)}
      />
    </div>
  );
};

export default DashboardNav;
