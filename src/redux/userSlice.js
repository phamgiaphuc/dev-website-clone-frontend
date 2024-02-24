import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: null,
    isAuthenticated: false,
    isSignedIn: false,
  },
  reducers: {
    userUpdate: (state, action) => {
      state.data = action.payload;
      state.isAuthenticated = true;
      state.isSignedIn = true;
    },
    userSignIn: (state, action) => {
      state.data = action.payload;
      state.isAuthenticated = true;
      state.isSignedIn = true;
    },
    userSignOut: (state) => {
      state.data = null;
      state.isAuthenticated = false;
      state.isSignedIn = false;
    },
    userRefresh: (state, action) => {
      state.data = action.payload;
      state.isAuthenticated = true;
      state.isSignedIn = true;
    },
    userVerify: (state, action) => {
      state.data = action.payload;
      state.isAuthenticated = true;
      state.isSignedIn = true;
    }
  }
});

export const {
  userUpdate,
  userSignIn,
  userSignOut,
  userRefresh,
  userVerify
} = userSlice.actions;

export default userSlice.reducer;