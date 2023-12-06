import React from "react";
import { usePlaceOrderMutation } from "../../../Api/orderApi";
import { useSelector } from "react-redux";
import Modal from "../../../components/mpdal";
import Error from "../../../components/ErrorHandling/error";
import { useNavigate, useParams } from "react-router-dom";
import { useFieldArray, useForm, Controller } from "react-hook-form";

const Order = () => {
  const navigate = useNavigate();
  const { serviceId } = useParams();
  const customerId = localStorage.getItem("userId");
  console.log("services", serviceId);
  const [placeOrder, { data, isLoading, isSuccess, isError, error }] =
    usePlaceOrderMutation();

  const { register, control, setValue, handleSubmit, getValues, watch } =
    useForm({
      defaultValues: {
        images: [{ image: "" }],
      },
    });

  const { fields, append, remove } = useFieldArray({
    name: "images",
    control,
  });
  const onSubmit = async (values) => {
    console.log(values);
    await placeOrder({ ...values, customerId, serviceId })
      .unwrap()
      .then((response) => {
        console.log(response);
        reset();
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  const images = watch("images");

  console.log(error);

  if (isError) {
    return <Error error={error} />;
  }
  if (isSuccess) {
    return <Modal message={data?.message} navigation="/orders/customers" />;
  }
  return (
    <section className="grid place-content-center p-2  bg-[#D6FFFF]   ">
      <form
        action=""
        className=" w-[60Vw] bg-white rounded-md grid grid-cols-1  p-4 gap-5 auto-rows-min shadow shadow-gray-800  text-gray-700"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-center  text-gray-400 p-5 font-bold text-2xl">
          Your Service Order Form
        </h2>
        <div>
          <p>Order Infromation</p>
          <div className="selected-field">
            <label htmlFor="">Service For(Date)</label>
            <input type="date" {...register("date")} />
          </div>
          <div className="selected-field">
            <label htmlFor="">Emergency Service</label>
            <input type="text" {...register("date")} />
          </div>
          <div className="selected-field">
            <label htmlFor="">Maximum Delay</label>
            <input type="text" {...register("date")} />
          </div>
          <div className="selected-field">
            <label htmlFor="">Delivery Location</label>
            <input type="text" {...register("location")} />
          </div>
        </div>
        <div>
          <p>Service Details</p>
          <table className="w-full" cellPadding={2}>
            <thead>
              <tr>
                <th></th>
                <th>Service</th>

                <th>Basic Charge</th>
              </tr>
            </thead>
            <tbody>
              <tr className="mb-4">
                <td className="text-center">
                  <input type="checkbox" />
                </td>
                <td className="text-center">Service1</td>
                <td className="text-center">
                  <input
                    type="text"
                    value=""
                    className="border-b-2 border-slate-500 "
                  />
                </td>
              </tr>
              <tr className="mb-4">
                <td className="text-center">
                  <input type="checkbox" />
                </td>
                <td className="text-center">Service1</td>
                <td className="text-center">
                  <input
                    type="text"
                    value=""
                    className="border-b-2 border-slate-500 "
                  />
                </td>
              </tr>
              <tr className="mb-4">
                <td className="text-center">
                  <input type="checkbox" />
                </td>
                <td className="text-center">Service1</td>
                <td className="text-center">
                  <input
                    type="text"
                    value=""
                    className="border-b-2 border-slate-500 "
                  />
                </td>
              </tr>
              <tr className="mb-4">
                <td className="text-center">
                  <input type="checkbox" />
                </td>
                <td className="text-center">Service1</td>
                <td className="text-center">
                  <input
                    type="text"
                    value=""
                    className="border-b-2 border-slate-500 "
                  />
                </td>
              </tr>
              <tr className="mb-4">
                <td className="text-center">
                  <input type="checkbox" />
                </td>
                <td className="text-center">Service1</td>
                <td className="text-center">
                  <input
                    type="text"
                    value=""
                    className="border-b-2 border-slate-500 "
                  />
                </td>
              </tr>
              <tr className="mb-4">
                <td className="text-center">
                  <input type="checkbox" />
                </td>
                <td className="text-center">Service1</td>
                <td className="text-center">
                  <input
                    type="text"
                    value=""
                    className="border-b-2 border-slate-500 "
                  />
                </td>
              </tr>
              <tr className="mb-4">
                <td className="text-center">
                  <input type="checkbox" />
                </td>
                <td className="text-center">Service1</td>
                <td className="text-center">
                  <input
                    type="text"
                    value=""
                    className="border-b-2 border-slate-500 "
                  />
                </td>
              </tr>
            </tbody>
          </table>
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
              {...register("description")}
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
              {...register("description")}
            ></textarea>
          </div>
          <div className="selected-field">
            <p>Upload Files or Image</p>

            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-4 gap-4 ">
                {images.map((image) => {
                  return (
                    <>
                      {image?.image && (
                        <img
                          src={URL.createObjectURL(image.image)}
                          alt=""
                          className="h-[150px] w-full object-cover"
                        />
                      )}
                    </>
                  );
                })}
              </div>
              {fields.map((field, index) => {
                <div>
                  <img
                    src={field?.image && URL.createObjectURL(field.image)}
                    alt=""
                  />
                </div>;

                return (
                  <div key={field.id}>
                    <Controller
                      name="images"
                      control={control}
                      render={({ field }) => {
                        return (
                          <div className="flex  gap-3">
                            <input
                              type="file"
                              onChange={(e) => {
                                const { files } = e.target;
                                console.log(files);
                                setValue(`images.${index}.image`, files[0]);
                                console.log("getvalue", getValues("images"));
                              }}
                              className="w-[60%]"
                            />

                            <div className="flex gap-3">
                              {index > 0 && (
                                <button
                                  type="button"
                                  onClick={() => remove(index)}
                                  className="shadow shadow-gray-500 text-xl p-1 px-2 rounded-md"
                                >
                                  -
                                </button>
                              )}
                              <button
                                type="button"
                                onClick={() => append({ image: "" })}
                                className="shadow shadow-gray-500 text-xl px-2 p-1 rounded-md"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        );
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="selected-field">
          <label htmlFor=""> Response Time Limit</label>
          <input type="text" {...register("duration")} />
        </div>
        <div>
          <p>Contact Information</p>
          <div>
          <div className="selected-field">
          <label htmlFor=""> Name</label>
          <input type="email" {...register("email")} />
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
  <p>Ask Questions</p>
  <div className="selected-field">
  <input type="text" {...register("number")} />
  <input type="text" {...register("number")} />
  <input type="text" {...register("number")} />

  </div>
</div>

        <div className="flex-1 flex justify-around">
          <button
            className="bg-gray-800 text-white p-2  px-8 rounded-md "
            type="button"
            onClick={() => {
              reset();
              navigate("/customer");
            }}
          >
            Cancel Order
          </button>

          <button
            className=" bg-gray-800 p-2 text-white rounded-md px-7"
            type="submit"
          >
            Submit Orders
          </button>
        </div>
      </form>
    </section>
  );
};

export default Order;
