import { useSelector } from "react-redux";
import "./AdminDashboard.css";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import LecturerSearch from "../components/LecturerSearch";

const AdminDashboard = () => {
  const staffs = useSelector((state) => state.admin.staffs);
  const courses = useSelector((state) => state.admin.courses);

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
        <LecturerSearch />
      </div>
    </div>
  );
};

export default AdminDashboard;
