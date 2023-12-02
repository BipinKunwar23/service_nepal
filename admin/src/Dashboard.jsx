import React from 'react'
import { NavLink } from 'react-router-dom';
const Dashboard = () => {
    const dashbars = [
        {
          id: 1,
          link: "Home",
          to: "/",
        },
        {
          id: 2,
          link: "Providers",
          to: "",
        },
        {
          id: 3,
          link: "Services",
          to: "/category",
        },
      
        {
          id: 4,
          link: "Customers",
          to: "/",
        },
       
        {
          id: 5,
          link: "Payments",
          to: "/",
        },
    ]
  return (
    <div>
    <nav className=" shadow w-[250px] shadow-white flex flex-col text-white text-[1em] min-h-screen bg-gray-500 ">
    <h2 className="text-xl font-semibold ml-10  m-10 ">Admin Dashboard </h2>
  <ul className="flex flex-col   ">
    {
      dashbars.map((dashbar)=>{
        return <li key={dashbar.id} className=" mb-10  ">
        <NavLink to={dashbar.to} className="text-white m-10">
          {dashbar?.link}
        </NavLink>
        </li>
      })
    }
  </ul>

  </nav>

    </div>
  )
}

export default Dashboard