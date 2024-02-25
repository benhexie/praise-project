import "./Courses.css";
import { Link, Outlet } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";

const Courses = () => {
  return (
    <div className="courses">
      <div className="dashboard__header courses__header">
        <h1>Courses</h1>
        <Link className="courses__header__link" to={"new"}>
          <p>Create new course</p>
          <AiOutlinePlus />
        </Link>
      </div>
      <Outlet />
      <div className="courses__wrapper">
        <div className="courses__search__container">
          <select>
            <option value={""}>All</option>
            <option value={"code"}>Course code</option>
            <option value={"title"}>Course title</option>
          </select>
          <input placeholder="Search..." />
        </div>
        <div className="scrollablle courses__container">
          <div>
            <Link to={"qwertyuiop"} className="card courses__course__card">
              <h3 className="courses__course__name">Math 302</h3>
              <label>
                Assigned
                <input type="checkbox" />
              </label>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
