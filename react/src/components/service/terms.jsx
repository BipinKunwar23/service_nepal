import React from 'react'

const ServiceTerms = ({requirements}) => {
  return (
   <>
    <div>
            <h2 className="font-semibold mb-2">Special Notes</h2>
            <p>{requirements?.note}</p>
          </div>
          <div>
            <h2 className="font-semibold mb-2">Terms and Requirements</h2>
            <ol className="list-disc">
              {requirements?.term?.map((req,index) => (
                <li className="ml-5" key={index}>{req?.requirement}</li>
              ))}
            </ol>
          </div>
   </>
  )
}

export default ServiceTerms