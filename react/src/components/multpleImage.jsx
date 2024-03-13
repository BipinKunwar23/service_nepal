import React, { useState } from 'react'
import { setImagePreviews } from '../redux/orderSlice';
import { useDispatch,useSelector } from 'react-redux';
const MultipleImage = ({formdata}) => {
  const dispatch=useDispatch();
  const imagePreviews=useSelector((state)=>state.orderSlice.imagePreviews)

  const fileInputRef = React.createRef();

  const handleFileInputChange = (event) => {
    const fileInput = event.target;
    const selectedFiles = fileInput.files;
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
          file:{
            name: file.name,
            size: file.size,
            type: file.type,
          },
          dataURL: reader.result,
        };

        // Update the state with the new preview
        dispatch( setImagePreviews([...imagePreviews, preview]) )
        
      };
    }
    fileInput.value = null;
  };

  const handleAddButtonClick = () => {
    // Trigger the file input programmatically when the "Add" button is clicked
    fileInputRef.current.click();
  };

  const handleRemoveImage = (id) => {
    // Filter out the preview with the specified id
    dispatch( setImagePreviews(
        imagePreviews.filter((preview) => preview.id !== id)
      )
    )
  };
  return (
    <div className=" ">
    <h2 className="ml-4 mb-3">
      Upload Files or Images{" "}
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
  )
}

export default MultipleImage