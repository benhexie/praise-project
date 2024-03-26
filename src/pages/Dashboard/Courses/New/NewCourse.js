import "./NewCourse.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AiFillCloseCircle } from "react-icons/ai";
import { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCourse,
  deleteCourse,
  updateCourse,
} from "../../../../redux/actions/admin";
import { toast } from "react-toastify";
import ConfirmationBox from "../../../../components/Dialog/ConfirmationBox";

const NewCourse = () => {
  const navigate = useNavigate();
  const bgRef = useRef(null);
  const id = useParams().id;
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [credits, setCredits] = useState("");
  const [description, setDescription] = useState("");
  const [assignTo, setAssignTo] = useState("");
  const [maxCredits, setMaxCredits] = useState(15);
  const [error, setError] = useState("");
  const [profileId, setProfileId] = useState("");
  const [previewData, setPreviewData] = useState({});
  const dispatch = useDispatch();

  const user = useSelector((state) => state.general.user);
  const courses = useSelector((state) => state.admin.courses);
  const staffs = useSelector((state) => state.admin.staffs);
  const [showDialog, setShowDialog] = useState({
    delete: false,
    overload: false,
  });

  useEffect(() => {
    if (!id) return;
    const course = courses.filter((course) => course._id === id)?.[0];
    if (!course) return navigate("/dashboard/courses", { replace: true });
    setTitle(course.title);
    setCode(course.code);
    setCredits(course.credits);
    setDescription(course.description || "");
    setAssignTo(course.assignedTo || "");
  }, []);

  useEffect(() => {
    setError("");
  }, [title, code, credits, description, assignTo]);

  useEffect(() => {
    if (!profileId) return;
    setPreviewData(
      staffs.filter((user) => {
        return user._id === profileId;
      })?.[0] || {},
    );
  }, [profileId]);

  const saveHandler = async (e) => {
    e.preventDefault();

    if (
      assignTo &&
      (() => {
        const staff = staffs.find((staff) => staff._id === assignTo);
        return (
          courses
            .filter((course) => course.assignedTo === staff._id)
            .reduce((acc, course) => acc + course.credits, 0) +
            credits >
          staff.maxCredits
        );
      })() &&
      !showDialog.overload
    ) {
      setShowDialog((prev) => ({
        ...prev,
        overload: true,
      }));
      return;
    }

    const [error, message] = validateInput();
    if (error) return setError(message);

    try {
      const res = await fetch(`${process.env.REACT_APP_SERVER}/course`, {
        method: id ? "PUT" : "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          title,
          code,
          credits,
          description,
          assignedTo: assignTo,
        }),
      });

      const data = await res.json();
      if (data.error) return setError(data.message);
      toast.success(data.message);
      dispatch(updateCourse(data.data));
      navigate("/dashboard/courses", { replace: true });
    } catch (error) {
      if (/failed to fetch|network error/i.test(error.message)) {
        setError("Please check your internet connection.");
      }
      setError(error.message);
      console.error(error.message);
    }
  };

  const deleteCourseFtn = async (id) => {
    if (!showDialog.delete) {
      setShowDialog((prev) => ({
        ...prev,
        delete: true,
      }));
      return;
    }

    try {
      const res = await fetch(`${process.env.REACT_APP_SERVER}/course/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      if (data.error) return toast.error(data.message);
      dispatch(deleteCourse(id));
      toast.success(data.message);
      setShowDialog((prev) => ({
        ...prev,
        delete: false,
      }));
    } catch (err) {
      if (/failed to fetch|network error/i.test(err.message)) {
        return toast.error("Please check your internet connection.");
      }
      toast.error("Something went wrong");
      console.error(err.message);
    }
  };

  const validateInput = () => {
    if (!title) return [true, "Course title cannot be empty"];
    if (!code) return [true, "Course code cannot be empty"];
    if (!/^[A-Za-z]+ *[0-9]+$/.test(code))
      return [true, "Course code is invalid"];
    if (!credits) return [true, "Course credits cannot be empty"];
    return [false, ""];
  };

  return (
    <div
      className="course__new"
      onClick={() => navigate("/dashboard/courses", { replace: true })}
      ref={bgRef}
    >
      {id && showDialog.delete && (
        <ConfirmationBox
          message="Are you sure you want to delete this course?"
          onConfirm={() => deleteCourseFtn(id)}
          onCancel={() =>
            setShowDialog((prev) => ({
              ...prev,
              delete: false,
            }))
          }
        />
      )}
      {id && showDialog.overload && (
        <ConfirmationBox
          message="This staff has reached the maximum credit limit. Assigning this course will overload the staff. Do you want to proceed?"
          onConfirm={saveHandler}
          onCancel={() =>
            setShowDialog((prev) => ({
              ...prev,
              overload: false,
            }))
          }
        />
      )}
      <div
        className="card course__new__container"
        onClick={(e) => e.stopPropagation()}
      >
        <AiFillCloseCircle
          className="course__new__close__icon"
          onClick={() => bgRef.current.click()}
        />
        <form onSubmit={saveHandler}>
          <label>
            <p>
              Course Title <span>*</span>
            </p>
            <input
              placeholder="Trigonometry"
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={user.role !== "admin"}
            />
          </label>
          <label>
            <p>
              Course Code <span>*</span>
            </p>
            <input
              placeholder="MATH 203"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              disabled={user.role !== "admin"}
            />
          </label>
          <label>
            <p>
              Course Credits <span>*</span>
            </p>
            <input
              type="number"
              placeholder="3"
              value={credits}
              onChange={(e) => setCredits(e.target.value)}
              disabled={user.role !== "admin"}
            />
          </label>
          <label>
            <p>Description</p>
            <input
              placeholder="A brief description of the course"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={user.role !== "admin"}
            />
          </label>
          {!profileId || Object.keys(previewData).length === 0 ? null : (
            <div className="course__profile__preview">
              <p>
                Full Name:
                <span>
                  {previewData.firstname} {previewData.lastname}
                </span>
              </p>
              <p>
                Email:<span>{previewData.email}</span>
              </p>
              <Link to={`/dashboard/staff/${profileId}`}>
                View Full Profile
              </Link>
            </div>
          )}
          <label>
            <p>Assign to</p>
            <div className="assign__to__container">
              <select
                value={assignTo}
                onChange={(e) => setAssignTo(e.target.value)}
                disabled={user.role !== "admin"}
              >
                <option value={""}>Not assigned</option>
                {staffs.map((staff) => (
                  <option key={staff._id} value={staff._id}>
                    {staff.firstname} {staff.lastname} - {staff.score}{" "}
                    {(() => {
                      const left =
                        staff.maxCredits -
                        courses
                          .filter((course) => course.assignedTo === staff._id)
                          .reduce((acc, course) => acc + course.credits, 0);
                      if (left < 0)
                        return `(${Math.abs(left)} credits overload)`;
                      return `(${left} credits left)`;
                    })()}
                  </option>
                ))}
              </select>
              <button
                type="button"
                disabled={!Boolean(assignTo)}
                onClick={() => setProfileId((prev) => (!prev ? assignTo : ""))}
              >
                {!profileId ? "Preview" : "Hide"}
              </button>
            </div>
          </label>
          <p
            style={{
              color: "red",
              fontWeight: "500",
              fontSize: 18,
              margin: "auto",
            }}
          >
            {error}
          </p>
          {user.role === "admin" && (
            <Fragment>
              <button type="submit">Save</button>
              {id && (
                <button
                  type="button"
                  className="delete"
                  onClick={deleteCourseFtn}
                >
                  Delete
                </button>
              )}
            </Fragment>
          )}
        </form>
      </div>
    </div>
  );
};

export default NewCourse;
