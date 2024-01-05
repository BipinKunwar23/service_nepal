import React, { useState } from "react";
import { useJoinSubcategoryMutation } from "../../../../Api/subCategoryApi";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import Loader from "../../../../components/Loader";
import Time from "../../setup/time";
import { useParams } from "react-router-dom";
const JoinCategory = () => {
const paams=useParams()

  const { register, control, setValue, handleSubmit } = useForm({
    defaultValues: {
      available_cities: [{ city: "" }],
    },
  });

  const {
    fields: cityFields,
    append: appendCity,
    remove: removeCity,
  } = useFieldArray({
    control,
    name: "available_cities",
  });
  const [joinSubCategory, { data, isLoading }] = useJoinSubcategoryMutation();
  const [imagePreviews, setImagePreviews] = useState([]);

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
          id: Date.now(),
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

  const steps = [
    { title: "profession" },
    { title: "availability" },
    { title: "payment" },
    { title: "credential" },
    { title: "policies" },
  ];

  const [currentStep, setCurrentStep] = useState(0);
  // const [prevStep, setPrevStep] = useState();

  const handleCurrentSteps = () => {
    const { title } = steps[currentStep];
    console.log("field", title);

    switch (title) {
      case "profession":
        return (
          <div className="join-category">
            <p className="bg-orange-600 text-white p-2 ">About Profession</p>
            <div className="join-category-field">
              <label htmlFor="" className="">
                {" "}
                Profession Name
              </label>
              <input type="text" {...register("profession")} />
            </div>
            <div className="join-category-field">
              <label htmlFor="">Description</label>
              <textarea {...register("description")} id="" rows={2}></textarea>
            </div>
          </div>
        );
        break;
      case "availability":
        return (
          <div className="join-category">
            <p className="bg-orange-600 text-white p-2">Availability</p>
            <div>
              <Time
                register={register}
                Controller={Controller}
                control={control}
                setValue={setValue}
              />
            </div>
            <div className="join-category-field">
              <label htmlFor="" className="">
                {" "}
                Available Date
              </label>
              <input type="date" {...register("available_date")} />
            </div>
            <div className=" join-category-field">
              <label>Available Cities </label>
              {cityFields.map((field, index) => {
                return (
                  <div key={field.id}>
                    <div className="flex  gap-3">
                      <input
                        type="text"
                        {...register(`available_cities.${index}.city`)}
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
                          onClick={() => appendCity({ city: "" })}
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
            <div className="join-category-field">
              <label htmlFor="" className="">
                {" "}
                Special Availability Notes
              </label>
              <input type="text" {...register("special_availability")} />
            </div>
          </div>
        );
        break;

      case "payment":
        return (
          <div className="join-category">
            <p className="bg-orange-600 text-white p-2">Payment Information</p>
            <div className="join-category-field">
              <label htmlFor="">Paymnet Method</label>
              <input type="text" {...register("payment_method")} />
            </div>
            <div className="join-category-field">
              <label htmlFor="">Payment Structure</label>
              <input type="text" {...register("payment_structure")} />
            </div>
            <div className="join-category-field">
              <label htmlFor="">Paymnet Instructions</label>
              <input type="text" {...register("payment_instructions")} />
            </div>
            <div className="join-category-field">
              <label htmlFor="">Currency Symbol</label>
              <input type="text" {...register("currency_symbol")} />
            </div>

            <div className="join-category-field">
              <label htmlFor="" className="">
                {" "}
                Delivery Method
              </label>
              <input type="text" {...register("delivery_method")} />
            </div>
            <div className="join-category-field">
              <label htmlFor="" className="">
                {" "}
                Delivery Charge
              </label>
              <input type="text" {...register("delivery_charge")} />
            </div>
          </div>
        );
        break;
      case "credential":
        return (
          <div>
            <div className="join-category">
              <p className="bg-orange-600 text-white p-2">Credentials and Certifications</p>
              <div>
                <label htmlFor="">Education </label>
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="2"
                  {...register("education")}
                ></textarea>
              </div>
              <div>
                <label htmlFor="">Years of Experience </label>
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="2"
                  {...register("experience")}
                ></textarea>
              </div>
              <div>
                <label htmlFor="">Training </label>
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="2"
                  {...register("training")}
                ></textarea>
              </div>
              <div>
                <label htmlFor="">Previous Project </label>
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="2"
                  {...register("project")}
                ></textarea>
              </div>
            </div>
            <div className="mx-6 ">
              <p className=" font-semibold text-slate-700 mb-2 ">
                Certificates{" "}
              </p>

              <div className="grid grid-cols-6  gap-4 mb-3">
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
                      type="button"
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
                    type="button"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
        break;
      case "policies":
        return(
        <div className="join-category">
          <p className="bg-orange-600 text-white p-2"> Policies and Terms</p>
          <div>
            <label htmlFor="" className="">
              {" "}
              Terms and Condition
            </label>
            <textarea
              name=""
              id=""
              cols="30"
              rows="2"
              {...register("terms")}
            ></textarea>
          </div>
          <div className="">
            <label htmlFor="">Deliverable and Limitation</label>
            <textarea
              name=""
              id=""
              cols="30"
              rows="2"
              {...register("limitation")}
            ></textarea>
          </div>
          <div>
            <label htmlFor="" className="">
              {" "}
              Quality Measures and Controls
            </label>
            <textarea
              name=""
              id=""
              cols="30"
              rows="2"
              {...register("measures")}
            ></textarea>
          </div>
        </div>)
        break;
      default:
        return null;
        break;
    }
  };

  const submitForm = async (values) => {
    const providerId=localStorage.getItem('userId')
    const formdata = new FormData();
    formdata.append("profession", values.profession);

    formdata.append("description", values.description);
    formdata.append("available_time", JSON.stringify(values.available_time));
    formdata.append("available_days", JSON.stringify(values.available_days));
    formdata.append("available_date", values.available_date);

    formdata.append(
      "available_cities",
      JSON.stringify(values.available_cities)
    );
    formdata.append("special_availability", values.special_availability);

    formdata.append("payment_method", values.payment_method);
    formdata.append("payment_structure", values.payment_structure);
    formdata.append("payment_instructions", values.payment_instructions);

    formdata.append("currency_symbol", values.currency_symbol);
    formdata.append("delivery_method", values.delivery_method);
    formdata.append("delivery_charge", values.delivery_charge);
    formdata.append("education", values.education);

    formdata.append("experience", values.experience);
    formdata.append("training", values.training);
    formdata.append("project", values.project);
    formdata.append("project_certificate", values.project_certificate);
    for (const file of imagePreviews) {
      formdata.append("certificates[]", file.file);
    }
    formdata.append("limitation", values.limitation);
    formdata.append("terms", values.terms);
    formdata.append("measures", values.measures);

    console.log(values);
    await joinSubCategory({ formdata, providerId, subcategoryId:paams.categoryId })
      .unwrap()
      .then((response) => {
        console.log("response", response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  if (isLoading) {
    return <Loader />;
  }
  return (
    <form
      action=""
      className={`w-full flex flex-col gap-6  shadow shadow-gray-600 p-4`}
      onSubmit={handleSubmit(submitForm)}
    >
   

      {handleCurrentSteps()}
      <div className="px-4 flex justify-evenly grid grid-cols-2 gap-4">

      {
        currentStep>0 && (
            <button className="bg-blue-600 p-2  w-full rounded-md text-white" type="button"
            onClick={()=>[
              setCurrentStep(prevState=>prevState-1)

            ]}
            >Prev</button>
        )
      }
        {
        currentStep<steps.length-1 && (
            <button className="bg-blue-600 p-2 rounded-md  w-full text-white" type="button"
            onClick={()=>{
              setCurrentStep(prevState=>prevState+1)
            }}
            >Next</button>
        )
      }

      {currentStep === steps.length - 1 && (
          <button
            className="bg-blue-600 text-white p-2 w-full rounded-lg"
            type="submit"
          >
            Save Information
          </button>
      )}
      </div>
    </form>
  );
};

export default JoinCategory;
