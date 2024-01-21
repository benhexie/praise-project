import "./CatalogOverlay.css";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { IoMdAdd, IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";
import { updateCatalog } from "../../../../redux/actions";
import { useDispatch } from "react-redux";

const SERVER = process.env.REACT_APP_SERVER;

const ProjectsOverlay = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [type, setType] = useState("project"); // project, publication, patent
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [links, setLinks] = useState([]);
  const [link, setLink] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [current, setCurrent] = useState(false);
  const imageRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formData = new FormData();
    formData.append("type", type);
    formData.append("name", name);
    formData.append("description", description);
    if (link) {
      if (
        !links.includes(link) &&
        (() => {
          try {
            new URL(link);
            return true;
          } catch (error) {
            return false;
          }
        })()
      )
        formData.append("links", JSON.stringify(links.concat(link)));
      else formData.append("links", JSON.stringify(links));
    } else {
      formData.append("links", JSON.stringify(links));
    }
    formData.append("from", from);
    formData.append("to", to);
    formData.append("current", current);
    if (imageRef.current.files.length > 0)
      formData.append("image", imageRef.current.files[0]);

    try {
      const response = await fetch(`${SERVER}/api/profile/catalog`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });
      const data = await response.json();
      if (data.error) return toast.error(data.message);
      console.log(data.data);
      dispatch(updateCatalog(data.data));
      toast.success("Added to catalog successfully");
      navigate("/dashboard/professional");
    } catch (error) {
      if (/failed to fetch|network error/i.test(error.message))
        return toast.error("Please check your internet connection");
      console.log(error.message);
      toast.error("Something went wrong");
    }
  };

  function validateForm() {
    if (name === "") {
      toast.error("Name is required");
      return false;
    }
    if (from === "") {
      toast.error("From is required");
      return false;
    }
    if (!current && to === "") {
      toast.error("To is required");
      return false;
    }
    return true;
  }

  return (
    <div className="dashboard__overlay projects__overlay">
      <div className="dashboard__overlay__header">
        <h2>
          Add <span style={{ textTransform: "capitalize" }}>{type}</span> to
          Catalog
        </h2>
        <IoMdClose
          className="dashboard__overlay__close"
          onClick={() => navigate("/dashboard/professional")}
        />
      </div>
      <div className="dashboard__overlay__content">
        <small>* indicates required</small>
        <form className="dashboard__overlay__form" onSubmit={handleSubmit}>
          <div className="dashboard__overlay__form__group">
            <label htmlFor="type">
              Type{" "}
              <span className="dashboard__overlay__form__group__required">
                *
              </span>
            </label>
            <select
              name="type"
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="project">Project</option>
              <option value="publication">Publication</option>
              <option value="patent">Patent</option>
            </select>
          </div>
          <div className="dashboard__overlay__form__group">
            <label htmlFor="name">
              Name{" "}
              <span className="dashboard__overlay__form__group__required">
                *
              </span>
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
            <label htmlFor="links">Links</label>
            <div className="dashboard__overlay__form__group__links">
              {links.map((link) => (
                <div
                  className="dashboard__overlay__form__group__links__link"
                  key={link}
                >
                  <span>{link}</span>
                  <IoMdClose
                    onClick={() =>
                      setLinks((links) => links.filter((l) => l !== link))
                    }
                  />
                </div>
              ))}
            </div>
            <div className="dashboard__overlay__form__group__links__add">
              <input
                type="text"
                name="link"
                id="link"
                placeholder="Add Link"
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
              <span />
              <IoMdAdd
                onClick={() => {
                  setLinks((links) => {
                    if (
                      link &&
                      !links.includes(link) &&
                      (() => {
                        try {
                          new URL(link);
                          return true;
                        } catch (error) {
                          return false;
                        }
                      })()
                    ) {
                      setLink("");
                      return [...links, link];
                    }
                    return links;
                  });
                }}
              />
            </div>
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
            <span>I am currently working on this</span>
          </div>
          <div className="dashboard__overlay__form__group">
            <label htmlFor="image">Preview Image</label>
            <input
              type="file"
              name="image"
              id="image"
              accept="image/*"
              ref={imageRef}
            />
          </div>
          <div className="dashboard__overlay__form__group">
            <input type="submit" value="Add Project/Publication" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectsOverlay;
