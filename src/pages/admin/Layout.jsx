import { Outlet } from "react-router-dom";

import NavbarAdmin from "../../components/admin/NavbarAdmin";
import Sidebar from "../../components/admin/Sidebar";

const Layout = () => {
  return (
    <div className="flex flex-col">
      <NavbarAdmin />
      <div className="flex">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
