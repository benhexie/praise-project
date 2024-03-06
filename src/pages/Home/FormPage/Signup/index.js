import { useEffect, useState } from "react";
import Button from "../../../../components/Button/Button";
import Input from "../../../../components/Input/Input";
import "./Signup.css";
import { FaUser } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoMdKey } from "react-icons/io";
import { FaBuilding } from "react-icons/fa";
import { PiAddressBookFill } from "react-icons/pi";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const SERVER = process.env.REACT_APP_SERVER;

const Signup = () => {
  const navigate = useNavigate();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(""); // ["staff", "school"]
  const [school, setSchool] = useState("");
  const [schools, setSchools] = useState([]); // [{_id, name}]
  const [address, setAddress] = useState("");
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({});

  useEffect(() => {
    setToken("");
    setSchool("");
    setAddress("");

    if (role === "staff") {
      fetch(`${SERVER}/schools`)
        .then((res) => res.json())
        .then((data) => {
          if (data.error) return toast.error(data.message);
          setSchools(data.data);
        })
        .catch((err) => {
          console.log(err.message);
          toast.error("Something went wrong. Please try again.");
        });
    }
  }, [role]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    if (!validateInput()) return;

    setLoading(true);
    try {
      const res = await fetch(`${SERVER}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstname,
          lastname,
          email,
          role,
          password,
          school,
          address,
          token,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.error) return toast.error(data.message);
      toast.success(data.message);
      navigate("/login");
    } catch (err) {
      setLoading(false);
      if (/failed to fetch|network error/i.test(err.message)) {
        return toast.error("Please check your internet connection.");
      }
      console.log(err.message);
      toast.error("Something went wrong. Please try again.");
    }
  };

  function validateInput() {
    let errorObj = {};
    if (!firstname) errorObj.firstname = "First name is required.";
    if (firstname && !new RegExp(/^[a-zA-Z]+$/).test(firstname))
      errorObj.firstname = "First name is invalid.";
    if (!lastname) errorObj.lastname = "Last name is required.";
    if (lastname && !new RegExp(/^[a-zA-Z]+$/).test(lastname))
      errorObj.lastname = "Last name is invalid.";
    if (!email) errorObj.email = "Email is required.";
    if (
      email &&
      !new RegExp(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+\.[a-z]+$/).test(email)
    )
      errorObj.email = "Email is invalid.";
    if (!role) errorObj.role = "Role is required.";
    if (role && ["staff", "school"].includes(role) === false)
      errorObj.role = "Role is invalid.";
    if (!password) errorObj.password = "Password is required.";
    if (password && password.length < 8)
      errorObj.password = "Password must be at least 8 characters.";
    if (!confirm) errorObj.confirm = "Confirm password is required.";
    if (password !== confirm) errorObj.confirm = "Password does not match.";
    if (role === "staff" && !school) errorObj.school = "School is required.";
    if (role === "staff" && !token) errorObj.token = "Token is required.";
    if (role === "school" && !school) errorObj.school = "School is required.";
    if (role === "school" && !address)
      errorObj.address = "Address is required.";
    setError(errorObj);
    return Object.keys(errorObj).length === 0;
  }

  return (
    <div className="signup">
      <h1>Signup</h1>
      <div className="form__container">
        <form onSubmit={handleSubmit}>
          <Input
            error={error}
            setError={setError}
            LeftIcon={FaUser}
            type="text"
            label="First Name"
            placeholder="Enter your first name"
            name="firstname"
            className="form__item"
            value={firstname}
            setValue={setFirstname}
          />
          <Input
            error={error}
            setError={setError}
            LeftIcon={FaUser}
            type="text"
            label="Last Name"
            placeholder="Enter your last name"
            name="lastname"
            className="form__item"
            value={lastname}
            setValue={setLastname}
          />
          <Input
            error={error}
            setError={setError}
            LeftIcon={FaEnvelope}
            type="text"
            label="E-mail"
            placeholder="Enter your email"
            name="email"
            className="form__item"
            value={email}
            setValue={setEmail}
          />
          <div className="custom__input__wrapper">
            <label>Role</label>
            <select
              className="form__item form__select"
              value={role}
              onChange={(e) => {
                setRole(e.target.value);
                setError({ ...error, role: "" });
              }}
            >
              <option value="">Select role</option>
              <option value="staff">Staff</option>
              <option value="school">School</option>
            </select>
            {error.role && (
              <span className="custom__input__error">{error.role}</span>
            )}
          </div>
          {role === "staff" && (
            <div className="custom__input__wrapper">
              <label>School</label>
              <select
                className="form__item form__select"
                value={school}
                onChange={(e) => {
                  setSchool(e.target.value);
                  setError({ ...error, school: "" });
                }}
              >
                <option value="">Select school</option>
                {schools.map((school) => (
                  <option key={school._id} value={school._id}>
                    {school.name}
                  </option>
                ))}
              </select>
              {error.school && (
                <span className="custom__input__error">{error.school}</span>
              )}
            </div>
          )}
          {role === "staff" && (
            <Input
              error={error}
              setError={setError}
              LeftIcon={IoMdKey}
              type="text"
              label="Token"
              placeholder="Enter your token"
              name="token"
              className="form__item"
              value={token}
              setValue={setToken}
            />
          )}
          {role === "school" && (
            <Input
              error={error}
              setError={setError}
              LeftIcon={FaBuilding}
              type="text"
              label="School"
              placeholder="Enter your school"
              name="school"
              className="form__item"
              value={school}
              setValue={setSchool}
            />
          )}
          {role === "school" && (
            <Input
              error={error}
              setError={setError}
              LeftIcon={PiAddressBookFill}
              type="text"
              label="Address"
              placeholder="Enter your address"
              name="address"
              className="form__item"
              value={address}
              setValue={setAddress}
            />
          )}
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
          <Input
            error={error}
            setError={setError}
            LeftIcon={MdPassword}
            type={showPassword ? "text" : "password"}
            label="Confirm Password"
            placeholder="Confirm your password"
            name="confirm"
            className="form__item"
            value={confirm}
            setValue={setConfirm}
          />
          <Button disabled={loading}>
            {loading ? "Loading..." : "Signup"}
          </Button>
          <p className="form__footer">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
