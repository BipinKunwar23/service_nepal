import React from "react";
import { useForm } from "react-hook-form";
import {
  useAddServicePriceMutation,
  useUpdateServicePriceMutation,
} from "../../../../api/seller/serviceApi";
import Loader from "../../../../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { setStepCount, setSteps } from "../../../../redux/sellerSlice";
import { useParams } from "react-router-dom";
import { useGetServiceStandardQuery } from "../../../../api/seller/serviceApi";
import Select from "react-select";

const Pricing = ({ data = [], standards }) => {
  console.log("package standards", data);

  const { serviceId } = useParams();
  const dispatch = useDispatch();
  const steps = useSelector((state) => state.sellerSlice.steps);

  const [addServicePrice, { isLoading: isAdding }] =
    useAddServicePriceMutation();

  const [updateServicePrice, { isLoading: isUpdating }] =
    useUpdateServicePriceMutation();
  const { register, handleSubmit, control, setValue, watch, getValues } =
    useForm({
      defaultValues: {
        price: [
          {
            id: data[0]?.id || null,
            name: data[0]?.name || "",
            description: data[0]?.description || "",
            price: data[0]?.price || "",
            package: "basic",
            standards:
              data[0]?.standards.map((element) => {
                return {
                  standard_id: element?.id,
                  value_id: element?.pivot?.value_id,
                };
              }) || [],
          },
          {
            id: data[1]?.id || null,

            name: data[1]?.name || "",
            description: data[1]?.description || "",
            price: data[1]?.price || "",
            package: "standard",
            standards:
              data[1]?.standards.map((element) => {
                return {
                  standard_id: element?.id,
                  value_id: element?.pivot?.value_id,
                };
              }) || [],
          },
          {
            id: data[2]?.id || null,

            name: data[2]?.name || "",
            description: data[2]?.description || "",
            price: data[2]?.price || "",
            package: "premium",
            standards:
              data[2]?.standards.map((element) => {
                return {
                  standard_id: element?.id,
                  value_id: element?.pivot?.value_id,
                };
              }) || [],
          },
        ],
      },
    });
  const packages = [
    {
      name: "basic",
    },
    {
      name: "standard",
    },
    {
      name: "premium",
    },
  ];

  const common_standards = [
    {
      id: 1,
      name: " Name",
      placeholder: "Package Name",

      register: "name",
    },
    {
      id: 2,
      name: " Description",
      placeholder: "Package Description",

      register: "description",
    },
    {
      id: 3,
      name: "Fee",
      placeholder: "Service Fee",

      register: "price",
    },
  ];

  const onSubmit = async (values) => {
    console.log("data", values);

    if (data && data?.length > 0) {
      await updateServicePrice({serviceId, price: values?.price })
        .unwrap()
        .then((response) => {
          console.log("response", response);
          dispatch(setStepCount(3));

          const updatedSteps = [...steps];

          const stepIndex = updatedSteps.findIndex((step) => step.id === 3);

          updatedSteps[stepIndex] = { ...updatedSteps[stepIndex], show: true };
          dispatch(setSteps(updatedSteps));

          // navigate(`${location?.state?.path} `, { replace: true });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      await addServicePrice({  serviceId, price: values?.price })
        .unwrap()
        .then((response) => {
          console.log("response", response);
          dispatch(setStepCount(3));

          const updatedSteps = [...steps];

          const stepIndex = updatedSteps.findIndex((step) => step.id === 3);

          updatedSteps[stepIndex] = { ...updatedSteps[stepIndex], show: true };
          dispatch(setSteps(updatedSteps));

          // navigate(`${location?.state?.path} `, { replace: true });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  if (isUpdating) {
    return <Loader />;
  }
  return (
    <section className="bg-white p-4  ">
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <table className=" auto w-full ">
          <thead>
            <tr className=" text-left price-table">
              <th>Package</th>
              <th>Basic</th>
              <th>Standard</th>
              <th>Premium</th>
            </tr>
          </thead>
          <tbody>
            {common_standards.map((common) => (
              <tr className="price-table " key={common?.id}>
                <td className="font-semibold">{common?.name}</td>

                {packages?.map((pkg, index) => {
                  switch (common?.register) {
                    case "name":
                      return (
                        <td key={pkg?.name}>
                          <input
                            type="text"
                            placeholder={common?.placeholder}
                            {...register(`price[${index}].${common?.register}`)}
                          />
                        </td>
                      );

                      break;
                    case "description":
                      return (
                        <td key={pkg?.name}>
                          <textarea
                            name=""
                            id=""
                            cols="30"
                            rows="2"
                            placeholder={common?.placeholder}
                            {...register(`price[${index}].${common?.register}`)}
                          ></textarea>
                        </td>
                      );

                      break;

                    case "price":
                      return (
                        <td key={pkg?.name}>
                          <input
                            type="number"
                            placeholder={common?.placeholder}
                            className="placeholder:text-gray-800"
                            {...register(`price[${index}].${common?.register}`)}
                          />
                        </td>
                      );

                      break;

                    default:
                      break;
                  }
                })}
              </tr>
            ))}

            {standards?.map((standard) => {
              if (standard?.values?.length > 0) {
                return (
                  <tr key={standard?.id} className="price-table ">
                    <td className="font-semibold">{standard?.name}</td>

                    {packages?.map((pkg, index) => {
                      const value_id = data[index]?.standards.find(
                        (item) => item?.id === standard?.id
                      )?.pivot?.value_id;
                      const value = standard?.values.find(
                        (item) => item?.id === value_id
                      );
                      return (
                        <td className="" key={pkg?.name}>
                          <Select
                            defaultValue={
                              value && {
                                label: value?.name,
                                value: value?.id,
                              }
                            }
                            options={standard?.values.map((value) => ({
                              label: value?.name,
                              value: value?.id,
                            }))}
                            onChange={(option) => {
                              const price = watch("price");
                              console.log("price", price);
                              const updatedValue = price[index]?.standards.filter(
                                (item) => item.standard_id !== standard?.id
                              );
                              setValue(`price[${index}].standards`, [
                                ...updatedValue,

                                {
                                  standard_id: standard?.id,
                                  value_id: option?.value,
                                },
                              ]);
                            }}
                          />
                        </td>
                      );
                    })}
                  </tr>
                );
              }

              return (
                <tr key={standard?.id} className="price-table  ">
                  <td className="font-semibold">{standard?.name}</td>

                  {packages?.map((pkg, index) => {
                    const value_id = data[index]?.standards.find(
                      (item) => item?.id === standard?.id
                    )?.pivot?.value_id;
                    return (
                      <td className="text-center" key={pkg?.name}>
                        <input
                          type="checkbox"
                          className="w-[20px] h-[20px]"
                          defaultChecked={value_id === null}
                          onChange={(e) => {
                            const price = watch("price");
                            const checked = e.target.checked;
                            if (checked) {
                              setValue(`price[${index}].standards`, [
                                ...price[index].standards,
                                { standard_id: standard?.id, value_id: null },
                              ]);
                            } else {
                              const updatedValue = price[
                                index
                              ].standards.filter(
                                (item) => item.standard_id !== standard?.id
                              );
                              setValue(
                                `price[${index}].standards`,
                                updatedValue
                              );
                            }
                          }}
                        />
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>


        <div className=" grid grid-cols-3 gap-10 ">
          <button
            type="submit"
            className="bg-blue-600 p-2 px-4 rounded-lg text-white col-start-2 mt-5"
          >
            Save and Continue
          </button>
        </div>
      </form>
    </section>
  );
};

export default Pricing;
