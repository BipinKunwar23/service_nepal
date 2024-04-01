import React from "react";
import { useSetRoleMutation } from "../../../../api/seller/profileApi";
import Loader from "../../../../components/Loader";
import { useNavigate } from "react-router-dom";
import { setProfileStep } from "../../../../redux/sellerSlice";
import { useDispatch } from "react-redux";
import ServiceFaqs from './../../../../components/service/faq';

const Preview = ({ user }) => {
  const [setRole, { isLoading }] = useSetRoleMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  if (isLoading) {
    return <Loader />;
  }

  const saveProfile = async () => {
    await setRole()
      .unwrap()
      .then((response) => {
        localStorage.setItem("role", response?.role);
        localStorage.setItem("photo", response?.photo);
        navigate(`/user/${localStorage.getItem("name")}/seller/service/new`, {
          replace: true,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <section className="bg-white p-6 space-y-10">
      <div className="flex justify-between ">
        <div className="flex gap-3 ">
          <img
            src={`http://localhost:8000/${user?.profile?.photo}`}
            alt=""
            className=" w-16 h-16  rounded-full object-cover "
          />
          <div className="grid content-center">
            <h2 className="text-lg font-semibold">{user?.name}</h2>
          </div>
        </div>
        <div className="grid content-center">
        <button
              className="bg-green-600 p-2 text-white w-[70px]   rounded text-lg"
              onClick={() => {
                dispatch(setProfileStep("personal"));
              }}
            >
              Edit
            </button>
        </div>

      </div>
      <div className="">
        <ul className="space-y-6">
          <li className=" flex justify-between">
            <h2 className="font-semibold text-2xl">Personal Information</h2>
         
          </li>
          <li>
            <strong>Unique Name </strong>{" "}
            <span className="ml-2">: {user?.profile?.name}</span>
          </li>
          <li>
            <strong>Profile Image </strong>{" "}
            <img
              src={`http://localhost:8000/${user?.profile?.photo}`}
              alt=""
              className="mt-5 h-[300px] object-cover w-full"
            />
          </li>

          <li>
            <strong>My Bio</strong>{" "}
            <p className="mt-3 text-gray-700">{user?.profile?.bio}</p>
          </li>
          <li>
            <strong>Address :</strong> <span>{user?.profile?.address}</span>
          </li>
          <li>
            <strong>Phone Number :</strong>{" "}
            <span>{user?.profile?.phone_number}</span>
          </li>
          <li>
            <strong>Language :</strong> <span>{user?.profile?.language}</span>
          </li>
        </ul>
      </div>
      <div>
        <ul className="space-y-6">
          <li className=" flex justify-between">
            <h2 className="font-semibold text-2xl">
              Perofessional Information
            </h2>
            <button
              className="bg-green-600 p-2 text-white w-[70px]   rounded text-lg"
              onClick={() => {
                dispatch(setProfileStep("profession"));
              }}
            >
              Edit
            </button>
          </li>
          <li>
            <strong>Occupation </strong>{" "}
            <span className="ml-2">
              : {user?.profession?.occupation?.label}
            </span>
          </li>
          <li>
            <strong>Skills </strong>
            <ul>{}</ul>
          </li>

          <li>
            <ul className="flex gap-8 mt-4">
              <li>
                <strong>Experience Year :</strong>{" "}
                <span>{user?.profession?.experience?.year}</span>
              </li>
              <li>
                <strong>Level :</strong>{" "}
                <span>{user?.profession?.experience?.level}</span>
              </li>
            </ul>
          </li>
          <li>
            <ul className="flex gap-8 mt-4">
              <li>
                <strong>Education Institute</strong>{" "}
                <span>: {user?.profession?.education?.institute}</span>
              </li>
              <li>
                <strong>Faculty</strong>{" "}
                <span>: {user?.profession?.education?.faculty}</span>
              </li>
              <li>
                <strong>Year</strong>{" "}
                <span>: {user?.profession?.education?.year}</span>
              </li>
            </ul>
          </li>
          <li>
            <ul className="flex gap-8 mt-4">
              <li>
                <strong>Certificate Name</strong>{" "}
                <span>: {user?.profession?.certificate?.name}</span>
              </li>
              <li>
                <strong>Certified By</strong>{" "}
                <span>: {user?.profession?.certificate?.institute}</span>
              </li>
              <li>
                <strong>Year</strong>{" "}
                <span>: {user?.profession?.certificate?.year}</span>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div>
        <ul className="space-y-6">
          <li className=" flex justify-between">
            <h2 className="font-semibold text-2xl">Availability Information</h2>
            <button
              className="bg-green-600 p-2 text-white w-[70px]   rounded text-lg"
              onClick={() => {
                dispatch(setProfileStep("availability"));
              }}
            >
              Edit
            </button>
          </li>

          <li>
            <strong>Time</strong>{" "}
            <span className="ml-2">
              {" "}
              : {user?.availability?.time?.start} -{" "}
              {user?.availability?.time?.end}
            </span>
          </li>
          <li className="flex gap-1">
            <strong>Days</strong> <span className="ml-2">:</span>
            <ul className="flex gap-5">
              {user?.availability?.days?.map((day) => (
                <li>{day}</li>
              ))}
            </ul>
          </li>
          <li className="flex gap-1">
            <strong>Cities</strong> <span className="ml-2">:</span>
            <ul className="flex gap-5">
              {user?.cities?.map((location) => (
                <li>{location?.city},</li>
              ))}
            </ul>
          </li>
        </ul>
      </div>
      <div className="mt-4">
          <ServiceFaqs faqs={user?.faqs} >
   <h2 className="font-semibold text-2xl mb-3">Frequently Asked Questions </h2>

          </ServiceFaqs>
        </div>

      <div className="flex place-content-center text-[1.2em]">
        <button
          className="bg-gray-800 text-white rounded p-2 w-[200px]"
          onClick={saveProfile}
        >
          Save Profile
        </button>
      </div>
    </section>
  );
};

export default Preview;
