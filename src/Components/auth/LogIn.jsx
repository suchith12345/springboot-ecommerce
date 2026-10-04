import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineLogin } from "react-icons/ai";
import InputFeild from "../shared/InputFeild";
import { useDispatch } from "react-redux";
import { authenticateSignInUser } from "../../store/Action";
import toast from "react-hot-toast";
import SpinnerLogin from "../shared/SpinnerLogin";

const LogIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  const loginHandler = async (data) => {
    console.log("Login clicked");
    console.log(data);
    dispatch(authenticateSignInUser(data, toast, reset, navigate, setLoader));
  };
  return (
    <div className="min-h-[calc(100vh-64px)] flex justify-center items-center">
      <form
        onSubmit={handleSubmit(loginHandler)}
        className="sm:w-[450px] w-[360px] shadow-custom py-8 sm:px-8 px-4 rounded-md"
      >
        <div className="flex flex-col items-center justify-center space-y-4">
          <AiOutlineLogin className="text-slate-800 text-5xl" />
          <h1 className="text-slate-800 text-center font-montserrat lg:text-3xl text-2xl font-bold">
            Login Here
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
            id="username"
            register={register}
            errors={errors}
          />

          <InputFeild
            label="Password"
            type="Password"
            required
            message="*Password is required"
            placeholder="Enter your Password"
            id="Password"
            register={register}
            errors={errors}
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
              <>Login</>
            )}
          </button>

          <p className="text-center text-sm text-slate-700 mt-6">
            Don't have an account?
            <Link
              to="/register"
              className=" font-semibold underline hover:text-black"
            >
              <span>SignUp</span>
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LogIn;
