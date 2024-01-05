import React from "react";
import { Outlet, useParams } from "react-router-dom";
import { useGetProviderDetailsQuery } from "../../../Api/providerApi";
import Provider from "./Provider";
import Profile from "./profile";
import Loader from "../../../components/Loader";
import { useMatch } from "react-router-dom";
import Service from "./Service";
import { FaStar } from "react-icons/fa";


const ViewProvider = () => {
  const { providerId ,categoryId} = useParams();
  const { data, isLoading, isSuccess } = useGetProviderDetailsQuery({providerId,categoryId});
  console.log('data',data);
  const service = useMatch("/provider/:providerId/category/:categoryId/service/:serviceId");
  const order = useMatch("/provider/:providerId/category/:categoryId/service/:serviceId/order");

  const params = useParams();

  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <section className="   box-border text-[1em]  w-[90Vw] mx-auto rounded-lg p-10 bg-white ">
        <section className="">
        <Profile data={{
          name:data?.name,
          email:data?.email,
          profile:data?.profile,
          profession:data?.category?.detail?.profession,
          description:data?.category?.detail?.description,

        }} />
     </section>


     <section className="grid grid-cols-3">
     <section className="   box-border text-[1em]  ">
          <Provider data={data?.category} />
        </section>
        <section className="col-span-2 ">
          <Service data={data?.category?.services}/>
        </section>
        </section>
      
        <section>
        <section className=" bg-gray-100 py-5">
        <div className=" flex gap-10 shadow shadow-gray-200 mt-1 box-border">
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
          <div className="flex-1 grid place-content-center ">
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

      </section>
    </>
  );
};

export default ViewProvider;
