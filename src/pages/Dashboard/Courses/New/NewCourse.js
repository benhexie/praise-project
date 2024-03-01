import "./NewCourse.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AiFillCloseCircle } from "react-icons/ai";
import { useEffect, useRef, useState } from "react";
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
  const [error, setError] = useState("");
  const [profileId, setProfileId] = useState("");
  const [previewData, setPreviewData] = useState({});
  const dispatch = useDispatch();

  const courses = useSelector((state) => state.admin.courses);
  const staffs = useSelector((state) => state.admin.staffs);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    if (!id) return;
    const course = courses.filter((course) => course._id === id)?.[0];
    if (!course) return navigate("/dashboard/courses", { replace: true });
    setTitle(course.title);
    setCode(course.code);
    setCredits(course.credits);
    setDescription(course.description);
    setAssignTo(course.assignedTo);
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

  const createHandler = async (e) => {
    e.preventDefault();
    const [error, message] = validateInput();
    if (error) return setError(message);

    try {
      const res = await fetch(`${process.env.REACT_APP_SERVER}/course`, {
        method: "POST",
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
      dispatch(addCourse(data.data));
      navigate("/dashboard/courses", { replace: true });
    } catch (error) {
      setError(error.message);
    }
  };

  const editHandler = async (e) => {
    e.preventDefault();
    const [error, message] = validateInput();
    if (error) return setError(message);

    try {
      const res = await fetch(`${process.env.REACT_APP_SERVER}/course`, {
        method: "PUT",
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
      toast.success("Course updated successfully");
      dispatch(updateCourse(data.data));
      navigate("/dashboard/courses", { replace: true });
    } catch (error) {
      setError(error.message);
    }
  };

  const deleteCourseFtn = async (id) => {
    if (!showDialog) {
      setShowDialog(true);
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
      setShowDialog(false);
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
      {id && showDialog && (
        <ConfirmationBox
          message="Are you sure you want to delete this course?"
          onConfirm={() => deleteCourseFtn(id)}
          onCancel={() => setShowDialog(false)}
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
        <form onSubmit={id ? editHandler : createHandler}>
          <label>
            <p>
              Course Title <span>*</span>
            </p>
            <input
              placeholder="Trigonometry"
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
            />
          </label>
          <label>
            <p>Description</p>
            <input
              placeholder="A brief description of the course"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
              {/* <p>
                Department:<span>{previewData.department}</span>
              </p> */}
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
              >
                <option value={""}>Not assigned</option>
                {staffs.map((staff) => (
                  <option key={staff._id} value={staff._id}>
                    {staff.firstname} {staff.lastname} ({3} remaining)
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
          <button type="submit">{id ? "Edit" : "Create"}</button>
          {id && (
            <button type="button" className="delete" onClick={deleteCourseFtn}>
              Delete
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default NewCourse;
