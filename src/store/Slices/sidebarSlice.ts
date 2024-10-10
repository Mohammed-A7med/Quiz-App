import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  show: true,
}

const sidebarSlice = createSlice({
  initialState,
  name: "sidebar",
  reducers: {
    toggleSidebarAction(state) {
      state.show = !state.show
    },
  },
})

export const { toggleSidebarAction } = sidebarSlice.actions

export default sidebarSlice.reducer
