import "./StaffDashboard.css";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import LecturerSearch from "../components/LecturerSearch";

const StaffDashboard = () => {
  const indicatorRef = useRef(null);
  const [indicatorWidth, setIndicatorWidth] = useState(0);
  const user = useSelector((state) => state.general.user);
  const professional = useSelector((state) => state.user.professional);
  const [isProfileComplete] = useState(() => {
    return user.firstname &&
      user.lastname &&
      user.phone &&
      user.age &&
      user.origin &&
      user.nationality
      ? true
      : false;
  });
  const [maxIndicatorWidth] = useState(() => {
    let max = 30;
    if (user.image) max += 10;
    if (isProfileComplete) max += 20;
    if (professional.education.length > 0) max += 20;
    if (professional.experience.length > 0) max += 20;
    return max;
  });
  const courses = useSelector((state) => state.user.courses);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndicatorWidth((prev) => {
        if (prev === maxIndicatorWidth) return prev;
        const next = prev + 1;
        if (next >= maxIndicatorWidth) clearInterval(intervalId);
        return next;
      });
    }, 10);
  }, []);

  return (
    <div className="user__dashboard">
      <Header />
      <div className="dashboard__container">
        <div className="profile__complete__indicator">
          <div ref={indicatorRef} style={{ width: `${indicatorWidth}%` }}>
            <span>{indicatorWidth}%</span>
          </div>
        </div>
        <div className="profile__complete__indicator__list__container">
          <ul>
            <li>
              <input
                type="checkbox"
                checked={isProfileComplete}
                onChange={() => {}}
              />
              <Link to={"/dashboard/profile"}>
                Complete profile information
              </Link>
            </li>
            <li>
              <input
                type="checkbox"
                checked={user.image ? true : false}
                onChange={() => {}}
              />
              <Link to={"/dashboard/profile"}>Add profile picture</Link>
            </li>
            <li>
              <input
                type="checkbox"
                checked={professional.education.length > 0 ? true : false}
                onChange={() => {}}
              />
              <Link to={"/dashboard/portfolio/add/education"}>
                Add education
              </Link>
            </li>
            <li>
              <input
                type="checkbox"
                checked={professional.experience.length > 0 ? true : false}
                onChange={() => {}}
              />
              <Link to={"/dashboard/portfolio/add/experience"}>
                Add professional experience
              </Link>
            </li>
          </ul>
        </div>
        <div className="user-dashboard__info__container">
          {courses.length > 0 ? (
            <div className="user-dashboard__courses__container">
              <table>
                <thead>
                  <tr>
                    <th>Code</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Credits</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course) => (
                    <tr key={course._id}>
                      <td>{course.code}</td>
                      <td>{course.title}</td>
                      <td>{course.description}</td>
                      <td>{course.credits}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="no__assigned__text">
              No courses have been assigned to you.
            </p>
          )}
          <div className="user-manage__container">
            <Link to={"/dashboard/portfolio"}>Manage Portfolio</Link>
            <Link to={"/dashboard/profile"}>Manage Profile</Link>
          </div>
        </div>
        {user.role === "viewer" && <LecturerSearch />}
      </div>
    </div>
  );
};

export default StaffDashboard;
