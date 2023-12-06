import React from "react";
import plumber from "../../../images/plumber.jpg";
import { FaEnvelope } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useGetProviderDetailsQuery } from "../../../Api/providerApi";
import { useNavigate, useParams } from "react-router-dom";
import { setServiceId } from "../../../redux/cardSlice";
import Loader from "../../../components/Loader";
const Provider = () => {
  const navigate = useNavigate();
  const { providerId } = useParams();
  const dispatch = useDispatch();
  const { data, isLoading, isSuccess } = useGetProviderDetailsQuery(providerId);
  console.log(data);
  const serviceId = useSelector((state) => state.cardSlice.serviceId);
  const logged = localStorage.getItem("logged");
  console.log("cards", serviceId);
  if (isLoading) {
    return <Loader />;
  }
  if (isSuccess) {
    return (
      <section >
        <section className="   box-border text-[1em]  grid grid-cols-5">
          <section className="flex  flex-col gap-5 py-3 bg-gray-800     ">
            <div className=" flex place-content-center">
              <img
                src={plumber}
                className="h-[200px] w-[200px] object-cover rounded-full shadow shadow-gray-600"
                alt=""
              />
            </div>
            <div className="flex flex-col gap-4 mt-5">
                  <div className=" flex place-content-center">
                    {Array(data?.rating)
                      .fill()
                      .map((_, index) => (
                        <i key={index} className=" ">
                          <FaStar className=" text-[#FA130C] text-[1.4em]" />
                        </i>
                      ))}
                  </div>
                </div>
            <div className="flex flex-col ">
              <div className="grid place-content-center  ">
                <ul className=" text-center grid gap-4  text-white">
                  <li className=" ">
                    {" "}
                    <ul className=" flex gap-2 place-content-center">
                      <li className=" grid place-content-center">
                        <i>
                          <FaUser className=" text-blue-600 text-[1.5em]" />
                        </i>
                      </li>
                      <li className=" text-lg ">{data?.name}</li>
                    </ul>
                  </li>

                  <li>
                    <ul className=" flex gap-2 place-content-center">
                      <li className=" grid place-content-center">
                        <i>
                          <FaHome className=" text-blue-600 text-[1.3em]" />
                        </i>
                      </li>
                      <li className=" ">{`${data?.profile?.address?.chowk}, ${data?.profile?.address?.muncipility}-${data?.profile?.address?.ward}, ${data?.profile?.address?.district}`}</li>
                    </ul>
                  </li>

                  <li className="">
                    <ul className=" flex flex-col gap-3">
                      <li className=" ">
                        {" "}
                        <ul className=" flex gap-2 place-content-center">
                          <li className=" grid place-content-center">
                            <i>
                              <FaEnvelope className=" text-blue-600 text-[1em]" />
                            </i>
                          </li>
                          <li className=" italic text-[0.9em]">{data.email}</li>
                        </ul>
                      </li>
                      <li className=" ">
                        <ul className=" flex gap-2 place-content-center">
                          <li className=" grid place-content-center">
                            <i>
                              <FaPhoneAlt className=" text-blue-600 text-[1em]" />
                            </i>
                          </li>
                          <li className="text-[0.9em]">
                            {data?.profile?.phone_number}
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                </ul>
              
              </div>
              <div className=" flex justify-center mt-4">
                <button className=" text-white font-bold underline">
                  View More
                </button>
              </div>
            </div>
            <div className="p-4 text-white bg-gray-900 flex flex-col gap-5 ">
              <div className="flex flex-col gap-5">
                <label htmlFor="">Description</label>
                <textarea
                  name=""
                  id=""
                  rows="3"
                  className="border-2 border-gray-400 rounded-md"
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  className="bg-blue-600 text-white w-full p-2 rounded-lg"
                >
                  Send Message
                </button>
              </div>
            </div>
          </section>
          <section className="  box-border col-span-4 p-3 bg-white shadow shadow-gray-200  ">
            <section className="grid grid-cols-2  ">
              {data?.services.map((service) => (
                <div
                  key={service?.id}
                  className=" p-3 shadow shadow-gray-800 grid grid-cols-2  text-center m-5  border-gray-600 rounded-lg box-border"
                >
                  <div>
                    <img
                      src={`http://localhost:8000/${service?.pivot?.image}`}
                      alt=""
                      className=" h-[180px] w-[200px] object-cover shadow-inner rounded-lg"
                    />
                  </div>
                  <div className="mr-1">
                    <p className="justify-between flex mb-2">
                      <span className="text-sm font-bold">Gaindakot</span>
                      <span className="text-gray-500 text-md">$ 200 USD</span>
                    </p>
                    <p className="text-sm  text-gray-600 mb-2">
                      <span>10:00 AM - 5:00 PM</span>
                    </p>
                    <p className="text-center mb-2">
                      <span className=" text-gray-600 text-sm">
                        SUN MON TUE WED FRI SAT
                      </span>
                    </p>
                    <h2 className=" text-gray-700 font-semibold text-lg mb-2">
                      {service?.name}
                    </h2>
                    <p className="text-center mb-2">
                      <a href="" className="underline text-gray-600">see more</a>
                    </p>
                    <div className="flex flex-col gap-4 ">
                  <div className=" flex place-content-center">
                    {Array(data?.rating)
                      .fill()
                      .map((_, index) => (
                        <i key={index} className=" ">
                          <FaStar className=" text-[#FA130C] text-[1.4em]" />
                        </i>
                      ))}
                  </div>
                </div>
                    
                  </div>

                  {/* <div className="flex place-content-center">
                    <button
                      type="button"
                      className="font-bold font-sans text-[1em] m-2 w-full  bg-green-600 p-2 text-white rounded-lg"
                      onClick={() => {
                        dispatch(setServiceId(service?.id));
                        navigate(`/order/service/${service?.id}`);
                      }}
                    >
                      Order Now
                    </button>
                  </div> */}
                </div>
              ))}
            </section>
          </section>
        </section>
        <section>
          <div className=" flex gap-10 bg-white p-8 mx-10 shadow shadow-gray-200 mt-1 box-border">
            <div className=" flex-1 border border-gray-300 p-6 ">
              <form action="" className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="" className="text-[1.2em] font-semibold">
                    Feedback
                  </label>
                  <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="4"
                    className="border-2 border-gray-300"
                  ></textarea>
                </div>
                <div>
                  <button
                    type="submit"
                    className="bg-orange-600 text-white p-2 w-full"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
            <div className="flex-1 grid bg-white place-content-center ">
              <div className="flex flex-col gap-10">
                <h2 className="text-center text-[1.5em] font-semibold text-orange-600">
                  Rate Service Provider
                </h2>
                <div className=" flex justify-center gap-2 ">
                  {Array(4)
                    .fill()
                    .map((_, index) => (
                      <i key={index} className=" ">
                        <FaStar
                          className=" text-[rgba(0,0,0,0.6)] hover:cursor-pointer text-[2em]"
                          onClick={() => {}}
                        />
                      </i>
                    ))}
                </div>
                <div>
                  <button
                    type="submit "
                    className="bg-green-600 text-white p-2 w-full"
                  >
                    SUBMIT
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    );
  }
};

export default Provider;
