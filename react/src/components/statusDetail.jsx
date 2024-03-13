import React from "react";

const StatusDetail = ({ data }) => {
  const totalPrice = [];
  let sum = 0;
  let total_works = 0;
  let total_completed = 0;
  let material_cost = 0;

  return (
    <>
      <div className="view-status">
        <h2 className=" font-semibold mb-3">Status Details</h2>
        <div className="grid grid-cols-2 gap-5">
          <div className="">
            <strong>Order Created</strong>{" "}
            <span>{data?.progress?.created_at}</span>
          </div>
          <div className="">
            <strong>Status Updated</strong>{" "}
            <span>{data?.progress?.updated_at}</span>
          </div>
          <div className="">
            <strong>Order Status</strong>
            <span>{data?.progress?.current_status}</span>
          </div>
          <div className="">
            <strong>Expected Completion Date</strong>{" "}
            <span>{data?.progress?.expected_completion}</span>
          </div>
          <div className="">
            <strong>Service Delay</strong>{" "}
            <span>{data?.progress?.service_delay}</span>
          </div>{" "}
          <div className="">
            <strong>Delay Reason</strong>{" "}
            <span>{data?.progress?.delay_reason}</span>
          </div>{" "}
        </div>
      </div>
      <div className="">
        <h2 className="text-red-600 font-semibold p-2">Work and Payment</h2>

        <div className="mb-4 flex flex-col gap-3 p-6">
          <strong>Service Details</strong>

          <table
            className=" table-fixed bg-white border border-gray-300 "
            cellPadding={7}
          >
            <thead className="text-gray-700">
              <tr className="border border-gray-500">
                <th className="border border-gray-400">S.N</th>
                <th className="border border-gray-400">Service</th>
                <th className="border border-gray-400">Price</th>

                <th className="border border-gray-400">Unit</th>

                <th className="border border-gray-400">Ordered Works</th>
                <th className="border border-gray-400">Completed Works</th>
                <th className="border border-gray-400">Remaining</th>
                <th className="border border-gray-400">Cost</th>
              </tr>
            </thead>
            <tbody className="text-red-600 font-semibold">
              {data?.progress?.completed_works.map((completed, index) => {
                const order_works = data?.progress?.ordered_works.find(
                  (order) => order.id === completed.id
                );
                const correspondingScope = data?.scopes.find(
                  (scope) => scope.id === completed.id
                );
                totalPrice[index] = completed?.work * correspondingScope?.price;
                sum += totalPrice[index];
                total_works += order_works?.size;
                total_completed += completed?.work;

                return (
                  <tr key={completed.id}>
                    <td className="border border-gray-400">{index + 1}</td>
                    <td className="border border-gray-400">
                      {completed?.name}
                    </td>
                    <td className="border border-gray-400">
                      {" "}
                      {correspondingScope?.price}
                    </td>
                    <td className="border border-gray-400">
                      {" "}
                      {correspondingScope?.unit}
                    </td>
                    <td className="border border-gray-400">
                      {" "}
                      {order_works?.size}
                    </td>
                    <td className="border border-gray-400">
                      {completed?.work}
                    </td>

                    <td className=" border border-gray-400">
                      {completed?.work === order_works?.size
                        ? "Completed"
                        : `    ${order_works?.size - completed?.work}`}
                    </td>
                    <td className=" border border-gray-400">
                      {totalPrice[index]}
                    </td>
                  </tr>
                );
              })}
              <tr>
                <td className=" border border-gray-400 text-center" colSpan={7}>
                  Total
                </td>
                <td className=" border border-gray-400">{sum}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="view-staus p-4">
        <h2 className="text-slate-600 font-semibold my-2">
            Upcoming Works
          </h2>
          <ul>
              {
                data?.progress?.upcoming_works.map((upcoming)=>{
                    const ordered_works=data?.progress?.ordered_works.find((order)=>order.id===upcoming)
                    return <li>
                        {ordered_works?.name}
                    </li>
                })
              }
          </ul>
        </div>
        <div className="p-4">
          <h2 className="text-slate-600 font-semibold my-2">
            Materials and Cost
          </h2>
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="border border-gray-400 py-3 px-2">S.N</th>
                <th className="border border-gray-400 py-3 px-2">Material</th>
                <th className="border border-gray-400 py-3 px-2">Cost</th>
              </tr>
            </thead>
            <tbody>
              {data?.progress?.materials.map((material, index) => {
                material_cost += parseInt(material.cost);
                return (
                  <tr key={material.id}>
                    <td className="border border-gray-400 py-3 px-2">
                      {index + 1}
                    </td>
                    <td className="border border-gray-400 py-3 px-2">
                      {material.name}
                    </td>
                    <td className="border border-gray-400 py-3 px-2">
                      {material.cost}
                    </td>
                  </tr>
                );
              })}
              <tr>
                <td
                  className="border border-gray-400 py-3 px-2 text-center"
                  colSpan={2}
                >
                  Total
                </td>
                <td className="border border-gray-400 py-3 px-2">
                  {material_cost}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="view-status">
          <div className="grid grid-cols-2 gap-5">
            <div className=" ">
              <strong>Overall Progress</strong>
              <span className="">
                {" "}
                {parseInt((total_completed / total_works) * 100)}{" "}
                <span className="">%</span>
              </span>
            </div>{" "}
            <div className="">
              <strong>Delivery Charge</strong>
              <span> {data?.progress?.delivery_charge}</span>
            </div>{" "}
            <div className="">
              <strong>Emergency Charge</strong>
              <span> {data?.progress?.emergency_charge}</span>
            </div>{" "}
            <div className="">
              <strong>Additonal Charge</strong>
              <span> {data?.progress?.additional_charge} %</span>
            </div>{" "}
            <div className="">
              <strong>Discount Amount</strong>
              <span> {data?.progress?.discount} %</span>
            </div>{" "}
            <div className="">
              <strong>Overall Cost</strong>
              <span> {parseInt(data?.progress?.total_cost)}</span>
            </div>{" "}
            {data?.progress?.payment_due_date && (
              <div className="">
                <strong>Paymnet Due Date</strong>{" "}
                <span>{data?.progress?.payment_due_date}</span>
              </div>
            )}
            <div className="">
              <strong>Due Amount</strong>{" "}
              <span>{data?.progress?.paid_amount || 0}</span>
            </div>{" "}
            {data?.progress?.paid_amount && (
              <div className="">
                <strong>Remaining Amount</strong>{" "}
                <span>
                  {data?.progress?.total_cost - data?.progress?.paid_amount}
                </span>
              </div>
            )}
            <div className="">
              <strong> Status</strong>{" "}
              <span>
                {data?.progress?.payment_paid
                  ? data?.progress?.payment_paid === paid_amount
                    ? "Full Payment"
                    : "Partial Payment"
                  : "No Payment"}
              </span>
            </div>{" "}
            <div className="">
              <strong>Payment Method</strong>
              <ul className="text-green-600 font-semibold flex gap-5">
                {data?.progress?.payment_method.map((method) => (
                  <li>{method}</li>
                ))}
              </ul>
            </div>
            {data?.progress?.payment_method.includes("Online") && (
              <>
                <div className="">
                  <strong>Esewa Number</strong>{" "}
                  <span>{data?.progress?.esewa}</span>
                </div>
                <div className="">
                  <strong>QR Code</strong>{" "}
                  <img
                    src={data?.progress?.qrcode}
                    alt=""
                    className="h-[150px] w-[300px] object-cover"
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="view-status">
        <h2>Other Information</h2><div className="gap-5">

        <div className="">
          <strong> Issues and Challenges</strong>{" "}
          <span>{data?.progress?.issue_challenge}</span>
        </div>{" "}
        <div className="">
          <strong>Additional Notes</strong>{" "}
          <span>{data?.progress?.additional_notes}</span>
        </div>{" "}
        <div className="">
          <strong>Images </strong>
            <img
              src={data?.progress?.image}
              alt=""
              className="h-[150px] w-[300px] object-cover"
            />
        </div>
        </div>

      </div>
    </>
  );
};

export default StatusDetail;
