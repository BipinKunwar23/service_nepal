import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useAddFaqsMutation , useUpdateFaqsMutation} from "../../../../api/admin/aboutApi";
const AddFaqInfo = ({ setShow,data }) => {
  const { register, control, handleSubmit, setValue } = useForm();

  const [addFaqInfo, { isLoading, isError, error }] =
    useAddFaqsMutation();
    
  const [updateFaqInfo] =
  useUpdateFaqsMutation();
  // const [height,setHeight]=useState(200);
  const submitForm = async (values) => {
    console.log(values);
    

    console.log(values);
    if(data && Object.keys(data).length>0){
      await updateFaqInfo({ values,id:data?.id })
      .unwrap()
      .then((response) => {
            console.log(response);
          if(response){
              setShow(false)
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    else{
      await addFaqInfo(values )
      .unwrap()
      .then((response) => {
            console.log(response);
          if(response){
              setShow(false)
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
          FAQS and Answers
        </h2>
        <button className="text-xl"
        onClick={()=>{
            setShow(false)
        }}
        >X</button>
      </div>
      <form action="" className="" onSubmit={handleSubmit(submitForm)}>
        <div className="">
          <div className="about-form">
            <label htmlFor=""> Question</label>
            <input type="text" {...register("question")} 
            defaultValue={data?.question}
            />
          </div>

          <div className="about-form">
            <label htmlFor=""> Answers</label>
            <textarea
              name=""
              id=""
              cols="30"
              rows="7"
              defaultValue={data?.answer}
              {...register("answer")}
            ></textarea>
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

export default AddFaqInfo;
