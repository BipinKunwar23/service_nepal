import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useLocation, useParams } from "react-router-dom";

import Loader from "../../../../components/Loader";
import { useAddDescriptionMutation,useUpdateDescriptionMutation } from "../../../../api/seller/serviceApi";
import { setStepCount } from "../../../../redux/sellerSlice";
export default function Description({details}) {
  const [addPriceDescription, { isLoading:isAdding}] = useAddDescriptionMutation();
  const [updatePriceDescription, { isLoading: isUpdating }] = useUpdateDescriptionMutation();

  const dispatch=useDispatch()
const {serviceId}=useParams()
  const navigate = useNavigate();
  const location = useLocation();
  const [previewImage, setPreviewImage] = useState(null);
  const form = useForm({
    defaultValues:{
      descripiton: details?.descripiton,
      price: details?.price,
      note: details?.note,
    }
  });
  const { register, handleSubmit, control, setValue } = form;

  const onSubmit = async (value) => {
    const formdata = new FormData();
    formdata.append("description", value.description);
    formdata.append("price", value.price);
    formdata.append("note", value.note );
    formdata.append("image", previewImage);

    
if(!details){
  await addPriceDescription({formdata,serviceId})
    .unwrap()
    .then((response) => {
      console.log(response);
      dispatch(setStepCount(5));


      // navigate(`${location?.state?.path} `, { replace: true });
    })
    .catch((error) => {
      console.log(error);
    });

}
else {

  await updatePriceDescription({formdata,serviceId})
    .unwrap()
    .then((response) => {
      console.log(response);
      dispatch(setStepCount(5));

      // navigate(`${location?.state?.path} `, { replace: true });
    })
    .catch((error) => {
      console.log(error);
    });
}
  
  };

if(isAdding || isUpdating){
  return <Loader/>
}

  return (
    <div className=" text-gray-700 text-[1em] bg-white p-2 ">
      <form
        action=""
        className={`  p-2 box-border  `}
        encType="multipart/form-"
        onSubmit={handleSubmit(onSubmit)}
      >
        <section className="flex flex-col gap-16 mb-5">
          <div className="create-service">
            <label htmlFor="name">Service Description</label>
            <textarea  id="" cols="30" rows="4" {...register("description")}
            placeholder="Describe about service"
            defaultValue={details?.description}
            ></textarea>
          </div>

          <div className="grid grid-cols-3 create-service">
            <label className=" text-slate-700">Upload Image</label>

            <div
              onClick={() => {
                document.getElementById("image").click();
              }}
              className=" rounded-full  col-span-2"
            >
              <Controller
                name="image"
                control={control}
                render={({ field }) => {
                  return (
                    <div className="relative">
                      <img
                        src={previewImage ? URL.createObjectURL(previewImage) :  details?.image && `http://localhost:8000/${details?.image}` }
                        className=" object-cover object-center w-full  h-[250px] border-2 border-gray-400"
                        alt=""
                      />
                      <input
                        type="file"
                        id="image"
                        className=" hidden"
                        onChange={(e) => {
                          setPreviewImage(e.target.files[0]);
                        }}
                      />
                        {
                            !previewImage  &&
                      <div className="absolute top-1/2  right-1/2 translate-x-1/2">
                        <button type="button">Add Image</button>
                      </div>
                        }
                    </div>
                  );
                }}
              />
            </div>
          </div>

          <div className="create-service">
            <label htmlFor="">Service Fee</label>
            <input type="number" placeholder="NPR" {...register("price")} />
          </div>
          <div className="create-service">
            <label htmlFor="district">Special Notes</label>
            <input type="text" placeholder="Write note" {...register("note")} />
          </div>
        
        </section>

        <div className=" grid grid-cols-3 gap-10 ">
          <button type="submit" className="bg-blue-600 p-2 px-4 rounded-lg text-white col-start-2 mt-5">
           Save and  Continue
          </button>
        </div>
      </form>
    </div>
  );
}
