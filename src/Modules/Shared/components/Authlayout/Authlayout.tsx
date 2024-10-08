import { Outlet } from "react-router-dom";
import AuthLogo from "../../../../assets/Logo-white.png";
import bgAuth from "../../../../assets/bg-auth.png";
import Styles from "./Authlayout.module.css";

export default function Authlayout() {
  return (
    <>
      <div className={`${Styles["bg-auth"]} min-h-screen`}>
        <div className="container flex flex-col md:flex-row justify-between h-full mx-auto">
          {/* Left side: Logo and Outlet */}
          <div className="w-full block md:w-6/12 ">
            <div className="logo px-4 py-5 md:ps-3">
              <img
                src={AuthLogo}
                alt="main-logo"
                className="w-1/4 max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg"
              />
            </div>
            <Outlet />
          </div>

          {/* Right side: Background Image */}
          <div className="w-full md:w-6/12 mt-5 md:mt-10 hidden md:block">
            <div className="auth-img flex justify-center md:justify-end items-start h-full">
              <img
                className="w-10/12 md:w-11/12 lg:w-12/12 object-cover"
                src={bgAuth}
                alt="auth-background"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
