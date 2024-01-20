import { Outlet } from "react-router-dom";
import "./Home.css";
import HomeNav from "../../components/Nav/HomeNav";
import HomeFooter from "../../components/Footer/HomeFooter";

const Home = () => {
  return <div className="home">
    <HomeNav />
    <Outlet />
    <HomeFooter />
  </div>;
};

export default Home;
