import "./EducationOverlay.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";
import { updateEducation } from "../../../../redux/actions";
import { useDispatch } from "react-redux";

const SERVER = process.env.REACT_APP_SERVER;

const EducationOverlay = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [school, setSchool] = useState("");
  const [degree, setDegree] = useState("");
  const [fieldofstudy, setFieldofstudy] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [grade, setGrade] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const education = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      grade,
      description,
    };
    try {
      const response = await fetch(`${SERVER}/api/profile/education`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(education),
      });
      const data = await response.json();
      if (data.error) return toast.error(data.message);
      dispatch(updateEducation(data.data));
      toast.success("Education added successfully");
      navigate("/dashboard/professional");
    } catch (error) {
      if (/failed to fetch|network error/i.test(error.message))
        return toast.error("Please check your internet connection");
      console.log(error.message);
      toast.error("Something went wrong");
    }
  };

  function validateForm() {
    if (school === "") {
      toast.error("School is required");
      return false;
    }
    if (from === "") {
      toast.error("Start date is required");
      return false;
    }
    if (to === "") {
      toast.error("End date is required");
      return false;
    }
    return true;
  }

  return (
    <div className="dashboard__overlay education__overlay">
      <div className="dashboard__overlay__header">
        <h2>Add Education</h2>
        <IoMdClose
          className="dashboard__overlay__close"
          onClick={() => navigate("/dashboard/professional")}
        />
      </div>
      <div className="dashboard__overlay__content">
        <small>* indicates required</small>
        <form className="dashboard__overlay__form" onSubmit={handleSubmit}>
          <div className="dashboard__overlay__form__group">
            <label htmlFor="school">
              School
              <span className="dashboard__overlay__form__group__required">
                *
              </span>
            </label>
            <input
              type="text"
              name="school"
              id="school"
              placeholder="School"
              value={school}
              onChange={(e) => setSchool(e.target.value)}
            />
          </div>
          <div className="dashboard__overlay__form__group">
            <label htmlFor="degree">Degree</label>
            <input
              type="text"
              name="degree"
              id="degree"
              placeholder="Degree"
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
            />
          </div>
          <div className="dashboard__overlay__form__group">
            <label htmlFor="fieldofstudy">Field of Study</label>
            <input
              type="text"
              name="fieldofstudy"
              id="fieldofstudy"
              placeholder="Field of Study"
              value={fieldofstudy}
              onChange={(e) => setFieldofstudy(e.target.value)}
            />
          </div>
          <div className="dashboard__overlay__form__group">
            <label htmlFor="from">
              Start Date{" "}
              <span className="dashboard__overlay__form__group__required">
                *
              </span>
            </label>
            <input
              type="date"
              name="from"
              id="from"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
          </div>
          <div className="dashboard__overlay__form__group">
            <label htmlFor="to">
              End Date (or expected){" "}
              <span className="dashboard__overlay__form__group__required">
                *
              </span>
            </label>
            <input
              type="date"
              name="to"
              id="to"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
          </div>
          <div className="dashboard__overlay__form__group">
            <label htmlFor="grade">Grade</label>
            <input
              type="text"
              name="grade"
              id="grade"
              placeholder="Grade"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
            />
          </div>
          <div className="dashboard__overlay__form__group">
            <label htmlFor="description">Description</label>
            <textarea
              ref={(el) =>
                el ? (el.style.height = el.scrollHeight + "px") : ""
              }
              name="description"
              id="description"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="dashboard__overlay__form__group">
            <input type="submit" value="Add Education" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EducationOverlay;
