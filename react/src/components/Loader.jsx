import React from "react";
import { ColorRing } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="h-screen grid justify-center">
      <div className="my-10">
        <ColorRing height="40" width="40" />
      </div>
    </div>
  );
};

export default Loader;
