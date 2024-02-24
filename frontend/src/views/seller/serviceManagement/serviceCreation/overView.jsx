import React, { useEffect, useRef, useState } from "react";
import Select from "react-select";

import { useCreateOverviewMutation } from "../../../../api/seller/serviceApi";

import { useGetCatalogQuery } from "../../../../api/seller/catalogApi";

import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  setServiceId,
  setStepCount,
  setSteps,
} from "../../../../redux/sellerSlice";
import Loader from "../../../../components/Loader";

const OverView = ({ overview }) => {
  const dispatch = useDispatch();
  const steps = useSelector((state) => state.sellerSlice.steps);

  const { data: catalog, isLoading: iscatalog } = useGetCatalogQuery();
  console.log("catalog", catalog);

  const [subcategory, setSubcategory] = useState([]);
  const [services, setServices] = useState([]);
  const [serviceTypes, setServiceTypes] = useState([]);


  const [serviceOverview, { isLoading: isOverview }] =
  useCreateOverviewMutation();
  
  const form = useForm({
    defaultValues: {
      categoryId: overview?.category_id,
      subcategoryId: overview?.subcategory_id,
      serviceId: overview?.service_id,
      scopeId: overview?.scope_id,
    },
  });
  const { register, handleSubmit, control, setValue } = form;

  const onSubmit = async (values) => {
    console.log("data", values);
    await serviceOverview(values)
      .unwrap()
      .then((response) => {
        console.log("response", response);
        const updatedSteps = [...steps];

        const stepIndex = updatedSteps.findIndex((step) => step.id === 2);

        updatedSteps[stepIndex] = { ...updatedSteps[stepIndex], show: true };
        dispatch(setSteps(updatedSteps));
        dispatch(setServiceId(response?.id));
        dispatch(setStepCount(2));

        // navigate(`${location?.state?.path} `, { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if ( isOverview || iscatalog) {
    return <Loader />;
  }
  return (
    <section className=" bg-white p-10  text-[1.1em]">
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
                options={catalog.length>0 && catalog.map((category) => {
                  return {
                    value: category.id,
                    label: category.name,
                  };
                })}
                placeholder="Select Category"
                // defaultValue={
                //   overview?.category && {
                //     value: overview?.category?.id,
                //     label: overview?.category?.name,
                //   }
                // }
                onChange={(option) => {
                  setSubcategory(
                    catalog.find((category) => category.id === option.value).subcategories
                  );
            
                  // setCategory(option.value);
                  // setValue("categoryId", option.value);

                  // setSelectedOptionSecondSelect(null);
                }}
              />
            </div>
            <div className="flex-1">
              <Select
                options={subcategory && subcategory.map((subcategory) => {
                  return {
                    value: subcategory.id,
                    label: subcategory.name,
                  };
                }) }
                hideSelectedOptions={true}
                // defaultValue={
                //   overview?.subcategory && {
                //     value: overview?.subcategory?.id,
                //     label: overview?.subcategory?.name,
                //   }
                // }
                onChange={(option) => {
                  setServices(
                   subcategory ? subcategory.find((subcategory) => subcategory.id === option.value)
                      .services: []
                  );
                
                }}
              />
            </div>
          </div>
        </section>

        <section className="create-service">
          <div>
            <h2>Service Types</h2>
          </div>
          <div>
            <Select
              options={services && services.map((service) => {
                  return {
                    value: service.id,
                    label: service.name,
                  };
                }) }
              // defaultValue={
              //   defaultService && {
              //     value: defaultService?.id,
              //     label: defaultService?.name,
              //   }
              // }
              onChange={(option) => {
                setServiceTypes(
                  services ? services.find((service) => service.id === option.value)
                     .scopes: []
                 );
               }}
            />
          </div>
        </section>
        {
          serviceTypes.length>0 &&
        <section className=" grid grid-cols-5">
          <div>
            <h2 className="font-bold">Service Metadata</h2>
          </div>
          <div className="col-span-3 col-start-3">
            <div className="flex  ">
              <h2 className="bg-gray-100 p-8">Product Type</h2>
              <ul className="border-l border-gray-400 flex flex-col gap-8 flex-1 bg-gray-100 p-8">
                {serviceTypes.map((service) => (
                  <li key={service.id} className="flex gap-5">
                    <input
                      type="radio"
                      name="scope"
                      onChange={() => {
                        setValue("scopeId", service.id);
                      }}
                      id={service.id}
                    />
                    <label htmlFor={service.id} className="cursor-pointer">{service.name}</label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
}
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
