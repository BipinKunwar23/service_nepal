import React, { useEffect, useRef, useState } from "react";
import { useShowChatsQuery, useSendMessageMutation } from "../../api/chatApi";
import imag from "../../images/logo.png";
import img1 from "../../images/plumber.jpg";
import Loader from "../Loader";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { IoSend } from "react-icons/io5";
export const Chat = ({ children, receiverId }) => {
  const senderId = parseInt(localStorage.getItem("userId"));
  const { data, isLoading } = useShowChatsQuery(receiverId);
  const [senderMessage, setSenderMessage] = useState([]);
  console.log("data", data);
  useEffect(() => {
    if (data) {
      setSenderMessage(data?.messages);
    }
  }, [data]);
  window.Echo.private(`private-chat`).listen("privateChat", (event) => {
    console.log("event", event);
    if (event?.message?.receiver_id === senderId) {
      setSenderMessage([...senderMessage, event?.message]);
    }
  });

  let senderCount = 0;
  let reveiverCount = 0;
  const { register, control, handleSubmit, reset } = useForm();
  const [sendMessage, { isLoading: isSending }] = useSendMessageMutation();
  const [checkSend, setCheckSend] = useState({});

  const scrollableDivRef = useRef(null);
  const spacerRef = useRef(null);

  const scrollToBottom = () => {
    if (spacerRef.current) {
      spacerRef.current.scrollIntoView({ block: "end" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [senderMessage]);

  const displayMessage = (message, index) => {
    if (senderId === message.sender_id) {
      reveiverCount = 0;
      return (
        <div
          className="max-w-[60%] justify-self-end flex gap-4 "
          key={message?.id}
        >
          <div className="flex flex-col gap-1">
            <p className=" bg-purple-500 text-white rounded-md p-3 text-lg">
              {message?.message}
            </p>
            <span className=" text-slate-500  px-2 text-right">
              {index === senderMessage.length - 1 &&
                checkSend?.sender_id === message?.sender_id &&
                "sent"}
            </span>
          </div>
        </div>
      );
    }
    return (
      <div className="max-w-[60%]  flex gap-4 " key={message?.id}>
        <div className="flex flex-col gap-3">
          <p className=" bg-purple-500 text-white rounded-md p-3 text-lg">
            {message?.message}
          </p>
        </div>
      </div>
    );
  };

  const onSubmit = async (message) => {
    if(message?.message.trim()!==""){

    setSenderMessage([
      ...senderMessage,
      { ...message, sender_id: senderId, receiver_id: receiverId },
    ]);
    reset();

    await sendMessage({ message, receiverId })
      .unwrap()
      .then((response) => {
        console.log("response", response);
        setCheckSend(response);
      })
      .catch((error) => {
        console.log(error);
      });
    }

  };
  if (isLoading) {
    return <Loader />;
  }
  return (
    <section className="  ">
      <div className="flex gap-5 px-4 py-2 ">
        <img
          src={`http://localhost:8000/${data?.receiver?.profile?.photo}`}
          alt=""
          className="w-[50px] h-[50px] rounded-full shadow-inner shadow-gray-800"
        />
        <div className="flex-1 ">
          <h2 className="font-semibold text-[1.2em] mb-1">{data?.receiver?.name}</h2>
          <p className="text-gray-600">Active 2 hour Ago</p>
        </div>
        {children}
      </div>
      <section
        className="  w-full h-[430px] content-end grid p-4 relative border-y bg-white border-gray-300"
        ref={scrollableDivRef}
      >
        <div className="grid   gap-4 overflow-y-auto max-h-full hide-scrollbar bg-white p-4 scrolling-touch ">
          {senderMessage.map((message, index) =>
            displayMessage(message, index)
          )}
          <div ref={spacerRef}></div>
        </div>
      </section>
      <section className=" p-4 grid">
        <form action="" onSubmit={handleSubmit(onSubmit)} className="  ">
          <div className="  flex">
            <input
              type="text"
              className=" rounded-md w-full p-2.5 focus:outline-none  placeholder:text-lg"
              {...register("message")}
              placeholder="Send Message"
            />
            <button
              type="submit"
              className="text-blue-500  p-1.5 rounded-md px-4 text-3xl"
            >
              <IoSend/>
            </button>
          </div>
        </form>
      </section>
    </section>
  );
};
