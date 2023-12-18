import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: "checking", //"checking", "not-authenticated", "authenticaded"
    uid: null,
    email: null,
    displayName: null,
    PhotoURL: null,
    errorMessage: null,
  },
  reducers: {
    login: (state, { payload }) => {
      (state.status = "authenticated"),
        (state.uid = payload.uid),
        (state.email = payload.email),
        (state.displayName = payload.displayName),
        (state.PhotoURL = payload.PhotoURL),
        (state.errorMessage = payload.errorMessage);
    },
    logout: (state, { payload }) => {
      (state.status = "not-authenticated"),
        (state.uid = null),
        (state.email = null),
        (state.displayName = null),
        (state.PhotoURL = null),
        (state.errorMessage = payload?.errorMessage);
    },
    checkingCredentials: (state) => {
      state.status = "checking";
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout, checkingCredentials } = authSlice.actions;
