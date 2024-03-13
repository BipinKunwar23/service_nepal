import React from 'react'
import { FaCheck } from "react-icons/fa";

const PricePackage = ({standards,service_packages}) => {
    const packages = [
        {
          name: "basic",
        },
        {
          name: "standard",
        },
        {
          name: "premium",
        },
      ];
    
      const common_standards = [
        {
          id: 1,
          name: "Name ",
          register: "name",
        },
        {
          id: 2,
          name: " Description",
          register: "description",
        },
        {
          id: 3,
          name: "Price",
          register: "price",
        },
      ];
  return (
    <>
    <h2 className="font-semibold mb-3">Compare Packages</h2>
          <div className=" ">
            <table className="w-full auto">
              <thead>
                <tr className=" text-left price-table">
                  <th>Package</th>
                  <th>Basic</th>
                  <th>Standard</th>
                  <th>Premium</th>
                </tr>
              </thead>
              <tbody>
                {common_standards.map((common) => (
                  <tr className="price-table " key={common?.id}>
                    <td className="font-semibold">{common?.name}</td>

                    {packages?.map((pkg, index) => {
                      const data = service_packages[index][common?.register];
                      return <td key={pkg?.name}>{data}</td>;
                    })}
                  </tr>
                ))}

                {standards?.map((standard) => {
                  if (standard?.values?.length > 0) {
                    return (
                      <tr key={standard?.id} className="price-table ">
                        <td className="font-bold">{standard?.name}</td>

                        {packages?.map((pkg, index) => {
                          const value_id = service_packages[
                            index
                          ]?.standards.find((item) => item?.id === standard?.id)
                            ?.pivot?.value_id;
                          const value = standard?.values.find(
                            (item) => item?.id === value_id
                          );

                          return (
                            <td className="" key={pkg?.name}>
                              {value?.name}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  }

                  return (
                    <tr key={standard?.id} className="price-table  ">
                      <td className="font-bold">{standard?.name}</td>

                      {packages?.map((pkg, index) => {
                        const value_id = service_packages[
                          index
                        ]?.standards.find((item) => item?.id === standard?.id)
                          ?.pivot?.value_id;
                        return (
                          <td className="text-center" key={pkg?.name}>
                            {value_id === null ? (
                              <i className="grid justify-center">
                                <FaCheck className="" />
                              </i>
                            ) : (
                              <i className="grid justify-center text-gray-300">
                                <FaCheck />
                              </i>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
    </>
  )
}

export default PricePackage