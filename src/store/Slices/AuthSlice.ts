import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { jwtDecode } from "jwt-decode"
import { UserData } from "../../interfaces/UserInfo/UserInfoResponse"

// Define the initial state
interface AuthState {
  userData: UserData | null
}

const initialState: AuthState = {
  userData: null,
}

// Create a slice for auth management
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<UserData>) => {
      state.userData = action.payload
    },
    clearUserData: (state) => {
      state.userData = null
    },
  },
})

export const { setUserData, clearUserData } = authSlice.actions

export const saveUserData = () => (dispatch: any) => {
  const enCodedToken = localStorage.getItem("userToken")
  if (enCodedToken) {
    const deCodedToken: UserData = jwtDecode<UserData>(enCodedToken)
    dispatch(setUserData(deCodedToken))
  }
}

export default authSlice.reducer
