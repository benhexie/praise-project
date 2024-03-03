import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import "./DashboardNav.css";
import { GoHome, GoHomeFill } from "react-icons/go";
import { RiUser3Line, RiUser3Fill } from "react-icons/ri";
import { PiScrollDuotone, PiScrollFill } from "react-icons/pi";
import { IoLogOutOutline } from "react-icons/io5";
import { AiOutlineMenu } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { IoBookOutline, IoBook } from "react-icons/io5";
import { RiCustomerServiceLine, RiCustomerServiceFill } from "react-icons/ri";
import { AiOutlineMessage, AiFillMessage } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import lecturaLogo from "../../assets/svgs/lectura-logo.svg";

const DashboardNav = () => {
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => state.general.user);

  useEffect(() => {
    setShowMenu(false);
  }, [location]);

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
        <Link to={"/dashboard"} className="dashboard__nav__header">
          <div className="dashboard__nav__header__logo">
            <img src={lecturaLogo} alt="logo" />
          </div>
          <h1 className="dashboard__nav__header__title">Lectura</h1>
        </Link>
        <NavLink to={"/dashboard"} end className={"dashboard__nav__link"}>
          {/\/dashboard$/i.test(location.pathname) ? (
            <GoHomeFill className="dashboard__nav__link__icon" />
          ) : (
            <GoHome className="dashboard__nav__link__icon" />
          )}
          <span>Dashboard</span>
        </NavLink>
        {(user.role === "admin" || user.role === "viewer") && (
          <NavLink to={"/dashboard/courses"} className={"dashboard__nav__link"}>
            {/\/courses(\/.+)*$/i.test(location.pathname) ? (
              <IoBook className="dashboard__nav__link__icon" />
            ) : (
              <IoBookOutline className="dashboard__nav__link__icon" />
            )}
            <span>Courses</span>
          </NavLink>
        )}
        {user.role !== "admin" && (
          <NavLink
            to={"/dashboard/portfolio"}
            className={"dashboard__nav__link"}
          >
            {/\/portfolio$/i.test(location.pathname) ? (
              <PiScrollFill className="dashboard__nav__link__icon" />
            ) : (
              <PiScrollDuotone className="dashboard__nav__link__icon" />
            )}
            <span>Portfolio</span>
          </NavLink>
        )}
        {(user.role === "staff" || user.role === "viewer") && (
          <NavLink to={"/dashboard/help"} className={"dashboard__nav__link"}>
            {/\/help$/i.test(location.pathname) ? (
              <RiCustomerServiceFill className="dashboard__nav__link__icon" />
            ) : (
              <RiCustomerServiceLine className="dashboard__nav__link__icon" />
            )}
            <span>Support</span>
          </NavLink>
        )}
        {user.role === "admin" && (
          <NavLink to={"/dashboard/support"} className={"dashboard__nav__link"}>
            {/\/support$/i.test(location.pathname) ? (
              <AiFillMessage className="dashboard__nav__link__icon" />
            ) : (
              <AiOutlineMessage className="dashboard__nav__link__icon" />
            )}
            <span>Support</span>
          </NavLink>
        )}
        <NavLink to={"/dashboard/profile"} className={"dashboard__nav__link"}>
          {/\/profile$/i.test(location.pathname) ? (
            <RiUser3Fill className="dashboard__nav__link__icon" />
          ) : (
            <RiUser3Line className="dashboard__nav__link__icon" />
          )}
          <span>Profile</span>
        </NavLink>
        <Link
          className={"dashboard__nav__link dashboard__nav__logout"}
          onClick={(e) => {
            e.preventDefault();
            localStorage.removeItem("token");
            navigate("/login", { replace: true });
          }}
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
