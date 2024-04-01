import React, { useEffect } from "react";
import Sidebar from "../home/sidebar";
import SellerNavbar from "../home/seller-navbar";
import Chart from 'react-apexcharts'
import { useGetCostByDayQuery } from "../../../api/seller/orderApi";
import Loader from "../../../components/Loader";

const sellerDashboard = ({children}) => {
  const {data:prices,isLoading}=useGetCostByDayQuery()

  useEffect(()=>{
if(prices){
  const totalCostPerDay = [];
 const values= prices.map(entry => {
    const date = entry.date;
    const cost = entry.price;
  return [...totalCostPerDay,[date,cost]]
  });
  console.log('prices',values);

}
  },[prices])
  const data={
    options:{
      annotations: {
        yaxis: [{
          y: 30,
          borderColor: '#999',
          label: {
            show: true,
            text: 'Support',
            style: {
              color: "red",
              background: '#00E396'
            }
          }
        }],
        xaxis: [{
 
          label: {
            show: true,
            text: 'Rally',
            style: {
              color: "red",
              background: '#775DD0'
            }
          }
        }]
      },
      dataLabels: {
        enabled: true
      },
      markers: {
        size: 0,
        style: 'hollow',
      },
      xaxis: {
        type: 'datetime',
      
      },
      tooltip: {
        x: {
          format: 'dd MMM yyyy'
        }
      },
    
     },
      series:[{
        name:'Revenue',
       data: prices
     }]

  }
  if(isLoading){
    return <Loader/>
  }
  return (
    <section className=" w-full"> 

      <div className="">

      <h2 className="text-lg font-semibold mb-6 ">Dashboard</h2>
      <div className="dashboard-title">
        {/* <div className="bg-green-300">
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
        </div> */}
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
      <div className="mt-4">
        <h2 className="text-2xl text-black p-2 font-semibold">Revenue</h2>
        <div className="-z-10 bg-white" >
        <Chart options={data?.options} series={data?.series} type="area" width={600} height={400} z={-10} />
        </div>
      </div>
      {/* <div>
        <h2>Recent Activity</h2>

        <ul>
          <li>Tracking Id</li>
          <li>Name</li>
          <li>Activity</li>
          <li>Date</li>
          <li>Action</li>
        </ul>
      </div> */}
      </div>

    </section>

  );
};

export default sellerDashboard;
