import React from "react";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";

const SomethingWentWrong = () => {
  const navigate = useNavigate();
  return (
    <div className="errorpage">
      <h1>OOPS!</h1>
      <h2>Something went wrong. Please try again later.</h2>
      <Button onClick={() => {
        localStorage.removeItem("token");
        navigate("/login");
      }}>Go to login</Button>
    </div>
  );
};

export default SomethingWentWrong;
