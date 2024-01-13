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
                    <Route path="/" element={<FormPage />}>
                      <Route path="signup" element={<Signup />} />
                      <Route path="login" element={<Login />} />
                    </Route>
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