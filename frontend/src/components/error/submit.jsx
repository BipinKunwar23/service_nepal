import React from "react";
import { ColorRing } from "react-loader-spinner";

const SubmitButton = ({
  isSubmitting,
  isLoading,
  typeButton,
  isDirty,
  message,
}) => {
  return (
    <div className="  grid justify-center ">
      {isLoading || isSubmitting ? (
        <button className=" grid place-content-center   ">
          {" "}
          <ColorRing width="45" height="45" />
        </button>
      ) : !message ? (
        <button
          type="submit"
          className=" p-2  bg-[#02215B] font-medium text-[1em]  text-white disabled:opacity-30 rounded-sm  px-12  "
          disabled={isSubmitting}
        >
          {typeButton}
        </button>
      ) : (
        <button
          type="submit"
          className=" p-2  bg-[#02215B] font-medium text-[1em]   text-white disabled:opacity-30 rounded-sm  px-12  "
          disabled={isSubmitting}
        >
          {message}
        </button>
      )}
    </div>
  );
};

export default SubmitButton;
