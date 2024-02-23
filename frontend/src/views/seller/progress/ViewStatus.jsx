import React from "react";
import { useViewStatusQuery } from "../../../Api/progressApi";
import {
  Outlet,
  useLocation,
  useMatch,
  useNavigate,
  useParams,
} from "react-router-dom";
import Loader from "../../../components/Loader";
import AddStatus from "./AddStatus";
import UpdateStatus from "./UpdateStatus";
import StatusDetail from "../../../components/statusDetail";
const ViewStatus = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useViewStatusQuery(orderId);
  const location = useLocation();
  const isUpdate = useMatch("received/orders/:orderId/progress/update");

  if (isLoading) {
    return <Loader />;
  }
  if (isUpdate) {
    return <UpdateStatus status={data} />;
  }
  if (!data?.progress) {
    return <AddStatus />;
  }
  return (
    <section className="  w-[80Vw] mx-auto  bg-white p-10 shadow-md border-t border-red-600 ">
      <StatusDetail data={data}></StatusDetail>
      <div className="flex justify-center p-4">
        <button
          className="w-1/3 bg-blue-600 p-2 text-white rounded-lg"
          onClick={() => {
            navigate("update", {
              state: {
                path: location?.pathname,
              },
            });
          }}
        >
          Update Status
        </button>
      </div>
    </section>
  );
};

export default ViewStatus;
