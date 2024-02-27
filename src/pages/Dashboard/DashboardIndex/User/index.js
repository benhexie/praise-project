import { useSelector } from "react-redux";
import "./UserDashboard.css";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

const UserDashboard = () => {
  const indicatorRef = useRef(null);
  const [indicatorWidth, setIndicatorWidth] = useState(0);
  const [maxIndicatorWidth] = useState(30);
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
              <input type="checkbox" checked={false} onChange={() => {}} />
              <Link to={"/dashboard/profile"}>
                Complete profile information
              </Link>
            </li>
            <li>
              <input type="checkbox" checked={false} onChange={() => {}} />
              <Link to={"/dashboard/profile"}>Add profile picture</Link>
            </li>
            <li>
              <input type="checkbox" checked={false} onChange={() => {}} />
              <Link to={"/dashboard/portfolio/add/education"}>
                Add education
              </Link>
            </li>
            <li>
              <input type="checkbox" checked={false} onChange={() => {}} />
              <Link to={"/dashboard/portfolio/add/experience"}>
                Add professional experience
              </Link>
            </li>
          </ul>
        </div>
        <div className="user-dashboard__info__container">
          {courses.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>course code</th>
                  <th>course title</th>
                  <th>course description</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr key={course._id}>
                    <td>{course.code}</td>
                    <td>{course.title}</td>
                    <td>{course.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
      </div>
    </div>
  );
};

export default UserDashboard;
