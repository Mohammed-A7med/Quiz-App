import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import SideBar from "../SideBar/SideBar";

export default function Masterlayout() {
  return (
    <>
      {/* <Navbar /> */}
      <div className="flex">
        {/* <SideBar /> */}
        <div className="w-full container mx-auto">
          <Outlet />
        </div>
      </div>
    </>
  );
}
