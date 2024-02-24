import React from "react";
import { useForm } from "react-hook-form";
import { useAddServicePriceMutation } from "../../../../api/seller/serviceApi";
import Loader from "../../../../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { setStepCount, setSteps } from "../../../../redux/sellerSlice";

const Pricing = () => {
  
  const serviceId = useSelector((state) => state.sellerSlice.serviceId);
  console.log('serviceId',serviceId);
  const dispatch = useDispatch();
  const steps = useSelector((state) => state.sellerSlice.steps);

  const [addServicePrice,{isLoading}]=useAddServicePriceMutation()
  const { register, handleSubmit, control, setValue, watch } = useForm({
    defaultValues: {
      additional:{
        service:'',
        price:'',

      },
      basic:{
       name:'',
       features:'',
       price:'',
       size:'',
       numbers:'',
       materials:'',
       finishing:'',
       revision:0,



      },
      standard:{
        name:'',
        features:'',
        price:'',
        size:'',
        numbers:'',
        materials:'',
        finishing:'',
        revision:0,
      },
      premium:{
        name:'',
       features:'',
       price:'',
       size:'',
       numbers:'',
       materials:'',
       finishing:'',
       revision:0,
      }
    },
  });
 
  const onSubmit = async (values) => {
    console.log("data", values);
    await addServicePrice({serviceId, ...values})
      .unwrap()
      .then((response) => {
        console.log('response',response);
        dispatch(setStepCount(3));

        const updatedSteps = [...steps];

      const stepIndex = updatedSteps.findIndex((step) => step.id === 3);

      updatedSteps[stepIndex] = { ...updatedSteps[stepIndex], show: true };
      dispatch(setSteps(updatedSteps));
      
        // navigate(`${location?.state?.path} `, { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
      
  };
  if(isLoading){
    return <Loader/>
  }
  return (
    <section className="bg-white p-4  ">
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <table className=" auto w-full ">
          <thead>
            <tr className=" text-left price-table">
              <th></th>
              <th>Basic</th>
              <th>Standard</th>
              <th>Premium</th>
            </tr>
          </thead>
          <tbody>
            <tr className="price-table ">
              <td></td>
              <td className="">
                <input type="text" placeholder="Package Name" {...register('basic.name')}/>
              </td>
              <td className="">
                <input type="text" placeholder="Package Name"{...register('standard.name')} />
              </td>
              <td className="">
                <input type="text" placeholder="Package Name" {...register('premium.name')}/>
              </td>
            </tr>
            <tr className="price-table ">
              <td></td>
              <td className="">
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="2"
                  placeholder="Package Description"
                  {...register('basic.features')}
                ></textarea>
              </td>
              <td className="">
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="2"
                  placeholder="Package Description"
                  {...register('standard.features')}
                ></textarea>
              </td>
              <td className="">
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="2"
                  placeholder="Package Description"
                  {...register('premium.features')}
                ></textarea>
              </td>
            </tr>
            <tr className="price-table ">
              <td className="font-bold">Price</td>
              <td className="">
                <input type="text" placeholder="Rs" {...register('basic.price')}/>
              </td>
              <td className="">
                <input type="text" placeholder="Rs" {...register('standard.price')} />
              </td>
              <td className="">
                <input type="text" placeholder="Rs" {...register('premium.price')} />
              </td>
            </tr>
            <tr className="price-table ">
              <td className="font-bold">Size</td>
              <td className="">
                <input type="text" {...register('basic.size')}/>
              </td>
              <td className="">
                <input type="text" {...register('standard.size')} />
              </td>
              <td className="">
                <input type="text" {...register('premium.size')}/>
              </td>
            </tr>
            <tr className="price-table ">
              <td className="font-bold">NUmbers</td>
              <td className="">
                <input type="text" {...register('basic.numbers')}/>
              </td>
              <td className="">
                <input type="text" {...register('standard.numbers')} />
              </td>
              <td className="">
                <input type="text" {...register('premium.numbers')}/>
              </td>
            </tr>
            <tr className="price-table ">
              <td className="font-bold">Materials</td>
              <td className="text-center ">
              <input type="text" {...register('basic.materials')} />

              </td>
              <td className="text-center">
              <input type="text" {...register('standard.materials')} />

              </td>
              <td className="text-center">
              <input type="text" {...register('premium.materials')} />

              </td>
            </tr>
            <tr className="price-table ">
              <td className="font-bold">Revision</td>
              <td className="text-center ">
              <input type="text" {...register('basic.revision')} />

              </td>
              <td className="text-center">
              <input type="text" {...register('standard.revision')} />

              </td>
              <td className="text-center">
              <input type="text" {...register('premium.revision')} />

              </td>
            </tr>
         
            <tr className="price-table ">
              <td className="font-bold">Finishing</td>
              <td className="">
                <input type="text" {...register('basic.finishing')}/>
              </td>
              <td className="">
                <input type="text" {...register('standard.finishing')} />
              </td>
              <td className="">
                <input type="text" {...register('premium.finishing')}/>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="price-tags">
          <div>
            <h2>Delivery Charge</h2>
          </div>
          <div>
            <input type="text" placeholder="Rs"  {...register('delivery')}/>
          </div>
        </div>
        <div className="price-tags">
          <div>
            <h2>Repairing Charge</h2>
          </div>
          <div>
            <input type="text" placeholder="Rs" {...register('repairing')} />
          </div>
        </div>
        <div className="price-tags">
          <div>
            <h2>Additonal Service</h2>
          </div>
          <div className="flex gap-5">
            <input type="text" placeholder="Extra Service" {...register('additional.service')}/>
            <input type=" " placeholder="Rs" {...register('additional.price')} />
          </div>
        </div>
        <div className="price-tags">
          <div>
            <h2>Emergency Charge</h2>
          </div>
          <div className="">
            <input type="text" placeholder="Rs" {...register('emergency')} />
          </div>
        </div>
        <div className="price-tags">
          <div>
            <h2>Refund Amount</h2>
          </div>
          <div className="flex gap-5">
            <input type=" " placeholder="Rs" {...register('refund')} />
          </div>
        </div>
        <div className=" grid grid-cols-3 gap-10 ">
          <button type="submit" className="bg-blue-600 p-2 px-4 rounded-lg text-white col-start-2 mt-5">
           Save and  Continue
          </button>
        </div>
     
      </form>
    </section>
  );
};

export default Pricing;
