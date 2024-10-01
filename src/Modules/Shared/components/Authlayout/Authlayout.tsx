import { Outlet } from "react-router-dom";
import AuthLogo from "../../../../assets/Logo-white.png";
import bgAuth from "../../../../assets/bg-auth.png";
import Styles from "./Authlayout.module.css";

export default function Authlayout() {
  return (
    <>
      <div className={`h-screen ${Styles["bg-auth"]}`}>
        <div className="container flex flex-col md:flex-row justify-between h-screen mx-auto">
          {/* Left side: Logo and Outlet */}
          <div className="w-full md:w-6/12">
            <div className="logo px-4 py-5 md:ps-3">
              <img src={AuthLogo} alt="main-logo" />
            </div>
            <Outlet />
          </div>

          {/* Right side: Background Image */}
          <div className="w-full md:w-6/12 mt-5 md:mt-0">
            <div className="auth-img flex justify-center md:justify-end items-center h-full">
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
