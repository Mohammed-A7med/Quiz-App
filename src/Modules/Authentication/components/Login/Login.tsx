import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import {
  PasswordValidation,
  emailValidation,
} from "../../../../constans/VALIDATIONS";
import { LoginFormData } from "../../../../interfaces/Authentication/AuthResponse";
import Styles from "../Auth.module.css";
export default function Login() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
  } = useForm<LoginFormData>({
    mode: "onBlur",
    defaultValues: { email: "", password: "" },
  });

  const toggleVisibility = (setterFunction: any) => {
    return () => setterFunction((prevState: any) => !prevState);
  };

  return (
    <>
      <form className="text-white p-4 md:p-6 lg:p-8">
        {/* Email Input Group */}
        <div className="input-group mb-5">
          <label className="block mb-2 text-sm">Email Address</label>
          <div className="relative">
            <input
              className="placeholder:font-nunito placeholder:text-slate-400 block w-full bg-transparent border border-slate-300 rounded-md py-2 pl-10 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Type your email"
              type="email"
              {...register("email", emailValidation)}
            />
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="sr-only">Email Address</span>
              <i className="fa-regular fa-envelope text-white"></i>
            </span>
          </div>
        </div>

        {/* Password Input Group */}
        <div className="input-group">
          <label className="block mb-2 text-sm">Password</label>
          <div className="relative">
            <input
              className="placeholder:font-nunito placeholder:text-slate-400 block w-full bg-transparent border border-slate-300 rounded-md py-2 pl-10 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Type your password"
              type={showPassword ? "text" : "password"}
              {...register("password", PasswordValidation)}
            />
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="sr-only">Password</span>
              <i className="fa-solid fa-lock text-white"></i>
            </span>
            <button
              onMouseDown={(e) => e.preventDefault()}
              onMouseUp={(e) => e.preventDefault()}
              type="button"
              onClick={toggleVisibility(setShowPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3"
            >
              <span className="sr-only">
                {showPassword ? "Hide password" : "Show password"}
              </span>
              <i
                className={`text-white ${
                  showPassword ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"
                }`}
              ></i>
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mt-7">
          <button className={`px-5 py-2 rounded-md ${Styles["bg-btn-Auth"]}`}>
            Sign In{" "}
            <span>
              <i className="fa-solid fa-circle-check ms-2"></i>
            </span>
          </button>

          <p className="mt-3 md:mt-0">
            Forgot password?{" "}
            <Link className={`underline ${Styles["second-color"]}`} to="">
              click here
            </Link>
          </p>
        </div>
      </form>
    </>
  );
}
