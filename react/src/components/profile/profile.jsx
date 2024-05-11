import React, { useEffect, useState } from "react";
import logo from "../../images/logo.png";
import { FaEdit, FaEnvelope, FaLocationArrow } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { IoLocationSharp } from "react-icons/io5";
import { useViewProfileQuery } from "../../api/profileApi";
import BuyerProfile from "./../../views/buyer/profile/buyerProfile";
import { MdModeEdit } from "react-icons/md";
import SellerService from "../../views/seller/serviceManagement/serviceInformation/sellerService";
import { useForm } from "react-hook-form";
import { CiCamera } from "react-icons/ci";
import { ColorRing } from "react-loader-spinner";
import {
  useEditBioMutation,
  useEditContactMutation,
  useEditLocationMutation,
  useEditPhotoMutation,
  useEditSkillMutation,
  useEditNameMutation
} from "../../api/profileApi";
import Loader from "../Loader";
function Profile() {
  const navigate = useNavigate();
  const location = useLocation();
  const userId = localStorage.getItem("userId");
  const {
    data: user = {},
    isLoading,
    isError,
    error,
  } = useViewProfileQuery(userId);
  const { register, handleSubmit } = useForm();
  console.log("users", user);
  const [previewImage, setPreviewImage] = useState();
  const [photo, setPhoto] = useState(false);

  const [name, setName] = useState(false);

  const [address, editAddress] = useState(false);
  const [contact, editContact] = useState(false);

  const [description, setDescription] = useState(false);
  const [education, setEducation] = useState(false);
  const [skills, setSkills] = useState(false);

  const [certificate, setCertificate] = useState(false);

  const [editBio] = useEditBioMutation();
  const [editPhone] = useEditContactMutation();
  const [editPhoto, { isLoading: isPhoto }] = useEditPhotoMutation();
  const [editLocaiton] = useEditLocationMutation();
  const [editSkills] = useEditSkillMutation();
  const [editName] = useEditNameMutation();

  useEffect(() => {
    if (name) {
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    }

    return () => {
      document.body.style.position = "static";
    };
  }, [name]);

  const UpdateLocation = async (values) => {
    console.log("value", values);
    await editLocaiton(values)
      .unwrap()
      .then((response) => {
        console.log(response);
        if (response) {
          editAddress(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const updateContact = async (values) => {
    console.log("value", values);
    await editPhone(values)
      .unwrap()
      .then((response) => {
        console.log(response);
        if (response) {
          editContact(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const updateBio = async (values) => {
    console.log("value", values);
    await editBio(values)
      .unwrap()
      .then((response) => {
        console.log(response);
        if (response) {
          setDescription(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const updatePhoto = async (e) => {
    const selectedFile = e.target.files[0];

    setPreviewImage(selectedFile);
    const formdata = new FormData();
    formdata.append("photo", selectedFile);
    await editPhoto(formdata)
      .unwrap()
      .then((response) => {
        if (response) {
          console.log("response", response);
          setPhoto(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const updateName = async (values) => {
    console.log("value", values);
    await editName(values)
      .unwrap()
      .then((response) => {
        console.log(response);
        if (response) {
          setName(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const role = localStorage.getItem("role");

  if (isLoading) {
    return <div className="min-h-screen">loading profile</div>;
  }

  return (
    <section className="">
      <div className="p-6">
        <button
          className="text-green-600 font-semibold text-2xl"
          onClick={() => {
            navigate(`/user/${localStorage.getItem("name")}/seller/dashboard`, {
              replace: true,
            });
          }}
        >
          ProHome Nepal
        </button>
      </div>
      <div className="bg-slate-100 py-12 ">
        <div className="flex gap-16 p-1  mx-auto w-[80Vw] mt-4">
          <div className="  w-[30Vw] flex-col gap-4 ">
            <div className=" bg-white pt-8 pb-2 shadow shadow-gray-400">
              <div
                className="  flex mx-auto shadow-inner relative w-[170px] h-[170px]    "
                onMouseEnter={() => {
                  setPhoto(true);
                }}
                onMouseLeave={() => {
                  setPhoto(false);
                }}
              >
                <img
                  className=" rounded-full  h-full w-full object-cover object-center"
                  src={
                    previewImage
                      ? URL.createObjectURL(previewImage)
                      : user?.profile?.photo
                      ? `http://localhost:8000/${user.profile?.photo}`
                      : logo
                  }
                  alt=""
                />
                {photo && (
                  <div className="absolute bg-[rgba(0,0,0,0.5)]  w-full h-full rounded-full grid place-content-center">
                    {isPhoto && <ColorRing height="40" width="40" />}
                    {!isPhoto && (
                      <button
                        onClick={() => {
                          document.getElementById("image").click();
                        }}
                      >
                        <i className="text-white text-[4em]">
                          <CiCamera />
                        </i>
                      </button>
                    )}
                  </div>
                )}
                <input
                  type="file"
                  id="image"
                  name="image"
                  // ref={register}
                  className=" hidden"
                  onChange={(e) => {
                    updatePhoto(e);
                  }}
                />
              </div>

              <div className="mt-3">
                <div className="flex gap-4 justify-center place-items-center">
                  <h2 className="text-center font-semibold text-xl ">
                    {user?.name}
                  </h2>
                  <button
                    onClick={() => {
                      setName(true);
                    }}
                  >
                    <i>
                      <MdModeEdit />
                    </i>
                  </button>
                </div>
                <h2 className="text-center text-gray-500 mt-2 ">
                  @{user?.profile?.name}
                </h2>
              </div>
              <div className="border-t-2 mt-5 p-3 space-y-5">
                {address && (
                  <form action="" onSubmit={handleSubmit(UpdateLocation)}>
                    <div className="">
                      <h2 className="font-semibold text-lg my-2">Location</h2>

                      <div className="flex flex-col gap-3 bg-slate-50 p-2  ">
                        <input
                          type="text"
                          className="bg-white p-2 border "
                          placeholder="Your address here"
                          defaultValue={user?.profile?.address}
                          {...register("address")}
                        />
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            className="bg-white p-2 w-full border"
                            type="button"
                            onClick={() => {
                              editAddress(false);
                            }}
                          >
                            Cancel
                          </button>
                          <button
                            className="bg-green-600 text-white p-2 w-full shadow"
                            type="submit"
                          >
                            Update
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                )}
                {!address && (
                  <div className="flex justify-between  text-slate-500">
                    <p className="flex gap-2">
                      <i>
                        <IoLocationSharp className=" text-[1.3em] " />
                      </i>
                      <span htmlFor="" className="">
                        Location
                      </span>
                    </p>
                    <div className="flex gap-2">
                      {user?.profile?.address ? (
                        <p className="text-gray-700 font-semibold ">
                          {user?.profile?.address}
                        </p>
                      ) : (
                        <p className="text-gray-700 font-semibold  ">
                          Add Your Address
                        </p>
                      )}
                      <button
                        className="text-gray-700 "
                        type="button"
                        onClick={() => {
                          editAddress(true);
                        }}
                      >
                        <i>
                          <MdModeEdit />
                        </i>
                      </button>
                    </div>
                  </div>
                )}
                {contact && (
                  <form action="" onSubmit={handleSubmit(updateContact)}>
                    <div className="">
                      <h2 className="font-semibold text-lg my-2">
                        Phone Number
                      </h2>

                      <div className="flex flex-col gap-3 bg-slate-50 p-2">
                        <input
                          type="text"
                          className="bg-white p-2 border "
                          placeholder="Your address here"
                          defaultValue={user?.profile?.phone_number}
                          {...register("phone_number")}
                        />
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            className="bg-white p-2 w-full border"
                            type="button"
                            onClick={() => {
                              editContact(false);
                            }}
                          >
                            Cancel
                          </button>
                          <button
                            className="bg-green-600 text-white p-2 w-full shadow"
                            type="submit"
                          >
                            Update
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                )}
                {!contact && (
                  <div className="flex justify-between   text-slate-500">
                    <p className="flex gap-3">
                      <i>
                        <FaPhoneAlt className=" text-[0.9em] " />
                      </i>
                      <span htmlFor="" className="">
                        Phone Number
                      </span>
                    </p>
                    <div className="flex gap-2">
                      {user?.profile?.phone_number ? (
                        <p className="text-gray-700 font-semibold ">
                          {user?.profile?.phone_number}
                        </p>
                      ) : (
                        <p className="text-gray-700 font-semibold  ">
                          Add Your Phone Number
                        </p>
                      )}
                      <button
                        className="text-gray-700 "
                        type="button"
                        onClick={() => {
                          editContact(true);
                        }}
                      >
                        <i>
                          <MdModeEdit />
                        </i>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2 bg-white  shadow  p-4">
              <form action="" className="" onSubmit={handleSubmit(updateBio)}>
                <div>
                  <div className="flex justify-between  mb-2">
                    <label htmlFor="" className=" font-semibold text-lg ">
                      Description
                    </label>
                    {!description && (
                      <button
                        className="text-blue-600 "
                        type="button"
                        onClick={() => {
                          setDescription(true);
                        }}
                      >
                        Edit Description
                      </button>
                    )}
                  </div>
                  {!description ? (
                    user?.profile?.bio ? (
                      <p className="text-slate-500  ">{user?.profile?.bio}</p>
                    ) : (
                      <p className="p-3">
                        Add Your hobbies, profession, instrests
                      </p>
                    )
                  ) : null}
                </div>
                {description && (
                  <div className="space-y-2  mt-3">
                    <textarea
                      name=""
                      id=""
                      cols="30"
                      rows="8"
                      className="p-2 placeholder:text-[1.1em] placeholder:text-slate-400 focus:outline-none"
                      placeholder="Add you hobby,Intrests and your profession so that buyer can know you more"
                      {...register("bio")}
                      defaultValue={user?.profile?.bio}
                    ></textarea>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        className="bg-white p-2 w-full border-2"
                        type="button"
                        onClick={() => {
                          setDescription(false);
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        className="bg-green-600 p-2 w-full  text-white"
                        type="submit"
                      >
                        Update
                      </button>
                    </div>
                  </div>
                )}

                <div className="border-b-2 mt-12 border-gray-300"></div>
              </form>
              <form action="" className="">
                <div>
                  <div className="flex justify-between">
                    <label htmlFor="" className="p-4 font-semibold text-lg ">
                      Education
                    </label>
                    {!education && (
                      <button
                        className="text-blue-600 "
                        type="button"
                        onClick={() => {
                          setEducation(true);
                        }}
                      >
                        Edit Education
                      </button>
                    )}
                  </div>
                  {!education && (
                    <p className="text-slate-500  p-4">
                      Add Your hobbies, profession, instrests
                    </p>
                  )}
                </div>

                {education && (
                  <div className="flex flex-col gap-5 bg-gray-200 p-4 mt-3">
                    <textarea
                      name=""
                      id=""
                      cols="30"
                      rows="8"
                      className="p-2 placeholder:text-[1.1em] placeholder:text-slate-400"
                      placeholder="Add you hobby,Intrests and your profession so that buyer can know you more"
                      {...register("education")}
                    ></textarea>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        className="bg-white p-2 w-full shadow"
                        type="button"
                        onClick={() => {
                          setEducation(false);
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        className="bg-green-600 p-2 w-full shadow text-white"
                        type="submit"
                      >
                        Update
                      </button>
                    </div>
                  </div>
                )}

                <div className="border-b-2 mt-4 border-gray-300"></div>
              </form>
            </div>
          </div>
          {role !== "seller" ? <BuyerProfile /> : <SellerService />}
        </div>
      </div>
      {name && (
        <div className="absolute top-0 w-full h-full bg-[rgba(0,0,0,0.6)] ">
          <div className="bg-white p-8 rounded w-1/2 mt-32 mx-auto text-gray-600">
            <div className="flex gap-4 text-gray-700">
              <h2 className="flex-1 font-semibold text-2xl ">
                Choose Your Display Name
              </h2>
              <button className="text-2xl  "
              onClick={()=>{
                setName(false)
              }}
              >X</button>
            </div>
            <div className="mt-4 text-gray-600 text-[1.02em]  ">
              <p >To help build credible and authentic connections with customers, they'll now see you display name.</p>
            </div>
            <div className="mt-4 ">
              <p>We suggest using your first name and last name.</p>
            </div>
            <form action="" className="mt-4" onSubmit={handleSubmit(updateName)}>
              <input
                type="text"
                {...register("name")}
                defaultValue={user?.name}
                className="border-2 border-gray-300 p-2 w-full rounded"
              />
            <div className="mt-4">
             <p className="text-[1em]"> You will still see your unique name in some areas.</p>
            </div>
          <div className="flex justify-end mt-4 gap-4 font-semibold text-lg ">
            <button type="button" className="bg-slate-100 p-2.5 px-4 rounded text-gray-800 "
            onClick={()=>{
              setName(false)
            }}
            >I'll do this later</button>
            <button type="submit" className="bg-green-600 p-2.5 px-4 text-gray-200 rounded">Save display name</button>
          </div> 
          </form>

          </div>
        </div>
      )}
    </section>
  );
}

export default Profile;
