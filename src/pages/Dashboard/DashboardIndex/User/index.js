import { useSelector } from "react-redux";
import "./UserDashboard.css";
import { useState } from "react";
import { BsBell, BsBellFill } from "react-icons/bs";

const UserDashboard = () => {
  const notifications = useSelector((state) => state.notifications);
  const user = useSelector((state) => state.user);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div className="user__dashboard">
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
      <div className="dashboard__container">Logged in as user.</div>
    </div>
  );
};

export default UserDashboard;
