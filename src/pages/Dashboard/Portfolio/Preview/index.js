import "./PortfolioPreview.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const PortfolioPreview = () => {
  const { category, id } = useParams();
  const navigate = useNavigate();
  const previewData = useSelector((state) =>
    state.user.professional[category].find((item) => item._id === id),
  );

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

  return (
    <div className="portfolio__preview">
      {category === "experience" && renderExperience()}
      {category === "education" && renderEducation()}
      {category === "catalog" && renderCatalog()}
      <button
        className="portfolio__preview__close"
        onClick={(e) => {
          e.stopPropagation();
          navigate("/dashboard/portfolio", { replace: true });
        }}
      >
        Close
      </button>
    </div>
  );
};

export default PortfolioPreview;
