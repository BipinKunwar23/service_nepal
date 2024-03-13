import React, { useEffect, useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { useUpdateStatusMutation } from "../../../api/buyer/progressApi";
import Loader from "../../../components/Loader";
import { useLocation, useNavigate, useParams } from "react-router-dom";
const UpdateStatus = ({ status }) => {
  const { register, control, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      scopes: [],
      completedWorks: [],

      originalValues: [],
      materials: status?.progress?.materials || [
        {
          name: "",
          cost: "",
        },
      ],
      payment_due_date: status?.progress?.payment_due_date,
      payment_method: status?.progress?.payment_method || [],
      delivery_charge: status?.progress?.delivery_charge,
      additional_charge: status?.progress?.additional_charge,
      emergency_charge: status?.progress?.emergency_charge,
      discount: status?.progress?.discount,

      esewa: status?.progress?.esewa,
      total_charge: null,
    },
  });
  const { orderId } = useParams();

  console.log("data", status);


  const [newCompletedTask, setNewCompletedTask] = useState([]);
  const [completedTask, setCompletedTask] = useState([]);
  const [upcomingTasks, setUpcomingTasks] = useState([]);
  const [online, setOnline] = useState(false);
  const [completed, setCompleted] = useState(false);

  const { fields, append, remove } = useFieldArray({
    name: "materials",
    control,
  });

  useEffect(() => {
    if (status) {
      const tasks = status?.progress?.ordered_works.filter((order) => {
        const progress_task = status?.progress?.completed_works.find(
          (progress) => progress?.id === order?.id
        );

        return order?.size !== progress_task?.work;
      });
      setUpcomingTasks(tasks);

      setCompleted(
        status?.progress?.current_status === "Completed" ? true : false
      );

      setCompletedTask(status?.progress?.completed_works);

      setOnline(status?.progress?.payment_method.includes("Online"));

    
    }
  }, [status, completedTask]);
  console.log("completedtask", completedTask);

  const scopes = watch("scopes");
  console.log("selected", scopes);
  const originalValues = watch("originalValues");
  console.log("original", originalValues);

  let service_charge = 0;

  if (status || scopes) {
    status?.progress?.ordered_works?.map((order) => {
      const correspondingScope = scopes.find((cs) => cs.id === order.id);
      const completed_works = status?.progress?.completed_works.find(
        (cw) => cw.id === order.id
      );

      const order_scopes = status?.scopes.find((os) => os.id === order.id);

      service_charge += correspondingScope?.work
        ? correspondingScope?.work * order_scopes?.price
        : completed_works?.work
        ? completed_works?.work * order_scopes?.price
        : 0;
    });
  }

  const location = useLocation();
  const navigate = useNavigate();

  const [upcomingTask, setUpcomingTask] = useState([]);
  const [selectedFile, setSelectedFile] = useState();

  const [updateStatus, { isLoading: isCreating }] = useUpdateStatusMutation();

  const handleCompletedTask = (e, id) => {
    const { checked } = e.target;
    if (checked) {
      setNewCompletedTask([...newCompletedTask, id]);
    } else {
      const updatedTask = newCompletedTask.filter((ct) => ct !== id);
      setNewCompletedTask(updatedTask);
    }
  };

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
      setValue(`completedWorks[${index}].work`, completed?.work || 0);
    }
  };

  console.log("upcoming", upcomingTasks);

  const handleUpcomingTask = (e, id) => {
    const { checked, value } = e.target;
    if (checked) {
      setUpcomingTask([...upcomingTask, id]);
    } else {
      const updatedTask = upcomingTask.filter((ut) => ut !== id);
      setUpcomingTask(updatedTask);
    }
  };

  const [qrcode, setqrcode] = useState(null);

  let material_cost = 0;
  const materials = watch("materials");
  console.log('materials',materials);
  materials.forEach((material) => {
    material_cost += parseInt(material?.cost ? material?.cost : 0);
  });
  console.log("material", material_cost);

  const delivery_charge = watch("delivery_charge");
  const additonal_charge = watch("additional_charge");
  const discount = watch("discount");
  const emergency_charge = watch("emergency_charge");

  let total_cost =
    service_charge +
    parseInt(delivery_charge || 0) +
    parseInt(emergency_charge || 0) +
    material_cost;
  console.log("totlacost", total_cost);
  let after_discount =
    total_cost - (total_cost * parseInt(discount || 0)) / 100;
  let after_additonal =
    after_discount - (after_discount * parseInt(additonal_charge || 0)) / 100;
  console.log("afteradditonal", after_additonal);

  const onSubmit = async (values) => {
    console.log("data", values);

    const formdata = new FormData();
    formdata.append("order_id", orderId);

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
    formdata.append("total_cost", parseInt(after_additonal));

    formdata.append("payment_due_date", values.payment_due_date);
    formdata.append("esewa", values.esewa);
    formdata.append("qrcode", qrcode);
    formdata.append("image", selectedFile);
    formdata.append("additional_notes", values.additional_notes);
    formdata.append("issue_challenge", values.issue_challenge);

    await updateStatus({ formdata, progressId: status?.progress?.id })
      .unwrap()
      .then((response) => {
        console.log("response", response);
        navigate(`${location?.state?.path}`, {replace:true})
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (isCreating) {
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
        <section className="">
          <strong>Work Details</strong>
          <div className="grid grid-cols-2">
            <div className="status-field">
              <h2 className="text-slate-600 font-semibold"> Current Status</h2>
              <div className="flex gap-4">
                <div className="">
                  <input
                    type="radio"
                    {...register("current_status")}
                    value="Running"
                    defaultChecked={
                      status?.progress?.current_status === "Running"
                    }
                    onChange={(e) => {
                      if (e.target.checked) {
                        setCompleted(false);
                      } else {
                        setCompleted(false);
                      }
                    }}
                  />{" "}
                  <label htmlFor="" className="ml-3">
                    Running Work
                  </label>
                </div>

                <div className="">
                  <input
                    type="radio"
                    {...register("current_status")}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setCompleted(true);
                      }
                    }}
                    value="Completed"
                    defaultChecked={
                      status?.progress?.current_status === "Completed"
                    }
                  />{" "}
                  <label htmlFor="" className="ml-3">
                    Completed Work
                  </label>
                </div>
              </div>
            </div>

            {!completed && (
              <>
                <div className="status-field">
                  <label>Expected Completion Date</label>
                  <input
                    type="date"
                    {...register("expected_completion")}
                    defaultValue={status?.progress?.expected_completion}
                  />
                </div>
                <div className="status-field">
                  <label>Service Delay</label>
                  <input
                    type="text"
                    {...register("service_delay")}
                    defaultValue={status?.progress?.service_delay}
                  />
                </div>
                <div className="status-field">
                  <label>Delay Reason</label>
                  <input
                    type="text"
                    {...register("delay_reason")}
                    defaultValue={status?.progress?.delay_reason}
                  />
                </div>
              </>
            )}
          </div>

          <div className=" p-4">
            <h2 className="font-semibold ">New Completed Tasks</h2>
            <table className="table-auto w-full " cellPadding={5}>
              <thead>
                <tr className="text-left">
                  <th>Select</th>
                  <th>Services</th>
                  <th>Works</th>
                  <th>Unit</th>
                  <th>Price</th>

                  <th>Completed</th>
                  <th>Cost</th>
                </tr>
              </thead>
              <tbody>
                {status?.progress?.ordered_works?.map((ordered, index) => {
                  const completed = status?.progress?.completed_works.find(
                    (completed) => {
                      return completed.id === ordered.id;
                    }
                  );
                  const pscopes = status?.scopes.find((scope) => {
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
                                handleCheckboxChange(
                                  e,
                                  index,
                                  ordered,
                                  completed
                                );
                              }}
                              checked={field.value}
                            />
                          )}
                        />
                      </td>

                      <td>{ordered?.name}</td>
                      <td>{ordered?.size}</td>
                      <td>{pscopes?.unit}</td>
                      <td>{pscopes?.price}</td>
                      <td>
                        <Controller
                          control={control}
                          name={`completedWorks.[${index}.work]`}
                          defaultValue={completed?.work}
                          render={({ field }) => {
                            return (
                              <input
                                type="number"
                                readOnly={
                                  !scopes.find((fs) => fs.id === ordered.id)
                                }
                                className="border border-gray-300 p-2 rounded-lg"
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
          <div className="flex flex-col gap-4 p-4 ">
            <h2>Upcoming Tasks</h2>

            {upcomingTasks
              .filter((upcoming) => {
                const selected_scope = scopes.find(
                  (scope) => scope.id === upcoming.id
                );
                return selected_scope?.work !== upcoming?.size;
              })
              .map((task) => {
                return (
                  <div key={task?.id} className=" flex gap-5">
                    <input
                      type="checkbox"
                      defaultChecked={
                        status?.progress?.upcoming_works.includes(task?.id) ||
                        false
                      }
                      onChange={(e) => {
                        handleUpcomingTask(e, task?.id);
                      }}
                      className="ml-1"
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
                      <button
                        className="bg-blue-600 text-white px-4 p-1 rounded-md "
                        type="button"
                        onClick={() => {
                          append({
                            name: "",
                            cost: "",
                          });
                        }}
                      >
                        {" "}
                        Add
                      </button>
                      {index > 0 && (
                        <button
                          className="bg-blue-600 text-white px-4 p-1 rounded-md "
                          type="button"
                          onClick={() => {
                            remove(index);
                          }}
                        >
                          remove
                        </button>
                      )}
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
              <input type="number" value={service_charge} readOnly />
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
                defaultValue={status?.progress?.discount}
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
              <label>Due Amount</label>
              <input
                type="text"
                {...register("paid_amount")}
                defaultValue={status?.progress?.paid_amount}
              />
            </div>
            <div className="status-field">
              <label>Last Due Date</label>
              <input
                type="date"
                {...register("payment_due_date")}
                defaultValue={status?.progress?.payment_due_date}
              />
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
                  <img
                    src={status?.progress?.qrcode}
                    className="h-[150px] w-[200px] object-cover"
                    alt=""
                  />
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
              <textarea
                {...register("additional_notes")}
                rows="2"
                defaultValue={status?.progress?.additional_notes}
              ></textarea>
            </div>
            <div className="status-field">
              <label>Issues and Challenges</label>
              <textarea
                {...register("issue_challenge")}
                rows="2"
                defaultValue={status?.progress?.issue_challenge}
              ></textarea>
            </div>
          </div>
          <div className="flex flex-col status-field">
            <label>Files or Images</label>
            <div className="my-3">
              <img
                src={status?.progress?.image}
                className="h-[150px] w-[200px] object-cover"
                alt=""
              />
            </div>
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
            Update Status
          </button>
        </div>
      </form>
    </section>
  );
};

export default UpdateStatus;
