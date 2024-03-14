import "./Staff.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GoArrowLeft, GoTrash } from "react-icons/go";
import { useState } from "react";
import ConfirmationBox from "../../../components/Dialog/ConfirmationBox";
import { toast } from "react-toastify";
import {
  updateAssignedCourse,
  updateStaff,
} from "../../../redux/actions/admin";
import { RiInformationLine } from "react-icons/ri";

const Staff = () => {
  const id = useParams().id;
  const staff = useSelector((state) =>
    state.admin.staffs.find((l) => l._id === id),
  );
  const courses = useSelector((state) => state.admin.courses).filter(
    (c) => c.assignedTo === id,
  );
  const [showDialog, setShowDialog] = useState(false);
  const [dialogCaller, setDialogCaller] = useState("disable"); // disable or grant
  const [disableLoading, setDisableLoading] = useState(false);
  const [grantLoading, setGrantLoading] = useState(false);
  const [unassignLoading, setUnassignLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.general.user);

  const disableAccount = async (disable) => {
    if (disable && !showDialog) {
      setDialogCaller("disable");
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
        body: JSON.stringify({ disable }),
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

  const grantViewer = async (grant) => {
    if (grant && !showDialog) {
      setDialogCaller("grant");
      setShowDialog(true);
      return;
    }
    setGrantLoading(true);
    try {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER}/grant/viewer/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ grant }),
        },
      );
      const data = await res.json();
      setGrantLoading(false);
      if (data.error) return toast.error(data.message);
      dispatch(updateStaff(data.data));
      toast.success(data.message);
      setShowDialog(false);
    } catch (err) {
      setGrantLoading(false);
      if (/failed to fetch|network error/i.test(err.message)) {
        return toast.error("Please check your internet connection.");
      }
      toast.error("Something went wrong");
      console.error(err.message);
    }
  };

  const unassignCourse = async (courseId) => {
    if (unassignLoading) return;
    setUnassignLoading(true);
    try {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER}/course/unassign/${courseId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      const data = await res.json();
      setUnassignLoading(false);
      if (data.error) return toast.error(data.message);
      dispatch(updateAssignedCourse(data.data));
      toast.success(data.message);
    } catch (err) {
      setUnassignLoading(false);
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
      {staff ? (
        <div className="card admin__user__container">
          {showDialog && (
            <ConfirmationBox
              message={
                dialogCaller === "disable"
                  ? "Are you sure you want to disable this account?"
                  : "Staff would be able to view but not modify courses and other staff details."
              }
              onConfirm={() =>
                dialogCaller === "disable"
                  ? disableAccount(true)
                  : grantViewer(true)
              }
              onCancel={() => setShowDialog(false)}
              confirmText={
                dialogCaller === "disable" ? "Yes, disable" : "Yes, grant"
              }
              cancelText="No, cancel"
            />
          )}
          {staff.image && (
            <div className="admin__user__image">
              <img src={staff.image} alt={staff.firstname} />
            </div>
          )}
          <h1>
            {staff.firstname} {staff.lastname}
          </h1>
          <p>{staff.email}</p>
          {staff.phone && <p>{staff.phone}</p>}
          {staff.department && <p>{staff.department}</p>}
          <Link to={"portfolio"} className="admin__user__portfolio__link">See Portfolio</Link>
          <div className="admin__user__actions">
            <div className="admin__user__actions__item__container">
              <button
                className="admin__user__actions__disable"
                onClick={() => disableAccount(staff.disabled ? false : true)}
                disabled={disableLoading}
              >
                {staff.disabled ? "Enable account" : "Disable account"}
              </button>
              <RiInformationLine className={`admin__user__actions__info`} />
              <span>
                {staff.disabled
                  ? "This will re-enable the user's account."
                  : "This will prevent the user from using the platform."}
              </span>
            </div>
            <div className="admin__user__actions__item__container">
              <button
                className="admin__user__actions__grant"
                disabled={grantLoading}
                onClick={() =>
                  grantViewer(staff.role === "staff" ? true : false)
                }
              >
                {staff.role === "staff" ? "Grant viewer" : "Revoke viewer"}
              </button>
              <RiInformationLine className={`admin__user__actions__info`} />
              <span>
                {staff.role === "staff"
                  ? "This will grant the user access to view but not modify courses and other staff details."
                  : "This will revoke the user's access to view courses and other staff details."}
              </span>
            </div>
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
                    {user.role === "admin" && (
                      <GoTrash onClick={() => unassignCourse(course._id)} />
                    )}
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
