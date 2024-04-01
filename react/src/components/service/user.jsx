import React from "react";

const User = ({ user }) => {
  return (
    <div className=" my-8">
      <div></div>
      <div className={`p-2 grid gap-4 grid-cols-1`}>
        <div className="my-2">
          <h2 className="mb-2 font-semibold text-lg"> Biography</h2>
          <p className="text-gray-600 ">{user?.profile?.bio}</p>
          <div className="mt-3">
            <h2 className="font-semibold"> Skills</h2>
          </div>
        </div>
        <div>
          <h2 className="text-lg font-semibold  mb-2">Contact Details</h2>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <strong>Address</strong>
              <p className="border-2 p-2 rounded mt-2">
                {user?.profile?.address}
              </p>
            </div>
            <div>
              <strong>Phone Number</strong>
              <p className="border-2 p-2 rounded mt-2">
                {user?.profile?.phone_number}
              </p>
            </div>
            <div>
              <strong>Email</strong>
              <p className="border-2 p-2 rounded mt-2">
                {user?.email}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
