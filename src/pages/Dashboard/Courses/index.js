import "./Courses.css";
import { Link, Outlet } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { useSelector } from "react-redux";

const Courses = () => {
  const courses = useSelector((state) => state.admin.courses);

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
          {courses.length === 0 ? (
            <div className="courses__no-courses">
              <h3>No courses available</h3>
              <Link to={"new"}>Create new course</Link>
            </div>
          ) : (
            courses.map((course) => (
              <Link
                key={course._id}
                to={course._id}
                className="card courses__course__card"
              >
                <h3 className="courses__course__name">{course.code}</h3>
                <label>
                  Assigned
                  <input type="checkbox" checked={course.assignedTo ? true : false} />
                </label>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Courses;
