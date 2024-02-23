import React, { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useAddGalleryMutation } from "../../../../Api/serviceApi";
import Loader from "../../../../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { setStepCount, setSteps } from "../../../../redux/serviceSlice";
export const Gallery = () => {
  const [imagePreviews, setImagePreviews] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const { register, control, setValue, handleSubmit } = useForm({
  
  });
const [addGallery, {isLoading}]=useAddGalleryMutation()


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
  const serviceId = useSelector((state) => state.serviceSlice.serviceId);
  const dispatch = useDispatch();
  const steps = useSelector((state) => state.serviceSlice.steps);

  const onSubmit=async(values)=>{
    const formdata = new FormData();
    formdata.append('serviceId',serviceId);

    formdata.append('image',previewImage);
    for (const file of imagePreviews) {
      formdata.append("images[]", file.file);
    }
    await addGallery(formdata)
    .unwrap()
    .then((response) => {
      dispatch(setStepCount(5));
      console.log('response',response);
      const updatedSteps = [...steps];

      const stepIndex = updatedSteps.findIndex((step) => step.id === 5);

      updatedSteps[stepIndex] = { ...updatedSteps[stepIndex], show: true };
      dispatch(setSteps(updatedSteps));
      // navigate(`${location?.state?.path} `, { replace: true });
    })
    .catch((error) => {
      console.log(error);
    });
  }
if(isLoading){
  return <Loader/>
}
  return (
    <div>
      <form action="" className="bg-white p-4" onSubmit={handleSubmit(onSubmit)} >
        <div className="create-service mb-5">
            <h2 className="text-[1.2em]">Service Profile</h2>
      <div className="">
            <div
              onClick={() => {
                document.getElementById("image").click();
              }}
              className=" rounded-full"
            >
              <Controller
              name="photo"
                control={control}
                render={({field}) => {
                  return (
                    <>
                    <div className=" w-full h-[300px] border-2 border-gray-400 grid  "> 
                       {
                        !previewImage && <button type="button" className="text-[2em] font-semibold text-green-600">Add 
                        <span>+</span>
                        </button>
                       } 
                        {
                             previewImage &&
                             <img
                               src={
                                URL.createObjectURL(previewImage)
                                
                                  
                               }
                               className=" object-contain object-top h-[300px] w-full "
                               alt="Service Profile"
                             />
                        }

                    </div>
                      <input
                        type="file"
                        id="image"
                        className=" hidden"
                        onChange={(e) => {
                          setValue("photo", e.target.files[0]);
                          setPreviewImage(e.target.files[0]);
                        }}
                      />
                    </>
                  );
                }}
              />
            </div>
          </div>
        </div>

        <div className="create-service">

        <h2 className="text-[1.2em]">Add Gallery</h2>
        <div className="flex flex-col gap-4 ">
          {imagePreviews.map((preview, index) => (
            <div key={preview.id} className="relative">
              <img
                key={index}
                src={preview.dataURL}
                alt={`Preview ${preview.id}`}
                className="w-full h-[300px] shadow shadow-gray-400 object-contain"
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

          <div className="w-full h-[300px]  flex place-content-center border-2  border-gray-400 shadow">
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
      <div className=" create-service mt-5 ">
          <div></div>
          <button type="submit" className="bg-blue-600 p-2 px-4 rounded-lg text-white ">
           Save and  Continue
          </button>
        </div>
      </form>

    </div>
  );
};
