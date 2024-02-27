import "./Portfolio.css";
import { useSelector } from "react-redux";
import User from "../../../assets/svgs/user.svg";
import { IoAddOutline } from "react-icons/io5";
import ErrorPage from "../../Error/ErrorPage";
import { Outlet, useNavigate } from "react-router-dom";

const Portfolio = () => {
  const user = useSelector((state) => state.general.user);
  const navigate = useNavigate();
  const school = useSelector((state) => state.general.school);
  const professional = useSelector((state) => state.user.professional);

  return (
    <>
      {user.role === "admin" ? (
        <ErrorPage to="/dashboard" btnText="Go to dashboard" />
      ) : (
        <div className="professional">
          <Outlet />
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
                <p className="school__txt">
                  {school.name}, {school.address}
                </p>
              </div>
            </section>
            <div className="dashboard__section experience__section">
              {!professional.experience?.length ? (
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
                    <div className="dashboard__section__header__actions">
                      <IoAddOutline
                        className="dashboard__section__header__action"
                        onClick={() => navigate("add/experience")}
                      />
                    </div>
                  </div>
                  <div className="dashboard__section__content">
                    {professional.experience
                      .sort(
                        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                      )
                      .map((experience) => (
                        <div
                          className="dashboard__section__content__item"
                          key={experience._id}
                        >
                          <h3>{experience.company}</h3>
                          <p>{experience.title}</p>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
            <div className="dashboard__section education__section">
              {!professional.education?.length ? (
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
                    <div className="dashboard__section__header__actions">
                      <IoAddOutline
                        className="dashboard__section__header__action"
                        onClick={() => navigate("add/education")}
                      />
                    </div>
                  </div>
                  <div className="dashboard__section__content">
                    {professional.education
                      .sort(
                        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                      )
                      .map((education) => (
                        <div
                          className="dashboard__section__content__item"
                          key={education._id}
                        >
                          <h3>{education.school}</h3>
                          <p>{education.degree}</p>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
            <div className="dashboard__section projects__section">
              {!professional.catalog?.length ? (
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
                    <div className="dashboard__section__header__actions">
                      <IoAddOutline
                        className="dashboard__section__header__action"
                        onClick={() => navigate("add/catalog")}
                      />
                    </div>
                  </div>
                  <div className="dashboard__section__content">
                    {professional.catalog
                      .sort(
                        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                      )
                      .map((catalog) => (
                        <div
                          className="dashboard__section__content__item"
                          key={catalog._id}
                        >
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
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Portfolio;
