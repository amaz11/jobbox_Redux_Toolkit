import { async } from "@firebase/util";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import auth from "../../firebase/firebase.config";

const initialState = {
  user: { email: "", role: "" },
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

export const googleAuth = createAsyncThunk("auth/googleAuth", async () => {
  const googleProvider = new GoogleAuthProvider();
  const data = await signInWithPopup(auth, googleProvider);
  return data.user.email;
});

export const getUser = createAsyncThunk("auth/getUser",async(email)=>{
    const  res = await fetch(`http://localhost:5000/user/${email}`,{
      method:"GET"
    })

    const data = await res.json()
    if(data.status){
      return data
    }

    return email
}) 
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user.email = action.payload;
      state.isLoading = false;
    },
    logout: (state) => {
      state.user.email = "";
    },
    toogleState: (state) => {
      state.isLoading = false;
    },
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
        state.user.email = action.payload;
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
        state.user.email = action.payload;
        state.error = "";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      })
      .addCase(googleAuth.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(googleAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.user.email = action.payload;
        state.error = "";
      })
      .addCase(googleAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      })
      .addCase(getUser.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        if(action.payload.status){
          state.user = action.payload.data;
        }
        else{
          state.user.email =action.payload
        }
        state.error = "";
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      });
  },
});

export const { setUser, logout, toogleState } = authSlice.actions;
export default authSlice.reducer;
