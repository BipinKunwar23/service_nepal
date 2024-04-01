import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  useAddTeamsMutation,
  useUpdateTeamsMutation,
} from "../../../../api/admin/aboutApi";
const AddTeam = ({ setShow, data }) => {
  const { register, control, handleSubmit, setValue } = useForm();

  const [addTeamInfo, { isLoading, isError, error }] = useAddTeamsMutation();

  const [updateTeamInfo] = useUpdateTeamsMutation();
  // const [height,setHeight]=useState(200);
  const submitForm = async (values) => {
    console.log(values);
    const formdata = new FormData();
    formdata.append("name", values.name);
    formdata.append("role", values.role);
    formdata.append("bio", values.bio);

    formdata.append("photo", values.photo);

    console.log(values);
    if (data && Object.keys(data).length>0) {
      await updateTeamInfo({ formdata, id: data?.id })
        .unwrap()
        .then((response) => {
          console.log(response);
          if (response) {
            setShow(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      await addTeamInfo({ formdata })
        .unwrap()
        .then((response) => {
          console.log(response);
          if (response) {
            setShow(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <div className=" w-[60%] mx-auto border border-yellow-600  my-4 p-4 bg-white rounded shadow-lg  ">
      <div className="flex border-b p-2">
        <h2 className="text-center text-xl text-black flex-1">
          Member Information
        </h2>
        <button
          className="text-xl"
          onClick={() => {
            setShow(false);
          }}
        >
          X
        </button>
      </div>
      <form action="" className="" onSubmit={handleSubmit(submitForm)}>
        <div className="">
          <div className="about-form">
            <label htmlFor=""> Full Name</label>
            <input
              type="text"
              {...register("name")}
              defaultValue={data?.name}
            />
          </div>
          <div className="about-form">
            <label htmlFor="">Role / Position</label>
            <input
              type="text"
              {...register("role")}
              defaultValue={data?.role}
            />
          </div>

          <div className="about-form">
                <label htmlFor="">Biography</label>
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="4"
                  defaultValue={data?.bio}
                  
                  {...register("bio")}
                ></textarea>
              </div>
        
          <div className="">
            <Controller
              name="photo"
              control={control}
              render={({ field }) => {
                return (
                  <div className="about-form">
                    <label htmlFor="" className="text-gray-700 ">
                      {data?.photo ? "Upload New Image" : "Upload Image"}
                    </label>

                    <div className=" border p-1.5">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          setValue("photo", e.target.files[0]);
                        }}
                      />
                    </div>
                  </div>
                );
              }}
            />
          </div>

          <div className="grid content-end">
            <button
              className="bg-blue-600 text-white p-2 rounded w-full"
              type="submit"
            >
              Save Information
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddTeam;
