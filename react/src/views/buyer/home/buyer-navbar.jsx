import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import SearchBar from "../../../components/search/searchBar";
import { IoNotificationsOutline } from "react-icons/io5";
import { AiOutlineMessage } from "react-icons/ai";
import { MdFavoriteBorder } from "react-icons/md";
import { setCategory } from "../../../redux/buyerSlice";
import { useDispatch } from "react-redux";
const BuyerNavbar = () => {
  const [dropdown, setdropdown] = useState(null);
  const name = localStorage.getItem("name");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const navbars = [
    {
      id: 3,
      to: `/user/${name}/list`,
      icon: <MdFavoriteBorder />,
    },
    {
      id: 2,
      to: `/user/${name}/chat/receiver`,
      icon: <AiOutlineMessage />,
    },

    {
      id: 1,
      to: `/user/${name}/notifications`,
      icon: <IoNotificationsOutline />,
    },
  ];

  const sidebars = [
    {
      id: 1,
      to: "/",
      link: "",
    },
  ];
  return (
    <div className="  flex  mt-4  ">
      <div
        className="text-[1.7em] mr-4 space-x-3   text-indigo-600 cursor-pointer "
        onClick={() => {
          dispatch(setCategory(null));
          navigate(`/user/${localStorage.getItem("name")}`, { replace: true });
        }}
      >
        <span className="font-mono">HomeService</span>
        <span className="font-mono">Nepal</span>
      </div>
      <div className=" flex-1 grid place-content-center">
        <ul className="flex gap-6">
          <li className=" grid place-content-center font-semibold ">
            <NavLink
              to={`/user/${localStorage.getItem("name")}/order`}
              className="w-full  "
            >
              {" Home"}
            </NavLink>
          </li>

          <li className=" grid place-content-center font-semibold ">
            <NavLink
              to={`/user/${localStorage.getItem("name")}/order`}
              className="w-full  "
            >
              {" Orders"}
            </NavLink>
          </li>
          <li className=" grid place-content-center font-semibold ">
            <NavLink
              to={`/user/${localStorage.getItem("name")}/order`}
              className="w-full  "
            >
              {" Profile"}
            </NavLink>
          </li>
          <li className="  font-semibold text-green-600 ">
            {localStorage?.getItem("role") === "seller" ? (
              <NavLink
                to={`/user/${localStorage.getItem("name")}/seller/dashboard`}
                className="w-full  "
              >
                {"Switch to Selling"}
              </NavLink>
            ) : (
              <NavLink
                to={`/user/${localStorage.getItem("name")}/seller`}
                className="w-full  "
              >
                {"Become a Seller"}
              </NavLink>
            )}
          </li>

        
        </ul>
      </div>
      {/* <div className="flex-1">
            <SearchBar />
      </div> */}
      <div className="mx-auto  "></div>

      <div className=" text-gray-600 grid content-center justify-end ">
        <ul className=" flex flex-1 gap-3  ">
          {navbars.map((navbar) => (
            <li key={navbar?.id} className=" grid place-content-center ">
              <NavLink
                to={navbar.to}
                className="w-full text-[1.4em] text-gray-900 font-bold "
              >
                {" "}
                {navbar.icon || navbar.link}
              </NavLink>
            </li>
          ))}

          <li className="relative">
            <img
              src={localStorage.getItem("photo")}
              alt=""
              className="rounded-full border h-[30px] w-[30px] cursor-pointer"
              onClick={() => {
                setdropdown(!dropdown);
              }}
            />
            {dropdown && (
              <ul className="flex flex-col w-[250px] text-[1em] text-black shadow-lg border bg-white absolute top-12 right-0 gap-2  p-4 z-10">
                <li className="text-gray-600 flex gap-3 bg-white">
                  <img
                    src={localStorage.getItem("photo")}
                    alt=""
                    className="rounded-full border h-[35px] w-[35px] "
                  />
                  <h2 className="text-lg">{localStorage.getItem("name")}</h2>
                </li>
                <li className="border-2 border-gray-300 rounded-lg p-2">
                  {localStorage.getItem("role") === "seller" ? (
                    <NavLink
                      to={`/user/${localStorage.getItem(
                        "name"
                      )}/seller/dashboard`}
                      onClick={() => {
                        setdropdown(!dropdown);
                      }}
                    >
                      Switch to Selling
                    </NavLink>
                  ) : (
                    <NavLink
                      to={`/user/${localStorage.getItem("name")}/seller`}
                      onClick={() => {
                        setdropdown(!dropdown);
                      }}
                    >
                      Become a seller
                    </NavLink>
                  )}
                </li>
                <li className="cursor-pointer p-2 ">
                  <NavLink
                    to={`/user/${localStorage.getItem("name")}/profile`}
                    onClick={() => {
                      setdropdown(!dropdown);
                    }}
                  >
                    My Profile
                  </NavLink>
                </li>
                <li className=" cursor-pointer p-2">
                  <NavLink
                    to={`/user/${localStorage.getItem("name")}/order`}
                    onClick={() => {
                      setdropdown(!dropdown);
                    }}
                  >
                    My Order
                  </NavLink>
                </li>
                <li className=" p-2 ">
                  <NavLink
                    to="/seller/create/job"
                    onClick={() => {
                      setdropdown(!dropdown);
                    }}
                  >
                    Account
                  </NavLink>
                </li>
                <li className=" p-2 ">
                  <NavLink
                    to="/seller/create/job"
                    onClick={() => {
                      setdropdown(!dropdown);
                    }}
                  >
                    Setting
                  </NavLink>
                </li>
                <li className="cursor-pointer p-2">
                  <button
                    onClick={() => {
                      localStorage.clear();

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

export default BuyerNavbar;
