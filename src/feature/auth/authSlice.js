import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import auth from "../../firebase/firebase.config";

const initialState = {
  email: "",
  role: "",
  isLoading: true,
  isError: false,
  // isSuccess:false,
  error: "",
};
export const createuser = createAsyncThunk(
  "auth/createuserPost",
  async ({ email, password }) => {
    const data = await createUserWithEmailAndPassword(auth, email, password);
    return data.user.email;
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUserPost",
  async ({ email, password }) => {
    const data = await signInWithEmailAndPassword(auth, email, password);
    return data.user.email;
  }
);
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout:(state)=>{
        state.email = ""
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createuser.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(createuser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.email = action.payload;
        state.error = "";
      })
      .addCase(createuser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      })
      .addCase(loginUser.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.email = action.payload;
        state.error = "";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      });
  },
});

export const {logout} = authSlice.actions
export default authSlice.reducer;
