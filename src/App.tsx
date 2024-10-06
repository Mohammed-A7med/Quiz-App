import { RouterProvider, createBrowserRouter, createHashRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Authlayout from "./Modules/Shared/components/Authlayout/Authlayout";
import NotFound from "./Modules/Shared/components/NotFound/NotFound";
import Login from "./Modules/Authentication/components/Login/Login";
import Register from "./Modules/Authentication/components/Register/Register";
import ForgetPassword from "./Modules/Authentication/components/ForgetPassword/ForgetPassword";
import ResetPassword from "./Modules/Authentication/components/ResetPassword/ResetPassword";
import ChangePassword from "./Modules/Authentication/components/ChangePassword/ChangePassword";
import Masterlayout from "./Modules/Shared/components/Masterlayout/Masterlayout";
import Dashboard from "./Modules/Dashboard/components/Dashboard/Dashboard";
import GroupsList from "./Modules/Groups/components/Groups/GroupsList";
import QuestionsList from "./Modules/Questions/components/Questions/QuestionsList";
import Quize from "./Modules/Quizes/components/Quizes/Quize";
import ResultsList from "./Modules/Results/components/Results/ResultsList";
import StudentsList from "./Modules/Students/components/Students/StudentsList";

function App() {
  const routes = createHashRouter([
    {
      path: "",
      element: <Authlayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "forget-password", element: <ForgetPassword /> },
        { path: "reset-password", element: <ResetPassword /> },
        { path: "change-password", element: <ChangePassword /> },
      ],
    },
    {
      path: "dashboard",
      element: <Masterlayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: "dashboard", element: <Dashboard /> },
        { path: "groups-list", element: <GroupsList /> },
        { path: "questions-list", element: <QuestionsList /> },
        { path: "quize", element: <Quize /> },
        { path: "results-list", element: <ResultsList /> },
        { path: "students-list", element: <StudentsList /> },
      ],
    },
  ]);
  return (
    <>
      <ToastContainer />
      <RouterProvider router={routes}></RouterProvider>
    </>
  );
}

export default App;
