import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import ErrorPage from "../../Error/ErrorPage";

// Only allow admin to view route content
const AdminProxy = () => {
  const user = useSelector((state) => state.general.user);

  return (
    <Fragment>
      {(() => {
        if (user.role !== "admin") return <ErrorPage />;
        return <Outlet />;
      })()}
    </Fragment>
  );
};

export default AdminProxy;
