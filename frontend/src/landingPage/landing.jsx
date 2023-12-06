import React, { useState } from "react";
import image from "../images/Plumber.png";
import image1 from "../images/plumber.jpg";
import { useNavigate } from "react-router-dom";
const landing = () => {
  const [started,setStarted]=useState(false)
  const [role,setRole]=useState(null);
  const navigate=useNavigate();
  return (
    <section className=" bg-gray-100 grid-cols-1 gap-2 grid justify-items-center shadow shadow-gray-600    ">
      <div className="max-w-[60Vw]">
        <article className=" text-gray-600 bg-white flex flex-col gap-5 border-b border-gray-400  px-20 py-10 box-border">
          <h2 className="font-bold text-[2em]  text-orange-600 w-[50Vw]">
            CREATE YOUR OWN SERVICES AND SELL YOUR SERVICES ONLINE
          </h2>
          <div className="flex gap-5">
            <div className="w-[30Vw] flex flex-col gap-10 ">
              <p className="m-1">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum
                tenetur veritatis magni cumque corrupti quaerat eius est aperiam
                eos optio velit, fugit sapiente mollitia saepe perferendis,
              </p>
              <div className=" flex flex-col gap-2  w-[200px]">
                <button className="bg-[#EF351B] rounded-full p-2 w-full text-white font-semibold tracking-wider"
                onClick={()=>{
                  setStarted(true)
                }}
                >
               Get Started 
                </button>
              
                  {
                    started && 
                      <ul className="flex  w-[200px] flex-col gap-2 bg-[#262666]  p-3 rounded-lg  text-white shadow shadow-gray-800 ">
                        <li className="shadow shadow-gray-100 rounded-lg hover:bg-blue-600 hover:text-white ">
                     <button className="  m-2 rounded-md "
                     onClick={()=>{
                      localStorage.setItem('role','customer')
                      navigate('/customer',{replace:true});

                     }}
                     >Customer</button>

                        </li>
                      <li className="shadow shadow-gray-100 rounded-lg hover:bg-blue-600 hover:text-white">
                     <button className=" m-2 rounded-md"
                     onClick={()=>{
                      localStorage.setItem('role','provider');
                      navigate('/provider',{replace:true});

                     }}
                     >Service Provider</button>

                      </li>
                      </ul>
                  }
              </div>
            </div>
            <div>
              <img
                src={image}
                className="h-[40Vh] w-full object-contain"
                
                alt=""
              />
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

        <article className=" bg-white  p-5 border-b border-gray-400   ">
          <h2 className=" text-[1.2em] font-bold  m-8 text-center text-green-400 ">
            DISCOVER SERVICES
          </h2>
          <div className="featured-services  m-5  bg-[#fff]  rounded-lg flex gap-10">
            <div className="service-card">
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
              <img className="provider-image" src={image1} alt="Provider 1 Image" />
              <div className="provider-name">John Doe</div>
              <div className="provider-profession">Graphic Designer</div>
              <div className="provider-description">
                Experienced graphic designer with a passion for creating
                visually stunning designs.
              </div>
              <button className="view-profile-btn">View Profile</button>
            </div>

            <div className="provider-card">
              <img className="provider-image" src={image1} alt="Provider 2 Image" />
              <div className="provider-name">Jane Smith</div>
              <div className="provider-profession">Marketing Consultant</div>
              <div className="provider-description">
                Strategic marketing consultant specializing in digital marketing
                and brand development.
              </div>
              <button className="view-profile-btn">View Profile</button>
            </div>

            <div className="provider-card">
              <img className="provider-image" src={image1} alt="Provider 2 Image" />
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
              <div className="client-position">Marketing Director, ABC Inc.</div>
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
              <div className="client-position">Marketing Director, ABC Inc.</div>
              <p>
                "Nullam vel efficitur ligula, nec scelerisque ligula. Sed vel
                erat vel justo malesuada rhoncus at vitae elit."
              </p>
            </div>
          </div>
        </article>
        <section className="bg-white p-10">
          <h2 className="text-lg font-semibold text-center text-green-400">Frequently Asked Questions</h2>
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
              <div className="question">How can I join as a service provider?</div>
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
  );
};

export default landing;
