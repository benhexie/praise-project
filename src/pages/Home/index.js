import { Outlet } from "react-router-dom";
import "./Home.css";
import HomeNav from "../../components/Nav/HomeNav";

const Home = () => {
  return <div className="home">
    <HomeNav />
    <Outlet />
  </div>;
};

export default Home;
