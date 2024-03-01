import "./CoursesTable.css";
import { useDispatch, useSelector } from "react-redux";
import { MdDownload } from "react-icons/md";
import { useDownloadExcel } from "react-export-table-to-excel";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteCourse } from "../../../redux/actions";
import { toast } from "react-toastify";
import ConfirmationBox from "../../../components/Dialog/ConfirmationBox";

const CoursesTable = () => {
  const courses = useSelector((state) => state.admin.courses);
  const staffs = useSelector((state) => state.admin.staffs);
  const user = useSelector((state) => state.general.user);
  const [showDialog, setShowDialog] = useState(false);
  const tableRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: "Courses",
    sheet: "Courses",
  });

  const deleteCourseFtn = async (id) => {
    if (!showDialog) {
      setShowDialog(true);
      return;
    }

    try {
      const res = await fetch(`${process.env.REACT_APP_SERVER}/course/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      if (data.error) return toast.error(data.message);
      dispatch(deleteCourse(id));
      toast.success(data.message);
      setShowDialog(false);
    } catch (err) {
      if (/failed to fetch|network error/i.test(err.message)) {
        return toast.error("Please check your internet connection.");
      }
      toast.error("Something went wrong");
      console.error(err.message);
    }
  };

  return (
    <div className="courses__table">
      <div className="dashboard__header courses__header courses__table__header">
        <h1>Courses</h1>
        <button
          className="courses__header__link courses__table__header__btn"
          onClick={onDownload}
        >
          <MdDownload />
          <p>Download</p>
        </button>
      </div>
      <div className="courses__table__container">
        <div className="scrollable">
          <div>
            <table ref={tableRef}>
              <thead>
                <tr>
                  <th>Course code</th>
                  <th>Course title</th>
                  <th>Description</th>
                  <th>Assigned to</th>
                  {user.role === "admin" && <th>Actions</th>}
                </tr>
              </thead>
              <tbody>
                {courses.length === 0 && (
                  <tr className="courses__table__no-courses">
                    <td colSpan="5">No courses available</td>
                  </tr>
                )}
                {courses.map((course) => (
                  <tr key={course._id}>
                    <td>{course.code}</td>
                    <td>{course.title}</td>
                    <td>{course.description}</td>
                    <td>
                      {(() => {
                        const staff = staffs.find(
                          (staff) => staff._id === course.assignedTo,
                        );
                        return staff
                          ? `${staff.firstname} ${staff.lastname}`
                          : "N/A";
                      })()}
                    </td>
                    {user.role === "admin" && (
                      <td className="courses__table__actions">
                        {showDialog && (
                          <ConfirmationBox
                            message="Are you sure you want to delete this course?"
                            onConfirm={() => deleteCourseFtn(course._id)}
                            onCancel={() => setShowDialog(false)}
                          />
                        )}
                        <button
                          onClick={() =>
                            navigate(`/dashboard/courses/${course._id}`)
                          }
                        >
                          View
                        </button>
                        <button onClick={() => deleteCourseFtn(course._id)}>
                          Delete
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursesTable;
