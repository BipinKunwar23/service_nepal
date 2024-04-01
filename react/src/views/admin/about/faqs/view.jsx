import React, { useState } from "react";
import { useViewFaqsQuery } from "../../../../api/admin/aboutApi";
import AddCompanyInfo from "./add";
import AddFaqInfo from "./add";
const ViewFaqs = () => {
  const { data:faqs, isLoading } = useViewFaqsQuery();
  const [show,setShow]=useState(false)
  const [faq, setFaq] = useState({});

  if (isLoading) {
    return <div>Loading Info...</div>;
  }
  if(show){
    return (
        <div className="bg-gray-50 p-6">
            <AddFaqInfo setShow={setShow} data={faq}/>

        </div>
    )
}
  if (!faqs || !faqs.length>0) {
    return (
      <div className="h-screen grid place-content-center">
        <div>
          <button onClick={()=>{
            setShow(true)
          }}>Add Faqs</button>
        </div>
      </div>
    );
  }

  return (
    <>
    
    <div className="space-y-8 p-4 ">
      <div className="flex justify-between border-b py-2">
        <h2 className="text-black text-xl font-semibold">Frequently Asked Questions </h2>
        <button className="text-lg font-semibold"
        onClick={()=>{
          setShow(true)
        }}
        >Add Faq</button>
      </div>
     
      <div className="  mt-2 space-y-4 divide-y-2">
        {faqs?.map((faq) => {
          return (
            <div key={faq?.id} className="  box-border">
              
              <div className="">
              <div className="flex  mt-3 font-semibold text-blue-600">
                <div className="flex-1">
                <h2 className="text-sky-500  font-semibold text-xl mb-2">
                  {faq?.question}
                </h2>
                </div>
                <div className="space-x-5">
                <button
                  onClick={() => {
                    setFaq(faq);
                    setShow(true);
                  }}
                >
                  Edit
                </button>
                <button>Delete</button>

                </div>
              </div>
                
                <p className=" text-lg text-gray-600 ">
                  {faq?.answer}
                </p>
              </div>
              
              
            </div>
          );
        })}
      </div>
    </div>

    </>

  );
};

export default ViewFaqs;
