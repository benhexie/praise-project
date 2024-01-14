import { useEffect, useState } from "react";
import "./Dashboard.css";
import { useDispatch, useSelector } from "react-redux";
import DashboardLoading from "../../components/Loading/DashboardLoading";
import UserDashboard from "./User";
import AdminDashboard from "./Admin";
import { toast } from "react-toastify";
import SomethingWentWrong from "../Error/SomethingWentWrong";

const SERVER = process.env.REACT_APP_SERVER;

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    fetch(`${SERVER}/data`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        if (data.error) return toast.error(data.message);
        dispatch({ type: "SET_USER", payload: data.data.user });
      })
      .catch((err) => {
        setLoading(false);
        if (/failed to fetch|network error/i.test(err.message)) {
          return toast.error("Please check your internet connection.");
        }
        toast.error("Something went wrong");
        console.log(err.message);
      });
  }, []);

  return (
    <div className="dashboard">
      {(() => {
        if (loading) return <DashboardLoading />;
        if (!user) return <SomethingWentWrong />;
        if (user.role === "user") return <UserDashboard />;
        if (user.role === "admin") return <AdminDashboard />;
      })()}
    </div>
  );
};

export default Dashboard;
