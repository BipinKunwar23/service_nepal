import React from "react";
import {useAddCatServicesMutation} from '../Api/catServiceApi'
import { useDispatch, useSelector } from "react-redux";
import { setCategoryAciton } from "../redux/categorySlice";
import { useForm, Controller, useFieldArray } from "react-hook-form";
const AddService = () => {
  const [addService, { data, isLoading, isError,error }] =
    useAddCatServicesMutation();
const selected=useSelector((state)=>state.categorySlice.subcategory);
const dispatch= useDispatch()
  const submitForm = async (values) => {
    const formdata = new FormData();
    formdata.append("name", values.name);
    
    formdata.append("description", values.description);
    formdata.append("keywords", values.keywords);
    formdata.append("icons", values.icons);
    formdata.append("units",values.units);
    formdata.append('scopes',JSON.stringify(values.scopes))
    await addService({formdata,id:selected})
      .unwrap()
      .then((response) => {
        dispatch(setCategoryAciton(""));

        
        console.log('response',response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const { register, control, handleSubmit,setValue} = useForm({
    defaultValues:{
      scopes:[{name:''}]
    }

  });
  const {fields,append,remove}= useFieldArray({
   name:'scopes',
   control
  });
  if (isLoading) {
    return <div>Saving</div>;
  }
  if (isError) {
    return <div>{error}</div>;
  }
  return (
    <section className="">

    <form
    action=""
    className={`service-form   m-auto`}
    onSubmit={handleSubmit(submitForm)}
  >
    <div className="flex p-5 ">
    <h2 className=" flex-1 text-center p-2 text-2xl font-semibold">{`Add Service `}</h2>

      <div className="  grid place-content-center">
      <button
          className=" text-white text-2xl bg-red-600 rounded-full p-1 px-3"
          type="button"
          onClick={() => {
            dispatch(setCategoryAciton(""));
          }}
        >
          X
        </button>
      </div>
    </div>
    <div className="">

    <div className="field">
      <label htmlFor=""> {`Service Name`}</label>
      <input type="text" {...register("name")} />
    </div>
    <div className="field">
      <label htmlFor="">Description</label>
      <textarea {...register("description")} id="" rows={2}></textarea>
    </div>
    <div className="field">
      <label htmlFor="">Key Words</label>
      <input type="text" {...register("keywords")} />
    </div>
    <div className="field">
      <label htmlFor="">Units</label>
      <input type="text" {...register("units")} />
    </div>
   
    <div className="flex px-4">
      <p htmlFor="" >Service Type</p>

    
    </div>
          {
            fields.map((field,index)=>{
              return <div key={field.id} className="flex gap-5">
                <div className="field w-[80%]">
                  <input type="text" className="" {...register(`scopes.${index}.name`)}/>
                </div>
                <div className="field ">
                  <div className="flex justify-between gap-4">
                  {
                    index>0 &&   <button className="bg-blue-600 text-white px-4 p-1 rounded-md text-3xl" type="button"
                    onClick={()=>{
                      remove(index)
                    }}
                    >-</button>
                  }
                    <button className="bg-blue-600 text-white px-4 p-1 rounded-md text-xl" type="button" 
                    onClick={()=>{
                      append({
                        name:''
                      })
                    }}
                    > +</button>
                  </div>
                </div>
              </div>
            })
          }

    <div className="">
            <Controller
              name="icons"
              control={control}
              render={({ field }) => {
                return (
                  <div className="field">
                    <label htmlFor="" className="text-gray-700 font-semibold ">Add Icon/Image</label>

                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          setValue("icons", e.target.files[0]);
                        }}
                      />
                  </div>
                );
              }}
            />
          </div>
    <div className="flex justify-center">
      <button
        className="bg-blue-600 text-white p-2 px-4 rounded-full w-1/2"
        type="submit"
      >{` Save All`}</button>
    </div>
    </div>

  </form>
  </section>


  );
};

export default AddService;
