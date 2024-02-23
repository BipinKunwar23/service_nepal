import React, { useState } from "react";
import { usePlaceOrderMutation } from "../../../Api/orderApi";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../components/mpdal";
import Error from "../../../components/error/error";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useGetProviderServiceScopeQuery } from "../../../Api/providerApi";
import { setSelectedScope } from "../../../redux/serviceSlice";
import Loader from "../../../components/Loader";
const OrderService = () => {
  const navigate = useNavigate();
  const { providerId, serviceId } = useParams();
  const dispatch = useDispatch();
  const selectedScope = useSelector((state) => state.serviceSlice.scopes);
  console.log("services", serviceId);
  // const { data: userScopes, isLoading: scopeLoading } =
  //   useGetProviderServiceScopeQuery({ providerId, serviceId });
  const [placeOrder, { data, isLoading, isSuccess, isError, error }] =
    usePlaceOrderMutation();
  // const service_date = useSelector(
  //   (state) => state.serviceSlice.available_date
  // );
  // console.log("date", service_date);
  const {
    register,
    control,
    setValue,
    handleSubmit,
    watch,
    formState,
    getValues,
  } = useForm({
    defaultValues: {
      emergency: false,
      delay: null,
      scopes: [],
      originalValues: [],
    },
  });

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
    console.log("data", values);
    const customerId = localStorage.getItem("userId");

    const formdata = new FormData();
    formdata.append("pid", providerId);
    // formdata.append("service_date", service_date);
    formdata.append("emergency", values.emergency);
    formdata.append("max_delay", values.max_delay);
    formdata.append("delivery_location", values.delivery_location);
    for (const file of imagePreviews) {
      formdata.append("images[]", file.file);
    }
    // for (const scope of scopes) {
    //   formdata.append("scopes[]", scope);
    // }
    formdata.append("scopes", JSON.stringify(scopes));

    formdata.append("service_detail", values.service_detail);
    formdata.append("response_time", values.response_time);
    formdata.append("requirements", values.requirements);
    formdata.append("name", values.name);
    formdata.append("email", values.email);
    formdata.append("number", values.number);
    formdata.append("accept_terms", values?.accept_terms);

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

  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <Error error={error} />;
  }

  console.log("selected", selectedScope);
  return (
    <section className="    w-2/3  ">
      <form
        action=""
        className="    grid grid-cols-1  p-8 gap-5 auto-rows-min shadow shadow-gray-300  text-gray-700"
        onSubmit={handleSubmit(onSubmit)}
      >
        <p className="text-center text-xl text-slate-400">Service Order Form</p>
        <div className="grid grid-cols-2 gap-5">
          <div className="selected-field">
            <label htmlFor="">Service Delivery Place</label>
            <input type="text" {...register("delivery_location")} />
          </div>
          <div className="selected-field">
            <label htmlFor=""> Response Time (Provider)</label>
            <input type="text" {...register("response_time")} />
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

          {delay && (
            <div className="selected-field">
              <label htmlFor="">Maximum Delay</label>
              <input type="text" {...register("max_delay")} />
            </div>
          )}
        </div>
        <div className="shadow shadow-gray-100 p-2">
          <h2 className="font-bold text-black"> Service Scopes</h2>
          <p className="p-2 text-gray-500">
            You can add the quanity only if you can measure.Otherwise it is
            measured by the service provider on the field.
          </p>
          {selectedScope.map((selected, index) => {
            return (
              <div
                key={selected.id}
                className=" border border-gray-300 p-2 my-1"
              >
                <p className="text-gray-800 font-bold text-[1.2em] mb-1">
                  {selected?.name}
                </p>
                <div className="grid grid-cols-4 ">
                  <div className="grid content-end">
                    <p className="">
                      <span>{selected.price}</span>
                      <span className="text-orange-600">/{selected.unit}</span>
                    </p>
                  </div>
                  <div className="col-span-2">
                    <Controller
                      control={control}
                      name={`items[${index}].id`}
                      defaultValue={selected.id}
                      render={({ field }) => <input type="hidden" {...field} />}
                    />
                    <Controller
                      control={control}
                      name={`items[${index}].size`}
                      defaultValue={""}
                      render={({ field }) => {
                        console.log(field);
                        return (
                          <>
                            <input
                              type="number"
                              className=" p-1 border-b-2 w-full border-gray-700 focus:outline-none "
                              {...field}
                              placeholder={`Quantity of ${selected.unit}`}
                            />
                          </>
                        );
                      }}
                    />
                  </div>
                  <div className="grid place-items-end">
                    <button
                      onClick={(index) => {
                        const updtedScope = selectedScope.filter(
                          (scope) => selected.id !== scope.id
                        );
                        dispatch(setSelectedScope(updtedScope));

                        const currentItems = getValues("items");

                        currentItems.splice(index, 1);

                        setValue("items", currentItems);
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
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
              {...register("service_detail")}
            ></textarea>
          </div>
          <div className=" flex flex-col gap-5 selected-field  ">
            <label htmlFor="" className=" ">
              Special Requirements
            </label>
            <textarea
              name=""
              id=""
              cols="30"
              rows="2"
              className="  focus:outline-none hover:bg-gray-200 p-2"
              {...register("requirements")}
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
        <div className="p-5">
          <Controller
            name="accept_terms"
            control={control}
            defaultValue={false}
            render={() => {
              return (
                <div className="flex gap-4 p-5 border border-gray-400">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      const { checked } = e.target;
                      if (checked) {
                        setValue("accept_terms", true);
                      } else {
                        setValue("accept_terms", false);
                      }
                    }}
                  />
                  <p className="text-slate-700  ">
                    I will Accept the all standard service terms and condtions
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

export default OrderService;
