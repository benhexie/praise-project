import "./ForgotPassword.css";
import Button from "../../../../components/Button/Button";
import Input from "../../../../components/Input/Input";
import { MdEmail } from "react-icons/md";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { GoArrowLeft } from "react-icons/go";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return setError({ email: "E-mail is required" });
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER}/auth/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
          }),
        },
      );
      const data = await res.json();
      setLoading(false);
      if (data.error) return setError({ email: data.message });
      toast.success(data.message);
      navigate("/login");
    } catch (err) {
      setLoading(false);
      if (/failed to fetch|network error/i.test(err.message)) {
        return toast.error("Please check your internet connection.");
      }
      toast.error("Something went wrong");
      console.error(err.message);
    }
  };

  return (
    <div className="forgot__password">
      <h1>Forgot Password</h1>
      <div className="form__container">
        <form onSubmit={handleSubmit}>
          <Input
            error={error}
            setError={setError}
            LeftIcon={MdEmail}
            type="text"
            label="E-mail"
            placeholder="Enter your e-mail"
            name="email"
            className="form__item"
            value={email}
            setValue={setEmail}
          />
          <Button disabled={loading}>Reset Password</Button>
          <Link to={"/login"} replace className="back__to__login__link">
            <GoArrowLeft />
            Back to login page
          </Link>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
