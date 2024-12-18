import { Outlet } from "react-router-dom"; //куди рендереться children
import Header from "./Header/Header";

const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
