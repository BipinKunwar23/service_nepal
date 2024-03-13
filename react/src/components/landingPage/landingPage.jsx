import React, { useEffect, useState } from "react";
import image1 from "../../images/landing-image.jpg";
import image from "../../images/Plumber.png";
import { Navigate, useNavigate } from "react-router-dom";
import LandingNavbar from "./landing-navbar";
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

  if (logged) {
    if(role=="admin"){
      return <Navigate to="admin/dashboard" replace={true} />;

    }
    if (role === "seller") {
      return <Navigate to={`user/${name}/seller/dashboard`} replace={true} />;
    }
    return <Navigate to={`user/${name}`} replace={true} />;
  }

  return (
    <>
    <LandingNavbar/>
    <section className="  text-gray-600   -z-10 ">
      <div className="  rounded-b-lg    ">
        <article className=" text-gray-600   bg-[#1D438A] grid grid-cols-2 justify-between  gap-10  box-border    ">
          <div className=" flex-1 p-4 mt-20 ">
            <div className=" flex flex-col flex-1 gap-4">
              <h2 className="font-bold text-[4em]  text-center text-gray-300">
                <span className="bolck">
                  {" "}
                  Find the right <i>Technicinas ,</i>{" "}
                </span>
                <span className="block">Right way</span>
              </h2>
              <p className="m-4 text-center text-slate-400 text-lg">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel
                totam, tenetur ratione obcaecati debitis, sunt dolores saepe
              </p>

              <div className="flex justify-center">
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
          <div className="w-full   ">
            <img src={image} className=" object-cover mr-0 ml-20 " alt="" />
          </div>
        </article>

        <article className="       ">
          <h2 className=" text-[1.2em] font-bold  p-8 text-center text-gray-900 ">
            DISCOVER SERVICES
          </h2>
          <div className="grid grid-cols-4 gap-5  rounded-lg ">
            <div className="service-card  ">
              <img src={image1} alt="" />
              <div className="service-title">Graphic Design</div>
              <div className="service-description">
                Eye-catching visuals for your brand.
              </div>
              <a href="#" className="learn-more-btn">
                Learn More
              </a>
            </div>
            <div className="service-card ">
              <img src={image1} alt="" />
              <div className="service-title">Graphic Design</div>
              <div className="service-description">
                Eye-catching visuals for your brand.
              </div>
              <a href="#" className="learn-more-btn">
                Learn More
              </a>
            </div>

            <div className="service-card">
              <img src={image1} alt="" />

              <div className="service-title">Web Development</div>
              <div className="service-description">
                Build your online presence with expert developers.
              </div>
              <a href="#" className="learn-more-btn">
                Learn More
              </a>
            </div>

            <div className="service-card">
              <img src={image1} alt="" />

              <div className="service-title">Content Writing</div>
              <div className="service-description">
                Engaging content tailored to your audience.
              </div>
              <a href="#" className="learn-more-btn  ">
                Learn More
              </a>
            </div>
          </div>
        </article>

        <article className=" bg-white  p-5   border-b border-gray-400  ">
          <h2 className=" text-[1.2em] font-semibold m-8 text-center text-green-400">
            EXPLORE LEADING SERVICE EXPERTS
          </h2>

          <div className="featured-providers">
            <div className="provider-card">
              <img
                className="provider-image"
                src={image1}
                alt="Provider 1 Image"
              />
              <div className="provider-name">John Doe</div>
              <div className="provider-profession">Graphic Designer</div>
              <div className="provider-description">
                Experienced graphic designer with a passion for creating
                visually stunning designs.
              </div>
              <button className="view-profile-btn">View Profile</button>
            </div>

            <div className="provider-card">
              <img
                className="provider-image"
                src={image1}
                alt="Provider 2 Image"
              />
              <div className="provider-name">Jane Smith</div>
              <div className="provider-profession">Marketing Consultant</div>
              <div className="provider-description">
                Strategic marketing consultant specializing in digital marketing
                and brand development.
              </div>
              <button className="view-profile-btn">View Profile</button>
            </div>

            <div className="provider-card">
              <img
                className="provider-image"
                src={image1}
                alt="Provider 2 Image"
              />
              <div className="provider-name">Jane Smith</div>
              <div className="provider-profession">Marketing Consultant</div>
              <div className="provider-description">
                Strategic marketing consultant specializing in digital marketing
                and brand development.
              </div>
              <button className="view-profile-btn">View Profile</button>
            </div>
          </div>
        </article>

        <article className=" bg-white p-5   border-b border-gray-400 ">
          <h2 className=" text-[1.2em] font-semibold m-8   text-center text-green-400">
            SUCCESS STORIES
          </h2>
          <div className="m-5  bg-[#fff]  rounded-lg flex gap-10 ">
            <div className="testimonial">
              <div className="flex">
                <img src={image1} alt="Client 1" className="client-avatar" />
                <div className="client-name">
                  <p>John Doe</p>
                </div>
              </div>
              <div className="client-position">CEO, Company XYZ</div>
              <p>
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
                vel mauris nec risus pharetra condimentum."
              </p>
            </div>

            <div className="testimonial">
              <div className="flex">
                <img src={image1} alt="Client 2" className="client-avatar" />
                <div className="client-name">
                  <p>Jane Smith</p>
                </div>
              </div>
              <div className="client-position">
                Marketing Director, ABC Inc.
              </div>
              <p>
                "Nullam vel efficitur ligula, nec scelerisque ligula. Sed vel
                erat vel justo malesuada rhoncus at vitae elit."
              </p>
            </div>

            <div className="testimonial">
              <div className="flex">
                <img src={image1} alt="Client 2" className="client-avatar" />
                <div className="client-name">
                  <p>Jane Smith</p>
                </div>
              </div>
              <div className="client-position">
                Marketing Director, ABC Inc.
              </div>
              <p>
                "Nullam vel efficitur ligula, nec scelerisque ligula. Sed vel
                erat vel justo malesuada rhoncus at vitae elit."
              </p>
            </div>
          </div>
        </article>
        <article className="bg-white border-b border-gray-400 text-[#666] flex flex-col gap-5 p-10 box-border">
          <h1 className="text-lg font-semibold text-center text-green-400">
            ABOUT US
          </h1>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid grid-cols-1 gap-5 ">
              <p className="m-1">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum
                tenetur veritatis magni cumque corrupti quaerat eius est aperiam
                eos optio velit, fugit sapiente mollitia saepe perferendis,
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptatem, adipisci. Aperiam veritatis vel itaque, quidem quo
                quas ipsum sint eligendi quasi! Iusto ipsum facere ipsa ut
                laboriosam. Itaque, ab consequuntur.
              </p>
              <div className=" flex-1">
                <button className="bg-[#EF351B] rounded-md p-2 w-[150px] text-white font-semibold ">
                  {" "}
                  SEE MORE
                </button>
              </div>
            </div>
            <div>
              <img
                src={image1}
                className="max-h-[30Vh] w-full object-cover"
                alt=""
              />
            </div>
          </div>
        </article>

        <section className="bg-white p-10">
          <h2 className="text-lg font-semibold text-center text-green-400">
            Frequently Asked Questions
          </h2>
          <div className=" mt-5 ">
            <div className="faq-item">
              <div className="question">What is [Your Marketplace Name]?</div>
              <div className="answer">
                [Your Marketplace Name] is an online platform that connects
                service providers with individuals or businesses seeking various
                services. Whether you need a freelancer, consultant, or other
                professionals, [Your Marketplace Name] is the place to find and
                hire them.
              </div>
            </div>

            <div className="faq-item">
              <div className="question">
                How can I join as a service provider?
              </div>
              <div className="answer">
                Joining as a service provider on [Your Marketplace Name] is
                easy. Simply click on the "Sign Up" button and follow the
                registration process. Once registered, you can create a profile,
                list your services, and start connecting with potential clients.
              </div>
            </div>

            <div className="faq-item">
              <div className="question">How does the payment process work?</div>
              <div className="answer">
                The payment process on [Your Marketplace Name] is secure and
                straightforward. Clients can make payments through various
                methods, including credit/debit cards or other supported payment
                options. Service providers will receive their payments through
                the chosen payout method after successfully completing a
                service.
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
    </>

  );
};

export default landingPage;
