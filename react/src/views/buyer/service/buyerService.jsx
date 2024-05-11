import React, { useEffect, useRef, useState } from "react";
import { useGetServiceDetailsByIdQuery } from "../../../api/buyer/serviceApi";
import { useGetServiceStandardQuery } from "../../../api/seller/serviceApi";
import Loader from "../../../components/Loader";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ServiceDetail from "../../../components/service/serviceDetail";
import SellerProfile from "../../../components/service/profile";
import ServiceCategory from "../../../components/service/category";
import Service from "../../../components/service/service";
import PricePackage from "../../../components/service/package";
import ServiceFaqs from "../../../components/service/faq";
import { useDispatch, useSelector } from "react-redux";
import User from "../../../components/service/user";
import OrderGateWay from "../../../components/service/order";
import BuyerReview from "../review/review";
import OrderForm from "../order/orderForm";
import { Chat } from "../../../components/chat/chat";
import { setChat } from "../../../redux/buyerSlice";
import { FaList } from "react-icons/fa";
import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import { useForm } from "react-hook-form";
import { createReview } from "../../../redux/buyerSlice";
import Availability from "../../../components/service/availability";
import { createReview as addReview } from "../../../redux/buyerSlice";
import {
  useGetListQuery,
  useAddWishListMutation,
  useCreateListMutation,
  useAddFavoriteMutation,
} from "../../../api/buyer/savedApi";
import CreateReview from "../review/createReview";
import ServiceSkeleton from "../../../components/service/serviceSkeleton";
import SpecificServiceDetail from "../../../components/service/specificService";
import SpecificOrder from "../../../components/service/specificOrder";
import AddQuote from "./quote";
const BuyerService = () => {
  const chat = useSelector((state) => state.buyerSlice.chat);
  const continues = useSelector((state) => state.buyerSlice.continue);
  const review = useSelector((state) => state.buyerSlice.review);
  console.log("review", review);

  const packageName = useSelector((state) => state.sellerSlice.packageName);
  const quote = useSelector((state) => state.buyerSlice.quote);

  const location = useLocation();

  const seller = useRef(null);
  const view_review = useRef(null);

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { serviceId } = useParams();
  console.log("serviceId", serviceId);

  const { data, isLoading } = useGetServiceDetailsByIdQuery(serviceId);

  console.log("services", data);

  const { data: lists = [], isLoading: isLists } = useGetListQuery(serviceId);
  const [createList] = useCreateListMutation();
  const [addFavourite] = useAddFavoriteMutation();
  const [addWishList] = useAddWishListMutation();
  const [isList, setIsList] = useState(false);
  const [newList, setNewList] = useState(false);

  const AddFavourite = async (serviceId) => {
    await addFavourite(serviceId)
      .unwrap()
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const AddWishList = async (listId, serviceId) => {
    await addWishList({ listId, serviceId })
      .unwrap()
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const CreateListFrom = () => {
    const { register, handleSubmit } = useForm();
    const CreateList = async (values) => {
      console.log("value", values);
      await createList(values)
        .unwrap()
        .then((response) => {
          console.log("response", response);
          if (response) {
            setNewList(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    return (
      <div className="bg-white m-auto  p-8 space-y-8 rounded-md shadow w-[40%] ">
        <div className="border-b-2 flex justify-between p-2">
          <h2 className="text-4xl">New List</h2>
          <button
            className="text-2xl "
            onClick={() => {
              setNewList(false);
            }}
          >
            {" "}
            X
          </button>
        </div>
        <form
          action=""
          onSubmit={handleSubmit(CreateList)}
          className="space-y-4 text-[1.1em]"
        >
          <div className="flex flex-col gap-3">
            <label htmlFor="">List Name</label>
            <input
              type="text"
              {...register("name")}
              placeholder="Name of the List"
              className=" border-gray-400 p-3 border-2 rounded placeholder:text-gray-400 "
            />
          </div>
          <div className="space-y-3 ">
            <label htmlFor="">Description</label>
            <textarea
              name=""
              id=""
              cols="30"
              rows="8"
              {...register("description")}
              className="rounded border-2 border-gray-400 placeholder:text-gray-500 "
              placeholder="Write description"
            ></textarea>
          </div>
          <div className="grid ">
            <input
              type="submit"
              value="Save List"
              className="border-2 p-2 w-full rounded border-gray-400"
            />
          </div>
        </form>
      </div>
    );
  };

  useEffect(() => {
    if (continues || newList || quote) {
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    }

    return () => {
      document.body.style.position = "static";
    };
  }, [continues, newList, quote]);
  // useEffect(() => {
  //   if (review) {
  //     document.body.style.position = "fixed";
  //     document.body.style.width = "100%";
  //   }
  //   if (!review) {
  //     if (view_review.current) {
  //       view_review.current.scrollIntoView({
  //         behavior: "auto",
  //         block: "start",
  //       });
  //     }
  //   }
  // }, [review]);

  const scrollToSeller = () => {
    if (seller.current) {
      seller.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  const [type, setType] = useState();

  useEffect(() => {
    if (location.hash === "#seller") {
      scrollToSeller();
    }
    if (data) {
      setType(data?.services?.service?.type);
    }
  }, [data]);

  if (isLoading || isLists) {
    return <ServiceSkeleton />;
  }

  if (type === "general") {
    return (
      <>
        <section className=" bg-white  ">
          <div className=" text-[1.1em] text-gray-500 flex gap-3  mb-5">
            <div className="w-[65%]">
              <ServiceCategory
                category={data?.services?.service?.subcategory?.category}
                subcategory={data?.services?.service?.subcategory}
                service={data?.services?.service}
                option={data?.services?.option}
              />
            </div>
            <div className="relative flex-1 ml-2">
              <div className="flex gap-3  ">
                <div>
                  <i
                    className="text-2xl text-gray-400 cursor-pointer"
                    onClick={() => {
                      setIsList(!isList);
                    }}
                  >
                    <FaList />
                  </i>
                </div>

                <div>
                  <i className="text-2xl text-gray-400 cursor-pointer">
                    <MdFavorite />
                  </i>
                </div>
              </div>
              {isList && (
                <div className="absolute top-8 bg-white border p-2 w-80  ">
                  <ul className="space-y-1 ">
                    {lists?.map((list) => (
                      <li key={list?.id} className="flex gap-3 p-2">
                        <i
                          className={`grid content-center text-2xl cursor-pointer ${
                            list?.saved ? "text-pink-600 " : "text-gray-400 "
                          }`}
                          onClick={() => {
                            AddWishList(list?.id, serviceId);
                          }}
                        >
                          <MdFavorite />
                        </i>
                        {list?.name}
                      </li>
                    ))}
                    <li className="flex gap-4 border-t-2 p-2">
                      <span className="text-3xl ">+</span>
                      <button
                        onClick={() => {
                          setNewList(true);
                        }}
                      >
                        New List
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
          <section className="flex gap-3">
            <section className="w-[65%] overflow-y-auto">
              <div className="mb-8">
                <SellerProfile
                  photo={data?.services?.description?.image}
                  name={data?.services?.user?.profile?.name}
                />
              </div>

              <div className="">
                <div className="flex flex-col gap-6 mb-5">
                  <Service
                    galleries={data?.services?.galleries}
                    title={data?.services?.title}
                    description={data?.services?.description?.description}
                  />
                </div>
                <div className="my-8">
                  <Availability user={data?.services?.user} />
                </div>
                <div className="mb-8">
                  <SellerProfile
                    photo={data?.services?.user?.profile?.photo}
                    name={data?.services?.user?.name}
                  />
                </div>
                <section>
                  <User user={data?.services?.user} />
                </section>
                <section>
                  <PricePackage
                    standards={data?.standards}
                    service_packages={data?.services?.packages}
                  />
                </section>
                <section className="mt-4">
                  <ServiceFaqs faqs={data?.services?.user?.faqs}>
                    <h2 className="font-semibold text-lg  mb-3">
                      Frequently Asked Questions{" "}
                    </h2>
                  </ServiceFaqs>
                </section>
              </div>
            </section>
            <section className="flex-1 bg-gray-100  grid place-self-start sticky top-0">
              <OrderGateWay
                packages={data?.services?.packages}
                standards={data?.standards}
              />
            </section>
          </section>
          <section ref={view_review}>
            <BuyerReview sellerId={data?.services?.user?.id} />
          </section>
        </section>
        <div
          className={` top-0 w-full bg-[rgba(0,0,0,0.8)] h-screen justify-items-end  absolute z-10  py-1 ${
            continues ? "grid" : "hidden"
          }`}
        >
          <OrderForm
            packages={data?.services?.packages?.find(
              (pckg) => pckg?.package === packageName
            )}
            sellerId={data?.services?.user?.id}
            standards={data?.standards}
          />
        </div>
        <div
          className={` top-0 w-full bg-[rgba(0,0,0,0.8)] h-screen  absolute z-10  py-1 ${
            newList ? "grid " : "hidden"
          }`}
        >
          <CreateListFrom />
        </div>
        {chat && (
          <div className="w-[40Vw] mx-auto bg-white left-3 h-[90Vh] fixed    border top-10 z-10     rounded-xl shadow-lg">
            <Chat setChat={setChat} receiverId={parseInt(data?.services?.user?.id)}>
              <div className="">
                <button
                  className="text-xl text-gray-700 "
                  onClick={() => {
                    dispatch(setChat(false));
                  }}
                >
                  {" "}
                  X
                </button>
              </div>
            </Chat>
          </div>
        )}

        {/* <div
          className={` top-[3Vh] left-10    justify-items-end  fixed z-10   ${
            chat ? "grid" : "hidden"
          }`}
        >
         
        </div> */}
        {review && (
          <div className=" top-0  w-full bg-[rgba(0,0,0,0.6)] h-screen grid place-content-center absolute z-10  ">
            <CreateReview sellerId={data?.services?.user?.id}>
              <button
                className="text-xl text-blue-600 "
                onClick={() => {
                  dispatch(addReview(false));
                }}
              >
                {" "}
                X
              </button>
            </CreateReview>
          </div>
        )}
        {quote && (
          <div className=" top-0  w-full bg-[rgba(0,0,0,0.6)] h-screen grid place-content-center absolute z-10  ">
            <AddQuote sellerId={data?.services?.user?.id}>
              <button
                className="text-xl text-blue-600 "
                onClick={() => {
                  setQuote(false);
                }}
              >
                {" "}
                X
              </button>
            </AddQuote>
          </div>
        )}
      </>
    );
  }
  return (
    <>
      <section className="relative">
        {/* <div className="mb-8">
          <SellerProfile
            photo={data?.services?.description?.image}
            name={data?.services?.user?.profile?.name}
          />
        </div> */}
        <div className="flex justify-between">
          <div className=" text-[1.1em] text-gray-500  w-[65%]">
            <ServiceCategory
              category={data?.services?.service?.subcategory?.category}
              // subcategory={data?.services?.service?.subcategory}
              // service={data?.services?.service}
              // option={data?.services?.option}
            />
          </div>
          <div className="relative flex-1 ml-2">
            <div className="flex gap-3  ">
              <div>
                <i
                  className="text-2xl text-gray-400 cursor-pointer"
                  onClick={() => {
                    setIsList(!isList);
                  }}
                >
                  <FaList />
                </i>
              </div>

              <div>
                <i className="text-2xl text-gray-400 cursor-pointer">
                  <MdFavorite />
                </i>
              </div>
            </div>
            {isList && (
              <div className="absolute top-8 bg-white border p-2 w-80  ">
                <ul className="space-y-1 ">
                  {lists?.map((list) => (
                    <li key={list?.id} className="flex gap-3 p-2">
                      <i
                        className={`grid content-center text-2xl cursor-pointer ${
                          list?.saved ? "text-pink-600 " : "text-gray-400 "
                        }`}
                        onClick={() => {
                          AddWishList(list?.id, serviceId);
                        }}
                      >
                        <MdFavorite />
                      </i>
                      {list?.name}
                    </li>
                  ))}
                  <li className="flex gap-4 border-t-2 p-2">
                    <span className="text-3xl ">+</span>
                    <button
                      onClick={() => {
                        setNewList(true);
                      }}
                    >
                      New List
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
        <section className="grid grid-cols-3 gap-5 my-8">
          <div className=" overflow-y-auto col-span-2">
            <div className="  mx-auto  box-border   ">
              <div className=" mx-20 ">
                <img
                  src={`http://localhost:8000/${data?.services?.description?.image}`}
                  className="object-cover object-center w-full min-h-[400px] h-full"
                  alt=""
                />
              </div>
            </div>
           
          </div>
          <div className="sticky top-0 grid place-self-start">
            <div className="space-y-6">
              <h2 className="font-semibold text-[2em] text-black">
              {data?.services?.service?.name}
              </h2>
              <h2 className="text-gray-600 text-xl font-semibold">
              {data?.services?.option?.name}
              </h2>
              <div>

              </div>
              <p className="text-black line-clamp-2 ">
                {data?.services?.description?.description}
              </p>
              <p className="text-gray-600 text-xl">
                {" "}
                <span className="text-black mr-3 font-semibold">Rs</span>
                {data?.services?.description?.price}
              </p>
              <div></div>
              {/* <div>
                <p className="mt-4 font-semibold text-xl">
                  {data?.services?.description?.note}
                </p>
              </div> */}
              <div>
                <SpecificOrder
                  price={data?.services?.description?.price}
                  sellerId={data?.services?.user?.id}
            
                />
              </div>
            </div>
          </div>
        </section>
        <section className="mt-20">
              <div className="my-4">
                <Availability user={data?.services?.user} />
              </div>
              <div className="mb-8">
                <SellerProfile
                  photo={data?.services?.user?.profile?.photo}
                  name={data?.services?.user?.name}
                />
              </div>
              <User user={data?.services?.user} />
              <section className="mt-4">
                <ServiceFaqs faqs={data?.services?.user?.faqs}>
                  <h2 className="font-semibold text-lg  mb-3">
                    Frequently Asked Questions{" "}
                  </h2>
                </ServiceFaqs>
              </section>
            </section>
        <div ref={view_review}>
          <BuyerReview sellerId={data?.services?.user?.id} />
        </div>

        <div
          className={` top-[8Vh] left-10    justify-items-end  fixed z-10   ${
            chat ? "grid" : "hidden"
          }`}
        >
          <div className="w-[40Vw] mx-auto bg-white border border-gray-300 shadow my-4 grid  rounded-lg">
            <Chat setChat={setChat} receiverId={data?.services?.user?.id}>
              <div className="">
                <button
                  className="text-xl text-gray-400 "
                  onClick={() => {
                    dispatch(setChat(false));
                  }}
                >
                  {" "}
                  X
                </button>
              </div>
            </Chat>
          </div>
        </div>
      </section>
      {review && (
        <div className=" top-0  w-full bg-[rgba(0,0,0,0.6)] h-screen grid place-content-center absolute z-10  ">
          <CreateReview sellerId={data?.services?.user?.id}>
            <button
              className="text-xl text-blue-600 "
              onClick={() => {
                dispatch(addReview(false));
              }}
            >
              {" "}
              X
            </button>
          </CreateReview>
        </div>
      )}
    </>
  );
};

export default BuyerService;
