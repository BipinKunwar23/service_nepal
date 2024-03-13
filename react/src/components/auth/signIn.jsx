import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useLoginUserMutation } from "../../api/authApi";
import { ColorRing } from "react-loader-spinner";
import Error from "../error/error";
import { Formik, Form, Field, ErrorMessage, FastField } from "formik";
import { object, string } from "yup";
import TextError from "../error/TextError";
import { setName } from "../../redux/sellerSlice";
import { useDispatch } from "react-redux";

const SignIn = () => {
  const dispatch = useDispatch();
  const initialValues = {
    email: "",
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
          ? (localStorage.setItem("logged", 1),
            localStorage.setItem("userId", response.id),
            localStorage.setItem("token", response.token),
            localStorage.setItem("photo", response.photo),
            localStorage.setItem("name", response.name),
            localStorage.setItem("role", response.role),
            dispatch(setName(response?.name)),
            navigate(`/`, { replace: true }))
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
    <section>
      <div className="p-4">
        <h2 className="text-green-600 font-semibold text-3xl">Technician</h2>
      </div>

      <section className="grid grid-cols-2 ">
        <div className="grid place-content-center">
          <h2 className="text-5xl font-semibold text-center p-10 text-slate-700">
            Welcome To Login Page
          </h2>
        </div>
        {isError && error?.status != 422 ? (
          <Error error={error} />
        ) : (
          <div className=" flex-1  px-10 py-5 text-[0.9em]   login ">
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
                    Password <span className="   text-red-600">*</span>
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
                    <div className=" flex justify-center">
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
                  <div>
                    <div className=" my-5 flex gap-6 text-gray-800">
                      <span className="block">Don't have an account ?</span>
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
                </div>
              </Form>
            </Formik>
          </div>
        )}
      </section>
    </section>
  );
};

export default SignIn;
