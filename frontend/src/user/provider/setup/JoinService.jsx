import React, { useState } from "react";
import image from "../../../images/plumber.jpg";
import { useFieldArray, useForm, Controller } from "react-hook-form";
import Time from "./time";
const JoinService = () => {
const [previewImage,setPreviewImage]=useState([])

  const { register, control, setValue,handleSubmit ,getValues,watch} = useForm({
    defaultValues: {
      images: [{ image: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "images",
    control,
  });

  const [refund,setrefund]=useState("");
  const onSubmit= async (values)=>{
    console.log(values);
  }
  const images=watch('images');
  return (
    <section className="grid  place-items-center bg-slate-300 p-3">
      <section className="selected-service">
        <h2 className="text-slate-500 font-semibold text-2xl mb-3">
          Installation
        </h2>
        <div className="p-5 flex justify-between gap-5 ">
          <img src={image} className="h-[200px] object-cover mb-3" alt="" />
          <div>
            <p className="mb-3">
              <strong>Category:</strong> Plumbing
            </p>
            <p>
              <strong>Tags:</strong>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia
              fugiat corrupti obcaecati, rem excepturi aut aperiam cupiditate.
              Cupiditate quae et saepe perspiciatis quo assumenda, dolor rerum
              totam. Sed, saepe porro?
            </p>
          </div>
        </div>
        <section>
          <p className="text-center text-lg text-slate-500">Getting Started</p>
          <div></div>
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <div className=" selected-field">
              <label htmlFor="">About Service</label>
              <textarea name="" id="" cols="30" rows="2"></textarea>
            </div>
            <div className=" selected-field">
              <label htmlFor="">List of Images</label>
             
              <div className="flex flex-col gap-4">

           <div className="grid grid-cols-4 gap-4 ">
            {
              images.map((image)=>{
                return <>
                {
                  image?.image && <img src={URL.createObjectURL(image.image)} alt="" className="h-[150px] w-full object-cover" />
                }
                </>
              })
            }
           </div>
                {fields.map((field, index) => {
                  <div>
                    <img src={field?.image && URL.createObjectURL(field.image)} alt="" />
                  </div>
                 
                  return (
                    <div key={field.id}>
                      <Controller
                        name="images"
                        control={control}
                        render={({ field }) => {
                          return (
                            <div className="flex  gap-3">
                              <input
                                type="file"
                                onChange={(e) => {
                                  const { files } = e.target;
                                  console.log(files);
                                  setValue(`images.${index}.image`, files[0]);
                                  setPreviewImage((prevstate)=>[...prevstate,e.target.files[0]])
                                  console.log('getvalue',getValues('images'));
                                }}
                                className="w-[60%]"
                              />

                              <div className="flex gap-3">
                                {index > 0 && (
                                  <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    className="shadow shadow-gray-500 text-xl p-1 px-2 rounded-md"
                                  >
                                    -
                                  </button>
                                )}
                                <button
                                  type="button"
                                  onClick={() => append({ image: "" })}
                                  className="shadow shadow-gray-500 text-xl px-2 p-1 rounded-md"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          );
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="selected-field">
              <label htmlFor="">Currency</label>
              <input type="text" />

            </div>
            <div className="p-5 ">
              <p className="mb-2">Scope of Service</p>
           <table className="w-full" cellPadding={2}>
            <thead >
              <tr>
                <th></th>
                <th>Service</th>
                
                <th>Basic</th>
                <th>Unit</th>
                <th>Discount(%)</th>
                <th>Additonal(%)</th>
              </tr>
            </thead>
            <tbody>
             <tr className="mb-4">
             <td className="text-center">
                <input type="checkbox" />
              </td>
              <td className="text-center">
                Service1
              </td>
              <td className="text-center">
                <input type="text" value="" className="border-b-2 border-slate-500 "/>
              </td>
              <td className="text-center">
               20
              </td>
              <td className="text-center">
               10
              </td>
             </tr>
             <tr className="mb-4">
             <td className="text-center">
                <input type="checkbox" />
              </td>
              <td className="text-center">
                Service1
              </td>
              <td className="text-center">
                <input type="text" value="" className="border-b-2 border-slate-500 "/>
              </td>
              <td className="text-center">
               20
              </td>
              <td className="text-center">
               10
              </td>
             </tr>
             <tr className="mb-4">
             <td className="text-center">
                <input type="checkbox" />
              </td>
              <td className="text-center">
                Service1
              </td>
              <td className="text-center">
                <input type="text" value="" className="border-b-2 border-slate-500 "/>
              </td>
              <td className="text-center">
               20
              </td>
              <td className="text-center">
               10
              </td>
             </tr>
             <tr className="mb-4">
             <td className="text-center">
                <input type="checkbox" />
              </td>
              <td className="text-center">
                Service1
              </td>
              <td className="text-center">
               20
              </td>
              <td className="text-center">
               10
              </td>
              <td className="text-center">
                <input type="text" value="" className="border-b-2 border-slate-500 "/>
              </td>
             </tr>
            

            </tbody>

           </table>
              
             
                  
            </div>
            <div>
            <Time
              register={register}
              Controller={Controller}
              control={control}
              setValue={setValue}
            
            />
            </div>
            <div className="selected-field">
              <label htmlFor="">Available Location</label>
              <input type="text" />
            </div>
            <div className=" selected-field">
         
              <label htmlFor="">Prequsites</label>
              <textarea name="" id="" cols="30" rows="2"></textarea>

            </div>
         
            
         

            
            <div className=" selected-field">
              <label htmlFor=""> Add Additonal Information</label>
              <textarea name="" id="" cols="30" rows="2"></textarea>

            </div>

           
         
           
            <div className=" selected-field">
              <label htmlFor="">Experience </label>
              <textarea name="" id="" cols="30" rows="2"></textarea>
              <input type="file" />
            </div>
            <div className=" selected-field">
              <label htmlFor="">Training</label>
              <textarea name="" id="" cols="30" rows="2"></textarea>
              <input type="file" />


            </div>
            <div className=" selected-field">
              <label htmlFor="">Projects</label>
              <textarea name="" id="" cols="30" rows="2"></textarea>
              <input type="file" />


            </div>
            <div className="flex justify-center">
              <input type="submit" className="bg-slate-600 p-2 rounded-lg w-full text-white " />
            </div>
          </form>
        </section>
      </section>
    </section>
  );
};

export default JoinService;
