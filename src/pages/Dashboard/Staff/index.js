import "./Staff.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GoArrowLeft, GoTrash } from "react-icons/go";
import { useState } from "react";
import ConfirmationBox from "../../../components/Dialog/ConfirmationBox";
import { toast } from "react-toastify";
import { updateStaff } from "../../../redux/actions/admin";

const Staff = () => {
  const id = useParams().id;
  const lecturer = useSelector((state) =>
    state.admin.staffs.find((l) => l._id === id),
  );
  const courses = useSelector((state) =>
    state.admin.courses.filter((c) => c.assignedTo === id),
  );
  const [showDialog, setShowDialog] = useState(false);
  const [disableLoading, setDisableLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const disableAccount = async () => {
    if (!showDialog) {
      setShowDialog(true);
      return;
    }
    setDisableLoading(true);
    try {
      const res = await fetch(`${process.env.REACT_APP_SERVER}/user/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ disable: true }),
      });
      const data = await res.json();
      setDisableLoading(false);
      if (data.error) return toast.error(data.message);
      dispatch(updateStaff(data.data));
      toast.success(data.message);
      setShowDialog(false);
    } catch (err) {
      setDisableLoading(false);
      if (/failed to fetch|network error/i.test(err.message)) {
        return toast.error("Please check your internet connection.");
      }
      toast.error("Something went wrong");
      console.error(err.message);
    }
  };

  const enableAccount = async () => {
    setDisableLoading(true);
    try {
      const res = await fetch(`${process.env.REACT_APP_SERVER}/user/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ disable: false }),
      });
      const data = await res.json();
      setDisableLoading(false);
      if (data.error) return toast.error(data.message);
      dispatch(updateStaff(data.data));
      toast.success(data.message);
    } catch (err) {
      setDisableLoading(false);
      if (/failed to fetch|network error/i.test(err.message)) {
        return toast.error("Please check your internet connection.");
      }
      toast.error("Something went wrong");
      console.error(err.message);
    }
  };

  return (
    <div className="admin__user">
      <button className="admin__user__back" onClick={() => navigate(-1)}>
        <GoArrowLeft />
        Back
      </button>
      {lecturer ? (
        <div className="card admin__user__container">
          {showDialog && (
            <ConfirmationBox
              message="Are you sure you want to disable this account?"
              onConfirm={disableAccount}
              onCancel={() => setShowDialog(false)}
              confirmText="Yes, disable"
              cancelText="No, cancel"
            />
          )}
          <div className="admin__user__image">
            <img src={lecturer.image} alt={lecturer.firstname} />
          </div>
          <h1>
            {lecturer.firstname} {lecturer.lastname}
          </h1>
          <p>{lecturer.email}</p>
          <p>{lecturer.phone}</p>
          <p>{lecturer.department}</p>
          <div className="admin__user__actions">
            <button
              className="admin__user__actions__disable"
              onClick={lecturer.disabled ? enableAccount : disableAccount}
              disabled={disableLoading}
            >
              {lecturer.disabled ? "Enable account" : "Disable account"}
            </button>
          </div>
          <div className="admin__user__courses">
            <h2>Courses</h2>
            <div className="scrollable">
              {courses.length === 0 ? (
                <h3>No courses available</h3>
              ) : (
                courses.map((course) => (
                  <div key={course._id} className="admin__user__course">
                    <div className="admin__user__course__details">
                      <h3>{course.code}</h3>
                      <p>{course.title}</p>
                    </div>
                    <GoTrash />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      ) : (
        <h1>User not found</h1>
      )}
    </div>
  );
};

export default Staff;
