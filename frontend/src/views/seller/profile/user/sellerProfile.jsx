import React, { useState } from 'react'

import ServiceCards from './serviceCard';
const sellerProfile = () => {
  const [active, setActive] = useState(true);

  return (
    <div className="flex-1 ">
            <div className="flex gap-10 bg-white p-3  mb-4">
              <div className={`${active && "border-b-2 border-green-600"}`}>
                <button
                  className="p-4"
                  onClick={() => {
                    setActive(true);
                  }}
                >
                  ACTIVE SERVICE{" "}
                </button>
              </div>
              <div className={`${!active && "border-b-2 border-green-600"}`}>
                <button
                  className="p-4"
                  onClick={() => {
                    setActive(false);
                  }}
                >
                  DRAFTS
                </button>
              </div>
            </div>

            {active && <ServiceCards active={active} />}
            {!active && <ServiceCards active={active} />}
            {/* <div className="w-[40%] h-[40Vh] grid place-content-center border border-gray-400 rounded-md p-10 bg-white">
              <button className="border border-gray-500 w-[100px] h-[100px] mx-auto mb-3 text-[2em] font-bold rounded-full">
                {" "}
                +
              </button>
              <p className="text-center text-gray-400 font-lg">
                Create new service
              </p>
            </div> */}
          </div>
   
  )
}

export default sellerProfile