import { useSelector } from "react-redux";
import "./Professional.css";

const Professional = () => {
  const user = useSelector((state) => state.user);
  return (
    <div className="professional">
      <div className="dashboard__header profile__header">
        <h1>Professional Information</h1>
      </div>
      <div className="dashboard__container"></div>
    </div>
  );
};

export default Professional;
