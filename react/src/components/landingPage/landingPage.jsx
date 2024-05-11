import React, { useEffect, useState } from "react";
import image1 from "../../images/landing-image.jpg";
import image from "../../images/landing.jpg";
import { Navigate, useNavigate } from "react-router-dom";
import LandingNavbar from "./landing-navbar";
import { useGetLandingPageDataQuery } from "../../api/public/landingApi";
import { useGetPopularServiceQuery } from "../../api/buyer/serviceApi";
import Loader from "./../Loader";
import SearchBar from "../search/searchBar";
import ServiceCard from "../../components/card/serviceCard";
import SignIn from "../auth/signIn";

const landingPage = () => {
  const [started, setStarted] = useState(false);
  // const [role, setRole] = useState(null);
  const navigate = useNavigate();
  const logged = localStorage.getItem("logged");
  const name = localStorage.getItem("name");
  const role = localStorage.getItem("role");

  // useEffect(()=>{
  //   navigate(`hello`)
  // },[logged])
  const { data, isLoading } = useGetLandingPageDataQuery();
  // const { data:populars, isLoading:ispopular } = useGetPopularServiceQuery();

  console.log("data", data);
  if (logged) {
    if (role == "admin") {
      return <Navigate to="admin/dashboard" replace={true} />;
    }
    if (role === "seller") {
      return <Navigate to={`user/${name}/seller/dashboard`} replace={true} />;
    }
    return <Navigate to={`user/${name}`} replace={true} />;
  }
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="w-[80Vw] mx-auto text-gray-800">
      <LandingNavbar />
      {/* <div className="absolute"> 
        <SignIn/>
      </div> */}
      <section
        className=" rounded-xl  "
        style={{ backgroundImage: 'url("/src/images/landing.jpg")',
      backgroundSize:"cover",
      }}
      >
        <div className="bg-[rgba(0,0,0,0.4)]  object-cover rounded-xl">
          <article className=" text-gray-600    grid grid-cols-2 justify-between  gap-10  box-border    ">
            <div className=" flex-1 p-4 mt-20 ">
              <div className=" flex flex-col flex-1 gap-4">
                <h2 className="font-semibold text-[4em]  text-center text-slate-200">
                  <span className="bolck">
                    {" "}
                    Find the right <i>Services ,</i>{" "}
                  </span>
                  <span className="block">Right way</span>
                </h2>
                <p className="m-4 text-center text-slate-300 text-lg">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel
                  totam, tenetur ratione obcaecati debitis, sunt dolores saepe
                </p>

                <div className="flex justify-center">
                  {/* <SearchBar/> */}
                  <button
                    className="bg-[#00A193] shadow shadow-gray-700 hover:text-white rounded-full p-2 w-[80%] hover:bg-[#00E6D7]  text-white  font-semibold tracking-wider"
                    onClick={() => {
                      localStorage.setItem("role", "customer");
                      navigate("/user");
                    }}
                  >
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>
      <section className="  text-gray-600   -z-10 ">
        <div className="  rounded-b-lg    ">
          {/* {
              ispopular ? <Loader/> :
          <article className=" p-8      ">
            <h2 className=" text-[1.2em] font-bold  p-8 text-center text-gray-900  mb-4">
              POPULAR SERVICES
            </h2>
         
            <ServiceCard
                  cards={populars}
                  url={`/user/${localStorage.getItem("name")}/service`}
                >
                
                </ServiceCard>
          </article>
} */}

          <section>
            <article className=" bg-white p-5   border-b border-gray-400 ">
              <h2 className=" text-[1.2em] font-bold m-8   text-center text-green-400">
                OUR SUCCESS STORIES
              </h2>
              <div className="m-5  bg-[#fff]  rounded-lg flex gap-10 ">
                <div className="testimonial">
                  <div className="flex">
                    <img
                      src={image1}
                      alt="Client 1"
                      className="client-avatar"
                    />
                    <div className="client-name">
                      <p>John Doe</p>
                    </div>
                  </div>
                  <div className="client-position">CEO, Company XYZ</div>
                  <p>
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Proin vel mauris nec risus pharetra condimentum."
                  </p>
                </div>

                <div className="testimonial">
                  <div className="flex">
                    <img
                      src={image1}
                      alt="Client 2"
                      className="client-avatar"
                    />
                    <div className="client-name">
                      <p>Jane Smith</p>
                    </div>
                  </div>
                  <div className="client-position">
                    Marketing Director, ABC Inc.
                  </div>
                  <p>
                    "Nullam vel efficitur ligula, nec scelerisque ligula. Sed
                    vel erat vel justo malesuada rhoncus at vitae elit."
                  </p>
                </div>

                <div className="testimonial">
                  <div className="flex">
                    <img
                      src={image1}
                      alt="Client 2"
                      className="client-avatar"
                    />
                    <div className="client-name">
                      <p>Jane Smith</p>
                    </div>
                  </div>
                  <div className="client-position">
                    Marketing Director, ABC Inc.
                  </div>
                  <p>
                    "Nullam vel efficitur ligula, nec scelerisque ligula. Sed
                    vel erat vel justo malesuada rhoncus at vitae elit."
                  </p>
                </div>
              </div>
            </article>
          </section>

          <article className="bg-white border-b border-gray-400 text-[#666] flex flex-col gap-5 p-10 box-border">
            <h1 className=" font-bold text-xl text-green-600">ABOUT US</h1>

            <div className="grid grid-cols-2 gap-4 p-8">
              <div>
                <img
                  src={image1}
                  className="max-h-full w-full object-cover"
                  alt=""
                />
              </div>
              <div className="grid grid-cols-1 gap-2 text-lg">
                <h2 className="font-bold text-3xl text-black">ProHome Nepal</h2>
                <p className="m-1">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum
                  tenetur veritatis magni cumque corrupti quaerat eius est
                  aperiam eos optio velit, fugit sapiente mollitia saepe
                  perferendis, Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Voluptatem, adipisci. Aperiam veritatis vel
                  itaque, quidem quo quas ipsum sint eligendi quasi! I tenetur
                  veritatis magni cumque corrupti quaerat eius est aperiam eos
                  optio velit, fugit sapiente mollitia saepe perferendis, Lorem
                  ipsum dolor sit amet consectetur adipisicing elit. Voluptatem,
                  adipisci. Aperiam veritatis vel itaque, quidem quo quas ipsum
                  sint eligendi quasi! Iusto ipsum facere ipsa ut laboriosam.
                  Itaque, ab consequunturusto ipsum facere ipsa ut laboriosam.
                  Itaque, ab consequuntur. aperiam eos optio velit, fugit
                  sapiente mollitia saepe perferendis, Lorem ipsum dolor sit
                  amet consectetur
                </p>
                <div className=" flex-1">
                  <button className="bg-[#EF351B] rounded-md p-2 w-[150px] text-white font-semibold ">
                    {" "}
                    SEE MORE
                  </button>
                </div>
              </div>
            </div>
          </article>

          <section className="bg-white p-10">
            <h2 className="text-3xl font-semibold  text-green-600">
              Frequently Asked Questions
            </h2>
            <div className=" p-4  space-y-4 divide-y-2">
              {data?.faqs?.map((faq) => {
                return (
                  <div key={faq?.id} className=" p-4 box-border">
                    <div className="">
                      <div className="flex  mt-3 font-semibold text-blue-600">
                        <div className="flex-1">
                          <h2 className="text-sky-500  font-semibold text-xl mb-2">
                            {faq?.question}
                          </h2>
                        </div>
                      </div>

                      <p className=" text-lg text-gray-600 ">{faq?.answer}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
          <section className="p-8">
            <h2 className="text-3xl font-semibold  text-green-600">
              Meet Our Teams
            </h2>
            <div className=" p-4  grid gap-6 grid-cols-3">
              {data?.teams?.map((member) => {
                return (
                  <div key={member?.id} className=" p-4 box-border">
                    <div className="grid place-content-center">
                      <img
                        src={`http://localhost:8000/${member?.photo} `}
                        className="h-52 w-52  object-center object-cover rounded-full"
                        alt=""
                      />
                    </div>
                    <div className="mt-4">
                      <h2 className="text-sky-500  text-center text-xl mb-2">
                        {member?.role}
                      </h2>
                      <h2 className="text-center text-xl font-semibold ">
                        {member?.name}
                      </h2>
                      <p className="text-center mb-2 text-gray-600">
                        {member?.bio}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </section>
    </div>
  );
};

export default landingPage;
