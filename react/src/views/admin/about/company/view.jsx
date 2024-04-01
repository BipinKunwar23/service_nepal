import React, { useState } from "react";
import { useViewCompanyInfoQuery } from "../../../../api/admin/aboutApi";
import AddCompanyInfo from "./add";
const ViewCompanyInfo = () => {
  const { data, isLoading } = useViewCompanyInfoQuery();
  console.log('data',data);
  const [show,setShow]=useState(false)
  if (isLoading) {
    return <div>Loading Info...</div>;
  }
  if(show){
    return (
        <div className="bg-gray-50 p-6">
            <AddCompanyInfo setShow={setShow} data={data}/>

        </div>
    )
}
  if (!data) {
    return (
      <div className="h-screen grid place-content-center">
        <div>
          <button onClick={()=>{
            setShow(true)
          }}>Add Information</button>
        </div>
      </div>
    );
  }

  return (
    <>
    
    <div className="space-y-3 p-4 mt-5 ">
      <div className="flex justify-between border-b py-2">
        <h2 className="text-black text-3xl ">About Company </h2>
        <button className="text-xl  border p-2"
        onClick={()=>{
          setShow(true)
        }}
        >Edit Info</button>
      </div>
      <div className="space-x-9 text-lg flex justify-center bg-red-800 p-2 text-white">
        <span>{data?.location}</span>
        <span>{data?.email}</span>
        <span>{data?.contact}</span>
      </div>
      <div className="grid grid-cols-2 gap-4 border bg-white  mb-2 p-4">
        <div>
          <img
            src={`http://localhost:8000/${data?.photo}`}
            className="h-full w-full  object-center object-cover"
            alt=""
          />
        </div>
        <div>
          <p>{data?.mission}</p>
        </div>
      </div>
      
    </div>

    </>

  );
};

export default ViewCompanyInfo;
