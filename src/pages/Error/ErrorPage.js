import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import "./ErrorPage.css";

const ErrorPage = ({
  to="/",
  btnText="Go to homepage",
}) => {
  const navigate = useNavigate();
  return (
    <div className="errorpage">
      <h1>404</h1>
      <h2>Page not found</h2>
      <Button onClick={() => navigate(to)}>{btnText}</Button>
    </div>
  );
};

export default ErrorPage;
