import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  AxiosErrorResponse,
  ChangePasswordFormData,
} from "../../../../interfaces/Authentication/AuthResponse";
import axios, { AxiosError } from "axios";
import { AUTH_URLs } from "../../../../constans/END_POINTS";
import { toast } from "react-toastify";
import AuthTitle from "../../../Shared/components/AuthTitle/AuthTitle";
import { PasswordValidation } from "../../../../constans/VALIDATIONS";
import Styles from "../Auth.module.css";
import { useNavigate } from "react-router-dom";

export default function ChangePassword() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showOldPassword, setShowOldPassword] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordFormData>({
    defaultValues: { password: "", password_new: "" },
  });

  const toggleVisibility = (setterFunction: any) => {
    return () => setterFunction((prevState: any) => !prevState);
  };

  const onSubmit = async (data: ChangePasswordFormData) => {
    try {
      const response = await axios.post(AUTH_URLs.ChangePassword, data);
      toast.success(
        response.data.message || "Your password has been successfully changed!"
      );
      navigate("/dashboard");
    } catch (error) {
      const axiosError = error as AxiosError<AxiosErrorResponse>;
      toast.error(
        axiosError.response?.data.message ||
          "Password change unsuccessful. Please try again."
      );
    }
  };
  return (
    <>
      {/* Authacation Title */}
      <AuthTitle title="Change password" />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="text-white px-4 md:px-6 lg:px-8 w-full"
      >
        {/* Old Password Input Group */}
        <div className="input-group mt-8  my-12 lg:mb-9">
          <label
            htmlFor="OldPassword"
            className="block mb-2 text-sm md:text-base lg:text-lg"
          >
            Old Password
          </label>
          <div className="relative">
            {/* Password Input */}
            <input
              className="placeholder:font-nunito placeholder:text-slate-400 block w-full bg-transparent  border-2 border-slate-300 rounded-md py-2 pl-10 pr-10 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm md:text-base lg:text-lg"
              placeholder="Type your old password"
              type={showOldPassword ? "text" : "password"}
              id="OldPassword"
              aria-label="Old-Password"
              {...register("password", PasswordValidation)}
            />

            {/* Lock Icon */}
            <span
              className={`absolute inset-y-0 flex items-center ${Styles["auth-icon"]}`}
            >
              <span className="sr-only">Old Password Icon</span>
              <i className="fa-solid fa-lock text-white"></i>
            </span>

            {/* Toggle Visibility Button */}
            <button
              onMouseDown={(e) => e.preventDefault()}
              onMouseUp={(e) => e.preventDefault()}
              type="button"
              onClick={() =>
                toggleVisibility(setShowOldPassword(!showOldPassword))
              }
              className="absolute inset-y-0 right-0 flex items-center pr-3"
            >
              <span className="sr-only">
                {showOldPassword ? "Hide password" : "Show password"}
              </span>
              <i
                className={`text-white ${
                  showOldPassword ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"
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

        {/* New Password Input Group */}
        <div className="input-group mt-8  my-6 lg:my-14">
          <label htmlFor="NewPassword" className="block mb-2 text-sm md:text-base lg:text-lg">
            New Password
          </label>
          <div className="relative">
            {/* Password Input */}
            <input
              className="placeholder:font-nunito placeholder:text-slate-400 block w-full bg-transparent  border-2 border-slate-300 rounded-md py-2 pl-10 pr-10 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm md:text-base lg:text-lg"
              placeholder="Type your New Password"
              type={showPassword ? "text" : "password"}
              id="NewPassword"
              aria-label="New-Password"
              {...register("password_new", {
                validate: (value) =>
                  value === getValues("password") || "password dont match",
              })}
            />

            {/* Lock Icon */}
            <span
              className={`absolute inset-y-0 flex items-center ${Styles["auth-icon"]}`}
            >
              <span className="sr-only">Old Password Icon</span>
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
            {errors.password_new && (
              <span className="text-red-500 absolute text-xs md:text-sm lg:text-base mt-1">
                {errors.password_new.message}
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
                Change
                <i className="fa-solid fa-circle-check ms-2"></i>
              </span>
            )}
          </button>
        </div>
      </form>
    </>
  );
}
