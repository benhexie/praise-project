import { Outlet } from "react-router-dom";
import "./FormPage.css";

const FormPage = () => {
  return (
    <div className="formpage">
      <Outlet />
    </div>
  );
};

export default FormPage;
