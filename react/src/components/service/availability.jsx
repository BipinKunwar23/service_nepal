import React from "react";

const Availability = ({user}) => {
  return (
    <section>
      <h2 className="text-lg font-semibold  mb-2">Availability</h2>

      <div className=" grid gap-4 grid-cols-2">
        <div>
          <strong>Location</strong>
          <ul className="border-2 p-2 rounded mt-2 flex gap-2">
            {user?.locations?.map((location) => {
              return <li>{location?.city}</li>;
            })}
          </ul>
        </div>
        <div>
          <strong> Days</strong>
          <ul className="border-2 p-2 rounded mt-2 flex gap-2">
            {user?.availability?.days?.map((day) => {
              return <li>{day}</li>;
            })}
          </ul>
        </div>
        <div>
          <strong> Time</strong>

          <p className="border-2 p-2 rounded mt-2">
            {" "}
            {user?.availability?.time?.start} - {user?.availability?.time?.end}{" "}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Availability;
