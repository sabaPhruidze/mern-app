import { createSlice,createAsyncThunk, } from "@reduxjs/toolkit";
import authService from "../../features/auth/authService";
import type { RegisterSchema } from "../../schemas/register";
import type { LoginSchema } from "../../schemas/login";
import {AxiosError} from 'axios'
export interface User {
  _id: string;
  name: string;
  email: string;
  token: string;
}

interface InitialState {
    user: User | null;
    isError:boolean;
    isSuccess:boolean;
    isLoading:boolean;
    message:string
}

interface BackendError {
  message: string;
  stack?: string;
}
 const userJson = localStorage.getItem('user');
 const user = userJson ? JSON.parse(userJson) : null;

 const initialState: InitialState = {
    user:user,
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:''
}
// for async call we need createASyncThunk
export const register = createAsyncThunk<User, RegisterSchema, { rejectValue: string }>(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      return await authService.register(userData);
    } catch (error) {
      const err = error as AxiosError<BackendError>;
      const message = err.response?.data?.message || err.message || "Something went wrong";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const login = createAsyncThunk<User, LoginSchema, { rejectValue: string }>(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      return await authService.login(userData);
    } catch (error) {
      const err = error as AxiosError<BackendError>;
      const message = err.response?.data?.message || err.message || "Something went wrong";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logout = createAsyncThunk('auth/logout',async () => {
    await authService.logout();
})

const authSlice = createSlice({
    name:'auth',
    initialState,
    // not async
    reducers:{
        reset:(state) => {
            state.isLoading=false;
            state.isSuccess=false;
            state.isError=false;
            state.message="";
        }
    },
    //async thunks
    extraReducers:(builder) => {
        builder
        .addCase(register.pending,(state) => {
            state.isLoading = true; //for loading
        })
        .addCase(register.fulfilled,(state,action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user=action.payload // saving returned server data
        })
        .addCase(register.rejected,(state,action) => {
            state.isLoading=false;
            state.isSuccess=false;
            state.isError=true;
            state.message = action.payload as string;
            state.user=null;
        })
        .addCase(login.pending,(state) => {
            state.isLoading = true;
        })
        .addCase(login.fulfilled,(state,action) => {
            state.isLoading = false;
            state.isSuccess=true;
            state.user = action.payload 
        } )
        .addCase(login.rejected,(state,action) => {
            state.isLoading = false;
            state.isSuccess=false;
            state.isError = true;
            state.message = action.payload as string;
            state.user = null
            
        })
        .addCase(logout.fulfilled,(state) => {
            state.user = null
        })
    }
})

export const {reset} = authSlice.actions;
export default authSlice.reducer