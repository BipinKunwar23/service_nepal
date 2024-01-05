import React, { useEffect, useState } from "react";
import { useForm, Controller, useFieldArray, set } from "react-hook-form";
import {
  useWorkStatusMutation,
  useGetCustomerTaskQuery,
} from "../../../../Api/progressApi";
import Loader from "../../../../components/Loader";
import { useLocation, useNavigate, useParams } from "react-router-dom";
const AddStatus = () => {
  const { register, control, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      materials: [
        {
          name: "",
          cost: "",
        },
      ],
      scopes: [],

      payment_method: [],
      delivery_charge: 0,
      additional_charge: 0,
      emergency_charge: 0,
      discount: 0,

      esewa: null,
      total_charge: null,
    },
  });
  const { orderId } = useParams();
  const delivery_charge = watch("delivery_charge");
  const additonal_charge = watch("additional_charge");
  const discount = watch("discount");
  const emergency_charge = watch("emergency_charge");

  const { data, isLoading } = useGetCustomerTaskQuery(orderId);

  const [upcomingTask, setUpcomingTask] = useState([]);
  const [selectedFile, setSelectedFile] = useState();

  const [workStatus, { isLoading: isCreating }] = useWorkStatusMutation();

  const handleUpcomingTask = (e, id) => {
    const { checked, value } = e.target;
    if (checked) {
      setUpcomingTask([...upcomingTask, id]);
    } else {
      const updatedTask = upcomingTask.filter((ut) => ut !== id);
      setUpcomingTask(updatedTask);
    }
  };

  const scopes = watch("scopes");
  console.log("selected", scopes);

  const handleCheckboxChange = (e, index, ordered, completed) => {
    const { checked } = e.target;
    console.log("checked", checked);
    if (checked) {
      setValue("scopes", [
        ...scopes,
        {
          id: ordered?.id,
          work: completed?.work || 0,
        },
      ]);
    } else {
      const updatedScope = scopes.filter(
        (selectedScope) => selectedScope.id !== ordered.id
      );
      setValue("scopes", [...updatedScope]);
      setValue(`completedWorks[${index}].work`, null);
    }
  };

  const { fields, append, remove } = useFieldArray({
    name: "materials",
    control,
  });

  const [completed, setCompleted] = useState(false);

  const [online, setOnline] = useState(false);

  const [qrcode, setqrcode] = useState(null);
  let material_cost = 0;
  const materials = watch("materials");
  materials.forEach((material) => {
    material_cost += parseInt(material?.cost ? material?.cost : 0);
  });

  console.log("materialcost", material_cost);

  let total = 0;

  if (data && scopes) {
    data?.order_works?.map((order) => {
      const correspondingScope = scopes.find((cs) => cs.id === order.id);
      const order_scopes = data?.scopes.find((os) => os.id === order.id);

      total += correspondingScope?.work
        ? correspondingScope?.work * order_scopes?.price
        : 0;
    });
  }
  let total_cost =
    total +
    parseInt(delivery_charge || 0) +
    parseInt(emergency_charge || 0) +
    material_cost;
  let after_discount =
    total_cost - (total_cost * parseInt(discount || 0)) / 100;
  let after_additonal =
    after_discount - (after_discount * parseInt(additonal_charge || 0)) / 100;

    const location=useLocation()
    const navigate=useNavigate();

  const onSubmit = async (values) => {
    console.log("data", values);

    const formdata = new FormData();
    formdata.append("completed_works", JSON.stringify(scopes));
    formdata.append("upcoming_works", JSON.stringify(upcomingTask));
    formdata.append("current_status", values.current_status);
    formdata.append("expected_completion", values.expected_completion);
    formdata.append("service_delay", values.service_delay);
    formdata.append("delay_reason", values.delay_reason);

    formdata.append("materials", JSON.stringify(values.materials));

    formdata.append("delivery_charge", values.delivery_charge);
    formdata.append("emergency_charge", values.emergency_charge);
    formdata.append("additional_charge", values.additional_charge);
    formdata.append("discount", values.discount);

    formdata.append("payment_method", JSON.stringify(values.payment_method));
    formdata.append("total_cost", after_additonal);

    formdata.append("payment_due_date", values.payment_due_date);
    formdata.append("esewa", values.esewa);
    formdata.append("qrcode", qrcode);
    formdata.append("image", selectedFile);
    formdata.append("additional_notes", values.additional_notes);
    formdata.append("issue_challenge", values.issue_challenge);

    await workStatus({ formdata, orderId })
      .unwrap()
      .then((response) => {
        console.log(response);
        navigate(`${location?.state?.path}`, {replace:true})
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (isLoading || isCreating) {
    return <Loader />;
  }

  return (
    <section className=" w-[80Vw]  bg-white  mx-auto shadow  px-10 py-4 ">
      <h2 className="p-4 mb-5 text-center text-lg text-slate-600 border-t-2 border-gray-500 ">
        Work Status Form
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="   mt-4 rounded-lg flex flex-col gap-10 "
      >
        <section className="flex flex-col gap-3">
          <strong>Work Details</strong>
            <div className="grid grid-cols-2">

            <div className="flex gap-4 status-field">
            <h2 className="text-slate-600 font-semibold "> Current Status</h2>

              <div className="flex gap-2">
                <input
                  type="radio"
                  {...register("current_status")}
                  value="Running"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setCompleted(true);
                    } else {
                      setCompleted(false);
                    }
                  }}
                />{" "}
                <label htmlFor="">Running Work</label>
              </div>

              <div className="flex gap-2">
                <input
                  type="radio"
                  {...register("current_status")}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setCompleted(false);
                    }
                  }}
                  value="Completed"
                />{" "}
                <label htmlFor="">Completed Work</label>
              </div>
            </div>

            {completed && (
              <>
                <div className="status-field">
                  <label>Expected Completion Date</label>
                  <input type="date" {...register("expected_completion")} />
                </div>
                <div className="status-field">
                  <label>Service Delay</label>
                  <input type="text" {...register("service_delay")} />
                </div>
                <div className="status-field">
                  <label>Delay Reason</label>
                  <input type="text" {...register("delay_reason")} />
                </div>
              </>
            )}
            </div>

        </section>

        <section className="flex flex-col gap-4 p-4">
          <h2 className="text-slate-600 font-semibold">Task Completion</h2>
          <div className=" ">
          
            <table className="table-auto w-full " cellPadding={5}>
              <thead>
                <tr className="text-left">
                  <th>Select</th>
                  <th>Services</th>
                  <th>Unit</th>
                  <th>Price</th>
                  <th>Works</th>

                  <th>Cost</th>
                </tr>
              </thead>
              <tbody>
                {data?.order_works?.map((ordered, index) => {
                  const pscopes = data?.scopes.find((scope) => {
                    return scope.id === ordered.id;
                  });
                  const correspondingScope = scopes.find(
                    (scope) => scope.id === ordered.id
                  );
                  return (
                    <tr key={ordered?.id}>
                      <td>
                        <Controller
                          control={control}
                          name={`completedWorks[${index}].id`}
                          defaultValue={false}
                          render={({ field }) => (
                            <input
                              type="checkbox"
                              onChange={(e) => {
                                field.onChange(e);
                                handleCheckboxChange(e, index, ordered);
                              }}
                              checked={field.value}
                            />
                          )}
                        />
                      </td>

                      <td>{ordered?.name}</td>
                      <td>{pscopes?.unit}</td>
                      <td>{pscopes?.price}</td>
                      <td>
                        <Controller
                          control={control}
                          name={`completedWorks.[${index}.work]`}
                          render={({ field }) => {
                            return (
                              <input
                                type="number"
                                readOnly={
                                  !scopes.find((fs) => fs.id === ordered.id)
                                }
                                className="py-[0.5em] px-2 border border-gray-400 rounded-lg text-gray-700   focus:outline-blue-500 "
                                {...register(`completedWorks.[${index}.work]`)}
                                onChange={(e) => {
                                  setValue(
                                    `scopes.${index}.work`,
                                    e.target.value
                                  );
                                }}
                              />
                            );
                          }}
                        />
                      </td>
                      <td className="">
                        {correspondingScope?.work
                          ? correspondingScope?.work * pscopes?.price
                          : completed?.work
                          ? completed?.work * pscopes?.price
                          : 0}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-4 ">
            <h2 className="text-slate-600 font-semibold">Upcoming Tasks</h2>

            {data?.order_works
              .filter((upcoming) => {
                const selected_scope = scopes.find(
                  (scope) => scope.id === upcoming.id
                );
                return selected_scope?.work !== upcoming?.size;
              })
              .map((task) => {
                return (
                  <div key={task?.id} className=" flex gap-5 ">
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        handleUpcomingTask(e, task?.id);
                      }}
                    />
                    <label htmlFor="" className="my-3">
                      {task?.name}
                    </label>
                  </div>
                );
              })}
          </div>
        </section>
        <section>
          <strong className=" mb-4 block">Materials and Cost</strong>

          <div className="px-4">
            <div className="grid grid-cols-4 gap-5">
              <label htmlFor="" className="flex flex-col gap-2 col-span-2">
                Name
              </label>
              <label htmlFor="">Cost</label>
            </div>
            {fields.map((field, index) => {
              return (
                <div key={field.id} className="grid grid-cols-4 gap-5 my-3 ">
                  <div className="field  col-span-2">
                    <input
                      type="text"
                      className="p-2 border border-slate-500 rounded-lg focus:outline-blue-600 w-full"
                      {...register(`materials.${index}.name`)}
                    />
                  </div>
                  <div className="field w-[80%] flex flex-col gap-2">
                    <input
                      type="text"
                      className="p-2 border border-slate-500 rounded-lg focus:outline-blue-600"
                      {...register(`materials.${index}.cost`)}
                    />
                  </div>
                  <div className=" ">
                    <div className="flex gap-4">
                      {index > 0 && (
                        <button
                          className="bg-blue-600 text-white px-4 p-1 rounded-md text-3xl"
                          type="button"
                          onClick={() => {
                            remove(index);
                          }}
                        >
                          -
                        </button>
                      )}
                      <button
                        className="bg-blue-600 text-white px-4 p-1 rounded-md text-xl"
                        type="button"
                        onClick={() => {
                          append({
                            name: "",
                            cost: "",
                          });
                        }}
                      >
                        {" "}
                        +
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="grid grid-cols-4 gap-5">
              <strong className="flex flex-col gap-2 col-span-2 w-full text-right">
                Total
              </strong>
              <span htmlFor="">{material_cost}</span>
            </div>
          </div>
        </section>

        <section className="">
          <strong className=" mb-3">Payment and Cash</strong>
          <div className="grid grid-cols-2 gap-4">
            <div className="status-field">
              <label htmlFor=""> Service Charge</label>
              <input type="number" value={total} readOnly />
            </div>
            <div className="status-field">
              <label htmlFor=""> Material Charge</label>
              <input type="number" value={material_cost} readOnly />
            </div>
            <div className="status-field">
              <label htmlFor=""> Delivery Charge</label>
              <input type="number" {...register("delivery_charge")} />
            </div>
            <div className="status-field">
              <label> Emergnecy Charge</label>
              <input type="number" {...register("emergency_charge")} />
            </div>

            <div className="status-field">
              <label htmlFor=""> Discount Amount (Percentage)</label>
              <input
                type="number"
                {...register("discount")}
                placeholder="Discount Percentage %"
               
              />
            </div>
            <div className="status-field">
              <label htmlFor=""> Additioanl charge (Percentage)</label>
              <input
                type="number"
                {...register("additional_charge")}
                placeholder="Additional Charge (%)"
                
              />
            </div>
            <div className="status-field">
              <label htmlFor=""> Total Cost</label>
              <input type="number" value={after_additonal} readOnly />
            </div>

            <div className="status-field">
              <label>Paymnet Due Date</label>
              <input type="date" {...register("payment_due_date")} />
            </div>
            <div className="p-4">
              <h2 className="mb-2 text-slate-600 font-semibold">
                Payment Method
              </h2>
              <div className="flex gap-4 mb-2 ">
                <input
                  type="checkbox"
                  value="On Cash"
                  {...register("payment_method")}
                />
                <label htmlFor=""> On Cash</label>
              </div>
              <div className="flex gap-4 ">
                <input
                  type="checkbox"
                  value="Online"
                  {...register("payment_method")}
                  onChange={(e) => {
                    const { checked } = e.target;
                    console.log("checked", checked);
                    if (checked) {
                      setOnline(true);
                      setqrcode(null);
                    } else {
                      setOnline(false);
                      setValue("esewa", null);
                      setqrcode(null);
                    }
                  }}
                />
                <label htmlFor="">Online</label>
              </div>
            </div>
            {online && (
              <>
                <div className="status-field">
                  <label>Esewa Number</label>
                  <input type="text" {...register("esewa")} />
                </div>
                <div className="status-field">
                  <label>Upload Bank QR Code </label>
                  <input
                    type="file"
                    onChange={(e) => {
                      setqrcode(e.target.files[0]);
                    }}
                  />
                </div>
              </>
            )}
          </div>
        </section>

        <section>
          <strong>Other Information</strong>
          <div className="grid grid-cols-2 gap-4">
            <div className="status-field">
              <label>Additional Notes</label>
              <textarea {...register("additional_notes")} rows="2"></textarea>
            </div>
            <div className="status-field">
              <label>Issues and Challenges</label>
              <textarea {...register("issue_challenge")} rows="2"></textarea>
            </div>
          </div>
          <div className="status-field">
            <label>Files or Images</label>
            <input
              type="file"
              onChange={(e) => {
                setSelectedFile(e.target.files[0]);
              }}
            />
          </div>
        </section>

        <div className="flex justify-center">
          <button
            type="submit"
            className="col-span-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-1/3"
          >
            Save Status
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddStatus;
