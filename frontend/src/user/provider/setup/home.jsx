import React, { useEffect, useState } from "react";
import Time from "./time";
import { useParams, useNavigate, useLocation, json } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Charge from "./charge";
import Modal from "../../../components/mpdal";
import Select from "react-select";
import {
  useSetupServicesMutation,
  useGetProviderServiceByIdQuery,
  useEditServicesMutation,
} from "../../../Api/providerApi";
// import { useGetOtherCatserviceQuery } from "../../Api/catServiceApi";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import Loader from "../../../components/Loader";
export default function SeviceSetup() {
  const dispatch = useDispatch();
  const { serviceId } = useParams();
  const location = useLocation();
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
  const [imagePreviews, setImagePreviews] = useState([]);

  const navigate = useNavigate();
 
  

  

  const [button, setButton] = useState("");

  const { register, control, setValue, handleSubmit, getValues, watch, reset } =
    useForm({
      defaultValues: {
        cities: [{ city: "" }],
        scopes: [],
        originalValues: [],
      },
    });


  const {
    fields: cityFields,
    append: appendCity,
    remove: removeCity,
  } = useFieldArray({
    control,
    name: "cities",
  });

  const onSubmit = async (values) => {
    console.log("values", values);
    const userId = localStorage.getItem("userId");

    const formdata = new FormData();
    formdata.append("sid", serviceId);
    formdata.append("description", values.description);
    formdata.append("time", JSON.stringify(values.time));
    formdata.append("days", JSON.stringify(values.days));
    formdata.append("currency", values.currency);
    formdata.append("cities", JSON.stringify(values.cities));
    for (const file of imagePreviews) {
      formdata.append("images[]", file.file);
    }
    formdata.append("scopes", JSON.stringify(values.scopes));
    formdata.append("additional_info", values.additional_info);
    formdata.append("experience", values.experience);
    formdata.append("experience_certificate", values.experience_certificate);
    formdata.append("trainings", values.trainings);
    formdata.append("training_certificate", values.training_certificate);
    formdata.append("projects", values.projects);
    formdata.append("project_certificate", values.project_certificate);

    if (button === "create") {
      await setupService({ formdata, id: userId })
        .unwrap()
        .then((response) => {
          console.log("response", response);
          reset();
          navigate(`${location?.state?.path || "/services/provider"}`, {
            replace: true,
          });
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
          navigate(`${location?.state?.path || "/services/provider"}`, {
            replace: true,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const options = service?.units.split(",").map((unit) => {
    return {
      value: unit,
      label: unit,
    };
  });
  const scopes = watch("scopes");
  console.log("selected", scopes);
  const originalValues = watch("originalValues");
  console.log("original", originalValues);
  const fileInputRef = React.createRef();
  const handleAddButtonClick = () => {
    // Trigger the file input programmatically when the "Add" button is clicked
    fileInputRef.current.click();
  };

  const handleFileInputChange = (event) => {
    const fileInput = event.target;
    const selectedFiles = fileInput.files;
    const previews = [];

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      const reader = new FileReader();

      // Read the file as a data URL
      reader.readAsDataURL(file);

      // Callback when reading is complete
      reader.onloadend = () => {
        // Create a preview object with the file and data URL
        const preview = {
          id:Date.now(),
          file,
          dataURL: reader.result,
        };

        // Update the state with the new preview
        setImagePreviews((prevPreviews) => [...prevPreviews, preview]);
      };
    }
    fileInput.value = null;
  };

  const handleRemoveImage = (id) => {
    // Filter out the preview with the specified id
    setImagePreviews((prevPreviews) =>
      prevPreviews.filter((preview) => preview.id !== id)
    );
  };

  const handleCheckboxChange = (e, scope) => {
    const { checked, value } = e.target;
    const Scopes = watch("scopes");
    const originalValues = watch("originalValues");
    console.log("unchecked", Scopes);

    if (checked) {
      setValue("scopes", [
        ...Scopes,
        {
          id: scope.id,
          price: originalValues.find((o) => o.id === scope.id)?.price || "",
          unit: originalValues.find((o) => o.id === scope.id)?.unit || "",
        },
      ]);
    } else {
      console.log("id", scope.id);
      const updatedScope = Scopes.filter(
        (selectedScope) => selectedScope.id !== scope.id
      );

      setValue("originalValues", [
        ...scopes,
        ...originalValues.filter((o) => !scopes.some((s) => o.id === s.id)),
      ]);

      setValue("scopes", [...updatedScope]);
    }
  };
  if (isError) {
    return <div>Error Occured</div>;
  }

  if (isLoading || isCreating || isUpdating) {
    return <Loader />;
  }
  if (iscreateSuccess || isEditSuccess) {
    return (
      <Modal
        message={iscreateSuccess ? create?.message : edit?.message}
        navigation="/provider"
      />
    );
  }
  return (
    <section className="grid  place-items-center bg-slate-300 p-3">
      <section className="selected-service">
        <h2 className="text-slate-500 font-semibold text-2xl mb-3">
          {service?.name}
        </h2>

        <div className="p-5 grid grid-cols-3 gap-5 ">
          <div>
            <img
              src={`http://localhost:8000/${service.icons}`}
              className="h-[200px]  object-cover mb-3"
              alt=""
            />
          </div>
          <div className="col-span-2">
            <p className="mb-3">
              <strong>Category:</strong> Plumbing
            </p>
            <p className="mb-3">
              <strong>Tags:</strong>
              {service?.description}
            </p>
            <ul>
              <li className="mb-2 text-[1em] font-bold">Featureing Services</li>

              {service?.scopes.map((scope) => {
                return (
                  <li
                    key={scope?.id}
                    className="m-2 text-gray-500 font-semibold"
                  >
                    {scope?.name}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <section>
          <p className="text-center text-lg text-slate-500">Getting Started</p>

          <form
            action=""
            className="   grid gap-3    text-gray-800  p-5  box-border justify-self-center"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="selected-field ">
              <label htmlFor="">
                Service Description{" "}
                <span className="text-red-600 ml-2 text-xl">*</span>
              </label>
              <textarea
                cols="50"
                rows="2"
                className="placeholder:text-[1em]  focus:outline-none "
                {...register("description")}
                defaultValue={service?.pivot?.description}
              ></textarea>
            </div>
            <div className=" ">
              <h2 className="ml-4">
                List of Images{" "}
                <span className="text-red-600 ml-2 text-xl">*</span>
              </h2>

              <div className="grid grid-cols-6 ml-5 gap-4 mb-3">
                {imagePreviews.map((preview, index) => (
                  <div key={preview.id} className="relative">
                    <img
                      key={index}
                      src={preview.dataURL}
                      alt={`Preview ${preview.id}`}
                      className="w-[100px] h-[100px] shadow shadow-gray-400"
                    onClick={() => handleRemoveImage(preview.id)}

                    />

                    <button
                      onClick={() => handleRemoveImage(preview.id)}
                    
                      className="absolute top-0 right-0 cursor-pointer bg-[rgba(0,0,0,0.9)] px-1 text-white font-semibold text-lg]"
                    >
                      X
                    </button>
                  </div>
                ))}

                <div className="h-[100px] w-[100px]  flex place-content-center border-2  border-gray-400 shadow">
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
                    className="text-[70px] text-blue-500"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <div className="selected-field">
              <label htmlFor="">
                Currency <span className="text-red-600 ml-2 text-xl">*</span>
              </label>
              <input type="text" {...register("currency")} />
            </div>
            <div className="p-5 ">
              <p className="mb-2">
                Featuring Services{" "}
                <span className="text-red-600 ml-2 text-xl">*</span>
              </p>
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="mr-3">Select</th>
                    <th className="text-left">Service</th>

                    <th>Charge(Basic)</th>
                    <th>Per(Unit)</th>
                  </tr>
                </thead>
                <tbody>
                  <Controller
                    name="scopes"
                    control={control}
                    defaultValue={[]}
                    render={({ field }) => {
                      return (
                        <>
                          {service?.scopes.map((scope, index) => {
                            return (
                              <tr className="" key={scope?.id}>
                                <td className="text-center">
                                  <input
                                    type="checkbox"
                                    id={`scope${scope.id}`}
                                    value={scope?.id}
                                    onChange={(e) => {
                                      handleCheckboxChange(e, scope);
                                    }}
                                    className="mr-3"
                                  />
                                </td>
                                <td className="">
                                  <label htmlFor={`scope${scope.id}`}>
                                    {scope?.name}
                                  </label>
                                </td>
                                <td className="text-center">
                                  <input
                                    type="number"
                                    className="py-[0.5em] px-2 border-2 rounded text-gray-800 mb-1 border-slate-300 focus:outline-blue-500 "
                                    onChange={(e) => {
                                      setValue(
                                        `scopes.${scopes.findIndex(
                                          (s) => s.id === scope.id
                                        )}.price`,
                                        e.target.value
                                      );
                                    }}
                                  />
                                </td>
                                <td className="">
                                  <Select
                                    options={options}
                                    onChange={(option) => {
                                      setValue(
                                        `scopes.${scopes.findIndex(
                                          (s) => s.id === scope.id
                                        )}.unit`,
                                        option.value
                                      );
                                    }}
                                  />
                                </td>
                              </tr>
                            );
                          })}
                        </>
                      );
                    }}
                  />
                </tbody>
              </table>
            </div>
            <div>
              <Time
                register={register}
                Controller={Controller}
                control={control}
                setValue={setValue}
                time={service?.pivot?.time}
                days={service?.pivot?.days}
              />
            </div>

            <div className=" selected-field">
              <p>
                Available Cities{" "}
                <span className="text-red-600 ml-2 text-xl">*</span>
              </p>
              {cityFields.map((field, index) => {
                return (
                  <div key={field.id}>
                    <div className="flex  gap-3">
                      <input
                        type="text"
                        {...register(`cities.${index}.city`)}
                        className="w-[80%]"
                      />

                      <div className="flex gap-3">
                        {index > 0 && (
                          <button
                            type="button"
                            onClick={() => removeCity(index)}
                            className="shadow shadow-gray-500 text-xl p-1 px-4 rounded-md"
                          >
                            -
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => appendCity({ prerequisite: "" })}
                          className="shadow shadow-gray-500 text-xl px-3 p-1 rounded-md"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className=" selected-field">
              <label htmlFor=""> Add Additonal Information</label>
              <textarea
                name=""
                id=""
                cols="30"
                rows="2"
                {...register("additional_info")}
              ></textarea>
            </div>

            <div className=" selected-field">
              <label htmlFor="">Experience </label>
              <textarea
                name=""
                id=""
                cols="30"
                rows="2"
                {...register("experience")}
              ></textarea>
              <Controller
                name="experience_certificate"
                control={control}
                render={({ field }) => {
                  return (
                    <div>
                      <label htmlFor="" className=" ">
                        Certificate
                      </label>

                      <div className="">
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={(e) => {
                            setValue(
                              "experience_certificate",
                              e.target.files[0]
                            );
                          }}
                        />
                      </div>
                    </div>
                  );
                }}
              />
            </div>
            <div className=" selected-field">
              <label htmlFor="">Training</label>
              <textarea
                name=""
                id=""
                cols="30"
                rows="2"
                {...register("trainings")}
              ></textarea>
              <Controller
                name="training_certificate"
                control={control}
                render={({ field }) => {
                  return (
                    <div>
                      <label htmlFor="" className=" ">
                        Certificate
                      </label>

                      <div className="">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            setValue("training_certificate", e.target.files[0]);
                          }}
                        />
                      </div>
                    </div>
                  );
                }}
              />
            </div>
            <div className=" selected-field">
              <label htmlFor="">Projects</label>
              <textarea
                name=""
                id=""
                cols="30"
                rows="2"
                {...register("projects")}
              ></textarea>
              <Controller
                name="project_certificate"
                control={control}
                render={({ field }) => {
                  return (
                    <div>
                      <label htmlFor="" className=" ">
                        Certificate
                      </label>

                      <div className="">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            setValue("project_certificate", e.target.files[0]);
                          }}
                        />
                      </div>
                    </div>
                  );
                }}
              />
            </div>
            <div className="grid justify-center">
              {service?.pivot !== null ? (
                <button
                  type="submit"
                  className=" p-2 bg-blue-600 text-white px-10 rounded-md"
                  onClick={() => {
                    setButton("update");
                  }}
                >
                  Save Changes
                </button>
              ) : (
                <button
                  type="submit"
                  className=" p-2 bg-blue-600 text-white px-10 rounded-md"
                  onClick={() => {
                    setButton("create");
                  }}
                >
                  Create Service
                </button>
              )}
            </div>
          </form>
        </section>
      </section>
    </section>
  );
}
