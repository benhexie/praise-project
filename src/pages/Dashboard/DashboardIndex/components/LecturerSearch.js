import React from "react";
import { BsBell, BsBellFill } from "react-icons/bs";
import { FiFilter } from "react-icons/fi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const LecturerSearch = () => {
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const staffs = useSelector((state) => state.admin.staffs);

  return (
    <div className="admin-dashboard__lecturer">
      <div className="admin-dashboard__lecturer-overview">
        <div className="admin-dashboard__lecturer-search">
          <h3>Search staff</h3>
          <div className="courses__search__container">
            <select onChange={(e) => setFilter(e.target.value)} value={filter}>
              <option value={""}>All</option>
              <option value={"name"}>Name</option>
            </select>
            <input
              placeholder="Search staff"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
          </div>
          <div className="admin-dashboard__lecturer-search-results">
            <h3>Search results</h3>
            <div className="scrollable admin-dashboard__lecturer-search-results-container">
              <div>
                {staffs.length > 0 ? (
                  staffs
                    .filter((staff) => {
                      const regex = new RegExp(
                        search.replace(/ +/, " ").trim(),
                        "i",
                      );
                      if (search.trim()) {
                        if (filter === "name") {
                          const firstname = staff.firstname;
                          const lastname = staff.lastname;
                          const name = `${firstname} ${lastname}`;
                          const nameRev = `${lastname} ${firstname}`;
                          return regex.test(name) || regex.test(nameRev);
                        }
                      }
                      return true;
                    })
                    .map((staff) => (
                      <div
                        key={staff._id}
                        className="admin-dashboard__lecturer-search-results-item"
                      >
                        <h3>
                          {staff.firstname} {staff.lastname}
                        </h3>
                        <button
                          className="admin-dashboard__lecturer-search-results-button"
                          onClick={() =>
                            navigate(`/dashboard/staff/${staff._id}`)
                          }
                        >
                          View
                        </button>
                      </div>
                    ))
                ) : (
                  <h3>No staff found</h3>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LecturerSearch;
