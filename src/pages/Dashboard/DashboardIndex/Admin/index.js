import { useSelector } from "react-redux";
import "./AdminDashboard.css";
import { BsBell, BsBellFill } from "react-icons/bs";
import { FiFilter } from "react-icons/fi";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";

const AdminDashboard = () => {
  const staffs = useSelector((state) => state.admin.staffs);
  const courses = useSelector((state) => state.admin.courses);
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="admin-dashboard">
      <Header />
      <div className="admin-dashboard__content">
        <div className="admin-dashboard__overview">
          <h2>Overview</h2>
          <div className="admin-dashboard__overview-total">
            <div className="card admin-dashboard__card admin-dashboard__overview-card">
              <h3>Total Staff: {staffs.length}</h3>
            </div>
            <div className="card admin-dashboard__card admin-dashboard__overview-card">
              <h3>Total Courses: {courses.length}</h3>
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
              <div className="courses__search__container">
                <select>
                  <option value={""}>All</option>
                  <option value={"name"}>Name</option>
                </select>
                <input placeholder="Search lecturers" />
              </div>
              <div className="admin-dashboard__lecturer-search-results">
                <h3>Search results</h3>
                <div className="scrollable admin-dashboard__lecturer-search-results-container">
                  <div>
                    {staffs.length > 0 ? (
                      staffs.map((lecturer) => (
                        <div
                          key={lecturer._id}
                          className="admin-dashboard__lecturer-search-results-item"
                        >
                          <h3>
                            {lecturer.firstname} {lecturer.lastname}
                          </h3>
                          <button
                            className="admin-dashboard__lecturer-search-results-button"
                            onClick={() =>
                              navigate(`/dashboard/staff/${lecturer._id}`)
                            }
                          >
                            View
                          </button>
                        </div>
                      ))
                    ) : (
                      <h3>No lecturers found</h3>
                    )}
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
