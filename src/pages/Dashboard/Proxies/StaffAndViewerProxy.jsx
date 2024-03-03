import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import ErrorPage from "../../Error/ErrorPage";

const StaffAndViewerProxy = () => {
  const user = useSelector((state) => state.general.user);

  return (
    <Fragment>
      {(() => {
        if (!["staff", "viewer"].includes(user.role)) return <ErrorPage />;

        return <Outlet />;
      })()}
    </Fragment>
  );
};

export default StaffAndViewerProxy;
