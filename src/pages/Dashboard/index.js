import "./Dashboard.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashboardLoading from "../../components/Loading/DashboardLoading";
import { toast } from "react-toastify";
import SomethingWentWrong from "../Error/SomethingWentWrong";
import DashboardNav from "../../components/Nav/DashboardNav";
import { Outlet, useNavigate } from "react-router-dom";
import {
  setAssignedCourses,
  setCourses,
  setStaffs,
  setProfessional,
  setSchool,
  setUser,
  setNotifications,
} from "../../redux/actions";

const SERVER = process.env.REACT_APP_SERVER;

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.general.user);
  const navigate = useNavigate();

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
        if (data.error) {
          toast.error(data.message);
          if (/no token provided|invalid token/i.test(data.error)) {
            localStorage.removeItem("token");
          }
          return navigate("/login", { replace: true });
        }
        dispatch(setUser(data.data.user));
        dispatch(setSchool(data.data.school));
        dispatch(setNotifications(data.data.notifications));
        if (
          data.data.user.role === "admin" ||
          data.data.user.role === "viewer"
        ) {
          dispatch(setCourses(data.data.courses));
          dispatch(setStaffs(data.data.staffs));
        }
        if (
          data.data.user.role === "staff" ||
          data.data.user.role === "viewer"
        ) {
          dispatch(setAssignedCourses(data.data.assignedCourses));
          dispatch(setProfessional(data.data.professional));
        }
      })
      .catch((err) => {
        setLoading(false);
        if (/failed to fetch|network error/i.test(err.message)) {
          return toast.error("Please check your internet connection.");
        }
        toast.error("Something went wrong");
        console.error(err.message);
      });
  }, []);

  return (
    <div className="dashboard">
      {(() => {
        if (loading) return <DashboardLoading />;
        if (!user) return <SomethingWentWrong />;
        return (
          <>
            <DashboardNav />
            <Outlet />
          </>
        );
      })()}
    </div>
  );
};

export default Dashboard;
