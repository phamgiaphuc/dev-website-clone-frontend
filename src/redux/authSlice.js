import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {
      data: null,
      isAuthenticated: false,
      isSignedIn: false
    },
    signIn: {
      isFetching: false,
      success: false,
      error: false
    },
    signOut: {
      isFetching: false,
      success: false,
      error: false
    },
    signUp: {
      isFetching: false,
      success: false,
      error: false
    },
    verification: {
      isFetching: false,
      success: false,
      error: false
    },
    refresh: {
      isFetching: false,
      success: false,
      error: false
    }
  },
  reducers: {
    signInStart: (state) => {
      state.signIn.isFetching = true
    },
    signInSuccess: (state, action) => {
      state.signIn.isFetching = false;
      state.signIn.success = true;
      state.signIn.error = false;
      state.user.data = action.payload;
      state.user.isAuthenticated = true;
      state.user.isSignedIn = true;
    },
    signInFailed: (state) => {
      state.signIn.isFetching = false;
      state.signIn.success = false;
      state.signIn.error = true;
    },
    signOutStart: (state) => {
      state.signOut.isFetching = true
    },
    signOutSuccess: (state) => {
      state.signOut.isFetching = false;
      state.signOut.success = true;
      state.signOut.error = false;
      state.user.data = null;
      state.user.isAuthenticated = false;
      state.user.isSignedIn = false;  
    },
    signOutFailed: (state) => {
      state.logout.isFetching = false;
      state.logout.success = false;
      state.logout.error = true;
    },
    signUpStart: (state) => {
      state.signUp.isFetching = true
    },
    signUpSuccess: (state) => {
      state.signUp.isFetching = false;
      state.signUp.success = true;
      state.signUp.error = false;
    },
    signUpFailed: (state) => {
      state.signUp.isFetching = false;
      state.signUp.success = false;
      state.signUp.error = true;
    },
    verificationStart: (state) => {
      state.verification.isFetching = true
    },
    verificationSuccess: (state, action) => {
      state.verification.isFetching = false;
      state.verification.success = true;
      state.verification.error = false;
      state.user.data = action.payload;
      state.user.isAuthenticated = true;
      state.user.isSignedIn = true;
    },
    verificationFailed: (state) => {
      state.verification.isFetching = false;
      state.verification.success = false;
      state.verification.error = true;
    },
    refreshStart: (state) => {
      state.refresh.isFetching = true
    },
    refreshSuccess: (state, action) => {
      state.refresh.isFetching = false;
      state.refresh.success = true;
      state.refresh.error = false;
      state.user.data = action.payload;
      state.user.isAuthenticated = true;
      state.user.isSignedIn = true;
    },
    refreshFailed: (state) => {
      state.refresh.isFetching = false;
      state.refresh.success = false;
      state.refresh.error = true;
      state.user.data = null;
      state.user.isAuthenticated = false;
      state.user.isSignedIn = false;
    },
  }
});

export const {
  signInStart,
  signInSuccess,
  signInFailed,
  signOutStart,
  signOutSuccess,
  signOutFailed,
  signUpStart,
  signUpSuccess,
  signUpFailed,
  verificationStart,
  verificationSuccess,
  verificationFailed,
  refreshStart,
  refreshSuccess,
  refreshFailed
} = authSlice.actions;

export default authSlice.reducer;