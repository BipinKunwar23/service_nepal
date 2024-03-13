import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import img2 from "../../images/logo.png";
import SearchBar from "../search/searchBar";
const UserNavbar = ({ navbars }) => {
  const [dropdown, setdropdown] = useState(null);
  const name = localStorage.getItem("name");
  const navigate = useNavigate();

  const sidebars = [
    {
      id: 1,
      to: "/",
      link: "",
    },
  ];
  return (
    <div className="  flex gap-10 bg-white p-5">
      <div
        className="text-[2em]  font-bold text-indigo-600 cursor-pointer "
        onClick={() => {
          navigate("/user", { replace: true });
        }}
      >
        Labour
      </div>
      <SearchBar />
      <div className=" text-gray-600 grid place-content-center">
        <ul className=" flex flex-1 gap-14  ">
          {navbars.map((navbar) => (
            <li key={navbar?.id} className=" grid place-content-center ">
              {navbar?.icon && (
                <NavLink to={navbar.to} className="w-full text-[2em] ">
                  {" "}
                  {navbar.icon}
                </NavLink>
              )}

              <NavLink
                to={navbar.to}
                className="w-full text-[1.4em] last:text-green-600 "
              >
                {" "}
                {navbar.link}
              </NavLink>
            </li>
          ))}
          <li className="relative">
            <img
              src={localStorage.getItem("photo")}
              alt=""
              className="rounded-full border h-[40px] w-[40px] cursor-pointer"
              onClick={() => {
                setdropdown(!dropdown);
              }}
            />
            {dropdown && (
              <ul className="flex flex-col text-[1.2em] w-[300px] absolute top-12 right-0 gap-4 py-5 border boder-gray-300 p-2 rounded-md bg-white">
                <li className="text-gray-600 flex gap-3">
                  <img
                    src={localStorage.getItem("photo")}
                    alt=""
                    className="rounded-full border h-[35px] w-[35px] "
                  />
                  <h2 className="text-lg">{localStorage.getItem("name")}</h2>
                </li>
                <li className="border border-gray-300 rounded-lg p-3">
                  <NavLink
                    to={`/user/${localStorage.getItem("name")}`}
                    onClick={() => {
                      setdropdown(!dropdown);
                    }}
                  >
                    Switch to Selling
                  </NavLink>
                </li>
                <li className="text-gray-600 p-3 hover:bg-gray-300 ">
                  <NavLink
                    to={`/user/${localStorage.getItem("name")}/profile`}
                    onClick={() => {
                      setdropdown(!dropdown);
                    }}
                  >
                    Profile
                  </NavLink>
                </li>
                <li className="text-gray-600 p-3 hover:bg-gray-300 ">
                  <NavLink
                    to="/seller/create/job"
                    onClick={() => {
                      setdropdown(!dropdown);
                    }}
                  >
                    My Orders
                  </NavLink>
                </li>

                <li className="text-gray-600  p-3 hover:bg-gray-300 ">
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
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserNavbar;
