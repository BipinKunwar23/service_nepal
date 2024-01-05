import React, { useState } from "react";
import Initial from "./AddInitial";
import Final from "./AddFinal";
import { useSelector } from "react-redux";
import ViewInitial from "./ViewInitial";
const ViewAgreement = () => {
  const status = useSelector((state) => state.orderSlice.status);
  console.log("status", status);
  const step = useSelector((state) => state.orderSlice.step);
  const [final,setFinal]=useState(false)

  return (
    <section className="w-[80Vw] p-5 mx-auto bg-white ">
      <section className="flex-1  border-t-2 border-gray-500">
        {status?.isInitial ? (
          <div>
            <ViewInitial />
            <div className="flex place-content-center py-5 ">
              <button type="button" className="text-red-600 underline " 
              onClick={()=>{
                setFinal(true)
              }}
              >
                Continue For Final Agreement
              </button>
            </div>
          </div>
        ) : (
          <Initial />
        )}
      </section>
      {
        final &&
      <section>
        <Final />
      </section>

      }
    </section>
  );
};

export default ViewAgreement;
