import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import avatar from "../../../../images/avatar.jpg";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";
import { setProfileStep } from "../../../../redux/sellerSlice";
import {
  useAddPersonalMutation,
  useUpdatePersonalMutation,
} from "../../../../api/seller/profileApi";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Loader from "../../../../components/Loader";
export default function PersonalInfo({ personal }) {
  const [addPersonalInfo, { isLoading: isAdding }] = useAddPersonalMutation();
  const [updatePersonalInfo, { isLoading: isUpdating }] =
    useUpdatePersonalMutation();

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();
  const [previewImage, setPreviewImage] = useState(null);
  console.log("file", previewImage);
  const schema = yup.object().shape({
    name: yup.string().required("Unique  Name is Required"),
    bio: yup.string().required("Biography  is Required"),
    address: yup.string().required("Address is Required"),
    phone_number: yup.string().required("Phone Number is Required"),
    // image: yup
    // .mixed()
    // .required('Image is required')
    // .test('fileSize', 'Image file is too large', (value) =>{
    //   console.log('size',value[0].size);
    //   return true
    // }
    // //  !value || value[0].size <= 5242880
    //  )
    // .test('fileType', 'Unsupported file format', (value) => true
    //   // !value || ['image/jpeg', 'image/png', 'image/gif'].includes(value[0].type)
    // ),
  });

  const form = useForm({
    defaultValues: {
      name: personal?.name,
      bio: personal?.bio,
      address: personal?.address,
      language: personal?.language,
      phone_number: personal?.phone_number,
    },
    resolver: yupResolver(schema),
  });
  const { register, handleSubmit, control, setValue, formState , setError} = form;
  const { errors } = formState;
  const onSubmit = async (user) => {
    console.log("values", user);
    const formdata = new FormData();
    formdata.append("name", user.name);
    formdata.append("bio", user.bio);
    formdata.append("photo", previewImage);
    formdata.append("address", user.address);
    formdata.append("phone_number", user.phone_number);
    formdata.append("language", user.language);

    // const []=useState()
    if (!personal) {
      await addPersonalInfo(formdata)
        .unwrap()
        .then((response) => {
          console.log(response);
          dispatch(setProfileStep(2));
          localStorage.setItem("photo", response?.photo);
          // navigate(`${location?.state?.path} `, { replace: true });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      await updatePersonalInfo(formdata)
        .unwrap()
        .then((response) => {
          console.log(response);
          dispatch(setProfileStep(2));
          // navigate(`${location?.state?.path} `, { replace: true });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  if (isAdding || isUpdating) {
    return <div>processing..</div>;
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
            <div>
              <input type="text" {...register("name")} />
              <p>{errors.name?.message}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-10">
            <h2 className="text-[1.1em] text-slate-700">Profile Image</h2>

            <div
              onClick={() => {
                document.getElementById("image").click();
              }}
              className=" rounded-full  col-span-2"
            >
           
                    <div>
                      <img
                        src={
                          previewImage
                            ? URL.createObjectURL(previewImage)
                            : personal?.photo
                            ? `http://localhost:8000/${personal?.photo}`
                            : avatar
                        }
                        className=" object-cover object-top w-[250px] h-[250px] rounded-full border-2 border-gray-400"
                        alt=""
                      />
                      <input
                        type="file"
                        id="image"
                        name="image"
                        // ref={register}
                        className=" hidden"
                        onChange={  (e) => {
                        
                            const selectedFile = e.target.files[0];
                            setPreviewImage(selectedFile);
                            
                          // setValue("file", e.target.files[0]);
                          // setPreviewImage(e.target.files[0]);
                        }}
                      />
                      <p className="text-red-600 mt-3 ">
                        {errors.file?.message}
                      </p>
                    </div>
             
            </div>
          </div>

          <div className="createProfile">
            <label htmlFor="bio">Add Bio</label>
            <div>
              <textarea
                rows={10}
                {...register("bio")}
                className=" p-2 placeholder:text-[1em] hover:bg-gray-100 focus:outline-none border-2 border-gray-400 rounded-md text-gray-700 "
                placeholder="Describe Yourself"
              ></textarea>
              <p>{errors.bio?.message}</p>
            </div>
          </div>

          <div className="createProfile">
            <label htmlFor="district">Address</label>
            <div>
              <input type="text" {...register("address")} />
              <p>{errors.address?.message}</p>
            </div>
          </div>
          <div className="createProfile">
            <label htmlFor="">Phone Number</label>
            <div>
              <input type="text" {...register("phone_number")} />
              <p>{errors.phone_number?.message}</p>
            </div>
          </div>
          <div className="createProfile">
            <label htmlFor="district">Language</label>
            <input type="text" {...register("language")} />
          </div>
        </section>

        <div className=" grid grid-cols-3 gap-10 ">
          <button
            type="submit"
            className="bg-blue-600 p-2 px-4 rounded-lg text-white col-start-2 mt-5"
          >
            Save and Continue
          </button>
        </div>
      </form>
    </div>
  );
}
