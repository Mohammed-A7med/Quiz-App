import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Styles from "../../../Authentication/components/Auth.module.css";

export default function AuthCaption() {
  const location = useLocation();
  const navigate = useNavigate();

  // States for flags to determine active button
  const [activeButton, setActiveButton] = useState("signIn");

  // Check the current path and set the active button accordingly
  useEffect(() => {
    if (location.pathname.includes("login")) {
      setActiveButton("signIn");
    } else if (location.pathname.includes("register")) {
      setActiveButton("signUp");
    }
  }, [location.pathname]);

  // Handler for button clicks
  const handleButtonClick = (type: string) => {
    setActiveButton(type);
    navigate(type === "signIn" ? "/login" : "/register");
  };

  // Render button with active state
  const renderButton = (type: string, label: string, iconPath: string) => (
    <button
      onClick={() => handleButtonClick(type)}
      className={`bg-gray-800 py-6 px-4 md:py-10 rounded-lg flex w-full md:w-5/12 justify-center items-center ${
        activeButton === type ? "border-8" : ""
      }`}
      style={{ borderColor: activeButton === type ? "#C5D86D" : "transparent" }}
    >
      <div className="item text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={type === "signIn" ? 44 : 63}
          height="50"
          fill="none"
          viewBox="0 0 63 50"
          className="mx-auto"
        >
          <path
            fill={activeButton === type ? "#C5D86D" : "#fff"}
            d={iconPath}
          />
        </svg>
        <p className="text-white mt-2 text-sm md:text-base">{label}</p>
      </div>
    </button>
  );

  return (
    <div
      className={`caption p-4 md:p-6 lg:p-8 w-full ${Styles["second-color"]}`}
    >
      <h4 className="text-center text-base md:text-lg lg:text-xl md:text-start py-8">
        Continue your learning journey with QuizWiz!
      </h4>
      <div className="container flex flex-col md:flex-row gap-x-12 mx-auto mt-5 space-y-5 md:space-y-0 md:space-x-4">
        {renderButton(
          "signIn",
          "Sign in",
          "M21.875 25c6.904 0 12.5-5.596 12.5-12.5S28.779 0 21.875 0s-12.5 5.596-12.5 12.5S14.971 25 21.875 25zm9.355 3.184l-4.668 18.691-3.125-13.281 3.125-5.469h-9.375l3.125 5.469-3.125 13.281-4.668-18.691C5.558 28.516 0 34.209 0 41.25v4.063C0 47.9 2.1 50 4.688 50h34.374c2.588 0 4.688-2.1 4.688-4.688V41.25c0-7.041-5.557-12.734-12.52-13.066z"
        )}
        {renderButton(
          "signUp",
          "Sign Up",
          "M60.938 20.313h-6.25v-6.25c0-.86-.704-1.563-1.563-1.563H50c-.86 0-1.563.703-1.563 1.563v6.25h-6.25c-.859 0-1.562.703-1.562 1.562V25c0 .86.703 1.563 1.563 1.563h6.25v6.25c0 .859.703 1.562 1.562 1.562h3.125c.86 0 1.563-.703 1.563-1.563v-6.25h6.25c.859 0 1.562-.703 1.562-1.562v-3.125c0-.86-.703-1.563-1.563-1.563zM21.874 25c6.904 0 12.5-5.596 12.5-12.5S28.779 0 21.875 0s-12.5 5.596-12.5 12.5S14.971 25 21.875 25zm8.75 3.125h-1.63a17.018 17.018 0 01-7.12 1.563c-2.54 0-4.941-.567-7.12-1.563h-1.63C5.879 28.125 0 34.004 0 41.25v4.063C0 47.9 2.1 50 4.688 50h34.374c2.588 0 4.688-2.1 4.688-4.688V41.25c0-7.246-5.879-13.125-13.125-13.125z"
        )}
      </div>
    </div>
  );
}
