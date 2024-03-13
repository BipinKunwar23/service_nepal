import React from "react";

const orderDetails = ({order}) => {
 

  const totalPrice = [];
  let sum = 0;
  
  
  return (
      <>
        <p className="text-center text-lg font-semibold text-slate-600 border-b-2 border-gray-500 mb-3">
          Order Details
        </p>

        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <p>
              <strong>Id : <span  className="ml-3">{order?.id}</span></strong>
            </p>

            <p>
              <strong>Created Date: <span className="ml-3">  {order?.created}</span></strong>
            </p>
          </div>
         
          <div className=" flex place-content-center gap-10">
            <p className="text-center mb-2">
              <strong>Service Required Date : {order.service_date}</strong>{" "}
              <span className="ml-3 text-orange-600">
                {order.emergency ? "Emergency Service" : `Maximum Delay:   ${ order.max_delay}`}
              </span>
            </p>
           
           
          </div>
          <div className="w-[80%] mx-auto flex my-4">
            <p className="  text-lg flex-1">
              <strong className="  ">{order?.service_name}</strong>
            </p>
            <p className="">
              <strong>Status: <span className="text-red-600 ml-2">{order?.status}</span></strong>
            </p>
          </div>
        </div>
        <section className="w-[80%] mx-auto ">
          <div className="flex flex-col gap-4 mb-5 ">
            <p className="flex flex-col">
              <strong>Order Details</strong> {order.service_detail}
            </p>
      
          </div>
          <p className="mb-3 font-bold">Ordered Services</p>
          <div className="mb-4 flex">
            <table
              className="min-w-full bg-white border border-gray-300"
              cellPadding={7}
            >
              <thead>
                <tr className="border border-gray-500">
                  <th className="border border-gray-400">S.N</th>
                  <th className="border border-gray-400">Service</th>
                  <th className="border border-gray-400">Price</th>
                  <th className="border border-gray-400">Unit</th>

                  <th className="border border-gray-400">Works</th>
                  <th className="border border-gray-400">Work Cost</th>

                </tr>
              </thead>
              <tbody>
                {order?.providerScopes.map((providerScope, index) => {
                  const correspondingCustomerScope = order?.customerScopes.find(
                    (customerScope) => customerScope.id === providerScope.id
                  );
                  totalPrice[index] =
                    correspondingCustomerScope?.size * providerScope?.price;
                  sum += totalPrice[index];

                  return (
                    <tr key={providerScope.id}>
                      <td className="border border-gray-400">{index + 1}</td>
                      <td className="border border-gray-400">
                        {providerScope?.name}
                      </td>
                      <td className="border border-gray-400">
                        {" "}
                        {providerScope?.price}
                      </td>
                      <td className="border border-gray-400">
                        {providerScope?.unit}
                      </td>
                      <td className=" border border-gray-400">
                        {correspondingCustomerScope?.size}
                      </td>
                      <td className=" border border-gray-400">
                        {totalPrice[index]}
                      </td>
                    </tr>
                    
                  );
                })}
                <tr>
                <td className=" border border-gray-400 text-center" colSpan={5}>
                        Total Cost
                      </td>
                      <td className=" border border-gray-400">
                       {sum}
                      </td>
                </tr>
              </tbody>
            </table>

           
          </div>

          <p className="font-bold mb-1">Files or Images</p>
          <div className="grid grid-cols-2 gap-5 mb-5 ">
            {order?.images.map((image) => {
              return (
                <img
                  src={image.url}
                  alt=""
                  key={image.id}
                  className="w-full h-[200px] object-cover my-2  box-border"
                />
              );
            })}
          </div>
          <div className="mb-4">
            <strong >Delivery Location:</strong> <span className="ml-3">{order?.delivery_location}</span>
          </div>
          <div className="mb-4">
            <strong >Special Requirements</strong> <span></span>
            <p className="mt-2">{order?.requirements}</p>
          </div>
        </section>

      
       

        
       
      </>
  );
};

export default orderDetails;
