import { useState } from "react"
import { NavLink } from "react-router-dom"
import logo from "../../../../assets/Logo icon.png"
import { toggleSidebarAction } from "../../../../store/Slices/sidebarSlice"
import { useDispatch } from "react-redux"

export default function SideBar() {
  const [isExpanded, setIsExpanded] = useState(true)
  const dispatch = useDispatch()
  const toggleSidebar = () => {
    setIsExpanded(!isExpanded)
    dispatch(toggleSidebarAction())
  }

  return (
    <div
      className={`flex flex-col h-full bg-white shadow-lg transition-all duration-300 ${
        isExpanded ? "w-64" : "w-20"
      }`}
    >
      <div
        className={`flex items-center  p-4 bg-gray-100 ${
          isExpanded ? "justify-between" : "justify-center"
        }`}
      >
        <button
          onClick={toggleSidebar}
          className="text-gray-600 focus:outline-none"
        >
          <i
            className={`fas ${isExpanded ? "fa-times" : "fa-bars"} text-xl`}
          ></i>
        </button>
        {isExpanded ? <img src={logo} alt="logo" className="h-8" /> : ""}
      </div>

      <nav className="flex-1 overflow-y-auto">
        <ul className="p-4 space-y-2">
          {[
            {
              to: "/dashboard",
              icon: "fas fa-tachometer-alt",
              label: "Dashboard",
              exact: true,
            },
            { to: "/dashboard/groups", icon: "fas fa-users", label: "Groups" },
            {
              to: "/dashboard/students",
              icon: "fas fa-user-graduate",
              label: "Students",
            },
            {
              to: "/dashboard/questions",
              icon: "fas fa-question",
              label: "Questions",
            },
            {
              to: "/dashboard/quizzes",
              icon: "fas fa-pen-square",
              label: "Quizzes",
            },
            {
              to: "/dashboard/results",
              icon: "fa-solid fa-square-poll-vertical",
              label: "Results",
            },
          ].map((item) => (
            <li key={item.to}>
              <NavLink
                end={item.exact}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center ${
                    isExpanded ? "" : "justify-center"
                  } p-3 rounded-lg transition-colors duration-200 ${
                    isActive
                      ? "bg-black text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`
                }
              >
                <i
                  className={`${item.icon} ${isExpanded ? "mr-3" : "mx-auto"}`}
                ></i>
                {isExpanded && (
                  <span className="font-medium">{item.label}</span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <NavLink
          to="/help"
          className="flex items-center p-2 rounded-lg text-gray-600 hover:bg-gray-100"
        >
          <i className="fas fa-cog mr-3"></i>
          {isExpanded && <span className="font-medium">Help</span>}
        </NavLink>
      </div>
    </div>
  )
}
