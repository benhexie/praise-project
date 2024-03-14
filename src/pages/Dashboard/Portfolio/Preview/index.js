import "./PortfolioPreview.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GoTrash } from "react-icons/go";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { deletePortfolioItem } from "../../../../redux/actions";

const PortfolioPreview = () => {
  const { staffId, category, id } = useParams();
  const navigate = useNavigate();
  const previewData = useSelector((state) =>
    !staffId
      ? state.user.professional[category].find((item) => item._id === id)
      : state.admin.staffs
          .find((staff) => staff._id === staffId)
          [category].find((item) => item._id === id),
  );
  const [deleting, setDeleting] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      dispatch({ type: "" });
    } catch (error) {}
  }, []);

  const renderExperience = () => {
    const exp = previewData;
    return (
      <div className="portfolio__item">
        <h3 className="portfolio__item-title">{exp.title}</h3>
        <p className="portfolio__item-company">{exp.company}</p>
        <p className="portfolio__item-location">{exp.location}</p>
        <p className="portfolio__item-dates">
          {formatDate(exp.from)} - {exp.to ? formatDate(exp.to) : "Present"}
        </p>
        <p className="portfolio__item-description">{exp.description}</p>
      </div>
    );
  };

  const renderEducation = () => {
    const edu = previewData;
    return (
      <div className="portfolio__item">
        <h3 className="portfolio__item-title">
          {edu.degree}
          {edu.field ? ` in ${edu.field}` : ""}
        </h3>
        <p className="portfolio__item-school">{edu.school}</p>
        <p className="portfolio__item-dates">
          {formatDate(edu.from)} - {formatDate(edu.to)}
        </p>
        <p className="portfolio__item-grade">{edu.grade}</p>
        <p className="portfolio__item-description">{edu.description}</p>
      </div>
    );
  };

  const renderCatalog = () => {
    const item = previewData;
    return (
      <div className="portfolio__item">
        <h3 className="portfolio__item-title">{item.name}</h3>
        <p className="portfolio__item-type">{item.type}</p>
        <p className="portfolio__item-dates">
          {formatDate(item.from)} - {item.to ? formatDate(item.to) : "Present"}
        </p>
        {item.description && (
          <p className="portfolio__item-description">{item.description}</p>
        )}
        {item.links && (
          <div className="portfolio__item-links">
            {item.links.map((link, idx) => (
              <a
                key={`link-${idx}`}
                href={link}
                className="portfolio__item-link"
              >
                {link}
              </a>
            ))}
          </div>
        )}
        {item.image && (
          <img
            src={item.image}
            alt={item.title}
            className="portfolio__item-image"
          />
        )}
      </div>
    );
  };

  const formatDate = (date) => {
    if (!date) return "";
    const formattedDate = new Date(date);
    return formattedDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      year: "numeric",
      month: "short",
    });
  };

  const deleteItem = async (e) => {
    e.stopPropagation();
    if (deleting) return;
    try {
      setDeleting(true);
      const response = await fetch(
        `${process.env.REACT_APP_SERVER}/api/portfolio/${category}/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      const data = await response.json();
      if (data.error) throw new Error(data.message);
      setDeleting(false);
      dispatch(deletePortfolioItem(category, id));
      navigate("/dashboard/portfolio", { replace: true });
    } catch (error) {
      console.log(error);
      setDeleting(false);
      if (/failed to fetch|network error/i.test(error.message))
        return toast.error("Check your internet connection and try again");
      toast.error(error.message);
    }
  };

  return (
    <div className="portfolio__preview">
      {category === "experience" && renderExperience()}
      {category === "education" && renderEducation()}
      {category === "catalog" && renderCatalog()}
      <button
        className="portfolio__preview__close"
        onClick={(e) => {
          e.stopPropagation();
          navigate(
            !staffId
              ? "/dashboard/portfolio"
              : `/dashboard/staff/${staffId}/portfolio`,
            { replace: true },
          );
        }}
      >
        Close
      </button>
      {!staffId && (
        <GoTrash className="portfolio__preview__delete" onClick={deleteItem} />
      )}
    </div>
  );
};

export default PortfolioPreview;
