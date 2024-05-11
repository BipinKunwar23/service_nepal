import React, { useEffect, useRef, useState } from "react";
import {
  useShowChatsQuery,
  useSendMessageMutation,
  useDeleteChatMutation,
} from "../../api/chatApi";
import imag from "../../images/logo.png";
import img1 from "../../images/plumber.jpg";
import Loader from "../Loader";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { IoIosSend } from "react-icons/io";
import { setSenderMessage } from "../../redux/sellerSlice";
import { useDispatch, useSelector } from "react-redux";
import { IoMdPhotos } from "react-icons/io";
import {useNavigate} from "react-router-dom"

export const Chat = ({ children, receiverId }) => {
  const senderId = parseInt(localStorage.getItem("userId"));
  const { data, isLoading } = useShowChatsQuery(receiverId);
  const dispatch = useDispatch();
  const senderMessage = useSelector((state) => state.sellerSlice.senderMessage);
  const users = useSelector((state) => state.buyerSlice.users);
  const [previewImage, setPreviewImage] = useState(null);
  console.log('receiverId',receiverId);
  const navigate=useNavigate()

  useEffect(() => {
    if (
      senderMessage &&
      data &&
      senderMessage?.length >= data?.messages?.length
    ) {
      dispatch(setSenderMessage(senderMessage));
    } else {
      dispatch(setSenderMessage(data?.messages || []));
    }
    // if (data) {
    //   dispatch(setSenderMessage(data?.messages));
    // }
  }, [data, receiverId]);

  let senderCount = 0;
  let reveiverCount = 0;
  const { register, control, handleSubmit, reset } = useForm();
  const [sendMessage, { isLoading: isSending }] = useSendMessageMutation();
  const [deleteChat] = useDeleteChatMutation();
  const [action,setAction]=useState(false)

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

  const handleDeleteChat = async () => {
    await deleteChat(receiverId)
      .unwrap()
      .then((response) => {
        console.log("response", response);
        if(response){
          navigate(`/user/${localStorage.getItem('name')}/chat/receiver` ,{replace:true})
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const displayMessage = (message, index) => {
    console.log("mymessae", senderMessage[index + 1]);

    if (senderId === message.sender_id) {
      return (
        <div className="max-w-[70%] justify-self-end  " key={message?.id}>
          {message?.type === "text" ? (
            <div className=" ">
              <p className="  rounded-xl p-2 bg-[#0167DC] text-white text-[1em] ">
                {message?.message}
              </p>
              <span className=" text-slate-500  px-2 text-right text-sm">
                {index === senderMessage.length - 1 &&
                  checkSend?.sender_id === message?.sender_id &&
                  "sent"}
              </span>
            </div>
          ) : (
            <div className="p-2.5 mb-4">
              <img
                src={message?.message}
                alt=""
                className="w-52 rounded-xl h-64 object-cover object-center"
              />
              <span className=" text-slate-500  px-2 text-right block text-sm">
                {index === senderMessage.length - 1 &&
                  checkSend?.sender_id === message?.sender_id &&
                  "sent"}
              </span>
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="max-w-[70%] my-3 flex gap-2" key={message?.id}>
        {(index + 1 <= senderMessage.length &&
          senderMessage[index + 1]?.sender_id === senderId) ||
        index === senderMessage.length - 1 ? (
          <div className="relative place-self-end">
            <img
              src={`http://localhost:8000/${data?.receiver?.profile?.photo}`}
              alt=""
              className="w-6 h-6 rounded-full object-cover object-center "
            />
            {users.some((user) => user.id === receiverId) ? (
              <div className=" w-1.5 h-1.5  absolute  bottom-0 right-0  bg-[#0F7D00] rounded-full "></div>
            ) : (
              <div className=" w-1.5 h-1.5  absolute  bottom-0 right-0  bg-gray-600 rounded-full"></div>
            )}
          </div>
        ) : (
          <div className="w-6 h-6"></div>
        )}

        {message?.type === "text" ? (
          <div className=" flex-1">
            <p className="rounded-xl p-2 bg-[#0167DC] text-white text-[1em]   ">
              {message?.message}
            </p>
          </div>
        ) : (
          <div>
            <img
              src={message?.message}
              alt=""
              className="w-52 rounded-xl h-64 object-cover object-center"
            />
          </div>
        )}
      </div>
    );
  };

  const onSubmit = async (message) => {
    const formdata = new FormData();
    console.log("message", message);
    if (previewImage) {
      console.log("type", "image");
      formdata.append("message", previewImage);
      formdata.append("type", "image");
      console.log("typeof", typeof URL.createObjectURL(previewImage));

      dispatch(
        setSenderMessage([
          ...senderMessage,
          {
            message: URL.createObjectURL(previewImage),
            type: "image",
            sender_id: senderId,
            receiver_id: receiverId,
          },
        ])
      );
      setPreviewImage(null);

      await sendMessage({
        formdata,
        receiverId,
      })
        .unwrap()
        .then((response) => {
          console.log("response", response);
          setCheckSend(response);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      if (message?.message.trim() !== "") {
        formdata.append("message", message.message);
        formdata.append("type", "text");
        dispatch(
          setSenderMessage([
            ...senderMessage,
            {
              message: message?.message,
              type: "text",
              sender_id: senderId,
              receiver_id: receiverId,
            },
          ])
        );
        reset();

        await sendMessage({
          formdata,
          receiverId,
        })
          .unwrap()
          .then((response) => {
            console.log("response", response);
            setCheckSend(response);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };
  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="">
      <div className="flex gap-3 p-6 pb-3 border-b ">
        <div className="relative">
          <img
            src={`http://localhost:8000/${data?.receiver?.profile?.photo}`}
            alt=""
            className="w-[60px] h-[60px] rounded-full object-cover object-center shadow-gray-800"
          />
          {users.some((user) => user.id === receiverId) ? (
            <div className=" w-3 h-3  absolute  bottom-1 right-2  bg-[#0F7D00] rounded-full "></div>
          ) : (
            <div className=" w-3 h-3  absolute  bottom-1 right-2  bg-gray-600 rounded-full"></div>
          )}
        </div>

        <div className="flex-1 space-y-2">
          <h2 className="font-semibold text-gray-700 text-[1.2em] mb-1">
            {data?.receiver?.name}
          </h2>
          {users.some((user) => user.id === receiverId) ? (
            <p className="  text-gray-600  ">Online</p>
          ) : (
            <p className="  text-gray-600 ">Offline</p>
          )}
        </div>

        {children || (
          <div className="relative">
            <button
            onClick={()=>{
              setAction(!action)
            }}
            >:</button>

            {
              action &&
            <div className=" rounded p-2 px-4 absolute top-6 bg-slate-50  border">
              
          <button
          onClick={handleDeleteChat}
          >Delete</button>
        </div>
            }
          </div>
        )}
        
      </div>
      <section
        className="  w-full h-[400px] content-end grid px-6     border-b mb-3 "
        ref={scrollableDivRef}
      >
        <div className="grid  overflow-y-auto max-h-full hide-scrollbar    scrolling-touch ">
          {senderMessage.map((message, index) =>
            displayMessage(message, index)
          )}
          <div ref={spacerRef} className=""></div>
        </div>
      </section>
      <section className="px-6 ">
        <form action="" onSubmit={handleSubmit(onSubmit)} className=" ">
          <div className="flex gap-3 relative">
            <div className=" rounded-full">
              <div>
                <input
                  type="file"
                  id="image"
                  name="image"
                  // ref={register}
                  className=" hidden"
                  onChange={async (e) => {
                    const selectedFile = e.target.files[0];
                    setPreviewImage(selectedFile);
                  }}
                />
              </div>
              <div className="w-[70%] grid place-content-center">
                <button
                  type="button"
                  onClick={() => {
                    document.getElementById("image").click();
                  }}
                >
                  <i className="text-gray-600 text-4xl">
                    <IoMdPhotos />
                  </i>
                </button>
              </div>
            </div>

            {previewImage && (
              <>
                <div className=" border  bg-white border-gray-300 grid  absolute bottom-0 h-[223px] left-12 w-[90%] rounded-2xl">
                  <div
                    className="grid justify-end p-3 border-b"
                    onClick={() => {
                      setPreviewImage(null);
                    }}
                  >
                    <button>X</button>
                  </div>
                  <div className="p-3">
                    <img
                      src={URL.createObjectURL(previewImage)}
                      className=" object-cover object-top  w-32 h-20 border-2 border-gray-400"
                      alt=""
                    />
                  </div>
                  <div className="grid place-content-end p-2 border-t">
                    <button
                      type="submit"
                      className="text-gray-500   rounded-md  text-4xl"
                    >
                      <IoIosSend />
                    </button>
                  </div>
                </div>
              </>
            )}
            {!previewImage && (
              <>
                <div className="w-full ">
                  <input
                    type="text"
                    className="w-full focus:outline-none p-2 rounded-full bg-slate-200 focus:bg-slate-200 placeholder:text-lg placeholder:font-semibold"
                    {...register("message")}
                    placeholder="Send message"
                  />
                </div>
              </>
            )}
            <div className="grid place-content-center">
              <button
                type="submit"
                className="text-gray-600   rounded-md  text-4xl"
              >
                <IoIosSend />
              </button>
            </div>
          </div>
        </form>
      </section>
    </section>
  );
};
