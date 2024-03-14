import "./Portfolio.css";
import { useSelector } from "react-redux";
import User from "../../../assets/svgs/user.svg";
import { IoAddOutline } from "react-icons/io5";
import ErrorPage from "../../Error/ErrorPage";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { Fragment } from "react";

const Portfolio = () => {
  const navigate = useNavigate();
  const school = useSelector((state) => state.general.school);
  let { category, id, staffId } = useParams();
  const user = useSelector((state) =>
    staffId
      ? state.admin.staffs.find((staff) => staff._id === staffId)
      : state.general.user,
  );
  const professional = useSelector((state) =>
    staffId
      ? state.admin.staffs.find((staff) => staff._id === staffId)
      : state.user.professional,
  );
  if (staffId) id = staffId;

  return (
    <div className="professional">
      {!category && !id && <Outlet />}
      <div className="dashboard__header profile__header">
        <h1>Portfolio</h1>
      </div>
      <div className="dashboard__container">
        <section className="profile__section">
          <div className="dashboard__section__item professional__image__container">
            <img src={user.image || User} alt="profile" />
          </div>
          <div className="dashboard__section__content">
            <h2>
              {user.firstname} {user.lastname}
            </h2>
            <p>{user.email}</p>
            <p style={{ textTransform: "capitalize" }} className="school__txt">
              {school.name}, {school.address}
            </p>
          </div>
        </section>
        <div className="dashboard__section experience__section">
          {!staffId && !professional.experience?.length ? (
            <div
              className="experience__section__item professional__section__item--empty"
              onClick={() => navigate("add/experience")}
            >
              <h2>No experience added yet</h2>
              <IoAddOutline />
            </div>
          ) : (
            <div className="experience__section__item">
              <div className="dashboard__section__header">
                <h2>Experience</h2>
                {!staffId && (
                  <div className="dashboard__section__header__actions">
                    <IoAddOutline
                      className="dashboard__section__header__action"
                      onClick={() => navigate("add/experience")}
                    />
                  </div>
                )}
              </div>
              <div className="dashboard__section__content">
                {professional.experience
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                  .map((experience) => (
                    <div
                      className={`dashboard__section__content__item ${
                        category === "experience" ? "active" : ""
                      }`}
                      key={experience._id}
                      onClick={() => navigate(`experience/${experience._id}`)}
                    >
                      {category === "experience" ? (
                        <Outlet />
                      ) : (
                        <Fragment>
                          <h3>{experience.company}</h3>
                          <p>{experience.title}</p>
                        </Fragment>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
        <div className="dashboard__section education__section">
          {!staffId && !professional.education?.length ? (
            <div
              className="education__section__item professional__section__item--empty"
              onClick={() => navigate("add/education")}
            >
              <h2>No education added yet</h2>
              <IoAddOutline />
            </div>
          ) : (
            <div className="education__section__item">
              <div className="dashboard__section__header">
                <h2>Education</h2>
                {!staffId && (
                  <div className="dashboard__section__header__actions">
                    <IoAddOutline
                      className="dashboard__section__header__action"
                      onClick={() => navigate("add/education")}
                    />
                  </div>
                )}
              </div>
              <div className="dashboard__section__content">
                {professional.education
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                  .map((education) => {
                    return (
                      <div
                        className={`dashboard__section__content__item ${
                          category === "education" ? "active" : ""
                        }`}
                        key={education._id}
                        onClick={() => navigate(`education/${education._id}`)}
                      >
                        {category === "education" ? (
                          <Outlet />
                        ) : (
                          <Fragment>
                            <h3>{education.school}</h3>
                            <p>{education.degree}</p>
                          </Fragment>
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>
          )}
        </div>
        <div className="dashboard__section projects__section">
          {!staffId && !professional.catalog?.length ? (
            <div
              className="projects__section__item professional__section__item--empty"
              onClick={() => navigate("add/catalog")}
            >
              <h2>Catalog is empty</h2>
              <IoAddOutline />
            </div>
          ) : (
            <div className="projects__section__item">
              <div className="dashboard__section__header">
                <h2>Catalog</h2>
                {!staffId && (
                  <div className="dashboard__section__header__actions">
                    <IoAddOutline
                      className="dashboard__section__header__action"
                      onClick={() => navigate("add/catalog")}
                    />
                  </div>
                )}
              </div>
              <div className="dashboard__section__content">
                {professional.catalog
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                  .map((catalog) => (
                    <div
                      className={`dashboard__section__content__item ${
                        category === "catalog" ? "active" : ""
                      }`}
                      key={catalog._id}
                      onClick={() => navigate(`catalog/${catalog._id}`)}
                    >
                      {category === "catalog" ? (
                        <Outlet />
                      ) : (
                        <Fragment>
                          <h3>{catalog.name}</h3>
                          <p>{catalog.description}</p>
                          {catalog.links &&
                            catalog.links.length > 0 &&
                            catalog.links.map((link, index) => (
                              <span key={index}>
                                <a href={link} target="_blank" rel="noreferrer">
                                  {link}
                                </a>
                              </span>
                            ))}
                        </Fragment>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
