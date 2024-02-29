import "./DashboardIndex.css";
import { useSelector } from "react-redux";
import AdminDashboard from "./Admin";
import StaffDashboard from "./Staff";

const DashboardIndex = () => {
  const user = useSelector((state) => state.general.user);

  return (
    <>
      {(() => {
        if (user.role === "admin") return <AdminDashboard />;
        if (user.role === "staff") return <StaffDashboard />;
        return null;
      })()}
    </>
  );
};

export default DashboardIndex;
