import React, { useEffect, useState } from "react";
import { BsBell, BsBellFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { notificationsRead } from "../../../../redux/actions/general";

const Header = () => {
  const notifications = useSelector((state) => state.general.notifications);
  const user = useSelector((state) => state.general.user);
  const [showNotifications, setShowNotifications] = useState(false);
  const [closedNotifications, setClosedNotifications] = useState(notifications);
  const dispatch = useDispatch();

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

  useEffect(() => {
    if (
      showNotifications &&
      notifications.filter((notification) => !notification.read).length > 0
    ) {
      fetch(`${process.env.REACT_APP_SERVER}/notifications`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) return console.error(data.message);
          dispatch(notificationsRead());
        })
        .catch((err) => console.error(err.message));
    }
  }, [showNotifications]);

  useEffect(() => {
    if (!showNotifications) {
      setClosedNotifications(notifications);
    }
  }, [showNotifications]);

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
          {notifications.filter((notification) => !notification.read).length >
          0 ? (
            <BsBellFill />
          ) : (
            <BsBell />
          )}
          {notifications.filter((notification) => !notification.read).length >
          0 ? (
            <div className="admin-dashboard__header-bell-badge">
              {
                notifications.filter((notification) => !notification.read)
                  .length
              }
            </div>
          ) : null}
        </div>
        <div
          className={`admin-dashboard__notifications ${
            showNotifications ? "show" : ""
          }`}
        >
          <div className="admin-dashboard__notifications__inner">
            {closedNotifications.length > 0 ? (
              closedNotifications.map((notification, index) => (
                <div
                  key={notification._id || index}
                  className="admin-dashboard__notification"
                >
                  {notification.read ? (
                    <p>{notification.message}</p>
                  ) : (
                    <strong>{notification.message}</strong>
                  )}
                  <small>
                    {(() => {
                      const date = new Date(notification.createdAt);
                      return `${date.toLocaleDateString("en-GB")} ${
                        date.getHours() > 12
                          ? date.getHours() - 12
                          : date.getHours()
                      }:${date.getMinutes()} ${
                        date.getHours() > 12 ? "PM" : "AM"
                      }`;
                    })()}
                  </small>
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
