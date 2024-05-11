import React, { useState } from 'react'
import { IoIosArrowDropright } from "react-icons/io";
import { IoIosArrowDropleft } from "react-icons/io";

const Service = ({galleries=[],title,description}) => {
  const [imageIndex, setImageIndex] = useState(0);

  return (
    <>
       <div>
            <p className="text-[1.4em] font-semibold text-gray-700">
              {title}
            </p>
          </div>

          <div className="flex gap-10 flex-col ">
            <div className="mb-3 ">
              {galleries?.map((gallery, index) => {
                if (index === imageIndex) {
                  return (
                    <div key={gallery?.id} className="flex  ">
                      <div className="grid content-center p-3 shadow border">
                        {imageIndex > 0 && (
                          <button>
                            <i
                              className="   text-4xl"
                              onClick={() => {
                                setImageIndex((prevIndex) => prevIndex - 1);
                              }}
                            >
                              <IoIosArrowDropleft />
                            </i>
                          </button>
                        )}
                      </div>

                      <div className="flex-1">
                        <img
                          src={`http://localhost:8000/${gallery?.image}`}
                          alt=""
                          className="h-[400px] w-full object-cover object-left-top"
                        />
                      </div>

                      <div className="grid content-center p-3 shadow border">
                        {imageIndex <galleries?.length - 1 && (
                          <button>
                            <i
                              className="   text-4xl"
                              onClick={() => {
                                setImageIndex((prevIndex) => prevIndex + 1);
                              }}
                            >
                              <IoIosArrowDropright />
                            </i>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                }
              })}
            </div>

            <div className="">
              <strong>About Service</strong>
              <p className="text-gray-700 mt-2">{description}</p>
            </div>
          </div>
    </>
  )
}

export default Service