import React, { useState } from "react";
import { useViewTeamsQuery } from "../../../../api/admin/aboutApi";
import AddCompanyInfo from "./add";
import AddTeam from "./add";
const ViewTeam = () => {
  const { data: teams, isLoading } = useViewTeamsQuery();
  const [member, setMember] = useState({});
  const [show, setShow] = useState(false);
  const [action, setAction] = useState(false);
  if (isLoading) {
    return <div>Loading Info...</div>;
  }
  if (show) {
    return (
      <div className="bg-gray-50 p-6">
        <AddTeam setShow={setShow} data={member} />
      </div>
    );
  }
  if (!teams || !teams?.length > 0) {
    return (
      <div className="h-screen grid place-content-center">
        <div>
          <button
            onClick={() => {
              setShow(true);
            }}
          >
            Add Members
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-between border-b mt-4 p-4">
        <h2 className="text-black text-3xl p-2">Team Members </h2>
        <button className="text-xl  border p-2"
        onClick={()=>{
          setShow(true)
        }}
        >Add Member</button>
      </div>
      <div className=" p-4  grid gap-6 grid-cols-4">
        {teams?.map((member) => {
          return (
            <div key={member?.id} className=" p-4 box-border">
              <div className="grid place-content-center">
                <img
                  src={`http://localhost:8000/${member?.photo} `}
                  className="h-52 w-52  object-center object-cover rounded-full"
                  alt=""
                />
              </div>
              <div className="mt-4">
                <h2 className="text-sky-500  text-center text-xl mb-2">
                  {member?.role}
                </h2>
                <h2 className="text-center text-xl font-semibold ">
                  {member?.name}
                </h2>
                <p className="text-center mb-2 text-gray-600">{member?.bio}</p>
              </div>
              
              <div className="flex justify-around mt-3 font-semibold text-blue-600">
                <button
                  onClick={() => {
                    setShow(true);
                    setMember(member);
                  }}
                >
                  Edit
                </button>
                <button>Delete</button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ViewTeam;
