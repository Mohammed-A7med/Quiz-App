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
  RegisterFormData,
} from "../../../../interfaces/Authentication/AuthResponse";
import Styles from "../Auth.module.css";
import AuthCaption from "../../../Shared/components/CaptopnAuth/AuthCaption";

export default function Register() {
  const navigate = useNavigate();
  const userRoles: string[] = ["Instructor", "Student"];
  const [selectedRole, setSelectedRole] = useState("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    mode: "onBlur",
    defaultValues: { email: "", password: "" },
  });

  const toggleVisibility = (setterFunction: any) => {
    return () => setterFunction((prevState: any) => !prevState);
  };

  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post(AUTH_URLs.register, data);
      toast.success(
        response.data.message ||
          "Congratulations! Your account has been successfully created."
      );
      navigate("/login");
    } catch (error) {
      const axiosError = error as AxiosError<AxiosErrorResponse>;
      toast.error(
        axiosError.response?.data.message ||
          "Registration failed. Please double-check your details and try again."
      );
    }
  };

  return (
    <>
      {/* Show AuthCaption */}
      <AuthCaption />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="text-white px-4 md:px-6 lg:px-8 w-full "
      >
        <div className="container flex flex-col md:flex-row justify-between  mx-auto gap-x-2.5">
          {/* Left column for first name input */}
          <div className="w-full block md:w-6/12 ">
            {/* first name Input Group */}
            <div className="input-group mb-6 md:mb-0">
              <label
                htmlFor="first_name"
                className="block mb-2 text-sm md:text-base lg:text-lg"
              >
                Your first name
              </label>
              <div className="relative">
                {/* first name Input Field */}
                <input
                  className="placeholder:font-nunito placeholder:text-slate-400 block w-full bg-transparent  border-2 border-slate-300 rounded-md py-2 pl-10 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm md:text-base lg:text-lg"
                  placeholder="Type your first name"
                  type="text"
                  id="first_name"
                  aria-label="first_name"
                  {...register("first_name", RequiredField("First Name"))}
                />

                {/* first name Icon */}
                <span
                  className={`absolute inset-y-0 flex items-center ${Styles["auth-icon"]}`}
                >
                  <span className="sr-only">first name Icon</span>
                  <i className="fa-solid fa-address-card text-white"></i>
                </span>

                {/* Validation Error Message */}
                {errors.first_name && (
                  <span className="text-red-500 absolute text-xs md:text-sm lg:text-base mt-1">
                    {errors.first_name.message}
                  </span>
                )}
              </div>
            </div>
          </div>
          {/* Right column for last name input */}
          <div className="w-full block md:w-6/12 ">
            {/* last name Input Group */}
            <div className="input-group">
              <label  htmlFor="last_name" className="block mb-2 text-sm md:text-base lg:text-lg">
                Your last name
              </label>
              <div className="relative">
                {/* last name Input Field */}
                <input
                  className="placeholder:font-nunito placeholder:text-slate-400 block w-full bg-transparent  border-2 border-slate-300 rounded-md py-2 pl-10 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm md:text-base lg:text-lg"
                  placeholder="Type your last name"
                  type="text"
                  id="last_name"
                  aria-label="last_name"
                  {...register("last_name", RequiredField("Last Name"))}
                />

                {/* last name Icon */}
                <span
                  className={`absolute inset-y-0 flex items-center ${Styles["auth-icon"]}`}
                >
                  <span className="sr-only">Last Name Icon</span>
                  <i className="fa-solid fa-address-card text-white"></i>
                </span>

                {/* Validation Error Message */}
                {errors.last_name && (
                  <span className="text-red-500 absolute text-xs md:text-sm lg:text-base mt-1">
                    {errors.last_name.message}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Email Input Group */}
        <div className="input-group my-6 lg:my-9">
          <label htmlFor="email" className="block mb-2 text-sm md:text-base lg:text-lg">
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

        {/* role Select Field */}
        <div className="input-group my-6 lg:my-9">
          <label htmlFor="role" className="block mb-2 text-sm md:text-base lg:text-lg">
            Your role
          </label>
          <div className="relative">
            {/* Select Field */}
            <select
              className="placeholder:font-nunito placeholder:text-slate-400 block w-full bg-transparent border-2 border-slate-300 rounded-md py-2 pl-10 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm md:text-base lg:text-lg"
              {...register("role", RequiredField("Select role"))}
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              id="role"
              aria-label="role"
            >
              <option className="text-black" value="" disabled>
                Choose your role
              </option>
              {userRoles.map((role) => (
                <option key={role} className="text-black" value={role}>
                  {role}
                </option>
              ))}
            </select>

            {/* role Select Icon */}
            <span
              className={`absolute inset-y-0 flex items-center ${Styles["auth-icon"]}`}
            >
              <span className="sr-only">role Select Icon</span>
              <i className="fa-solid fa-user text-white"></i>
            </span>

            {/* Validation Error Message */}
            {errors.role && (
              <span className="text-red-500 absolute text-xs md:text-sm lg:text-base mt-1">
                {errors.role.message}
              </span>
            )}
          </div>
        </div>

        {/* Password Input Group */}
        <div className="input-group mt-8 my-6 lg:my-9">
          <label htmlFor="password" className="block mb-2 text-sm md:text-base lg:text-lg">
            Password
          </label>
          <div className="relative">
            {/* Password Input */}
            <input
              className="placeholder:font-nunito placeholder:text-slate-400 block w-full bg-transparent  border-2 border-slate-300 rounded-md py-2 pl-10 pr-10 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm md:text-base lg:text-lg"
              placeholder="Type your password"
              id="password"
              aria-label="password"
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

        {/* Submit Button*/}
        <div className="flex flex-col md:flex-row justify-between items-center mt-14 ">
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
                Sign Up
                <i className="fa-solid fa-circle-check ms-2"></i>
              </span>
            )}
          </button>
        </div>
      </form>
    </>
  );
}
