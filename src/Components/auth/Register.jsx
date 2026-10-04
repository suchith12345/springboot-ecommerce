import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaUserPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import InputFeild from "../shared/InputFeild";
import { useDispatch } from "react-redux";
import { registerNewUser } from "../../store/Action";
import toast from "react-hot-toast";
import SpinnerLogin from "../shared/SpinnerLogin";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  const registerHandler = async (data) => {
    console.log("Register clicked");
    dispatch(registerNewUser(data, toast, reset, navigate, setLoader));
  };
  return (
    <div className="min-h-[calc(100vh-64px)] flex justify-center items-center">
      <form
        onSubmit={handleSubmit(registerHandler)}
        className="sm:w-[450px] w-[360px] shadow-custom py-8 sm:px-8 px-4 rounded-md"
      >
        <div className="flex flex-col items-center justify-center space-y-4">
          <FaUserPlus className="text-slate-800 text-5xl" />
          <h1 className="text-slate-800 text-center font-montserrat lg:text-3xl text-2xl font-bold">
            Register Here
          </h1>
        </div>
        <hr className="mt-2 mb-5 text-black" />
        <div className="flex flex-col gap-3 ">
          <InputFeild
            label="UserName"
            type="text"
            required
            message="*UserName is required"
            placeholder="Enter your username"
            id="userName"
            register={register}
            errors={errors}
          />

          <InputFeild
            label="Email"
            type="email"
            required
            message="*email is required"
            placeholder="Enter your Email"
            id="email"
            register={register}
            errors={errors}
          />
          <InputFeild
            label="Password"
            type="Password"
            required
            min={8}
            message="*Password is required"
            placeholder="Enter your Password"
            id="password"
            register={register}
            errors={errors}
          />

          <InputFeild
            label="Comform Password"
            type="Password"
            required
            min={8}
            message="*Conform Password is required"
            placeholder="Enter your Conform Password"
            id="rePassword"
            register={register}
            errors={errors}
            validation={{
              validate: (value) =>
                value === getValues("password") || "*Passord does not match",
            }}
          />

          <button
            disabled={loader}
            className="bg-button-gradient flex gap-2 items-center justify-center font-semibold text-white  w-full py-2 hover:text-slate-400 transition-colors duration-100 rounded-sm my-3"
            type="submit"
          >
            {loader ? (
              <>
                <SpinnerLogin />
                Loading.....
              </>
            ) : (
              <>Register</>
            )}
          </button>

          <p className="text-center text-sm text-slate-700 mt-6">
            Already have an account?
            <Link
              to="/login"
              className=" font-semibold underline hover:text-black"
            >
              <span>Login</span>
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
