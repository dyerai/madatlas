import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courses: null,
  subjects: null,
  payload: {
    filters: {
      bio: false,
      human: false,
      lit: false,
      natSci: false,
      phySci: false,
      socSci: false,
      commA: false,
      commB: false,
      quantA: false,
      quantB: false,
      ethnic: false,
      subject: "0",
    },
  }
};

export const coursesSlice = createSlice({
  name: "courses",
  initialState: initialState,
  reducers: {
    search: (state, action) => {
      state.payload = action.payload;
    }
  },
});
