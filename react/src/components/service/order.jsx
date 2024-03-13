import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { setPackage,setPackageName } from '../../redux/sellerSlice';
import { setChat , setContinue} from '../../redux/buyerSlice';
import { FaCheck } from 'react-icons/fa';

const OrderGateWay = ({packages, standards}) => {
    const packageName = useSelector((state) => state.sellerSlice.packageName);
    const chat = useSelector((state) => state.buyerSlice.chat);
    const continues = useSelector((state) => state.buyerSlice.continue);

    const [packageData, setPackageData] = useState({});
    console.log("pacakges", packageData);
    const dispatch = useDispatch();
    const location = useLocation();
    console.log("location", location);
  
  
  

  
  
  return (
    <section className="w-full  ">
    <div className="  box-border ">
      <ul className="grid grid-cols-3    bg-white border border-gray-400  text-center">
        <li
          className={` border-r border-gray-500 shadow  ${
            packageName === "basic" && "bg-gray-700 text-white"
          }`}
        >
          <button
            className=" p-3 w-full"
            onClick={() => {
              dispatch(setPackageName("basic"));
            }}
          >
            Basic
          </button>
        </li>
        <li
          className={` border-r border-gray-500 shadow  ${
            packageName === "standard" && "bg-gray-700 text-white"
          }`}
        >
          <button
            className="w-full py-3 px-2"
            onClick={() => {
              dispatch(setPackageName("standard"));
            }}
          >
            Standard
          </button>
        </li>
        <li
          className={`  ${
            packageName === "premium" && "bg-gray-700 text-white"
          }`}
        >
          <button
            className="p-3 w-full "
            onClick={() => {
              dispatch(setPackageName("premium"));
            }}
          >
            Premium
          </button>
        </li>
      </ul>
      {
        packages?.filter((data)=>data?.package===packageName).map((packageData)=>
      <div className="p-3 border flex flex-col gap-8">
        <div className="">
          <div className="">
            <div className="flex justify-between">
              <p className=" text-[1.2em] font-semibold mb-3 text-gray-600">
                {packageData?.name?.toUpperCase()}
              </p>
              <p className="text-gray-500 text-xl">
                Rs {packageData?.price}
              </p>
            </div>
            <p className="text-slate-400">{packageData?.description}</p>
            <div className="mt-3"></div>
          </div>

          <div>
            <h2 className='text-gray-600  text-[1.2em] mb-2 font-semibold'>Package Includes</h2>
            <ol className='space-y-2 text-[1em] text-gray-500'>
                {
                    standards?.map((standard)=>{
                        const value_id =packageData?.standards.find((item) => item?.id === standard?.id)
                            ?.pivot?.value_id;
                             if(value_id){
                                const value = standard?.values.find(
                                  (item) => item?.id === value_id
                                );
                                return <li key={standard?.id} className='flex gap-3 '><i className='text-[0.8em] grid content-center' ><FaCheck/></i> <span>{standard?.name}</span> <span>{value?.name}</span></li>


                            }
                            return <li key={standard?.id} className='flex gap-3'> <i className='text-[0.8em] grid content-center' ><FaCheck/></i> <span>{standard?.name}</span></li>


                    })
                }
             
            </ol>
          </div>
        </div>

        <div>
          <button
            className=" bg-gray-800 text-white  rounded-md mb-5 p-2 w-full"
            onClick={() => {
                dispatch(

                    setContinue(!continues)
                )
            }}
          >
            Continue
          </button>
          <button
            className="border border-gray-400 rounded-md  p-2 w-full"
            onClick={() => {
              setChat(true);
                dispatch(
              setChat(!chat)

                )
            }}
          >
            Contact Now
          </button>
        </div>
      </div>
        
        )
      }
    </div>
  </section>
  )
}

export default OrderGateWay