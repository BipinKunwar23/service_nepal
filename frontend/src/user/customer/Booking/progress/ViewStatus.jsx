import React from "react";
import { useViewStatusQuery } from "../../../../Api/progressApi";
import {
  Outlet,
  useLocation,
  useMatch,
  useNavigate,
  useParams,
} from "react-router-dom";
import Loader from "../../../../components/Loader";
import StatusDetail from "../../../../components/statusDetail";
const ViewProgress = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useViewStatusQuery(orderId);
  const location = useLocation();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="  w-[80Vw] mx-auto border-t border-red-500 bg-white p-10 shadow-md ">
      <StatusDetail  data={data}/>
    </section>
  );
};

export default ViewProgress;
