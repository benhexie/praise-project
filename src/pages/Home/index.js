import { Outlet } from "react-router-dom";
import Nav from "../../components/Nav/Nav";
import "./Home.css";

const Home = () => {
  return <div className="home">
    <Nav />
    <Outlet />
  </div>;
};

export default Home;
