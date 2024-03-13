import React, { useEffect, useRef, useState } from "react";
import Select from "react-select";

import { useCreateOverviewMutation, useUpdateOverviewMutation} from "../../../../api/seller/serviceApi";

import { useGetCatalogQuery } from "../../../../api/seller/catalogApi";

import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  setServiceId,
  setStepCount,
  setSteps,
} from "../../../../redux/sellerSlice";
import Loader from "../../../../components/Loader";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

const OverView = ({ overview }) => {
  const dispatch = useDispatch();
  const steps = useSelector((state) => state.sellerSlice.steps);

  const { data: catalog, isLoading: iscatalog } = useGetCatalogQuery();
  console.log("catalog", catalog);

  const [subcategory, setSubcategory] = useState([]);
  const [services, setServices] = useState([]);
  const [serviceTypes, setServiceTypes] = useState([]);
  const navigate = useNavigate();

  const [serviceOverview, { isLoading: isOverview }] =
    useCreateOverviewMutation();

    const [updateServiceOverview, { isLoading: isUpdating }] =
    useUpdateOverviewMutation();


  const form = useForm({
    defaultValues: {
      categoryId: overview?.category_id,
      subcategoryId: overview?.subcategory_id,
      serviceId: overview?.service_id,
      optionId: overview?.option_id,
    },
  });

  useEffect(() => {
    if (catalog && overview) {
      const subcategory = catalog?.find(
        (item) => item?.id === overview?.category_id
      )?.subcategories;

      setSubcategory(subcategory);
      const services = catalog
        ?.find((item) => item?.id === overview?.category_id)
        ?.subcategories?.find(
          (sub) => sub?.id === overview?.subcategory_id
        )?.services;

      setServices(services?.filter((item)=>item?.id!==overview?.service_id));

      const options = catalog
        ?.find((item) => item?.id === overview?.category_id)
        ?.subcategories?.find((sub) => sub?.id === overview?.subcategory_id)
        ?.services.find(
          (service) => service?.id === overview?.service_id
        )?.options;
      console.log("updatedData", options);
      setServiceTypes(options);
    }
  }, [catalog,overview]);
  const { register, handleSubmit, control, setValue } = form;
  const params=useParams()

  const onSubmit = async (values) => {
    console.log("data", values);
    if(!overview){

      await serviceOverview({optionId:values?.optionId, values})
        .unwrap()
        .then((response) => {
          console.log("response", response);
          const updatedSteps = [...steps];
  
          const stepIndex = updatedSteps.findIndex((step) => step.id === 2);
  
          updatedSteps[stepIndex] = { ...updatedSteps[stepIndex], show: true };
          dispatch(setSteps(updatedSteps));
          dispatch(setStepCount(2));
  
          navigate(
            `/user/${localStorage.getItem("name")}/seller/service/draft/${
              response?.id
            } `,
            { replace: true }
          );
        })
        .catch((error) => {
          console.log(error);
        });
    }
    else {
      await updateServiceOverview({optionId:params?.serviceId, values})
      .unwrap()
      .then((response) => {
        console.log("response", response);
        const updatedSteps = [...steps];

        const stepIndex = updatedSteps.findIndex((step) => step.id === 2);

        updatedSteps[stepIndex] = { ...updatedSteps[stepIndex], show: true };
        dispatch(setSteps(updatedSteps));
        dispatch(setStepCount(2));

       
      })
      .catch((error) => {
        console.log(error);
      });
    }
  };

  if (isOverview || iscatalog) {
    return <Loader />;
  }
  return (
    <section className="   text-[1.1em]">
      <form
        action=""
        className="flex flex-col gap-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <section className="create-service">
          <div>
            <h2 className="text-[1.1em] mb-3">Service Title</h2>
            <p>
              Add the title of your service that describs the what actually you
              are providing{" "}
            </p>
          </div>
          <div className="col-span-2">
            <textarea
              name=""
              id=""
              cols="30"
              rows="2"
              className="text-[1.2em] font-semibold"
              {...register("title")}
              placeholder="I will do"
              defaultValue={overview?.title || "I wll do or provide"}
            ></textarea>
          </div>
        </section>
        <section className="create-service">
          <div>
            <h2>Category</h2>
            <p>
              Choose the categor and subcateogry that suitable for your service{" "}
            </p>
          </div>
          <div className="flex gap-5 ">
            <div className="flex-1">
              <Select
                options={
                  catalog.length > 0 &&
                  catalog.filter((category)=>category?.id!==overview?.category_id).map((category) => {
                    return {
                      value: category.id,
                      label: category.name,
                    };
                  })
                }
                placeholder="Select Category"
                defaultValue={{
                  value: overview?.category?.id,
                  label: overview?.category?.name,
                }}
                onChange={(option) => {
                  setValue("categoryId", option.value);
                  setSubcategory(
                    catalog.find((category) => category.id === option.value)
                      .subcategories
                  );
                }}
              />
            </div>
            <div className="flex-1">
              <Select
                options={
                  subcategory &&
                  subcategory.map((subcategory) => {
                    return {
                      value: subcategory.id,
                      label: subcategory.name,
                    };
                  })
                }
                hideSelectedOptions={true}
                defaultValue={
                  overview?.subcategory && {
                    value: overview?.subcategory?.id,
                    label: overview?.subcategory?.name,
                  }
                }
                onChange={(option) => {
                  setValue("subcategoryId", option.value);
                  setServices(
                    subcategory
                      ? subcategory.find(
                          (subcategory) => subcategory.id === option.value
                        ).services
                      : []
                  );
                }}
              />
            </div>
          </div>
        </section>

        <section className="create-service">
          <div>
            <h2>Services</h2>
          </div>
          <div>
            <Select
              options={
                services &&
                services.map((service) => {
                  return {
                    value: service.id,
                    label: service.name,
                  };
                })
              }
              defaultValue={{
                value: overview?.service?.id,
                label: overview?.service?.name,
              }}
              onChange={(option) => {
                setValue("serviceId", option.value);
                setServiceTypes(
                  services
                    ? services.find((service) => service.id === option.value)
                        .options
                    : []
                );
              }}
            />
          </div>
        </section>
        {serviceTypes.length > 0 && (
          <section className=" grid grid-cols-5">
            <div>
              <h2 className="font-bold">Service Metadata</h2>
            </div>
            <div className="col-span-3 col-start-3">
              <div className="flex  ">
                <h2 className="bg-gray-100 p-8">Service Options</h2>
                <ul className="border-l border-gray-400 flex flex-col gap-8 flex-1 bg-gray-100 p-8 ">
                  {serviceTypes.map((service) => (
                    <li key={service.id} className="flex gap-5">
                      <input
                        type="radio"
                        defaultChecked={service?.id === overview?.option_id}
                        value={service?.id}
                        name="service"

                        onChange={(e) => {
                          if(e.target.checked){
                            console.log('type',service?.id);
                            setValue("optionId", service?.id);

                          }
                          
                        }}
                        id={service.id}
                        className="w-[20px] h-[20px]"
                     
                      />
                      <label htmlFor={service.id} className="cursor-pointer">
                        {service.name}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}
        <section className="create-service">
          <div>
            <h2>Search Tags</h2>
            <p>Choose the search tags so that customer can easily find you </p>
          </div>
          <div>
            <input
              type="text"
              className=""
              {...register("search")}
              defaultValue={overview?.search}
            />
          </div>
        </section>
        <div className=" create-service  ">
          <div></div>
          <button
            type="submit"
            className="bg-blue-600 p-2 px-4 rounded-lg text-white "
          >
            Save and Continue
          </button>
        </div>
      </form>
    </section>
  );
};

export default OverView;
