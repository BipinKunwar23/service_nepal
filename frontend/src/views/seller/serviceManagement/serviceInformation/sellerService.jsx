import React, { useState } from 'react'

import ServiceCards from './serviceCard';
const SellerService = () => {
  const [active, setActive] = useState(1);

  return (
    <div className="flex-1 ">
            <div className="flex gap-10 bg-white p-3  mb-4">
              <div className={`${active && "border-b-2 border-green-600"}`}>
                <button
                  className="p-4"
                  onClick={() => {
                    setActive(1);
                  }}
                >
                  ACTIVE SERVICE{" "}
                </button>
              </div>
              <div className={`${!active && "border-b-2 border-green-600"}`}>
                <button
                  className="p-4"
                  onClick={() => {
                    setActive(0);
                  }}
                >
                  DRAFTS
                </button>
              </div>
            </div>

             <ServiceCards active={active} />
           
          </div>
   
  )
}

export default SellerService