import React, { useEffect, useState } from "react";
import Time from "./time";
import { useParams, useNavigate,useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Charge from "./charge";
import Modal from "../../../components/mpdal";
import {
  useSetupServicesMutation,
  useGetProviderServiceByIdQuery,
  useEditServicesMutation,
} from "../../../Api/providerApi";
// import { useGetOtherCatserviceQuery } from "../../Api/catServiceApi";
import { useForm, Controller } from "react-hook-form";
export default function SeviceSetup() {
  const dispatch = useDispatch();
  const { serviceId } = useParams();
  const location=useLocation();
  console.log("serviceId", serviceId);
  const providerId = localStorage.getItem("userId");
  const [
    setupService,
    { data: create, isLoading: isCreating, isSuccess: iscreateSuccess },
  ] = useSetupServicesMutation();
  const [
    editService,
    { data: edit, isLoading: isUpdating, isSuccess: isEditSuccess },
  ] = useEditServicesMutation();

  const {
    data: service,
    isLoading,
    isError,
  } = useGetProviderServiceByIdQuery({
    providerId,
    serviceId,
  });

  console.log("sevices", service);
  console.log("eror", isError);

  const navigate = useNavigate();

  const [button, setButton] = useState("");

  const { register, control, handleSubmit, setValue, reset } = useForm();

  const onSubmit = async (values) => {
    console.log("vaue", values);
    const userId = localStorage.getItem("userId");

    const formdata = new FormData();
    formdata.append("id", userId);
    formdata.append("sid", serviceId);
    formdata.append("description", values.description);
    formdata.append("time", JSON.stringify(values.time));
    formdata.append("days", JSON.stringify(values.days));
    formdata.append("charge", JSON.stringify(values.charge));
    formdata.append("experience", values.experience);
    formdata.append("offers", values.offers);
    formdata.append("address", values.address);
    formdata.append("image", values.image);
    if (button === "create") {
      await setupService(formdata)
        .unwrap()
        .then((response) => {
          console.log(response);
          reset();
          navigate(`${location?.state?.path || '/services/provider'}` , {replace:true});
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if (button === "update") {
      await editService(formdata)
        .unwrap()
        .then((response) => {
          console.log(response);
          reset();
          navigate(`${location?.state?.path || '/services/provider'}` , {replace:true});

        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  if (isError) {
    return <div>Error Occured</div>;
  }

  if (isLoading || isCreating || isUpdating) {
    return <div>Loading...</div>;
  }
  if (iscreateSuccess || isEditSuccess) {
    return (
      <Modal
        message={iscreateSuccess ? create?.message : edit?.message}
        navigation="/provider/services"
      />
    );
  }
  return (
    <section className="grid place-content-center text-[1em] text-slate-500 box-border p-2 bg-[rgba(0,0,0,0.6)]    ">
      <section className="bg-white w-[80Vw] shadow shadow-gray-800 rounded-md mb-2 text-[1em]" >

     
        <form
          action=""
          className="   grid grid-cols-2 gap-10     text-gray-800  p-5  box-border justify-self-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="service flex flex-col gap-4">
            <div className=" ">
              <span className="text-[1em]">Service Name</span>
              <p className="flex-1 font-semibold border border-gray-700 rounded-lg p-2 ">
                {service?.name}
              </p>
              <input
                type="text"
                hidden={true}
                value={serviceId}
                {...register("cid")}
              />
            </div>

            <div className=" ">
              <label htmlFor="">Service Description</label>
              <textarea
                cols="50"
                rows="2"
                className="placeholder:text-[1em]  focus:outline-none "
                {...register("description")}
                defaultValue={service?.pivot?.description}
              ></textarea>
            </div>
            <Time
              register={register}
              Controller={Controller}
              control={control}
              setValue={setValue}
              time={service?.pivot?.time}
              days={service?.pivot?.days}
            />

            <Charge
              register={register}
              Controller={Controller}
              control={control}
              setValue={setValue}
              charge={service?.pivot?.charge}
            />
          </div>

          <div className="flex flex-col service gap-4">
            <div className="flex flex-col">
              <label htmlFor="">Available City</label>
              <input
                type="text"
                {...register("address")}
                defaultValue={service?.pivot?.location}
              />
            </div>

            <div className="  flex flex-col">
              <label htmlFor=""> Work Experience</label>
              <textarea
                name=""
                id=""
                cols="50"
                rows="2"
                className="placeholder:text-[1em]   focus:outline-none "
                placeholder="Your work experience"
                {...register("experience")}
                defaultValue={service?.pivot?.expereince}
              ></textarea>
            </div>
            <div className="flex flex-col">
              <label htmlFor="">Special Offers & Discounts</label>
              <input
                type="text"
                className=" "
                {...register("offers")}
                defaultValue={
                  service?.pivot?.offers || "No offers are available"
                }
              />
            </div>
            <div className="">
              <Controller
                name="image"
                control={control}
                render={({ field }) => {
                  return (
                    <div>
                      <label htmlFor="" className="text-gray-700 font-semibold ">Add Images</label>

                      <div className="mt-5">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            setValue("image", e.target.files[0]);
                          }}
                        />
                      </div>
                      <div className="p-2">
                        <img src={`http://localhost:8000/${service?.pivot?.image}`} alt="" className=" h-[100px] w-[100px]"/>
                      </div>
                    </div>
                  );
                }}
              />
            </div>

            <div className="flex-1 place-content-end">
              {service?.pivot !== null ? (
                <button
                  type="submit"
                  className=" p-2 bg-blue-600 text-white px-10"
                  onClick={() => {
                    setButton("update");
                  }}
                >
                  Save Changes
                </button>
              ) : (
                <button
                  type="submit"
                  className=" p-2 bg-blue-600 text-white px-10"
                  onClick={() => {
                    setButton("create");
                  }}
                >
                  Create Service
                </button>
              )}
            </div>
          </div>
        </form>
      </section>


      <section className=" flex justify-between p-10 bg-white ">
        {/* {selected?.name != "all" && (
          <div>
            <p className="mb-2 bg-orange-600 p-2 text-white font-medium w-[40vw]">
              Other Services
            </p>

            <ul className="    flex flex-col  text-[0.95em] w-[40Vw]">
              {others
                .filter((item) => item.id != serviceId)
                .map((other, index) => (
                  <li
                    key={other.id}
                    className=" text-gray-100 border-gray-300 p-2 hover:bg-gray-300 hover:cursor-pointer"
                    onClick={() => {
                      dispatch(setServiceId(other?.id));
                      navigate(`/user/service/${other?.name}/setup`, {
                        replace: true,
                      });
                    }}
                  >
                    {other?.name}
                  </li>
                ))}
            </ul>
          </div>
        )} */}
        <div>
          <div className="flex flex-col">
            <label htmlFor="">Feecback</label>
            <input type="text" />
          </div>
          <div>
            <label htmlFor="">Rate Services</label>
            *******
          </div>
        </div>
      </section>
    </section>
  );
}
