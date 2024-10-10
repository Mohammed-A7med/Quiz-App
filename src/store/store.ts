import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./Slices/AuthSlice"
import questionReducer from "./Slices/QuestionSlice"
import sidebarReducer from "./Slices/sidebarSlice"
const store = configureStore({
  reducer: {
    auth: authReducer,
    questions: questionReducer,
    sidebar: sidebarReducer,
  },
})
export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
