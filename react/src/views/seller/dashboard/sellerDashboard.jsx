import React, { useEffect, useState } from "react";
import Sidebar from "../home/sidebar";
import SellerNavbar from "../home/seller-navbar";
import Chart from "react-apexcharts";
import DonutStatus from "./donutStatus";
import DonutChart from "./donut";

import {
  useGetStatisticDataQuery,
  useGetOrderLocationQuery,
  useGetDonutDataQuery,
} from "../../../api/seller/orderApi";
import Loader from "../../../components/Loader";
import { FaClipboardList } from "react-icons/fa";
import { IoPeople } from "react-icons/io5";
import { GiMoneyStack } from "react-icons/gi";
import DonutCity from "./donutCity";

const sellerDashboard = ({ children }) => {
  const { data: values, isLoading } = useGetStatisticDataQuery();
  const { data: locations, isLoading: isLocation } = useGetOrderLocationQuery();

  const [selected_location, setLocations] = useState([]);

  useEffect(() => {
    if (locations && locations.length > 0) {
      setLocations([...selected_location, locations[0].id]);
    }
  }, [locations]);
  console.log("selected_value", selected_location);

  if (isLoading || isLocation) {
    return <Loader />;
  }
  return (
    <>
    <h2 className="text-lg font-semibold mb-6 ">Dashboard</h2>
    
    <section className="  flex gap-2 ">
      <div className=" w-[70%]">
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
          <div className="bg-pink-500">
            <div>
              <p className="flex justify-between">
                <span>Orders</span>
                <i className="">
                  <FaClipboardList />
                </i>
              </p>
              <span>{values?.order_count}</span>
            </div>
          </div>
          <div className="bg-indigo-500">
            <div>
              <p className="flex justify-between">
                <span> Clients</span>
                <i className="">
                  <IoPeople />
                </i>
              </p>
              <span>{values?.unique_client}</span>
            </div>
          </div>
          <div className="bg-blue-500">
            <div>
              <p className="flex justify-between">
                <span>Earnings</span>
                <i className="">
                  <GiMoneyStack />
                </i>
              </p>
              <span>Rs {values?.earning}</span>
            </div>
          </div>
        </div>
        <div className="">
            <Chart
            
              options={{
            
                title: {
                  text: "Revenue",
                  style: {
                    fontSize: 20,
                  },
                },
                colors: ["#9DCBE0"],
                stroke: {
                  width: 2,
                  curve: "smooth",
                },
                fill: {
                  opacity: 1,
                },
                xaxis: {
                  type: "datetime",
                
                },
               
               
                chart: {
                  offsetY: 50,
                  toolbar:{
                    show:false
                  },
                  background:"#D7E6F5"
                
             
              },
              grid:{
                show:false
              }
              
              }}
              series={[
                {
                  name: "Revenue",
                  data: values?.revenue,
                },
              ]}
              type="area"
              width={740}
              height={360}
            />
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
      </div>  */}
      </div>
      <div className="space-y-5 flex-1 bg-white ">
        <div>
          {selected_location.length === 1 ? (
            <DonutStatus locationId={selected_location[0]} />
          ) : selected_location.length > 1 ? (
            <DonutCity locations={selected_location} />
          ) : (
            <DonutChart />
          )}
        </div>
        <div>
          <ul className=" ">
            <li className="flex gap-4 bg-slate-100 p-2">
              <input
                type="checkbox"
                checked={locations.length===selected_location.length}
                onChange={(e) => {
                  if (e.target.checked) {
                    const updatedValue = locations.map((element) => element.id);
                    setLocations(updatedValue);
                  } else {
                    setLocations([locations[0]?.id]);
                  }
                }}
              />
              <span className="font-semibold">City</span>
            </li>
            {locations?.map((location) => {
              return (
                <li className="flex gap-4 p-2 text-[0.9em]" key={location.id}>
                  <input
                    type="checkbox"
                    value={location.id}
                    checked={selected_location.some((id) => id === location.id)}
                    onChange={(e) => {
                      console.log("value", e.target.value);
                      if (e.target.checked) {
                        const updated_value = [
                          ...selected_location,
                          location.id,
                        ];
                        setLocations(updated_value);
                      } else {
                        if (selected_location.length > 1) {
                          const updated_value = selected_location.filter(
                            (id) => id !== location.id
                          );
                          console.log("updated", updated_value);
                          setLocations(updated_value);
                        }
                      }
                    }}
                  />
                  <button>{location?.city}</button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
    </>

  );
};

export default sellerDashboard;
