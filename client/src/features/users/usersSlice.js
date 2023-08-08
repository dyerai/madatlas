import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedIn: false,
  name: null,
  email: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    loginUser: (state, action) => {
      state.loggedIn = true;
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
  },
});

export const { loginUser } = userSlice.actions

export const selectUserName = (state) => state.user.name;
export const selectUserEmail = (state) => state.user.email;
export const selectUserLoggedIn = (state) => state.user.loggedIn;

export default userSlice.reducer;
