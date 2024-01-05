import React from 'react'
import { useNavigate } from 'react-router-dom';

const AllCards = ({cards}) => {
    const navigate=useNavigate()
  console.log('service',cards);

  return (
    <section className="  grid grid-cols-3 gap-5 grid-flow-row  px-5  font-sans  ">
    {cards &&
      cards.map((card) => {
        return (
          <div
            key={card.id}
            className=" bg-white p-3  rounded-xl transition-all text-center hover:scale-105 shadow-lg shadow-gray-600  hover:cursor-pointer "
           

          >
            <div className=" h-[250px]  box-border bg-white ">
              <img
                src={card?.image} 
                className=" w-full h-full object-cover rounded-lg "
              />
            </div>
            <div className=" p-1  w-full  ">

           
          
            <div className="   text-center">
            <div className="text-lg font-semibold text-green-600 bg-white ">
              {card?.name}
            </div>
              <ul className="flex flex-col gap-1 text-gray-600 text-center p-2 ">
                {card?.category?.map((service) => {
                  return (
                    <li key={service?.id} className="font-semibold ml-2 text-center text-[1em]">
                       <button
                  className="border-2 border-orange-600 bg-[rgba(0,0,0,0.8)] text-white font-bold p-2 px-8 rounded-full  w-full "
                  type="button"
                  onClick={() => {
                    navigate(`/provider/${card?.id}/category/${service?.id}`);
                  }}
                >
                  {service?.profession}
                </button>
                    </li>
                  );
                })}
              </ul>
              
            </div>
            

            </div>
          </div>
        );
      })}
  </section>
  )
}

export default AllCards