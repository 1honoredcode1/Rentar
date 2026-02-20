import { Link } from "react-router-dom";

import { assets, dummyUserData } from "../../assets/assets";

const NavbarAdmin = () => {
  const user = dummyUserData;

  return (
    <div
      className="flex items-center justify-between px-6 md:px-10 py-4 text-gray-500 border-b border-borderColor
  relative transition-all"
    >
      <Link to="/" className="flex items-center">
        <img src={assets.logo} alt="logo" className="h-8" />
        <h1 className="text-xl font-semibold">oRentar</h1>
      </Link>
      <p className="">Welcome {user.name || "Admin"}</p>
    </div>
  );
};

export default NavbarAdmin;
