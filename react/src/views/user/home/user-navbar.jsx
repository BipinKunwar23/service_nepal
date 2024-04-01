import React from 'react'
import { useMatch, NavLink,useNavigate } from 'react-router-dom';
import SearchBar from '../../../components/search/searchBar';
const UserNavbar = () => {
    const name=localStorage.getItem('name');

  const navigate=useNavigate()

    return (
        <div className={`   w-full  flex p-4 sticky top-0 gap-8 z-10  bg-white text-gray-700 text-gray-100"   `}>
        <p
          className="text-[2.3em] text-green-600 font-semibold  cursor-pointer "
          onClick={() => {
            navigate("/", { replace: true });
          }}
        >
          Technician
        </p>
       <div className='flex-1'>
    <SearchBar/>

       </div>
        <div className="  text-[1.1em] flex-1 grid justify-end font-semibold">
          <ul className=" flex-1 flex gap-8  ">
          
          <li className="p-2">
              <NavLink to="/user/signin" className="w-full">
                {" "}
                Sign In
              </NavLink>
            </li>
            <li className="p-2  text-white ">
              <NavLink className="bg-red-600 px-4 p-2  rounded-md " to="/user/signup">
                Sign Up
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
  
      );
}

export default UserNavbar