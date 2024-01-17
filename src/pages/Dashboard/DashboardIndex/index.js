import { useSelector } from "react-redux";
import AdminDashboard from "../Admin";
import UserDashboard from "../User";

const DashboardIndex = () => {
  const user = useSelector((state) => state.user);

  return <>{user.role === "admin" ? <AdminDashboard /> : <UserDashboard />}</>;
};

export default DashboardIndex;
