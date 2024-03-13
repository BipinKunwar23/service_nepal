import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import avatar from "../../../../images/avatar.jpg"
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";
import { setProfileStep } from "../../../../redux/sellerSlice";
import { useAddPersonalMutation, useUpdatePersonalMutation } from "../../../../api/seller/profileApi";
import Loader from "../../../../components/Loader";
export default function PersonalInfo({personal}) {
  const [addPersonalInfo, { isLoading:isAdding}] = useAddPersonalMutation();
  const [updatePersonalInfo, { isLoading: isUpdating }] = useUpdatePersonalMutation();

  const dispatch=useDispatch()

  const navigate = useNavigate();
  const location = useLocation();
  const [previewImage, setPreviewImage] = useState(null);

  const form = useForm({
    defaultValues:{
      name: personal?.name,
      bio: personal?.bio,
      address: personal?.address,
      language: personal?.language
    }
  });
  const { register, handleSubmit, control, setValue } = form;
  const onSubmit = async (user) => {
    console.log('values',user);
    const formdata = new FormData();
    formdata.append("name", user.name);
    formdata.append("email", user.email);
    formdata.append("bio", user.bio );
    formdata.append("photo", previewImage);
    formdata.append("address", user.address);
    formdata.append("language", user.language);
    
if(!personal){
  await addPersonalInfo(formdata)
    .unwrap()
    .then((response) => {
      console.log(response);
      dispatch(setProfileStep("profession"))
      localStorage.setItem('photo',response?.photo);
      // navigate(`${location?.state?.path} `, { replace: true });
    })
    .catch((error) => {
      console.log(error);
    });

}
else {

  await updatePersonalInfo(formdata)
    .unwrap()
    .then((response) => {
      console.log(response);
      dispatch(setProfileStep("profession"))
      // navigate(`${location?.state?.path} `, { replace: true });
    })
    .catch((error) => {
      console.log(error);
    });
}
  
  };

if(isAdding || isUpdating){
  return <div>processing..</div>
}

  return (
    <div className=" text-gray-700 text-[1em] bg-white p-5 ">
      <form
        action=""
        className={`  p-2 box-border  `}
        encType="multipart/form-"
        onSubmit={handleSubmit(onSubmit)}
      >
        <section className="flex flex-col gap-16 mb-5">
          <div className="createProfile">
            <label htmlFor="name"> Unique Name</label>
            <input type="text" {...register("name")} />
          </div>

          <div className="grid grid-cols-3 gap-10">
            <h2 className="text-[1.1em] text-slate-700">Profile Image</h2>

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
                    <>
                      <img
                        src={previewImage ? URL.createObjectURL(previewImage) :  personal?.photo ? `http://localhost:8000/${personal?.photo}` : avatar}
                        className=" object-cover object-top w-[250px] h-[250px] rounded-full border-2 border-gray-400"
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
                    </>
                  );
                }}
              />
            </div>
          </div>

          <div className="createProfile">
            <label htmlFor="bio">Add Bio</label>
            <textarea
              rows={10}
              {...register("bio")}
              className=" p-2 placeholder:text-[1em] hover:bg-gray-100 focus:outline-none border-2 border-gray-400 rounded-md text-gray-700 "
              placeholder="Describe Yourself"
            ></textarea>
          </div>
         
          <div className="createProfile">
            <label htmlFor="district">Address</label>
            <input type="text" {...register("address")} />
          </div>
          <div className="createProfile">
            <label htmlFor="district">Language</label>
            <input type="text" {...register("language")} />
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
