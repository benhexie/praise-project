import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import ErrorPage from "../../Error/ErrorPage";

const AdminAndViewerProxy = () => {
  const user = useSelector((state) => state.general.user);

  return (
    <Fragment>
      {(() => {
        if (!["admin", "viewer"].includes(user.role)) return <ErrorPage />;
        return <Outlet />;
      })()}
    </Fragment>
  );
};

export default AdminAndViewerProxy;
