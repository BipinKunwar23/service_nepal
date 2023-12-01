import React from "react";
import image from "../../../images/plumber.jpg";
import { useParams,useNavigate, useLocation } from "react-router-dom";
import { useGetProviderServiceByIdQuery } from "../../../Api/providerApi";
const viewServices = () => {
  const providerId=localStorage.getItem('userId');
  const {serviceId}=useParams();
  const navigate=useNavigate();
  const location=useLocation()
  const {data:service,isLoading}=useGetProviderServiceByIdQuery({providerId,serviceId})
  console.log(service);
  if(isLoading){
    return <div>loading..</div>
  }
  return (
    <section className=" w-full bg-[rgba(0,0,0,0.1)] p-5  ">
      <div className="bg-white p-8  shadow shadow-gray-800 max-w-4xl mx-auto ">
        <div className="text-2xl font-bold mb-4">
        <h2>{service.name}</h2>
        </div>
        <div className="mb-6 text-gray-700">
          <p>
            {service?.pivot?.description}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <img
            src={`http://localhost:8000/${service?.pivot?.image}`}
            alt="Service Image 1"
            className="max-w-ful h-[300px]  object-cover"
          />
          
        </div>

        <div className="flex justify-between mb-6 gap-3 ">
          <div className="flex-1   ">
            <strong className="mr-2">Availability:</strong> {service?.pivot?.days.map(day=> <span className="mr-2" key={day}>{day}</span>)}
            <br />
            <strong  className="mr-2">Time:</strong> {`${service?.pivot?.time.start} AM - ${service?.pivot?.time?.end} PM`}
          </div>
          <div className="flex-1 ">
            <strong className="mr-2">Charge:</strong> $ {service?.pivot?.charge?.min} - {service?.pivot?.charge?.max}
            <br />
            <strong>Duration:</strong> 60 minutes
          </div>
        </div>

        <div className="mb-6">
          <strong>Prerequisites:</strong>
          <ul>
            <li>Prerequisite 1</li>
            <li>Prerequisite 2</li>
          </ul>
        </div>
        <div className="mb-6">
          <strong className="mr-2">Special Offers:</strong>{service?.pivot?.offers}
        </div>
        <div>
          <strong className="mr-2">Experience</strong>
          <p>{`${service?.pivot?.experience  || "No expereince"}`}</p>
        </div>
        <div className="grid  justify-items-center mb-6">
          <button className="bg-green-600 text-white rounded-full p-2 px-4"
          onClick={()=>{
            navigate(`/provider/service/join/${serviceId}`,{state:{path:location?.pathname}})
          }}
          >
            Edit Details
          </button>
        
        </div>

        <div className=" mx-auto bg-white  shadow-md rounded-md mb-6">
          <h1 className="text-xl font-bold mb-4">Associated Customers</h1>

          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
                <th className="border border-gray-300 px-4 py-2">Location</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2">John Doe</td>
                <td className="border border-gray-300 px-4 py-2">
                  john@example.com
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  City, Country
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button className="text-blue-500 hover:underline">
                    View More
                  </button>
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Jane Doe</td>
                <td className="border border-gray-300 px-4 py-2">
                  jane@example.com
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  City, Country
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button className="text-blue-500 hover:underline">
                    View More
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="grid  justify-items-center mb-6">
          <button className="bg-orange-600 text-white rounded-full p-2 px-4">
            Delete All
          </button>
        
        </div>
      </div>
    </section>
  );
};

export default viewServices;
