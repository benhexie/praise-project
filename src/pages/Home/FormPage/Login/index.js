import { useState } from "react";
import Button from "../../../../components/Button/Button";
import Input from "../../../../components/Input/Input";
import "./Login.css";
import { MdPassword } from "react-icons/md";
import { FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import { BsQuestionLg } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SERVER = process.env.REACT_APP_SERVER;

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    if (!validateInput()) return;

    setLoading(true);
    try {
      const res = await fetch(`${SERVER}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.error) return toast.error(data.message);
      localStorage.setItem("token", data.data.token);
      toast.success("Login successful");
      navigate("/dashboard");
    } catch (err) {
      setLoading(false);
      if (/failed to fetch|network error/i.test(err.message)) {
        return toast.error("Please check your internet connection.");
      }
      toast.error("Something went wrong");
      console.log(err.message);
    }
  };

  function validateInput() {
    let errorObj = {};
    if (!email) {
      errorObj.email = "Email is required";
    }
    if (
      email &&
      !new RegExp(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+\.[a-z]+$/).test(email)
    )
      errorObj.email = "Email is invalid.";
    if (!password) {
      errorObj.password = "Password is required";
    }
    if (password && password.length < 8)
      errorObj.password = "Password must be at least 8 characters.";
    setError(errorObj);
    if (Object.keys(errorObj).length > 0) {
      return false;
    }
    return true;
  }

  return (
    <div className="login">
      <h1>Login</h1>
      <div className="form__container">
        <form onSubmit={handleSubmit}>
          <Input
            LeftIcon={FaEnvelope}
            error={error}
            setError={setError}
            type="text"
            label="E-mail"
            placeholder="Enter your email"
            name="email"
            className="form__item"
            value={email}
            setValue={setEmail}
          />
          <Input
            error={error}
            setError={setError}
            LeftIcon={MdPassword}
            RightIcon={showPassword ? FaEyeSlash : FaEye}
            rightIconOptions={{
              onClick: () => {
                setShowPassword(!showPassword);
              },
            }}
            type={showPassword ? "text" : "password"}
            label="Password"
            placeholder="Enter your password"
            name="password"
            className="form__item"
            value={password}
            setValue={setPassword}
          />
          <Button disabled={loading}>Login</Button>
          <p className="form__footer">
            Don't have an account? <Link to="/signup">Signup</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
