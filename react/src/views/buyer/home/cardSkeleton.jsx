import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FaImage } from "react-icons/fa";
import BuyerNavbar from "./buyer-navbar";
const CardSkeleton = () => {
  return (
    <section className="">
      <BuyerNavbar />
      <div className="flex flex-wrap gap-4 px-10 py-4 ">
        {Array(5)
          .fill(0)
          .map((item) => (
            <div className="rounded-lg " key={item}>
              <Skeleton height={40} width={263} />
            </div>
          ))}
      </div>

      <div className="grid grid-cols-4 gap-8 p-10">
        {Array(8)
          .fill(0)
          .map((item) => (
            <div>
              <div className="">
                
                <Skeleton
                  height={180}
                 
                />
                 
              </div>
              <div className="flex gap-2">
                <div>
                  <Skeleton circle height={60} width={60} />
                </div>
                <div className="flex-1 grid content-center ">
                  <p>
                    <Skeleton height={25} width={160} borderRadius={50} />
                  </p>
                </div>
              </div>
              <div className="">
                <Skeleton height={20}  borderRadius={50}/>
              </div>
              <div className="">
                <Skeleton height={20} width={160} borderRadius={50}/>
              </div>
              <div className="">
                <Skeleton height={20}  width={130} borderRadius={50}/>
              </div>
              
            </div>
          ))}
      </div>
    </section>
  );
};

export default CardSkeleton;
