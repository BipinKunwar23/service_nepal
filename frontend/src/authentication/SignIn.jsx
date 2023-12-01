import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useLoginUserMutation } from "../Api/AuthSlice";
import { ColorRing } from "react-loader-spinner";
import Error from "../components/ErrorHandling/error";
import { Formik, Form, Field, ErrorMessage, FastField } from "formik";
import { object, string } from "yup";
import TextError from "../components/ErrorHandling/TextError";

const SignIn = () => {
  const initialValues = {
    email:"",
    password: "",
  };
  const validationSchema = object({
    email: string().email("Enter valid email").required("Required"),

    password: string().required("Required"),
  });

  const [loginUser, { isLoading, isError, error }] = useLoginUserMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const [state, setState] = useState({ email: true, password: true });

  const onSubmit = async (values, { setFieldError, resetForm }) => {
    await loginUser(values)
      .unwrap()
      .then((response) => {
        response?.status === 200
          ? (localStorage.setItem("logged", "1"),
            localStorage.setItem("userId", response.id),
            console.log(response),
            navigate(`${location?.state?.path || '/'}`,  {replace:true}))
          : null;
      })
      .catch((error) => {
        error?.status === 422
          ? (setState({ ...state, password: false }),
            setFieldError("email", error.data.errors.email),
            setFieldError("password", error.data.errors.password))
          : null;
      });
  };
  // bg-gradient-to-tr from-[#004B8F] to-[#02215B]
  return (
    <>
      {isError && error?.status != 422 ? (
        <Error error={error} />
      ) : (
        <div className=" grid  place-content-center p-5 text-[0.9em] bg-[#004840]  login ">
              
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                <Form>
                <div className="  text-gray-600 text-3xl  py-2 font-sans font-medium  text-center ">
                <span>Sign In User</span>
              </div>
                  <div>
                    <label htmlFor="email">
                      Email<span className="  text-2xl text-red-600">*</span>
                    </label>
                    <Field
                      type="email"
                      name="email"
                      id="email"
                      className="input"
                      placeholder="user@gmail.com"
                    />
                    <ErrorMessage name="email" component={TextError} />
                    {!state.email ? (
                      <div className=" text-red-600">Email Does not Match</div>
                    ) : null}
                  </div>

                  <div>
                    <label htmlFor="password">
                      Password{" "}
                      <span className="  text-2xl text-red-600">*</span>
                    </label>
                    <Field
                      type="password"
                      name="password"
                      id="password"
                      className="input"
                      placeholder="*****"
                    />
                    <ErrorMessage name="password" component={TextError} />
                  </div>

                  <div className="grid  ">
                    {isLoading ? (
                      <div className=" text-center">
                        <button>
                          <ColorRing height="40" width="40" />
                        </button>
                      </div>
                    ) : (
                      <div className=" bg-[#02215B] text-white rounded-sm text-center">
                        <button
                          type="submit"
                          className="p-2 tracking-wider font-medium"
                        >
                          LOGIN
                        </button>
                      </div>
                    )}
                    <div className=" my-5 text-sm text-gray-800">
                      <span>Don't have an account ?</span>
                      <button
                        className="underline font-medium text-red-500 p-1"
                        type="button"
                        onClick={() => {
                          navigate("/signUp", {
                            state: {
                              path: location.pathname,
                            },
                          });
                        }}
                      >
                        Sign Up
                      </button>
                    </div>
                  </div>
                </Form>
              </Formik>
        </div>
      )}
    </>
  );
};

export default SignIn;
