import "./EducationOverlay.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";

const EducationOverlay = () => {
  const navigate = useNavigate();
  const [school, setSchool] = useState("");
  const [degree, setDegree] = useState("");
  const [fieldofstudy, setFieldofstudy] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [grade, setGrade] = useState("");
  const [description, setDescription] = useState("");

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
        <form className="dashboard__overlay__form">
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
