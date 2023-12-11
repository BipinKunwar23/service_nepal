import React, { useState } from "react";
import Initial from "./initial";
import Final from "./final";
import { useSelector } from 'react-redux';

const Agreement = () => {

  const step=useSelector((state)=>state.orderSlice.step);

 
  return (
    <section className="w-[80Vw] p-5 mx-auto bg-white mt-2 rounded-md">
        <section  className={`flex-1 ${!step.initial && "hidden" } `}>
          <Initial  />
       
        </section>
        <section className={`flex-1 ${!step.final && "hidden"}` }>
          <Final />
        
        </section>

    </section>
  );
};

export default Agreement;
