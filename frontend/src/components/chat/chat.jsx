import React, { useEffect, useState } from "react";
import { useShowChatsQuery, useSendMessageMutation } from "../../Api/chatApi";
import imag from "../../images/logo.png";
import img1 from "../../images/plumber.jpg";
import Loader from "../Loader";
import {useForm} from "react-hook-form"
import { useParams } from "react-router-dom";
export const Chat = () => {
  const senderId =parseInt(localStorage.getItem("userId"))
  const {receiverId}=useParams()
  const { data, isLoading } = useShowChatsQuery(receiverId);
  const [senderMessage,setSenderMessage]=useState([]);
  useEffect(() => {
   
    if(data){
      setSenderMessage(data)
    }
  }, [data]);
  window.Echo.private(`private-chat`).listen("privateChat", (event) => {
    console.log('event',event);
    if(event?.message?.receiver_id===senderId){
      setSenderMessage([...senderMessage,event?.message])

    }
  });
  console.log("senderId", senderId);
  console.log("data", data);
  let senderCount=0;
  let reveiverCount=0;
const {register,control,handleSubmit,reset}=useForm()
const [sendMessage,{isLoading:isSending}]=useSendMessageMutation();
const [checkSend,setCheckSend]=useState({});


const displayMessage=(message,index)=>{
    senderCount++;
    reveiverCount++;

  if (senderId === message.sender_id) {
    reveiverCount=0;
    return (
      <div className="max-w-[60%] justify-self-end flex gap-4 " key={message?.id}>
        <div className="flex flex-col gap-1">
          <p className="bg-purple-500 text-white  rounded-xl p-2">
            {message?.message}
          </p>
          <span className=" text-slate-500  px-2 text-right">
         
          {
            index===senderMessage.length-1 && (

              checkSend?.sender_id===message?.sender_id && "sent" 
            )
          }
          </span>
        </div>
        {
          senderCount===1 ? 
          <div className="w-[30px] h-[30px]">
            <img
          src={img1}
          alt=""
          className=" h-full w-full rounded-full shadow-inner shadow-gray-800"
        />
          </div>
          : <div className="w-[30px] h-[30px]">

          </div>
        }
        
      </div>
    );
  }
  senderCount=0
  return (
    <div className="max-w-[60%]  flex gap-4 " key={message?.id}>
      {
        reveiverCount===1 ?
        <div className="w-[30px] h-[30px]">
          <img
            src={img1}
            alt=""
            className="w-full h-full rounded-full shadow-inner shadow-gray-800"
          />

        </div>
        : <div className="w-[30px] h-[30px]"> 

        </div>
      }

      <div className="flex flex-col gap-3">
        <p className="bg-purple-500 text-white  rounded-xl p-2">
          {message?.message}
        </p>
      </div>
    </div>
  );

}

const onSubmit=async(message)=>{
  setSenderMessage([...senderMessage,{...message,sender_id:senderId,receiver_id:receiverId}])
  reset();

  await sendMessage({message,receiverId})
  .unwrap()
  .then((response) => {
    console.log("response", response);
    setCheckSend(response);
  })
  .catch((error) => {
    console.log(error);
  });
}
  if (isLoading) {
    return <Loader />;
  }
  return (
    <section className="w-[60Vw] mx-auto shadow shadow-gray-400 my-4 grid  rounded-lg">
      <div className="flex gap-5 p-4 bg-slate-50">
        <img
          src={imag}
          alt=""
          className="w-[30px] h-[30px] rounded-full shadow-inner shadow-gray-800"
        />
        <div className="grid content-center">
          <h2 className="font-semibold text-[1.1em]">Bipin Kunwar</h2>
        </div>
      </div>
      <section className="p-4 grid gap-5">
      {
        senderMessage.map((message,index)=>displayMessage(message,index))
      }
      </section>
      <section className="bg-slate-100  p-4 grid">
          <form action="" onSubmit={handleSubmit(onSubmit)}  className="flex w-[60%] justify-self-end gap-4 ">

          <div className="flex-1">
            <input
              type="text"
              className="border border-gray-700 shadow rounded-full w-full p-1.5 focus:outline-none "
              {...register('message')}
              placeholder="Send Message"
            />
          </div>
          <div>
            <button type="submit" className="bg-blue-600 text-white p-1.5 rounded-md px-4">
              Send
            </button>
          </div>
          </form>

      </section>
    </section>
  );
};
