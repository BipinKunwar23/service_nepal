import React, { useState } from "react";

const Sidebar = ({profile,sidebars}) => {
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
         <ul className="flex flex-col text-[1.2em] w-[300px] absolute top-12 right-0 gap-4 py-5 border boder-gray-300 p-2 rounded-md bg-white">
         <li className="text-gray-600 flex gap-3">
           <img
             src={localStorage.getItem('photo')}
             alt=""
             className="rounded-full border h-[35px] w-[35px] "
           />
           <h2 className="text-lg">{localStorage.getItem('name')}</h2>
         </li>
         <li className="border border-gray-300 rounded-lg p-3">
           <NavLink to={`/user`}
           onClick={()=>{
             setdropdown(!dropdown)
           }}
           >Switch to Buying</NavLink>
         </li>
         <li className="text-gray-600 p-3 hover:bg-gray-300 ">
           <NavLink  to={`/user/${localStorage.getItem('name')}/profile`}
            onClick={()=>{
             setdropdown(!dropdown)
           }}
           >Profile</NavLink>
         </li>
         <li className="text-gray-600 p-3 hover:bg-gray-300 ">
           <NavLink to="/seller/create/job" onClick={()=>{
             setdropdown(!dropdown)
           }}>My Jobs</NavLink>
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
    </div>
  );
};

export default Sidebar;
