import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import logo from "../images/logo.png";
import { useViewProfileQuery, useEditProfileMutation} from "../../Api/ProfileApi";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";
export default function Edit({children}) {
  const userId = localStorage.getItem("userId");
  const [editProfile, { isLoading: isUpdating }] = useEditProfileMutation();
  const { data: user, isLoading, isError, error,refetch } = useViewProfileQuery(userId);

  const navigate = useNavigate();
  const location=useLocation()
  const [previewImage, setPreviewImage] = useState(null);

  const form = useForm();
  const { register, handleSubmit, control, setValue } = form;
  const onSubmit = async (user) => {
    const id=localStorage.getItem('userId')
    const formdata= new FormData()
    formdata.append('userId',id)
    formdata.append('name',user.name)
    formdata.append('email',user.email)
    formdata.append('bio',user?.bio || "")
    formdata.append('photo',user.photo)
    formdata.append('phone_number',user.phone_number)
    formdata.append('district',user.district)
    formdata.append('ward',user.ward)
    formdata.append('muncipility',user.muncipility)
    formdata.append('chowk',user.chowk)
     await editProfile(formdata)
     .unwrap()
     .then((response)=>{
     console.log(response);
     navigate(`${location?.state?.path} ` ,{replace:true})
     })
     .catch((error)=>{
      console.log(error);
     })

    
  };

  const [show, showImage] = useState(false);
  const [image, isImage] = useState(false);
  if (isLoading || isUpdating) {
    return <div>Loading</div>;
  }

  return (
    <div className=" text-gray-700 grid place-content-center  text-[1em] bg-[rgba(0,0,0,0.5)] p-4 ">
      <form
        action=""
        className={`  bg-white w-[65Vw]   p-3 box-border  rounded-lg shadow shadow-gray-700`}
        encType="multipart/form-"
        onSubmit={handleSubmit(onSubmit)}
      >
       <section className="grid grid-cols-2 gap-16 mb-5">
        <div className="box-border flex flex-col ">
          <div className="grid place-content-center">
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
                      <img
                        src={
                          previewImage
                            ? URL.createObjectURL(previewImage)
                            : (
                               user?.photo? `http://localhost:8000/${user.photo}` : logo
                            )
                        }
                        className=" object-cover object-top w-[300px] h-[300px] rounded-full border-2 border-gray-400"
                        alt=""
                      />
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

          <div className="flex flex-col profileEdit">
            <div>
              <label htmlFor="name"> Name</label>
              <input type="text" 
              {...register('name')}
              defaultValue={user?.name}
              />
            </div>

            <div className="grid grid-cols-1">
              <label htmlFor="bio">Add Bio</label>
              <textarea
            
                rows={4}
                {...register("bio")}
                defaultValue={user?.bio}
                className=" p-2 placeholder:text-[1em] hover:bg-gray-100 focus:outline-none border-2 border-gray-400 rounded-md text-gray-700 "
                placeholder="Describe Yourself"
              ></textarea>
            </div>
          </div>
        </div>
        <div className="flex profileEdit   box-border flex-col">
          <div>
            <label htmlFor="email"> Email</label>
            <input type="text" 
            {...register('email')}
            defaultValue={user?.email}
            />
          </div>

          <div>
            <label htmlFor="phone_number"> Phone Number</label>
            <input type="text" 
            {...register('phone_number')}
            defaultValue={user?.phone_number}
            />
          </div>
          <div className="">
            <span className="font-medium">Address</span>
            <div className="">
              <label htmlFor="district">District</label>
              <input type="text" {...register('district')}
              defaultValue={user?.address?.district} />
            </div>
            <div className="">
              <label htmlFor="muncipility">Muncipility</label>
              <input type="text" 
              {...register('muncipility')}
              defaultValue={user?.address?.muncipility}
              />
            </div>
            <div className="">
              <label htmlFor="ward">Ward No</label>
              <input type="text" 
              {...register('ward')}
              defaultValue={user?.address?.ward}
              />
            </div>
            <div className="">
              <label htmlFor="chowk">Chowk</label>
              <input type="text" 
              {...register('chowk')}
              defaultValue={user?.address?.chowk}
              />
            </div>
          </div>
         
        </div>

        </section> 
    

          <div className=" grid justify-center  ">
            <button className="bg-blue-600 p-2 px-4 rounded-lg text-white">
              Update Profile
            </button>
          </div>
      </form>
    </div>
  );
}
