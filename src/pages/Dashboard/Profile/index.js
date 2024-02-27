import "./Profile.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setToken, updateUser } from "../../../redux/actions";
import { toast } from "react-toastify";
import { MdOutlineContentCopy } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import User from "../../../assets/svgs/user.svg";

const SERVER = process.env.REACT_APP_SERVER;

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.general.user);
  const schoolData = useSelector((state) => state.general.school);
  const [firstname, setFirstname] = useState(user.firstname);
  const [lastname, setLastname] = useState(user.lastname);
  const [age, setAge] = useState(user.age || "");
  const [origin, setOrigin] = useState(user.origin || "");
  const [nationality, setNationality] = useState(user.nationality || "");
  const [phone, setPhone] = useState(user.phone || "");
  const [school, setSchool] = useState(schoolData.name);
  const [address, setAddress] = useState(schoolData.address);
  const [generalChanged, setGeneralChanged] = useState(false);
  const [schoolChanged, setSchoolChanged] = useState(false);
  const [image, setImage] = useState(User);

  useEffect(() => {
    if (
      user.firstname !== firstname ||
      user.lastname !== lastname ||
      (user.age || "") !== age ||
      (user.origin || "") !== origin ||
      (user.nationality || "") !== nationality ||
      (user.phone || "") !== phone
    ) {
      setGeneralChanged(true);
    } else {
      setGeneralChanged(false);
    }

    if (schoolData.name !== school || schoolData.address !== address) {
      setSchoolChanged(true);
    } else {
      setSchoolChanged(false);
    }
  }, [
    firstname,
    lastname,
    school,
    age,
    origin,
    nationality,
    phone,
    address,
    school,
    address,
  ]);

  const generateToken = async () => {
    try {
      const res = await fetch(`${SERVER}/token`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      if (data.error) {
        toast.error(data.message);
      }
      dispatch(setToken(data.data.token));
    } catch (err) {
      if (/failed to fetch|network error/i.test(err.message)) {
        return toast.error("Please check your internet connection.");
      }
      toast.error("Something went wrong");
      console.error(err.message);
    }
  };

  const saveGeneral = async () => {
    try {
      const res = await fetch(`${SERVER}/user`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          firstname,
          lastname,
          age,
          origin,
          nationality,
          phone,
        }),
      });
      const data = await res.json();
      if (data.error) {
        return toast.error(data.message);
      }
      dispatch(updateUser(data.data));
      setGeneralChanged(false);
      toast.success("Saved");
    } catch (error) {}
  };

  const imageChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await fetch(`${SERVER}/user/image`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });
      const data = await res.json();
      if (data.error) {
        return toast.error(data.message);
      }
      dispatch(updateUser(data.data));
      toast.success("Image updated");
    } catch (error) {
      if (/failed to fetch|network error/i.test(error.message)) {
        return toast.error("Please check your internet connection.");
      }
      toast.error("Something went wrong");
      console.log(error.message);
    }
  };

  return (
    <div className="profile">
      <div className="dashboard__header profile__header">
        <h1>Profile</h1>
      </div>
      <div className="dashboard__container">
        <section className="profile__section">
          <label className="profile__image__container">
            <input type="file" hidden onChange={imageChange} />
            <label className="dashboard__section__item profile__image__label">
              <img src={user.image || image} alt="profile" />
            </label>
            <p className="profile__image__text">
              Click to change profile picture
            </p>
          </label>
          <div className="profile__info">
            <div className="dashboard__section__item">
              <label>
                <span>Full Name</span>
                <input
                  type="text"
                  value={`${user.firstname} ${user.lastname}`}
                  disabled
                />
              </label>
            </div>
            <div className="dashboard__section__item">
              <label>
                <span>Email</span>
                <input type="text" value={user.email} disabled />
              </label>
            </div>
            <div className="dashboard__section__item">
              <label>
                <span>Role</span>
                <input type="text" value={user.role} disabled />
              </label>
            </div>
          </div>
        </section>
        <section className="dashboard__section general__section">
          <h2>General Information</h2>
          <div className="dashboard__section__content">
            <div className="dashboard__section__item">
              <label>
                <span>Email</span>
                <input type="text" value={user.email} disabled />
              </label>
            </div>
            <div className="dashboard__section__item">
              <label>
                <span>First Name</span>
                <input
                  type="text"
                  placeholder={user.firstname}
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                />
              </label>
            </div>
            <div className="dashboard__section__item">
              <label>
                <span>Last Name</span>
                <input
                  type="text"
                  placeholder={user.lastname}
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                />
              </label>
            </div>
            {user.role !== "admin" && (
              <>
                <div className="dashboard__section__item">
                  <label>
                    <span>Age</span>
                    <input
                      type="text"
                      placeholder={user.age || "Enter your age"}
                      value={age}
                      onChange={(e) => {
                        if (
                          /^\d+$/.test(e.target.value) ||
                          e.target.value === ""
                        )
                          setAge(e.target.value);
                      }}
                    />
                  </label>
                </div>
                <div className="dashboard__section__item">
                  <label>
                    <span>Origin</span>
                    <input
                      type="text"
                      placeholder={user.origin || "Enter your origin"}
                      value={origin}
                      onChange={(e) => setOrigin(e.target.value)}
                    />
                  </label>
                </div>
                <div className="dashboard__section__item">
                  <label>
                    <span>Nationality</span>
                    <input
                      type="text"
                      placeholder={user.nationality || "Enter your nationality"}
                      value={nationality}
                      onChange={(e) => setNationality(e.target.value)}
                    />
                  </label>
                </div>
                <div className="dashboard__section__item">
                  <label>
                    <span>Phone</span>
                    <input
                      type="text"
                      placeholder={user.phone || "Enter your phone number"}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </label>
                </div>
              </>
            )}
            <button
              className="dashboard__section__button"
              disabled={!generalChanged}
              onClick={saveGeneral}
            >
              Save
            </button>
          </div>
        </section>
        <section className="dashboard__section school__section">
          <h2>School Information</h2>
          <div className="dashboard__section__content">
            <div className="dashboard__section__item">
              <label>
                <span>Name</span>
                <input
                  type="text"
                  placeholder={schoolData.name}
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                  disabled={user.role === "admin" ? false : true}
                />
              </label>
            </div>
            <div className="dashboard__section__item">
              <label>
                <span>Address</span>
                <input
                  type="text"
                  placeholder={schoolData.address}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  disabled={user.role === "admin" ? false : true}
                />
              </label>
            </div>
            {user.role === "admin" && (
              <button
                className="dashboard__section__button"
                disabled={!schoolChanged}
              >
                Save
              </button>
            )}
          </div>
        </section>
        {user.role === "admin" && (
          <section className="dashboard__section token__section">
            <h2>Token Information</h2>
            <div className="dashboard__section__content">
              <div className="dashboard__section__item">
                <label>
                  <span>Token</span>
                  <div className="profile__input__container">
                    <input type="text" value={schoolData.token} disabled />
                    <MdOutlineContentCopy
                      onClick={() => {
                        navigator.clipboard.writeText(schoolData.token);
                        toast.success("Copied to clipboard");
                      }}
                    />
                  </div>
                </label>
                <button
                  className="dashboard__section__button"
                  onClick={generateToken}
                >
                  Generate New Token
                </button>
              </div>
            </div>
          </section>
        )}
        {user.role !== "admin" && (
          <section className="dashboard__section professional__section">
            <h2>Manage Portfolio</h2>
            <div className="dashboard__section__content">
              <button
                className="dashboard__section__button"
                onClick={() => navigate("/dashboard/portfolio")}
              >
                Go to Portfolio
              </button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Profile;
