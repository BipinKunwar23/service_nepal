import React from "react";
import {useForm} from "react-hook-form"
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAdmin } from "./redux/categorySlice";
import { useSelector } from 'react-redux';

const Admin = () => {
const navigate=useNavigate();
const dispatch=useDispatch();

const onSubmit=async (values)=>{
    console.log(values);
    if(values.name==="admin"){
        console.log('admin');
        if(values.password==="1234"){
            dispatch(setAdmin())
            navigate('/', {replace:true});
            
        }
    }
}
    const {register,handleSubmit,control }=useForm()
  return (
    <section className="grid place-content-center min-h-screen bg-gray-600" >

      <form action="" className="bg-gray-100 admin text-[1em]" onSubmit={handleSubmit(onSubmit)}>
        <div>
            <h2 className="text-3xl font-bold text-center p-2">Welcome Admin</h2>
        </div>
        <div>
          <label htmlFor="">User Name</label>
          <input type="text" {...register('name')} />
        </div>
        <div>
          <label htmlFor="">Password</label>
          <input type="password" {...register('password')} />
        </div>
        <div className="flex justify-center">
        <button type="submit" className="bg-gray-300 p-2 rounded-lg text-2xl font-semibold text-gray-800"
        
        >Enter</button>
        </div>
      </form>

    </section>
  );
};

export default Admin;
