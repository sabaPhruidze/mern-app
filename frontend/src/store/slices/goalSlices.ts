import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import  goalServices from "../../features/goals/goalService";
import type { Goalpayload } from "../../features/goals/goalService";
import type { BackendError } from "./authSlice";
export interface Goal {
    _id:string;
    text:string;
    createdAt: string;
}
interface GoalState {
    goals:Goal[];
    isError:boolean;
    isSuccess:boolean;
    isLoading:boolean;
    message:string;
}
const initialState:GoalState = {
    goals:[],
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:''
}
const getErrorMessage = (error:unknown) => {
    const err = error as AxiosError<BackendError>;
    return err.response?.data?.message || err.message || 'Something went wrong'
}
export const createGoal = createAsyncThunk<Goal,Goalpayload,{rejectValue:string}>(
    'goals/create',async(goalData,thunkAPI) => {
        try {
            return await goalServices.createGoal(goalData);
        } catch (error) {
            return thunkAPI.rejectWithValue(getErrorMessage(error))
        }
    }
)
export const getGoals = createAsyncThunk<Goal[],void,{rejectValue:string}>(
    'goals/getAll',async(_,thunkAPI) => {
        try {
            return await goalServices.getGoals();
        } catch (error) {
            return thunkAPI.rejectWithValue(getErrorMessage(error))
        }
    }
)

export const deleteGoals = createAsyncThunk<string,string,{rejectValue:string}>( 
    "goals/delete", async (goalId, thunkAPI) => {
        try {
            return await goalServices.deleteGoal(goalId)
        } catch (error) {
            return thunkAPI.rejectWithValue(getErrorMessage(error))
        }
    }
)

export const goalSlice = createSlice({
    name:'goals',
    initialState,
    reducers: {
        // ordinary sync reducers
        reset:(state) => {
            state.isError = false;
            state.isSuccess=false;
            state.isLoading=false;
            state.message='';
        }
    },
    // updating on thunks lifecycle
    extraReducers:(builder) => {
        builder
        .addCase(createGoal.pending,(state) => {
            state.isLoading = true;
        })
        .addCase(createGoal.fulfilled,(state,action) => {
            state.isLoading= false;
            state.isSuccess = true;
            state.goals.push(action.payload)
        })
        .addCase(createGoal.rejected,(state,action) => {
            state.isLoading = false;
            state.isSuccess= false;
            state.isError = true;
            state.message = action.payload as string;
        }) 
        .addCase(getGoals.rejected,(state) => {
            state.isLoading =  true;
        })
        .addCase(getGoals.fulfilled,(state,action) => {
            state.isLoading=false;
            state.isSuccess =true;
            state.goals = action.payload;
        })
        .addCase(getGoals.rejected,(state,action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = action.payload as string;
        })
        .addCase(deleteGoals.pending,(state) => {
            state.isLoading = true;
        })
        .addCase(deleteGoals.fulfilled,(state,action) => {
            state.isLoading=false;
            state.isSuccess=true;
            state.goals = state.goals.filter(goal => goal._id !== action.payload);            
        })
        .addCase(deleteGoals.rejected,(state,action) => {
            state.isLoading = false;
            state.isSuccess=false;
            state.isError =true;
            state.message = action.payload as string;
        })
    }
    
    
})
export const {reset} = goalSlice.actions;
export default goalSlice.reducer;
