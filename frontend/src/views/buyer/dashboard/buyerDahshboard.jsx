import React, { useState } from "react";
import { NavLink } from "react-router-dom";
const BuyerDashboard = () => {
  const [selectedMenu, setSelectedMenu] = useState("");
  const menues = [
    {
      name: "Profile",
      link: "/profile",
    },
    {
      name: "Booking",
      link: null,
      submenu: [
        {
          name: "Pending",
          link: "/profile",
        },
        {
          name: "Running",
          link: "/profile",
        },

        {
          name: "Completed",
          link: "/profile",
        },

        {
          name: "Upcoming",
          link: "/profile",
        },
      ],
    },
    {
      name: "Payments",
      link: null,
      submenu: [
        {
          name: "Payment History",
          link: "/profile",
        },
      ],
    },
    {
      name: "Payments",
      link: null,
      submenu: [
        {
          name: "Payment History",
          link: "/profile",
        },
      ],
    },
    {
      name: "Messaging",
      link: null,
      submenu: [
        {
          name: "Inbox",
          link: "/profile",
        },
        {
          name: "Message",
          link: "/profile",
        },
      ],
    },
    {
      name: " Recommendation",
      link: null,
      submenu: [
        {
          name: "Services",
          link: "/profile",
        },
        {
          name: "Providers",
          link: "/profile",
        },
      ],
    },
    {
      name: "Profile Setting",
      link: null,
      submenu: [
        {
          name: "Profile",
          link: "/profile",
        },
        {
          name: "Account",
          link: "/profile",
        },
        {
          name: "Privacy",
          link: "/profile",
        },
        {
          name: "Preference",
          link: "/profile",
        },
      ],
    },
    {
      name: "Notification",
      link: "/profile",
    },
    {
      name: "Feedback and Reviews",
      link: "/profile",
    },
    {
      name: "Quick Actions",
      link: null,
      submenu: [
        {
          name: "Profile",
          link: "/profile",
        },
        {
          name: "Account",
          link: "/profile",
        },
        {
          name: "Privacy",
          link: "/profile",
        },
        {
          name: "Preference",
          link: "/profile",
        },
      ],
    },
    {
      name: "Help and Support",
      link: "/profile",
    },
    {
      name: "Log Out",
      link: "/profile",
    },
  ];
  return (
    <section className="bg-whtie flex gap-1">
      <section className="w-[16%] bg-slate-600 text-white font-bold ">
        <nav>
          <ul className="flex flex-col  my-5">
            <li className="text-xl ">Dashboard</li>
            {menues.map((menu) => {
              return (
                <li
                  onClick={() => {
                    selectedMenu === menu?.name
                      ? setSelectedMenu(null)
                      : setSelectedMenu(menu?.name);
                  }}
                  key={menu.name}
                  className="border-b-2 border-slate-500 p-4"
                >
                  <NavLink to={menu.link}
                  className={`ml-2`}
                  >{menu.name}</NavLink>

                  {selectedMenu === menu?.name && (
                    <ul className="flex flex-col gap-8 ml-6 mt-5">
                      {menu.submenu.map((sm) => {
                        return (
                          <li key={sm.name}
                          
                          >
                            <NavLink to={sm.link}>{sm.name}</NavLink>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </section>
      <section className="flex-1"></section>
    </section>
  );
};

export default BuyerDashboard;
