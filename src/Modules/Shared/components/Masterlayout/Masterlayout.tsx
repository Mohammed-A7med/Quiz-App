import { Outlet } from "react-router-dom"
import SideBar from "../SideBar/SideBar"
import { useSelector } from "react-redux"
import { AppState } from "../../../../store/store"
import { useEffect } from "react"

export default function Masterlayout() {
  const sidebarState = useSelector((state: AppState) => state.sidebar.show)

  useEffect(() => {
    console.log(sidebarState)
  }, [sidebarState])

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
