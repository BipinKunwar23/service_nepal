import React from "react";
import { FaCheck } from "react-icons/fa";

const ViewPackage = ({
  packages,
  standards,
  quantity,
  cost,
  gallery = [],
  title,
  description,
}) => {
  console.log("gallery", gallery[0]?.image);

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <div className="">
          <img
            src={`http://localhost:8000/${description?.image}`}
            alt=""
            className="h-[80px] w-[160px] object-cover object-left-top"
          />
        </div>

        <div>
          <p className="text-[1.3em] font-semibold text-slate-600">{title}</p>
        </div>
      </div>
      {packages ? (
        packages.map((packageData) => {
          return (
            <div
              className=" flex flex-col gap-5 text-gray-700 "
              key={packageData?.id}
            >
              <div className="">
                <div className="">
                  <div className="flex justify-between ">
                    <p className=" font-semibold mb-3">
                      {packageData?.name?.toUpperCase()}
                    </p>
                    <span className="text-gray-500 text-lg">
                      Rs {packageData?.price}
                    </span>
                  </div>
                  <p className="text-slate-400">{packageData?.description}</p>
                  <div className="mt-3"></div>
                </div>

                <div>
                  <h2 className="text-gray-600  text-[1.1em] mb-2 font-semibold">
                    Package Includes
                  </h2>
                  <ol className="space-y-2 text-[1em] text-gray-500">
                    {standards?.map((standard) => {
                      const value_id = packageData?.standards.find(
                        (item) => item?.id === standard?.id
                      )?.pivot?.value_id;
                      if (value_id) {
                        const value = standard?.values.find(
                          (item) => item?.id === value_id
                        );
                        return (
                          <li key={standard?.id} className="flex gap-3 ">
                            <i className="text-[0.8em] grid content-center">
                              <FaCheck />
                            </i>{" "}
                            <span>{standard?.name}</span>{" "}
                            <span>{value?.name}</span>
                          </li>
                        );
                      }
                      return (
                        <li key={standard?.id} className="flex gap-3">
                          {" "}
                          <i className="text-[0.8em] grid content-center">
                            <FaCheck />
                          </i>{" "}
                          <span>{standard?.name}</span>
                        </li>
                      );
                    })}
                  </ol>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div>
          <p className="mb-3">{description?.description}</p>
          <div className="flex justify-between font-semibold">
          <h2 className="">Service fee</h2>
          <span className="text-gray-700">NPR {description?.price}</span>
          </div>
        </div>
      )}
      <div className="space-y-3">
        <div className="flex justify-between font-semibold">
          <h2 className="text-black">Service Quantity</h2>
          <span className="text-gray-700">{quantity}</span>
        </div>
        <div className="flex justify-between font-semibold">
          <h2 className="text-black">Total Cost</h2>
          <span className="text-gray-700">NPR {cost}</span>
        </div>
      </div>
    </div>
  );
};

export default ViewPackage;
