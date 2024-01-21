import { Outlet } from "react-router-dom";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  return (
    <div className="admin__dashboard">
      <div className="dashboard__header">
        <h1>Dashboard</h1>
      </div>
      Logged in as admin.
    </div>
  );
};

export default AdminDashboard;
