import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FaImage } from "react-icons/fa";
import BuyerNavbar from "./buyer-navbar";
const CardSkeleton = () => {
  return (
    <section className="">
      <BuyerNavbar />
      <div className="flex flex-wrap gap-2 px-4 py-2 border-b">
        {Array(5)
          .fill(0)
          .map((item,index) => (
            <div className="rounded-lg " key={index}>
              <Skeleton height={30} width={250} borderRadius={50}/>
            </div>
          ))}
      </div>

      <div className="grid grid-cols-4 gap-12 p-4">
        {Array(8)
          .fill(0)
          .map((item,index) => (
            <div key={index}>
              <div className="">
                
                <Skeleton
                  height={140}
                  borderRadius={10}
                 
                />
                 
              </div>
              <div className="flex gap-2">
                <div>
                  <Skeleton circle height={30} width={30} />
                </div>
                <div className="flex-1 grid content-center ">
                  <p>
                    <Skeleton height={20}  borderRadius={50} />
                  </p>
                </div>
              </div>
              <div className="">
                <Skeleton height={15}  borderRadius={50}/>
              </div>
              <div className="">
                <Skeleton height={15}  borderRadius={50}/>
              </div>
              
              
            </div>
          ))}
      </div>
    </section>
  );
};

export default CardSkeleton;
