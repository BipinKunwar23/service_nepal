import React, { useEffect, useRef, useState } from "react";
import Select from "react-select";

import { useViewCategoryQuery } from "../../../../Api/categoryApi";
import { useGetAllSubCategoryQuery } from "../../../../Api/subCategoryApi";
import Loader from "../../../../components/Loader";
import AsyncSelect from "react-select/async";
import { useGetServiceByCategoryQuery } from "../../../../Api/serviceApi";
import { useGetScopeQuery } from "../../../../Api/serviceApi";
import { useCreateServiceOverviewMutation } from "../../../../Api/serviceApi";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setServiceId, setStepCount, setSteps } from "../../../../redux/serviceSlice";
const ServiceOptions = ({
  subcategoryId,
  setServiceTypes,
  setValue,
  defaultService,
}) => {
  const { data, isLoading } = useGetServiceByCategoryQuery(subcategoryId);
  const [serviceOptions, setServiceOptions] = useState([]);

  console.log("services", data);

  useEffect(() => {
    if (data) {
      const options = data.map((service) => {
        return {
          value: service.id,
          label: service.name,
        };
      });
      setServiceOptions(options);
    }
    if (defaultService) {
      setServiceTypes(defaultService?.id);
    }
  }, [data, defaultService]);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div>
      <Select
        options={serviceOptions}
        defaultValue={
          defaultService && {
            value: defaultService?.id,
            label: defaultService?.name,
          }
        }
        onChange={(option) => {
          setServiceTypes(option.value);
          setValue("serviceId", option.value);
        }}
      />
    </div>
  );
};

const ServiceTypes = ({ serviceId, register, setValue, defaultScope }) => {
  const { data, isLoading } = useGetScopeQuery(serviceId);
  console.log("scopes", data);

  console.log("services", data);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="flex  ">
      <h2 className="bg-gray-100 p-8">Product Type</h2>
      <ul className="border-l border-gray-400 flex flex-col gap-8 flex-1 bg-gray-100 p-8">
        {data.map((scope) => (
          <li key={scope.id} className="flex gap-5">
            <input
              type="radio"
              name="scope"
              onChange={() => {
                setValue("scopeId", scope.id);
              }}
              defaultChecked={scope.id === defaultScope?.id}
            />
            <button>{scope.name}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const OverView = ({ overview }) => {
  const dispatch = useDispatch();
  const steps = useSelector((state) => state.serviceSlice.steps);

  const { data, isLoading } = useViewCategoryQuery();
  const { data: dataskills, isLoading: isskills } = useGetAllSubCategoryQuery();
  const [categoryOptions, setcategoryOptions] = useState([]);
  const secondSelectRef = useRef(null);
  const [category, setCategory] = useState(overview?.category_id);
  const [subcategory, setSubcategory] = useState(overview?.subcategory_id);
  const [selectSubcategory, setSelectSubcategory] = useState([]);
  const [selectedOptionSecondSelect, setSelectedOptionSecondSelect] =
    useState(null);
  const [serviceTypes, setServiceTypes] = useState(null);

  const serviceId = useSelector((state) => state.serviceSlice.serviceId);

  const form = useForm({
    defaultValues: {
      categoryId: overview?.category_id,
      subcategoryId: overview?.subcategory_id,
      serviceId: overview?.service_id,
      scopeId: overview?.scope_id,
    },
  });
  const { register, handleSubmit, control, setValue } = form;
  const [serviceOverview, { isLoading: isOverview }] =
    useCreateServiceOverviewMutation();

  const [defaultCategory, setDefaultCategroy] = useState({});

  useEffect(() => {
    if (data) {
      const options = data.map((category) => {
        return {
          value: category.id,
          label: category.name,
        };
      });
      setcategoryOptions(options);
    }

    if (dataskills && category) {
      const subcategories = dataskills
        .filter((value) => value.category_id === category)
        .map((item) => {
          return {
            value: item.id,
            label: item.name,
          };
        });

      setSelectSubcategory(subcategories);
    }

    // if(Object.keys(overview).length!==0){
    //   setCategory(overview?.category_id)
    //     setSubcategory(overview?.subcategory_id)
    // }
  }, [data, dataskills, category]);

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

  if (isLoading || isskills || isOverview) {
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
                options={categoryOptions}
                placeholder="Select Category"
                defaultValue={
                  overview?.category && {
                    value: overview?.category?.id,
                    label: overview?.category?.name,
                  }
                }
                onChange={(option) => {
                  setCategory(option.value);
                  setValue("categoryId", option.value);

                  setSelectedOptionSecondSelect(null);
                }}
              />
            </div>
            <div className="flex-1">
              <Select
                options={selectSubcategory}
                hideSelectedOptions={true}
                defaultValue={
                  overview?.subcategory && {
                    value: overview?.subcategory?.id,
                    label: overview?.subcategory?.name,
                  }
                }
                onChange={(option) => {
                  setSubcategory(option.value);
                  setValue("subcategoryId", option.value);

                  setSelectedOptionSecondSelect(option.value);
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
            {" "}
            <ServiceOptions
              subcategoryId={subcategory}
              setServiceTypes={setServiceTypes}
              setValue={setValue}
              defaultService={overview?.service}
            />
          </div>
        </section>

        <section className=" grid grid-cols-5">
          <div>
            <h2 className="font-bold">Service Metadata</h2>
          </div>
          <div className="col-span-3 col-start-3">
            {serviceTypes && (
              <ServiceTypes
                serviceId={serviceTypes}
                setValue={setValue}
                defaultScope={overview?.scope}
              />
            )}
          </div>
        </section>
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
