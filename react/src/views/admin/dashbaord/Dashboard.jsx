import React from "react";

const Dashboard = ({children}) => {
  return (
    <section className=" w-full"> 

      <div className="p-4 ">

      <h2 className="text-lg font-semibold mb-6 ">Dashboard</h2>
      <div className="dashboard-title">
        <div className="bg-green-300">
          <div>
            <h2>Success Score</h2>
            <span>200</span>
          </div>
        </div>
        <div className="bg-orange-300">
          <div className="">
            <h2>Rating</h2>
            <span>200</span>
          </div>
        </div>
        <div className="bg-red-300">
          <div>
            <h2>Response Rate</h2>
            <span>200</span>
          </div>
        </div>
        <div className="bg-pink-300">
          <div>
            <h2>Orders</h2>
            <span>3000</span>
          </div>
        </div>
        <div className="bg-indigo-300">
          <div>
            <h2>Unique Clients</h2>
            <span>4000</span>
          </div>
        </div>
        <div className="bg-blue-300">
          <div>
            <h2>Earnings</h2>
            <span>$ 4000</span>
          </div>
        </div>
      </div>
      <div>
        <h2>Bar Charts</h2>
      </div>
      <div>
        <h2>Recent Activity</h2>

        <ul>
          <li>Tracking Id</li>
          <li>Name</li>
          <li>Activity</li>
          <li>Date</li>
          <li>Action</li>
        </ul>
      </div>
      </div>

    </section>

  );
};

export default Dashboard;
