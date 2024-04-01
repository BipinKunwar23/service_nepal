import React from "react";
import { useApproveServiceMutation } from "../../../api/admin/userApi";
import {
  useGetServiceStandardQuery,
  useViewServiceDetailsQuery,
} from "../../../api/seller/serviceApi";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Loader from "../../../components/Loader";
import GeneralServiceDetail from "./generalDetail";
import SpecificServiceDetail from "./specificDetail";
const UserServiceDetail = () => {
  const { serviceId } = useParams();
  // const { data: standards, isLoading: isStandards } =
  //   useGetServiceStandardQuery(optionId);
  const { data, isLoading } = useViewServiceDetailsQuery(serviceId);
  console.log('data',data);
  const navigate=useNavigate()
  const [approveService]=useApproveServiceMutation()
  const location=useLocation()
  if ( isLoading) {
    return <Loader />;
  }
  const ApproveService=async()=>{
    await approveService(serviceId)
    .unwrap()
    .then((response)=>{
        console.log('rsesponse',response);
        navigate(location?.state?.path, {replace:true})
    })
    .catch((error)=>{
        console.log(error);
    })
  }
  return (
    <section className=" ">
     <div className="flex p-4">
        <h2 className="text-2xl text-blue-600 font-semibold mb-4 flex-1">{data?.services?.option?.name} <span className="text-lg text-green-600 font-semibold mr-5">{data?.services?.status}</span></h2>
        <div className=" px-4 mx-auto grid content-center">

      <ul className="flex gap-14 text-gray-800 font-semibold text-[0.9em] ">
        {
            data?.services?.status!=="Active" &&
            <li>
                <button
                onClick={ApproveService}
                className="hover:underline hover:text-black"
                >APPROVE</button>
        
          </li>
        }
          
         
          <li>
            <button 
                className="hover:underline hover:text-black"

            >REQUEST MODIFICAITON</button>
          </li>
         
          <li>
            <button
                className="hover:underline hover:text-black"
            
            >DENY</button>
          </li>
          <li>
            <button
                className="hover:underline hover:text-black"
            
            >PAUSE</button>
          </li>
        </ul>
      </div>
      </div>

    
      <section className="text-[0.9em]  bg-white     ">
     
    {
       data?.services?.service?.type==="general" ? <GeneralServiceDetail data={data}/> : <SpecificServiceDetail services={data?.services}/>
    }
    
    </section>
   
    </section>

  );
};

export default UserServiceDetail;
