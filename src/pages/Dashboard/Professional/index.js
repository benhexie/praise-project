import { useSelector } from "react-redux";
import "./Professional.css";
import User from "../../../assets/svgs/user.svg";
import { IoAddOutline } from "react-icons/io5";
import ErrorPage from "../../Error/ErrorPage";

const Professional = () => {
  const user = useSelector((state) => state.user);
  const school = useSelector((state) => state.school);
  const professional = useSelector((state) => state.professional);
  return (
    <>
      {user.role === "admin" ? (
        <ErrorPage to="/dashboard" btnText="Go to dashboard" />
      ) : (
        <div className="professional">
      <div className="dashboard__header profile__header">
        <h1>Professional Information</h1>
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
          {!professional.experiences?.length ? (
            <div className="experience__section__item professional__section__item--empty">
              <h2>No experience added yet</h2>
              <IoAddOutline />
            </div>
          ) : (
            <div className="experience__section__item">
              <div className="dashboard__section__header">
                <h2>Experience</h2>
                <div className="dashboard__section__header__actions">
                  <IoAddOutline className="dashboard__section__header__action" />
                </div>
              </div>
              <div className="dashboard__section__content">
                {professional.experiences.map((experience) => (
                  <div className="experience__section__content__item">
                    <h3>{experience.title}</h3>
                    <p>{experience.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="dashboard__section education__section">
          {!professional.educations?.length ? (
            <div className="education__section__item professional__section__item--empty">
              <h2>No education added yet</h2>
              <IoAddOutline />
            </div>
          ) : (
            <div className="education__section__item">
              <div className="dashboard__section__header">
                <h2>Education</h2>
                <div className="dashboard__section__header__actions">
                  <IoAddOutline className="dashboard__section__header__action" />
                </div>
              </div>
              <div className="dashboard__section__content">
                {professional.educations.map((education) => (
                  <div className="education__section__content__item">
                    <h3>{education.title}</h3>
                    <p>{education.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        {/* projects and publications */}
        <div className="dashboard__section projects__section">
          {!professional.projects?.length ? (
            <div className="projects__section__item professional__section__item--empty">
              <h2>No projects or publications added yet</h2>
              <IoAddOutline />
            </div>
          ) : (
            <div className="projects__section__item">
              <div className="dashboard__section__header">
                <h2>Projects and Publications</h2>
                <div className="dashboard__section__header__actions">
                  <IoAddOutline className="dashboard__section__header__action" />
                </div>
              </div>
              <div className="dashboard__section__content">
                {professional.projects.map((project) => (
                  <div className="projects__section__content__item">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
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

export default Professional;
