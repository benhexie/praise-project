import { useNavigate, useParams } from "react-router-dom";
import "./NewCourse.css";
import { AiFillCloseCircle } from "react-icons/ai";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const NewCourse = () => {
  const navigate = useNavigate();
  const bgRef = useRef(null);
  const id = useParams().id;
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [assignTo, setAssignTo] = useState("");
  const [error, setError] = useState("");
  const [profileId, setProfileId] = useState("");
  const [previewData, setPreviewData] = useState({});

  const teachers = useSelector((state) => state.admin.teachers);

  useEffect(() => {
    setError("");
  }, [title, code, assignTo]);

  useEffect(() => {
    if (!profileId) return;
    setPreviewData(
      teachers.filter((user) => {
        return user._id === profileId;
      })?.[0] || {}
    );
  }, [profileId]);

  const createHandler = async (e) => {
    e.preventDefault();
    const [error, message] = validateInput();
    if (error) return setError(message);

    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER}/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          code,
          assignTo,
        }),
      });
    } catch (error) {
      setError(error.message);
    }
  };

  const editHandler = async (e) => {
    e.preventDefault();
    const [error, message] = validateInput();
    if (error) return setError(message);

    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER}/`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          code,
          assignTo,
        }),
      });
    } catch (error) {
      setError(error.message);
    }
  };

  const validateInput = () => {
    if (!title) return [true, "Course title cannot be empty"];
    if (!code) return [true, "Course code cannot be empty"];
    if (!/^[A-Za-z]+ *[0-9]+$/.test(code))
      return [true, "Course code is invalid"];
    return [false, ""];
  };

  return (
    <div
      className="course__new"
      onClick={() => navigate("/dashboard/courses", { replace: true })}
      ref={bgRef}
    >
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
            Course Title
            <input
              placeholder="Trigonometry"
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label>
            Course Code
            <input
              placeholder="MATH 203"
              value={code}
              onChange={(e) => setCode(e.target.value)}
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
              <p>Department:<span>{previewData.department}</span></p>
            </div>
          )}
          <label>
            Assign to
            <div className="assign__to__container">
              <select
                value={assignTo}
                onChange={(e) => setAssignTo(e.target.value)}
              >
                <option value={""}>Not assigned</option>
                <option value={"qwertyuiop"}>Ebiesuwa (1 remaining)</option>
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
        </form>
      </div>
    </div>
  );
};

export default NewCourse;
