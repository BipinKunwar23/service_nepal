import React from "react";
import plumber from "../../../images/plumber.jpg";
import { FaEnvelope } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { useSelector , useDispatch} from "react-redux";
import { useGetProviderDetailsQuery } from "../../../Api/providerApi";
import { useNavigate,useParams } from "react-router-dom";
import { setServiceId } from "../../../redux/cardSlice";
import Loader from "../../../components/Loader";
const Provider = () => {
  const navigate=useNavigate();
  const {providerId}=useParams();
  const dispatch=useDispatch();
  const { data, isLoading, isSuccess } = useGetProviderDetailsQuery(providerId);
  console.log(data);
  const serviceId=useSelector((state)=>state.cardSlice.serviceId);
  const logged=localStorage.getItem("logged");
console.log('cards',serviceId);
  if (isLoading) {
    return <Loader/>
  }
  if (isSuccess) {
    return (
      <section className="   box-border text-[1em]">
        <section className="flex gap-5 bg-white m-10 p-5 shadow shadow-gray-600">
          <div>
            <img
              src={plumber}
              className="h-[300px] w-[300px] object-cover rounded-full "
              alt=""
            />
          </div>
          <div className="flex flex-col flex-1">
            <div className="flex-1 flex flex-col gap-4">
              <div className="flex flex-col gap-4">
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
              <div className="grid place-content-center  ">
                <ul className=" text-center grid gap-4">
                  <li className=" ">
                    {" "}
                    <ul className=" flex gap-2 place-content-center">
                      <li className=" grid place-content-center">
                        <i>
                          <FaUser className=" text-blue-600 text-[1.5em]" />
                        </i>
                      </li>
                      <li className=" text-[1.2em] font-medium">
                        {data?.name.toUpperCase()}
                      </li>
                    </ul>
                  </li>

                  <li>
                    <ul className=" flex gap-2 place-content-center">
                      <li className=" grid place-content-center">
                        <i>
                          <FaHome className=" text-blue-600 text-[1.3em]" />
                        </i>
                      </li>
                      <li className=" italic">{`${data?.profile?.address?.chowk}, ${data?.profile?.address?.muncipility}-${data?.profile?.address?.ward}, ${data?.profile?.address?.district}`}</li>
                    </ul>
                  </li>

                  <li className="grid justify-end ">
                    <ul className="flex gap-8 ">
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
            </div>
            <div className=" flex justify-center">
              <button className="bg-gray-200 p-2 w-[200px]">View More</button>
            </div>
          </div>
          <div className="bg-white p-4 w-[400px] flex flex-col gap-5 ">
            <div className="flex flex-col gap-5">
              <label htmlFor="">Description</label>
              <textarea
                name=""
                id=""
                rows="6"
                className="border-2 border-gray-400 rounded-md"
              ></textarea>
            </div>
            <div>
              <button
                type="submit"
                className="bg-blue-600 text-white w-full p-2"
              >
                Send Message
              </button>
            </div>
          </div>
        </section>
        <section className="  box-border p-8 m-10 bg-white shadow shadow-gray-600 ">
          <p className="text-[1.2em] mb-5 font-semibold align-bottom text-gray-600 ">
            My Services
          </p>
          <section className="grid grid-cols-5 gap-2  ">
            {data?.services.map((service) => (
              <div
                key={service?.id}
                className=" p-2 shadow shadow-gray-700 grid grid-cols-1 border text-center   border-gray-300 box-border"
              >
                <img src={plumber} alt=""  className="w-full h-[200px] mb-2"/>
               
                <h2 className="font-semibold text-[#666] text-lg mb-2">
                  {service?.name}
                </h2>
                <p className="mb-2 text-[1em]">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Architecto error voluptatum inventore cum sequi, excepturi sit
                  
                  {service?.descripion}
                </p>

                <div className="flex place-content-center">
                  <button
                    type="button"
                    className="font-bold font-sans text-[1em] m-2 w-full  bg-green-600 p-2 text-white"
                    onClick={()=>{
                      dispatch(setServiceId(service?.id))
                      navigate(`/order/service/${service?.id}`)
                    }}
                  >
                    Order Now
                  </button>
                </div>
              </div>
            ))}
          </section>
        </section>

        {/* footer */}
        <div className=" flex gap-10 bg-white p-8 m-5 shadow shadow-gray-600 box-border">
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
    );
  }
};

export default Provider;
