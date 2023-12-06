import React from "react";

const Status = () => {
  return (
    <section className="grid  place-content-center bg-slate-300 p-3 ">
      <section className="selected-service">
        <form action="">
          <div>
            <p>Availability</p>
            <div>
            <div className="selected-field">
                <label htmlFor="">Available From (Possible Date)</label>
                <input type="date" />
              </div>
              <div className="selected-field">
              <label htmlFor="">Available Time</label>
                <input type="text" />
              </div>
              <div className="selected-field">
                <label htmlFor="">  Completion On (Possible Date)</label>
                <input type="date" />
              </div>
              <div className="selected-field">
                <label htmlFor="">Required Duration (Possible)</label>
                <input type="text" />
              </div>
              <div className="selected-field">
                <label htmlFor="">Delay(Possible)</label>
                <input type="text" />
              </div>
              <div className="selected-field">
                <label htmlFor="">Reason(Delay)</label>
                <input type="text" />
              </div>
           
            </div>
          </div>
          <div>
            <p>Price</p>
            <div>
              <div className="selected-field">
                <label htmlFor="">Delivery Charge</label>
                <input type="text" />
              </div>
              <div className="selected-field">
                <label htmlFor="">Service Charge(Basic)</label>
                <input type="text" />
              </div>
              <div className="selected-field">
                <label htmlFor="">Work Load (Service Amount)</label>
                <input type="text" />
              </div>
              <div className="selected-field">
                <label htmlFor="">Total Charge</label>
                <input type="text" />
              </div>
              <div className="selected-field">
                <label htmlFor="">Discount Amount</label>
                <input type="text" />
              </div>
              <div className="selected-field">
                <label htmlFor="">Additonal Amount</label>
                <input type="text" />
              </div>
              <div className="selected-field">
                <label htmlFor="">Emergency Charge</label>
                <input type="text" />
              </div>
            </div>
          </div>
          <div>
            <p>Payment</p>
            <div>
              <div className="selected-field">
                <label htmlFor="">Advance Payment</label>
                <input type="text" />
              </div>
              <div className="selected-field">
                <label htmlFor=""> Payment Method</label>
                <input type="text" />
              </div>
              <div className="selected-field">
                <label htmlFor="">Payment Time</label>
                <input type="text" />
              </div>
              <div className="selected-field">
                <label htmlFor="">Account Name</label>
                <input type="text" />
              </div>
              <div className="selected-field">
                <label htmlFor="">Account Number</label>
                <input type="text" />
              </div>
              
            </div>
          </div>
          <div>
            <p>Refund Policy</p>
            <div>
              <div className="selected-field">
                <label htmlFor=""> Description</label>
                <input type="text" />
              </div>
              <div className="selected-field">
                <label htmlFor="">Refundable Amount</label>
                <input type="text" />
              </div>
            </div>
          </div>
          <div>
            <p>Terms and Codition</p>
            <div>
              <div className="selected-field">
                <label htmlFor=""> Material</label>
                <input type="text" />
              </div>
              <div className="selected-field">
                <label htmlFor=""> Payment</label>
                <input type="text" />
              </div>
              <div className="selected-field">
                <label htmlFor=""> Prequisites</label>
                <input type="text" />
              </div>
            </div>
          </div>
          <div>

          </div>
          <div>
            <p>Tracking Service</p>
            <div className="selected-field">
                <label htmlFor="">Confirmation Time</label>
                <input type="text" />
              </div>
           
          <div className="selected-field">
                <label htmlFor="">Response Time</label>
                <input type="text" />
              </div>
              <div className="selected-field">
                <label htmlFor=""> Status Update</label>
                <input type="text" />
              </div>
          </div>
          <div>
            <p>Qualiry Assurance</p>
            <div>
                
            <div className="selected-field">
                <label htmlFor=""> Acheivement</label>
                <input type="text" />
              </div>
              <div className="selected-field">
                <label htmlFor=""> Limitation</label>
                <input type="text" />
              </div>
              <div className="selected-field">
                <label htmlFor=""> Risks</label>
                <input type="text" />
              </div>
              <div className="selected-field">
                <label htmlFor=""> Service Waranty</label>
                <input type="text" />
              </div>
          
            </div>
          </div>
          <div>
          <p>Reference </p>
            <div>
                
            <div className="selected-field">
                <label htmlFor=""> Name</label>
                <input type="text" />
              </div>
              <div className="selected-field">
                <label htmlFor=""> Contact</label>
                <input type="text" />
              </div>
              
          
            </div>
          </div>
        
          <div>
            <p>Ask Questions</p>
            <div>
              <div className="selected-field">
                <label htmlFor=""> Question1</label>
                <input type="text" />
              </div>
              
            </div>
          </div>
        </form>
      </section>
    </section>
  );
};

export default Status;
