import React, { useState } from "react";
import { usePlaceOrderMutation } from "../../../Api/orderApi";
import { useSelector } from "react-redux";
import Modal from "../../../components/mpdal";
import Error from "../../../components/ErrorHandling/error";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useGetProviderServiceScopeQuery } from "../../../Api/providerApi";
import Loader from "../../../components/Loader";
const Order = () => {
  const navigate = useNavigate();
  const { providerId, serviceId } = useParams();
  const customerId = localStorage.getItem("userId");
  console.log("services", serviceId);
  const { data: scopes, isLoading: scopeLoading } =
    useGetProviderServiceScopeQuery({ providerId, serviceId });
  console.log(scopes);
  const [placeOrder, { data, isLoading, isSuccess, isError, error }] =
    usePlaceOrderMutation();

  const { register, control, setValue, handleSubmit, getValues, watch } =
    useForm({
      defaultValues: {
        emergency: false,
        delay: null,
      },
    });

  const [selectedScope, setSelectedScope] = useState([]);
  const handleSelectedScope = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      setSelectedScope([...selectedScope, value]);
    } else {
      const updatedScope = selectedScope.filter((s) => s !== value);
      setSelectedScope([...updatedScope]);
    }
  };

  const [imagePreviews, setImagePreviews] = useState([]);

  console.log("preview", imagePreviews);

  const fileInputRef = React.createRef();
  const handleAddButtonClick = () => {
    // Trigger the file input programmatically when the "Add" button is clicked
    fileInputRef.current.click();
  };

  const handleFileInputChange = (event) => {
    const fileInput = event.target;
    const file = fileInput.files[0];
    console.log("selectedFiles", file);

    const reader = new FileReader();

    // Read the file as a data URL
    reader.readAsDataURL(file);

    // Callback when reading is complete
    reader.onloadend = () => {
      // Create a preview object with the file and data URL
      const preview = {
        id: Date.now(),
        file,
        dataURL: reader.result,
      };

      // Update the state with the new preview
      setImagePreviews((prevPreviews) => [...prevPreviews, preview]);
    };
    fileInput.value = null;
  };

  const handleRemoveImage = (id) => {
    // Filter out the preview with the specified id
    setImagePreviews((prevPreviews) =>
      prevPreviews.filter((preview) => preview.id !== id)
    );
  };

  const onSubmit = async (values) => {
    console.log('data',values);
    const userId = localStorage.getItem("userId");

    const formdata = new FormData();
    formdata.append("pid", providerId);
    formdata.append("date", values.date);
    formdata.append("emergency", values.emergency);
    formdata.append("delay", values.delay);
    formdata.append("location", values.location);
    for (const file of imagePreviews) {
      formdata.append("images[]", file.file);
    }
    for (const scope of selectedScope) {
      formdata.append("scopes[]", scope);
    }

    formdata.append("service", values.service);
    formdata.append("size", values.size);
    formdata.append("response", values.response);
    formdata.append("name", values.name);
    formdata.append("email", values.email);
    formdata.append("number", values.number);
    formdata.append("isAgreement",values.IsAgreement);
    await placeOrder({ formdata, customerId, serviceId, providerId })
      .unwrap()
      .then((response) => {
        console.log("response", response);
        reset();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log(error);
  const [delay, setDelay] = useState(false);

  if (isLoading || scopeLoading) {
    return <Loader />;
  }
  if (isError) {
    return <Error error={error} />;
  }
  if (isSuccess) {
    return <Modal message={data?.message} navigation="/orders/customers" />;
  }
  return (
    <section className="   bg-[#D6FFFF]   ">
      <form
        action=""
        className="   rounded-md grid grid-cols-1  p-8 gap-5 auto-rows-min shadow shadow-gray-800  text-gray-700"
        onSubmit={handleSubmit(onSubmit)}
      >
        <p className="text-center text-xl text-slate-400">Service Order Form</p>
        <div className="grid grid-cols-2 gap-5">
          <div className="selected-field">
            <label htmlFor="">Service On</label>
            <input type="date" {...register("date")} />
          </div>

          <div className="selected-field">
            <label htmlFor="">Delivery Location</label>
            <input type="text" {...register("location")} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div className="p-4 shadow shadow-gray-100">
            <p className="mb-3"> Service Type</p>
            <div className="flex gap-4 ">
              <div className="flex gap-3">
                <input
                  type="radio"
                  onChange={(e) => {
                    const { checked } = e.target;
                    if (checked) {
                      setValue("emergency", true);
                      setDelay(false);
                    }
                  }}
                  name="emergency"
                />{" "}
                <span>Emergency</span>
              </div>
              <div className="flex gap-3">
                <input
                  type="radio"
                  name="emergency"
                  onChange={(e) => {
                    const { checked } = e.target;
                    if (checked) {
                      setValue("emergency", false);
                      setDelay(true);
                    }
                  }}
                />{" "}
                <span>Delay</span>
              </div>
            </div>
          </div>

          <div className="selected-field">
            <label htmlFor=""> Response Time Limit</label>
            <input type="text" {...register("response")} />
          </div>
          {delay && (
            <div className="selected-field">
              <label htmlFor="">Maximum Delay</label>
              <input type="text" {...register("delay")} />
            </div>
          )}
        </div>
        <div className="grid grid-cols-2 gap-5">
          <div className="shadow shadow-gray-100 p-2">
            <table
              className="table-auto w-full border-collapse border border-slate-300 rounded-lg"
              cellPadding={8}
            >
              <thead>
                <tr className="text-left">
                  <th>Select</th>
                  <th>Fearured Services</th>
                </tr>
              </thead>
              <tbody className=" ">
                {scopes.map((scope, index) => {
                  return (
                    <tr className="mb-4 " key={scope.id}>
                      <td className="">
                        <input
                          type="checkbox"
                          value={scope.id}
                          onChange={(e) => {
                            handleSelectedScope(e);
                          }}
                          id={`scope${scope.id}`}
                          className="cursor-pointer"
                        />
                      </td>
                      <td className="">
                        <label
                          htmlFor={`scope${scope.id}`}
                          className="cursor-pointer"
                        >
                          {scope.name}
                        </label>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="p-4 shadow shadow-gray-100 ">
            <h2 className="mb-3">
              Upload Files <span className="text-red-600 text-xl">*</span>
            </h2>

            <div className="grid grid-cols-3 gap-4 mb-3">
              {imagePreviews.map((preview, index) => (
                <div key={preview.id} className="relative">
                  <img
                    key={index}
                    src={preview.dataURL}
                    alt={`Preview ${preview.id}`}
                    className="w-full h-[120px] shadow shadow-gray-400"
                    onClick={() => handleRemoveImage(preview.id)}
                  />

                  <button
                    onClick={() => handleRemoveImage(preview.id)}
                    type="button"
                    className="absolute top-0 right-0 cursor-pointer bg-[rgba(0,0,0,0.9)] px-1 text-white font-semibold text-lg]"
                  >
                    X
                  </button>
                </div>
              ))}

              <div className="h-[120px] w-[120px] rounded-md  flex place-content-center border-2  border-gray-400 shadow">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileInputChange}
                  ref={fileInputRef}
                  className="hidden"
                />
                <button
                  onClick={handleAddButtonClick}
                  type="button"
                  className="text-[70px] text-blue-500"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5 ">
          <div className=" flex flex-col gap-5 selected-field  ">
            <label htmlFor="" className=" ">
              Require Service (Problem Details)
            </label>
            <textarea
              name=""
              id=""
              cols="30"
              rows="2"
              className="  focus:outline-none hover:bg-gray-200 p-2"
              {...register("service")}
            ></textarea>
          </div>
          <div className=" flex flex-col gap-5 selected-field  ">
            <label htmlFor="" className=" ">
              Service Amount (Work Load)
            </label>
            <textarea
              name=""
              id=""
              cols="30"
              rows="2"
              className="  focus:outline-none hover:bg-gray-200 p-2"
              {...register("size")}
            ></textarea>
          </div>
        </div>
        <div>
          <p className="text-center text-xl text-slate-400">
            Contact Information
          </p>
          <div className="grid grid-cols-2 gap-5">
            <div className="selected-field">
              <label htmlFor=""> Name</label>
              <input type="text" {...register("name")} />
            </div>
            <div className="selected-field">
              <label htmlFor=""> Email Address</label>
              <input type="email" {...register("email")} />
            </div>
            <div className="selected-field">
              <label htmlFor=""> Phone Number</label>
              <input type="text" {...register("number")} />
            </div>
          </div>
        </div>
        <div>
          <Controller
            name="IsAgreement"
            control={control}
            defaultValue={false}
            render={({ field }) => {
              return (
                <div className="flex gap-5 p-4">
                  <input type="checkbox" name="" id="" 
                  onChange={(e)=>{
                    const {checked}=e.target;
                    if(checked){
                      setValue('IsAgreement',true)
                    }
                    else {
                      setValue('IsAgreement',false)
                    }
                  }}
                  />
                  <p className="text-slate-700  ">
                    Make Agreeement with Service Provider
                  </p>
                </div>
              );
            }}
          />
        </div>

        <div className="flex-1 flex justify-around">
          <button
            className="order-button"
            type="button"
            onClick={() => {
              navigate(`/provider/${providerId}/service/${serviceId}`);
            }}
          >
            Cancel Order
          </button>

          <button className="order-button" type="submit">
            Submit Order
          </button>
        </div>
      </form>
    </section>
  );
};

export default Order;
