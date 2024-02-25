import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import FormPage from "./pages/Home/FormPage";
import Signup from "./pages/Home/FormPage/Signup";
import Login from "./pages/Home/FormPage/Login";
import ErrorPage from "./pages/Error/ErrorPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Construction from "./pages/Error/Construction";
import Landing from "./pages/Home/Landing";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Dashboard/Profile";
import DashboardIndex from "./pages/Dashboard/DashboardIndex";
import ExperienceOverlay from "./pages/Dashboard/Portfolio/overlay/ExperienceOverlay";
import EducationOverlay from "./pages/Dashboard/Portfolio/overlay/EducationOverlay";
import CatalogOverlay from "./pages/Dashboard/Portfolio/overlay/CatalogOverlay";
import Courses from "./pages/Dashboard/Courses";
import NewCourse from "./pages/Dashboard/Courses/New/NewCourse";
import User from "./pages/Dashboard/User";
import Portfolio from "./pages/Dashboard/Portfolio";

const DEVELOPMENT = process.env.REACT_APP_DEV === "true";

function App() {
  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Router>
        <Routes>
          {DEVELOPMENT
            ? (() => {
                return (
                  <>
                    <Route path="/" element={<Construction />} />
                    <Route path="*" element={<Construction />} />
                  </>
                );
              })()
            : (() => {
                return (
                  <>
                    <Route path="/" element={<Home />}>
                      <Route index element={<Landing />} />
                      <Route path="about" element={<Landing />} />
                      <Route path="contact" element={<Landing />} />
                      <Route path="/" element={<FormPage />}>
                        <Route path="signup" element={<Signup />} />
                        <Route path="login" element={<Login />} />
                      </Route>
                    </Route>
                    <Route path="/dashboard" element={<Dashboard />}>
                      <Route index element={<DashboardIndex />} />
                      <Route path="user/:id" element={<User />} />
                      <Route path="courses" element={<Courses />}>
                        <Route path="new" element={<NewCourse />} />
                        <Route path=":id" element={<NewCourse />} />
                      </Route>
                      <Route path="portfolio" element={<Portfolio />}>
                        <Route path="add">
                          <Route
                            path="experience"
                            element={<ExperienceOverlay />}
                          />
                          <Route
                            path="education"
                            element={<EducationOverlay />}
                          />
                          <Route path="catalog" element={<CatalogOverlay />} />
                        </Route>
                      </Route>
                      <Route path="profile" element={<Profile />} />
                      <Route path="*" element={<ErrorPage />} />
                    </Route>
                    <Route path="*" element={<ErrorPage />} />
                  </>
                );
              })()}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
