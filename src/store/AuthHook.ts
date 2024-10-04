import { useDispatch, useSelector } from "react-redux";
import { saveUserData, clearUserData } from "./AuthSlice";
import store from "./store"; // Import the configured store

type AppState = ReturnType<typeof store.getState>;

export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppDispatch = useDispatch.withTypes<typeof store.dispatch>();

// Custom hook for auth-related actions
export const useAuth = () => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.auth.userData);

  const handleSaveUserData = () => {
    dispatch(saveUserData());
  };

  const handleClearUserData = () => {
    dispatch(clearUserData());
  };

  return { userData, handleSaveUserData, handleClearUserData };
};
