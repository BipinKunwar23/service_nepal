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
import { useGetScopeQuery } from "../../../Api/serviceApi";
// import { useGetOtherCatserviceQuery } from "../../Api/catServiceApi";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import Loader from "../../../components/Loader";
export default function SeviceSetup({ serviceId }) {
  const dispatch = useDispatch();
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

  const { data: service, isLoading, isError } = useGetScopeQuery(serviceId);
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

  const onSubmit = async (values) => {
    console.log("values", values);
    const userId = localStorage.getItem("userId");

    const formdata = new FormData();
    formdata.append("sid", serviceId);

    formdata.append("scopes", JSON.stringify(values.scopes));

      await setupService({ formdata, id: userId })
        .unwrap()
        .then((response) => {
          console.log("response", response);
          reset();
          // navigate(`${location?.state?.path || "/services/provider"}`, {
          //   replace: true,
          // });
        })
        .catch((error) => {
          console.log(error);
        });
    // if (button === "update") {
    //   await editService(formdata)
    //     .unwrap()
    //     .then((response) => {
    //       console.log(response);
    //       reset();
    //       navigate(`${location?.state?.path || "/services/provider"}`, {
    //         replace: true,
    //       });
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // }
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
    <section className="p-3 shadow shadow-gray-500 rounded-lg">
      <h2 className=" font-semibold text-[1.2em] p-2   bg-orange-600 text-white">
        {service?.name} Service
      </h2>

      <section className="mt-4 p-1">
        <form
          action=""
          className="      text-gray-800    box-border justify-self-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-4">
            {service?.scopes?.map((scope) => {
              return (
                <div className=" rounded-md p-4 flex flex-col gap-4 shadow shadow-gray-400">
                  <div className="flex gap-4 ">
                    <input
                      type="checkbox"
                      id={`scope${scope.id}`}
                      value={scope?.id}
                      onChange={(e) => {
                        handleCheckboxChange(e, scope);
                      }}
                      className="bg-green-500"
                    />
                    <label htmlFor={`scope${scope.id}`} className="flex-1 text-[1.2em] font-bold text-slate-600">{scope?.name}</label>
                  </div>
                  <div className="grid grid-cols-2 gap-4 ">

                  <div className="">
                    <label htmlFor=""><strong>Service Charge</strong></label>
                    <input
                      type="number"
                      className="py-[0.5em] w-full px-2 border-2 mt-2 rounded text-gray-800 mb-1 border-slate-300 focus:outline-blue-500 "
                      onChange={(e) => {
                        setValue(
                          `scopes.${scopes.findIndex(
                            (s) => s.id === scope.id
                          )}.price`,
                          e.target.value
                        );
                      }}
                    />
                  </div>
                  <div className="">
                    <label htmlFor=""><strong>Service Unit</strong></label>
                  <div className="mt-2">
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
                  </div>
                  </div>
                  </div>

                </div>
              );
            })}
          </div>
          
          <div className="grid justify-center mt-4">
            <button
              type="submit"
              className=" p-2 bg-blue-600 text-white w-[200px] rounded-md"
            >
              Create Service
            </button>
          </div>
        </form>
      </section>
    </section>
  );
}
