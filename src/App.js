import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import FormPage from "./pages/Home/FormPage";
import Signup from "./pages/Home/FormPage/Signup";
import Login from "./pages/Home/FormPage/Login";
import ErrorPage from "./pages/Error/ErrorPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/" element={<FormPage />}>
            <Route path="signup" element={<Signup />} />
            <Route path="login" element={<Login />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
