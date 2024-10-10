import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import { AppState } from "../../../../store/store"
import SideBar from "../SideBar/SideBar"

export default function Masterlayout() {
  const sidebarState = useSelector((state: AppState) => state.sidebar.show)

  return (
    <div
      className={`grid ${
        sidebarState ? "grid-cols-6" : "grid-cols-12"
      } min-h-[100vh] h-full gap-5`}
    >
      <div className="col-span-1 ">
        <SideBar />
      </div>
      <div className={`${sidebarState ? "col-span-5" : "col-span-11"} p-10`}>
        <Outlet />
      </div>
    </div>
  )
}
