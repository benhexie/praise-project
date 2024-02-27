import React, { useEffect, useState } from "react";
import { BsBell, BsBellFill } from "react-icons/bs";
import { useSelector } from "react-redux";

const Header = () => {
  const notifications = useSelector((state) => state.general.notifications);
  const user = useSelector((state) => state.general.user);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const closeNotifications = (e) => {
      if (
        e.target.closest(".admin-dashboard__header-bell") ||
        e.target.closest(".admin-dashboard__notifications")
      ) {
        return;
      }
      setShowNotifications(false);
    };
    document.addEventListener("click", closeNotifications);
    return () => document.removeEventListener("click", closeNotifications);
  }, []);

  return (
    <div className="dashboard__header admin-dashboard__header">
      <h1>Dashboard</h1>
      <div className="admin-dashboard__notifications-wrapper">
        <div
          className={`admin-dashboard__header-bell ${
            showNotifications ? "show" : ""
          }`}
          onClick={() => setShowNotifications((prev) => !prev)}
        >
          {notifications.length > 0 ? <BsBellFill /> : <BsBell />}
          {notifications.length > 0 ? (
            <div className="admin-dashboard__header-bell-badge">
              {notifications.length}
            </div>
          ) : null}
        </div>
        <div
          className={`admin-dashboard__notifications ${
            showNotifications ? "show" : ""
          }`}
        >
          <div className="admin-dashboard__notifications__inner">
            {notifications.length > 0 ? (
              notifications.map((notification, index) => (
                <div
                  key={notification._id || index}
                  className="admin-dashboard__notification"
                >
                  <p>{notification.message}</p>
                  <small>{notification.createdAt}</small>
                </div>
              ))
            ) : (
              <div className="admin-dashboard__notification">
                <h3>No new notifications</h3>
              </div>
            )}
          </div>
        </div>
      </div>
      <h2 className="admin-dashboard__welcome">Welcome, {user.firstname}!</h2>
    </div>
  );
};

export default Header;
