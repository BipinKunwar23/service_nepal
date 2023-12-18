import React from "react";
import { Outlet, useParams } from "react-router-dom";
import { useGetProviderDetailsQuery } from "../../../Api/providerApi";
import Provider from "./Provider";
import Profile from "./profile";
import Loader from "../../../components/Loader";
import { useMatch } from "react-router-dom";

const ViewProvider = () => {
  const { providerId } = useParams();
  const { data, isLoading, isSuccess } = useGetProviderDetailsQuery(providerId);
  const service = useMatch("/provider/:providerId/service/:serviceId");
  const order = useMatch("/provider/:providerId/service/:serviceId/order");

  const params = useParams();

  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <section className="   box-border text-[1em]  grid grid-cols-5">
        <Profile data={data} />

        <section className="   box-border text-[1em]  col-span-4">
          {service || order ? <Outlet /> : <Provider services={data.services} />}
        </section>
      </section>
    </>
  );
};

export default ViewProvider;
