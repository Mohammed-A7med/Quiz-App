import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./Slices/AuthSlice"
import questionReducer from "./Slices/QuestionSlice"
const store = configureStore({
  reducer: {
    auth: authReducer,
    questions: questionReducer,
  },
})
export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
