import React from "react";
import BuyerNavbar from "./../../buyer/home/buyer-navbar";
import { Navigate, useNavigate } from "react-router-dom";

const SellerPage = ({ children }) => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  if (role === "seller") {
    return (
      <Navigate to={`/user/${localStorage.getItem("name")}/seller/dashboard`} />
    );
  }
  return (
    <>
      <BuyerNavbar />
      <section className="   ">
        <div
          className="bg-cover bg-no-repeat bg-center h-[90Vh] flex flex-1"
          style={{ backgroundImage: 'url("/src/images/landingimage.jpg")' }}
        >
          <div className="  text-white bg-[rgba(0,0,0,0.3)] w-full grid place-content-center ">
            <div className="flex flex-col gap-4">
              <p className="text-center text-[4em]  font-bold">Work You Way</p>
              <p className="text-[2em] text-slate-50 font-bold ">
                You bring the skil.We'll make earning easy
              </p>
              <div className="grid place-content-center">
                <button
                  className="bg-green-600 p-2 rounded-md shadow   text-lg w-[300px] text-white"
                  onClick={() => {
                    navigate(
                      `/user/${localStorage.getItem("name")}/seller/guideline`
                    );
                  }}
                >
                  Become A Seller
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SellerPage;
