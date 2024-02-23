import React from 'react'

export default function Price() {
  return (
    <div>
        
        <div>
          <select name="" id="">
            <option value="">Select Price Type</option>
            <option value="">Minimun Charge</option>
            <option value="">Price Structure</option>
            <option value="">Package</option>
          </select>
        </div>
        <div>
          <label htmlFor="">Minimum Charge</label>
          <input type="text" />
        </div>
        <div>
          <div className="flex">
            <input type="checkbox" />
            <p>Price Model</p>
            <p>Price</p>
          </div>
          <div>
            <input type="checkbox" />

            <label htmlFor="">Hourly</label>
            <input type="text" />
          </div>
          <div>
            <input type="checkbox" />

            <label htmlFor="">Daily</label>
            <input type="text" />
          </div>
          <div>
            <input type="checkbox" />

            <label htmlFor="">After Task Completion</label>
            <input type="text" />
          </div>
          <div>
            <input type="checkbox" />

            <label htmlFor="">One TIme Cost</label>
            <input type="text" />
          </div>
        </div>
        <div>
          <div className="flex">
            <p>Packages</p>
            <p>Price</p>
          </div>
          <div className=" flex gap-2">
            <input type="text" />
            <input type="text" />
          </div>
        </div>
        <div>
          <select name="" id="">
            <option value="">Select Additional Charge Type</option>
            <option value="">Discuss After Meeting</option>

            <option value="">Fixed Alredy beofre service providing</option>
            <option value=""></option>
          </select>
        </div>
        <div>
         <label htmlFor="">Addional Charge</label>
         <input type="text" />
        </div>
        <table>
          <thead>
            <th>Services</th>
            <th>Price</th>
        
            </thead>
            </table>
            </div>
  )
      }