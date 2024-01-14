import { SyncLoader } from "react-spinners";
import "./DashboardLoading.css";

const DashboardLoading = () => {
  return (
    <div className="dashboard__loading">
      <SyncLoader color="var(--primary-color)" />
    </div>
  );
}

export default DashboardLoading