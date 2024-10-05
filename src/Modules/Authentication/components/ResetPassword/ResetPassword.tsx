import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AUTH_URLs } from "../../../../constans/END_POINTS";
import {
  PasswordValidation,
  RequiredField,
  emailValidation,
} from "../../../../constans/VALIDATIONS";
import {
  AxiosErrorResponse,
  ResetPasswordFormData,
} from "../../../../interfaces/Authentication/AuthResponse";
import AuthTitle from "../../../Shared/components/AuthTitle/AuthTitle";
import Styles from "../Auth.module.css";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    defaultValues: { email: "", otp: "", password: "" },
  });

  const toggleVisibility = (setterFunction: any) => {
    return () => setterFunction((prevState: any) => !prevState);
  };

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      const response = await axios.post(AUTH_URLs.ResetPassword, data);
      toast.success(
        response.data.message ||
          "Password reset successful. Please check your email for further instructions."
      );
      navigate("/login");
    } catch (error) {
      const axiosError = error as AxiosError<AxiosErrorResponse>;
      toast.error(
        axiosError.response?.data.message ||
          "Something went wrong. We couldn't reset your password. Please try again."
      );
    }
  };
  return (
    <>
      {/* Authacation Title */}
      <AuthTitle title="Reset password" />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="text-white px-4 md:px-6 lg:px-8 w-full"
      >
        {/* Email Input Group */}
        <div className="input-group mb-5 lg:mb-7">
          <label
            htmlFor="email"
            className="block mb-2 text-sm md:text-base lg:text-lg"
          >
            Your email address
          </label>
          <div className="relative">
            {/* Email Input Field */}
            <input
              className="placeholder:font-nunito placeholder:text-slate-400 block w-full bg-transparent  border-2 border-slate-300 rounded-md py-2 pl-10 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm md:text-base lg:text-lg"
              placeholder="Type your email"
              type="text"
              id="email"
              aria-label="email"
              {...register("email", emailValidation)}
            />

            {/* Email Icon */}
            <span
              className={`absolute inset-y-0 flex items-center ${Styles["auth-icon"]}`}
            >
              <span className="sr-only">Email Address Icon</span>
              <i className="fa-regular fa-envelope text-white"></i>
            </span>

            {/* Validation Error Message */}
            {errors.email && (
              <span className="text-red-500 absolute text-xs md:text-sm lg:text-base mt-1">
                {errors.email.message}
              </span>
            )}
          </div>
        </div>

        {/* OTP Input Group */}
        <div className="input-group  my-5 lg:my-7">
          <label
            htmlFor="OTP"
            className="block mb-2 text-sm md:text-base lg:text-lg"
          >
            OTP
          </label>
          <div className="relative">
            {/* OTP Input Field */}
            <input
              className="placeholder:font-nunito placeholder:text-slate-400 block w-full bg-transparent  border-2 border-slate-300 rounded-md py-2 pl-10 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm md:text-base lg:text-lg"
              placeholder="Type your otp"
              type="text"
              id="OTP"
              aria-label="OTP"
              {...register("otp", RequiredField("otp"))}
            />

            {/* OTP Icon */}
            <span
              className={`absolute inset-y-0 flex items-center ${Styles["auth-icon"]}`}
            >
              <span className="sr-only">OTP Icon</span>
              <i className="fa-solid fa-hourglass-end text-white"></i>
            </span>

            {/* Validation Error Message */}
            {errors.otp && (
              <span className="text-red-500 absolute text-xs md:text-sm lg:text-base mt-1">
                {errors.otp.message}
              </span>
            )}
          </div>
        </div>

        {/* Password Input Group */}
        <div className="input-group mt-8  my-5 lg:my-7">
          <label
            htmlFor="Password"
            className="block mb-2 text-sm md:text-base lg:text-lg"
          >
            Password
          </label>
          <div className="relative">
            {/* Password Input */}
            <input
              className="placeholder:font-nunito placeholder:text-slate-400 block w-full bg-transparent  border-2 border-slate-300 rounded-md py-2 pl-10 pr-10 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm md:text-base lg:text-lg"
              placeholder="Type your password"
              id="Password"
              aria-label="Password"
              type={showPassword ? "text" : "password"}
              {...register("password", PasswordValidation)}
            />

            {/* Lock Icon */}
            <span
              className={`absolute inset-y-0 flex items-center ${Styles["auth-icon"]}`}
            >
              <span className="sr-only">Password Icon</span>
              <i className="fa-solid fa-lock text-white"></i>
            </span>

            {/* Toggle Visibility Button */}
            <button
              onMouseDown={(e) => e.preventDefault()}
              onMouseUp={(e) => e.preventDefault()}
              type="button"
              onClick={() => toggleVisibility(setShowPassword(!showPassword))}
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

            {/* Password Error Message */}
            {errors.password && (
              <span className="text-red-500 absolute text-xs md:text-sm lg:text-base mt-1">
                {errors.password.message}
              </span>
            )}
          </div>
        </div>

        {/* Submit Button  */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-14">
          {/* Reset Button */}
          <button
            type="submit"
            className={`px-5 py-2 rounded-md w-full md:w-auto mb-4 md:mb-0 ${Styles["bg-btn-Auth"]}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center text-center md:justify-start md:text-start w-full ">
                please wait...
                <i className="fa-solid fa-spinner fa-spin mx-1"></i>
              </span>
            ) : (
              <span className="flex items-center justify-center text-center md:justify-start md:text-start w-full">
                Reset
                <i className="fa-solid fa-circle-check ms-2"></i>
              </span>
            )}
          </button>
        </div>
      </form>
    </>
  );
}
