import React, { useState } from "react";

const Sidebar = ({profile}) => {
  const [dropdown, setdropdown] = useState(false);

  return (
    <div>
      <img
        src={`http://localhost:8000/${profile.profile.photo}`}
        alt=""
        className="rounded-full border h-[30px] w-[30px] cursor-pointer"
        onClick={() => {
          setdropdown(!dropdown);
        }}
      />
      {dropdown && (
        <ul className="flex flex-col w-[200px] absolute top-8 right-0  bg-white">
          <li className="text-gray-600 p-3 hover:bg-gray-300 ">
            <NavLink to="user/profile">Profile</NavLink>
          </li>
          <li className="text-gray-600 p-3 hover:bg-gray-300 ">
            <NavLink to="/seller/create/job">My Jobs</NavLink>
          </li>
          <li className="text-gray-600 p-3 hover:bg-gray-300 ">
            <NavLink to="/seller">Become a seller</NavLink>
          </li>
          <li className="text-gray-600  p-2 hover:bg-gray-300 ">
            <button
              onClick={() => {
                localStorage.removeItem("logged");
                localStorage.removeItem("userId");
                localStorage.removeItem("token");

                window.location.href = "/";
                navigate("/", { replace: true });
              }}
            >
              Sign Out
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
