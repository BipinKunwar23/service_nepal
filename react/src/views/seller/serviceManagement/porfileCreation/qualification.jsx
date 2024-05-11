import React, { useEffect, useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import Select from "react-select";
import { useGetCategoryQuery } from "../../../../api/seller/catalogApi";
import { useGetSubCategoryQuery } from "../../../../api/seller/catalogApi";
import { useGetCatalogQuery } from "../../../../api/seller/catalogApi";
import { useAddQualificationMutation, useUpdateQualificationMutation } from "../../../../api/seller/profileApi";
import Loader from "../../../../components/Loader";
import { useDispatch } from "react-redux";
import { setProfileStep } from "../../../../redux/sellerSlice";

const Qualification = ({ profession }) => {
  const { data: catalog, isLoading: isCatalog } = useGetCatalogQuery();
  console.log('catalog',catalog);
  const [subcategories, setSubcategory] = useState([]);

  useEffect(() => {
    if (catalog && profession?.occupation) {
      const profession_skills = catalog.find(
        (category) => category?.id === parseInt(profession?.occupation?.id)
      ).subcategories;
      setSubcategory(profession_skills);

      
    }
  }, [profession?.skills, catalog]);

  const dispatch = useDispatch();

  const { register, handleSubmit, control, setValue, watch } = useForm({
    defaultValues: {
      skills: profession?.skills || [],
      experience: {
        year: profession?.experience?.year || "",
      },
      education: {
        institute: profession?.education?.institute || "",
        faculty: profession?.education?.faculty || "",
        year: profession?.education?.year || "",
      },
      training: {
        institute: profession?.training?.institute || "",
        faculty: profession?.training?.faculty || "",
        level: profession?.training?.level || "",
      },
      certificate: {
        certificate: profession?.certificate?.certificate || "",
        institute: profession?.certificate?.institute || "",
        year: profession?.certificate?.year || "",
      },
    },
  });
  const [addQualification, { isLoading: isAdding }] =
    useAddQualificationMutation();

    const [updateQualification,{isLoading:isUpdating}] =
    useUpdateQualificationMutation();


  const experience = [
    {
      value: "Begineer",
      label: "Begineer",
    },
    {
      value: "Intermediate",
      label: "Intermediate",
    },
    {
      value: "Experts",
      label: "Experts",
    },
  ];

  const onSubmit = async (values) => {
    console.log("profession", values);
    if(!profession){
      await addQualification(values)
      .unwrap()
      .then((response) => {
        console.log(response);
        dispatch(setProfileStep(3))
        // navigate(`${location?.state?.path} `, { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });

    }
    else {
      await updateQualification(values)
      .unwrap()
      .then((response) => {
        console.log('response',response);
        dispatch(setProfileStep(3))
        // navigate(`${location?.state?.path} `, { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
    }

  };

  if (isAdding || isCatalog || isUpdating) {
    return <Loader />;
  }
  return (
    <section className=" bg-white p-5">
      <form
        action=""
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-10"
      >
        <div className="grid grid-cols-3 gap-8 ">
          <label htmlFor="">Occupations </label>
          <div className="col-span-2">
            <Select
              defaultValue={profession?.occupation}
              // defaultInputValue={ [

              // ]}
              options={
                catalog.length > 0 &&
                catalog.map((category) => {
                  return {
                    value: category.id,
                    label: category.name,
                  };
                })
              }
              placeholder="Select your occupation"
              onChange={(option) => {
                setValue("occupation", option.value);
                setSubcategory(
                  catalog.find((category) => category.id === option.value)
                    .subcategories
                );
              }}
              isClearable={true}
              className="border-slate-400 "
            />
          </div>
        </div>
        {subcategories.length > 0 && (
          <>
            <div className="grid grid-cols-3  ">
              <label htmlFor="">Skills</label>
              <div className="col-span-2  p-2">
                {subcategories.map((subcategory, index) => {
                  return (
                    <div key={subcategory?.id} className="grid grid-cols-3 gap-4  auto-rows-min ">
                      {subcategory?.services.map((skills) => {
                        return (
                          <div key={skills.id} className="flex gap-2">
                        <div>
                        <input
                              type="checkbox"
                              {...register(`skills.${index}`)}
                              value={skills.id}
                              defaultChecked={profession?.skills.some(
                                (item) => item === skills.id
                              )}
                            />
                        </div>
                            <p>{skills.name}</p>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="grid grid-cols-3  gap-8 ">
              <label htmlFor="">Experience </label>
              <div className="grid grid-cols-2 gap-5 col-span-2">
                <input
                  type="number"
                  placeholder="Experience year  "
                  className="p-2 border border-slate-400 "
                  {...register("experience.year")}
                />
                <Select
                  options={experience}
                  placeholder="Experience Level"
                  defaultValue={{
                    value:profession?.experience?.level,
                    label:profession?.experience?.level
                  }}
                  onChange={(option) => {
                    setValue("experience.level", option.value);
                  }}
                />
              </div>
            </div>
          </>
        )}
        <div className="grid grid-cols-3 gap-8 ">
          <label htmlFor="">Education </label>
          <div className="grid grid-cols-2 gap-5 col-span-2">
            <input
              name=""
              id=""
              cols="30"
              rows="2"
              {...register("education.institute")}
              placeholder="College/Institute"
              className="p-2 border border-slate-400 "
            ></input>
            <input
              name=""
              id=""
              cols="30"
              rows="2"
              {...register("education.faculty")}
              placeholder="Faculty"
              className="p-2 border border-slate-400 "
            ></input>
            <input
              name=""
              id=""
              cols="30"
              rows="2"
              {...register("education.year")}
              placeholder="Passed Year"
              className="p-2 border border-slate-400 "
            ></input>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-8  ">
          <label htmlFor="">Training </label>
          <div className="grid grid-cols-2 gap-5 col-span-2">
            <input
              name=""
              id=""
              cols="30"
              rows="2"
              {...register("training.faculty")}
              placeholder="Training/Learning"
              className="p-2 border border-slate-400 "
            ></input>
            <input
              name=""
              id=""
              cols="30"
              rows="2"
              {...register("training.institute")}
              placeholder="Institute Name"
              className="p-2 border border-slate-400 "
            ></input>
            <input
              name=""
              id=""
              cols="30"
              rows="2"
              {...register("training.level")}
              placeholder="Level"
              className="p-2 border border-slate-400 "
            ></input>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-8  ">
          <label htmlFor="">Certificate </label>
          <div className="grid grid-cols-2 gap-5 col-span-2">
            <input
              name=""
              id=""
              cols="30"
              rows="2"
              {...register("certificate.certificate")}
              placeholder="Certificate/Reward"
              className="p-2 border border-slate-400 "
            ></input>
            <input
              name=""
              id=""
              cols="30"
              rows="2"
              {...register("certificate.institute")}
              placeholder="Certified From"
              className="p-2 border  border-slate-400 "
            ></input>
            <input
              name=""
              id=""
              cols="30"
              rows="2"
              {...register("certificate.year")}
              placeholder="Year"
              className="p-2 border border-slate-400 "
            ></input>
          </div>
        </div>
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

export default Qualification;
