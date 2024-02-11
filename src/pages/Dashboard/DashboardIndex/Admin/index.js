import { useSelector } from "react-redux";
import "./AdminDashboard.css";
import { BsBell, BsBellFill } from "react-icons/bs";
import { FiFilter } from "react-icons/fi";

/*
--------------------------------------------------------
|                   Admin Dashboard               bell |
--------------------------------------------------------
|                      Welcome,                        |
|                 [Admin Name]!                        |
--------------------------------------------------------
|    Overview            |   Quick Actions             |
|------------------------|-----------------------------|
| Total Lecturers: [N]   | Create New Course           |
| Total Courses: [N]     | View All Lecturers          |
--------------------------------------------------------
|                    Lecturer Management               |
|------------------------------------------------------|
| Lecturer Overview                                    |
| Search lecturers                                     |
|------------------------------------------------------|
|                    Course Management                 |
|------------------------------------------------------|
| Course Overview                                      |
| View courses                                         |
| Button to add new courses                            |                                      |
--------------------------------------------------------
*/

const AdminDashboard = () => {
  const notifications = useSelector((state) => state.notifications);
  const user = useSelector((state) => state.user);

  return (
    <div className="admin-dashboard">
      <div className="admin-dashboard__header">
        <h1>Admin Dashboard</h1>
        <div className="admin-dashboard__notifications-wrapper">
          <div className="admin-dashboard__header-bell">
            {notifications.length > 0 ? <BsBellFill /> : <BsBell />}
            {notifications.length > 0 ? (
              <div className="admin-dashboard__header-bell-badge">
                {notifications.length}
              </div>
            ) : null}
          </div>
          <div className="admin-dashboard__notifications">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="admin-dashboard__notification"
                >
                  <h3>{notification.message}</h3>
                </div>
              ))
            ) : (
              <div className="admin-dashboard__notification">
                <h3>No new notifications</h3>
              </div>
            )}
          </div>
        </div>
        <div className="admin-dashboard__welcome">
          <h2>Welcome, {user.firstname}!</h2>
        </div>
      </div>
      <div className="admin-dashboard__overview">
        <h2>Overview</h2>
        <div className="admin-dashboard__overview-total">
          <div className="card admin-dashboard__card admin-dashboard__overview-card">
            <h3>Total Lecturers: [N]</h3>
          </div>
          <div className="card admin-dashboard__card admin-dashboard__overview-card">
            <h3>Total Courses: [N]</h3>
          </div>
        </div>
        <div className="admin-dashboard__overview-quick">
          <div className="card admin-dashboard__card admin-dashboard__overview-card">
            <h3>Create New Course</h3>
          </div>
          <div className="card admin-dashboard__card admin-dashboard__overview-card">
            <h3>View All Lecturers</h3>
          </div>
        </div>
      </div>
      <div className="admin-dashboard__lecturer">
        <h2>Lecturer Overview</h2>
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
                <FiFilter />
                <div className="admin-dashboard__lecturer-search-filter-dropdown">
                  <div className="admin-dashboard__lecturer-search-filter-dropdown-item">
                    <input type="checkbox" />
                    <p>Filter 1</p>
                  </div>
                  <div className="admin-dashboard__lecturer-search-filter-dropdown-item">
                    <input type="checkbox" />
                    <p>Filter 2</p>
                  </div>
                </div>
              </div>
              <button className="admin-dashboard__lecturer-search-button">
                Search
              </button>
            </div>
            <div className="admin-dashboard__lecturer-search-results">
              <h3>Search results</h3>
              <div className="admin-dashboard__lecturer-search-results-container">
                <div className="admin-dashboard__lecturer-search-results-item">
                  <h3>Lecturer 1</h3>
                  <button className="admin-dashboard__lecturer-search-results-button">
                    View
                  </button>
                </div>
                <div className="admin-dashboard__lecturer-search-results-item">
                  <h3>Lecturer 2</h3>
                  <button className="admin-dashboard__lecturer-search-results-button">
                    View
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="admin-dashboard__course">
        <h2>Course Overview</h2>
        <div className="admin-dashboard__course-overview">
          <div className="admin-dashboard__course-view">
            <h3>View courses</h3>
            <div className="admin-dashboard__course-view-container">
              <div className="admin-dashboard__course-view-item">
                <h3>Course 1</h3>
                <button className="admin-dashboard__course-view-button">
                  View
                </button>
              </div>
              <div className="admin-dashboard__course-view-item">
                <h3>Course 2</h3>
                <button className="admin-dashboard__course-view-button">
                  View
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
