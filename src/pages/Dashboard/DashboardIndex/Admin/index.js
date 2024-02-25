import { useSelector } from "react-redux";
import "./AdminDashboard.css";
import { BsBell, BsBellFill } from "react-icons/bs";
import { FiFilter } from "react-icons/fi";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const notifications = useSelector((state) => state.notifications);
  const user = useSelector((state) => state.user);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="admin-dashboard">
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
      <div className="admin-dashboard__content">
        <div className="admin-dashboard__overview">
          <h2>Overview</h2>
          <div className="admin-dashboard__overview-total">
            <div className="card admin-dashboard__card admin-dashboard__overview-card">
              <h3>Total Lecturers: 45</h3>
            </div>
            <div className="card admin-dashboard__card admin-dashboard__overview-card">
              <h3>Total Courses: 203</h3>
            </div>
          </div>
          <div className="admin-dashboard__overview-quick">
            <Link
              to={"/dashboard/courses"}
              className="card admin-dashboard__card admin-dashboard__overview-card"
            >
              <h3>Manage Courses</h3>
            </Link>
            <Link
              to={"/dashboard/profile"}
              className="card admin-dashboard__card admin-dashboard__overview-card"
            >
              <h3>Manage Profile</h3>
            </Link>
          </div>
        </div>
        <div className="admin-dashboard__lecturer">
          <div className="admin-dashboard__lecturer-overview">
            <div className="admin-dashboard__lecturer-search">
              <h3>Search lecturers</h3>
              <div className="admin-dashboard__lecturer-search-container">
                <input
                  type="text"
                  placeholder="Search lecturers"
                  className="admin-dashboard__lecturer-search-input"
                />
                <div className="admin-dashboard__lecturer-search-filter">
                  <FiFilter onClick={() => setShowFilters((prev) => !prev)} />
                  <div
                    className={`admin-dashboard__lecturer-search-filter-dropdown ${
                      showFilters ? "show" : ""
                    }`}
                  >
                    <label className="admin-dashboard__lecturer-search-filter-dropdown-item">
                      <input type="checkbox" />
                      <p>Filter 1</p>
                    </label>
                    <label className="admin-dashboard__lecturer-search-filter-dropdown-item">
                      <input type="checkbox" />
                      <p>Filter 2</p>
                    </label>
                  </div>
                </div>
                <button className="admin-dashboard__lecturer-search-button">
                  Search
                </button>
              </div>
              <div className="admin-dashboard__lecturer-search-results">
                <h3>Search results</h3>
                <div className="scrollable admin-dashboard__lecturer-search-results-container">
                  <div>
                    <div className="admin-dashboard__lecturer-search-results-item">
                      <h3>Ebiesuwa Oluwaseun</h3>
                      <button
                        className="admin-dashboard__lecturer-search-results-button"
                        onClick={() =>
                          navigate(`/dashboard/user/${"qwertyuiop"}`)
                        }
                      >
                        View
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
