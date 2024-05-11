import React, { useState } from 'react'

import ServiceCards from './serviceCard';
const SellerService = () => {
  const [active, setActive] = useState(1);

  return (
    <div className="flex-1 ">
            <div className="flex gap-16 bg-white p-3 mb-3 font-semibold ">
              <div className={`${active && "border-b-2 border-green-600"}`}>
                <button
                  className=""
                  onClick={() => {
                    setActive(1);
                  }}
                >
                  ACTIVE {" "}
                </button>
              </div>
              <div className={`${!active && "border-b-2 border-green-600"}`}>
                <button
                  className=""
                  onClick={() => {
                    setActive(0);
                  }}
                >
                  DRAFT
                </button>
              </div>
            </div>

             <ServiceCards active={active} />
           
          </div>
   
  )
}

export default SellerService