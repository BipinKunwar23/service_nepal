import React, { useState } from 'react'
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
const ServiceFaqs = ({faqs}) => {
  const [faqIndex, setFaqIndex] = useState();

  return (
   <>
   <h2 className="font-semibold mb-3">FAQS </h2>

<ul>
  {faqs?.map((faq) => {
    return (
      <li className="border mb-2 p-3 " key={faq?.id}>
        <h2 className=" flex justify-between mb-2">
          <span>{faq?.question}</span>
          <span
            className="text-2xl font-thin cursor-pointer"
            onClick={() => {
              faqIndex === faq?.id
                ? setFaqIndex(null)
                : setFaqIndex(faq?.id);
            }}
          >
            {faqIndex === faq?.id ? (
              <FaChevronDown />
            ) : (
              <FaChevronUp />
            )}
          </span>
        </h2>
        {faqIndex === faq?.id && (
          <p className="text-gray-600 text-[0.9em]">{faq?.answer}</p>
        )}
      </li>
    );
  })}
</ul>
   </>
  )
}

export default ServiceFaqs