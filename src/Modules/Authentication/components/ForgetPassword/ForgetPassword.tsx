import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import {
  AxiosErrorResponse,
  ForgetPasswordFormData,
} from "../../../../interfaces/Authentication/AuthResponse";
import axios, { AxiosError } from "axios";
import { AUTH_URLs } from "../../../../constans/END_POINTS";
import { toast } from "react-toastify";
import { emailValidation } from "../../../../constans/VALIDATIONS";
import Styles from "../Auth.module.css";
import AuthTitle from "../../../Shared/components/AuthTitle/AuthTitle";

export default function ForgetPassword() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgetPasswordFormData>({
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: ForgetPasswordFormData) => {
    try {
      const response = await axios.post(AUTH_URLs.forgotPassword, data);
      toast.success(
        response.data.message ||
          "Password reset successful. Please check your email for further instructions."
      );
      console.log(response);
      navigate("/reset-password");
    } catch (error) {
      const axiosError = error as AxiosError<AxiosErrorResponse>;
      toast.error(
        axiosError.response?.data.message ||
          "Password reset failed. Please ensure your email address is correct and try again."
      );
    }
  };
  return (
    <>
      {/* Authacation Title */}
      <AuthTitle title="Forgot password" />
      
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="text-white px-4 md:px-6 lg:px-8 w-full"
      >
        {/* Email Input Group */}
        <div className="input-group  my-6 lg:my-9">
          <label className="block mb-2 text-sm md:text-base lg:text-lg">
            Email address
          </label>
          <div className="relative">
            {/* Email Input Field */}
            <input
              className="placeholder:font-nunito placeholder:text-slate-400 block w-full bg-transparent  border-2 border-slate-300 rounded-md py-2 pl-10 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm md:text-base lg:text-lg"
              placeholder="Type your email"
              type="text"
              {...register("email", emailValidation)}
            />

            {/* Email Icon */}
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
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

        {/* Submit Button and Forgot Password Link */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-14">
          {/* Sign In Button */}
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
                Send email
                <i className="fa-solid fa-circle-check ms-2"></i>
              </span>
            )}
          </button>
        </div>

        {/* login Link */}
        <div className="conteiner mt-16 flex justify-end">
          <p className="mt-3 md:mt-0 ">
            Login?{" "}
            <Link className={`underline ${Styles["second-color"]}`} to="/login">
              click here
            </Link>
          </p>
        </div>
      </form>
    </>
  );
}
