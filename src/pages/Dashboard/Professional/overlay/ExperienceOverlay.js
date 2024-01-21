import "./ExperienceOverlay.css";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { updateExperience } from "../../../../redux/actions";
import { useDispatch } from "react-redux";

const SERVER = process.env.REACT_APP_SERVER;

const ExperienceOverlay = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [company, setCompany] = useState("");
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [current, setCurrent] = useState(false);
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const experience = {
      company,
      title,
      location,
      from,
      to,
      current,
      description,
    };
    try {
      const response = await fetch(`${SERVER}/api/profile/experience`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(experience),
      });
      const data = await response.json();
      if (data.error) return toast.error(data.message);
      dispatch(updateExperience(data.data));
      toast.success("Experience added successfully");
      navigate("/dashboard/professional");
    } catch (error) {
      if (/failed to fetch|network error/i.test(error.message))
        return toast.error("Please check your internet connection");
      console.log(error.message);
      toast.error("Something went wrong");
    }
  };

  function validateForm() {
    if (company === "") {
      toast.error("Company is required");
      return false;
    }
    if (title === "") {
      toast.error("Title is required");
      return false;
    }
    if (from === "") {
      toast.error("Starting date is required");
      return false;
    }
    if (!current && to === "") {
      toast.error("Ending date is required");
      return false;
    }
    return true;
  }

  return (
    <div className="dashboard__overlay experience__overlay">
      <div className="dashboard__overlay__header">
        <h2>Add Experience</h2>
        <IoMdClose
          className="dashboard__overlay__close"
          onClick={() => navigate("/dashboard/professional")}
        />
      </div>
      <div className="dashboard__overlay__content">
        <small>* indicates required</small>
        <form className="dashboard__overlay__form" onSubmit={handleSubmit}>
          <div className="dashboard__overlay__form__group">
            <label htmlFor="company">
              Company
              <span className="dashboard__overlay__form__group__required">
                *
              </span>
            </label>
            <input
              type="text"
              name="company"
              id="company"
              placeholder="Company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>
          <div className="dashboard__overlay__form__group">
            <label htmlFor="title">
              Job Title{" "}
              <span className="dashboard__overlay__form__group__required">
                *
              </span>
            </label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Job Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="dashboard__overlay__form__group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              name="location"
              id="location"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="dashboard__overlay__form__group">
            <label htmlFor="from">
              From{" "}
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
              To{" "}
              {!current && (
                <span className="dashboard__overlay__form__group__required">
                  *
                </span>
              )}
            </label>
            <input
              type="date"
              name="to"
              id="to"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              disabled={current}
            />
          </div>
          <div
            className="dashboard__overlay__form__group"
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <input
              type="checkbox"
              name="current"
              id="current"
              checked={current}
              onChange={(e) => setCurrent(e.target.checked)}
            />
            <span>I currently work here</span>
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
            <input type="submit" value="Add Experience" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExperienceOverlay;
