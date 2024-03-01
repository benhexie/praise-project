import "./Courses.css";
import { Link, Outlet } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useState } from "react";
import { CiViewTable } from "react-icons/ci";

const Courses = () => {
  const courses = useSelector((state) => state.admin.courses);
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");

  return (
    <div className="courses">
      <div className="dashboard__header courses__header">
        <h1>Courses</h1>
        <Link className="courses__header__link table" to={"table"}>
          <CiViewTable />
        </Link>
        <Link className="courses__header__link" to={"new"}>
          <p>Create new course</p>
          <AiOutlinePlus />
        </Link>
      </div>
      <Outlet />
      <div className="courses__wrapper">
        <div className="courses__search__container">
          <select onChange={(e) => setFilter(e.target.value)} value={filter}>
            <option value={""}>All</option>
            <option value={"code"}>Course code</option>
            <option value={"title"}>Course title</option>
          </select>
          <input
            placeholder="Search courses"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="scrollablle courses__container">
          {courses.length === 0 ? (
            <div className="courses__no-courses">
              <h3>No courses available</h3>
              <Link to={"new"}>Create new course</Link>
            </div>
          ) : (
            courses
              .filter((course) => {
                const regex = new RegExp(search.trim(), "i");
                if (search.trim()) {
                  if (filter === "code") return regex.test(course.code);
                  if (filter === "title") return regex.test(course.title);
                }
                return true;
              })
              .map((course) => (
                <Link
                  key={course._id}
                  to={course._id}
                  className="card courses__course__card"
                >
                  <h3 className="courses__course__name">{course.code}</h3>
                  <label>
                    Assigned
                    <input
                      type="checkbox"
                      checked={course.assignedTo ? true : false}
                      onChange={() => {}}
                    />
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
