import React from "react";

const notificationType = () => {
  const types = [
    {
      name: "All Notifications",
      type:""
    },
    {
      name: "Order",
    },
    {
      name: "Rating",
    },
    {
      name: "Email",
    },
    {
      name: "Message",
    },
    {
      name: "Confirmation",
    },
    {
      name: "Events",
    },
    {
      name: "Calender",
    },
    {
      name: "Service",
    },
    {
      name: "Technician",
    },
  ];
  return (
    <div>
      <ul className="space-y-4 p-4 px-8 text-lg  ">
        {
          types?.map((type)=> <li key={type?.name} className="p-2 ">{type?.name}</li>)
        }
      </ul>
    </div>
  );
};

export default notificationType;
