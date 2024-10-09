import { Outlet } from "react-router-dom"
import SideBar from "../SideBar/SideBar"

export default function Masterlayout() {
  return (
    <div className="grid grid-cols-6 h-screen gap-5">
      <div className="col-span-1 ">
        <SideBar />
      </div>
      <div className="col-span-5 p-10">
        <Outlet />
      </div>
    </div>
  )
}
