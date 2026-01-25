import {configureStore} from '@reduxjs/toolkit'
import { useDispatch,useSelector } from 'react-redux'
import  authReducer  from './slices/authSlice';
import  goalSlice  from './slices/goalSlices';

export const store = configureStore({
    reducer:{
        auth:authReducer,
        goals:goalSlice
    }
})

// necessary parameters for typescript 
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// This is same as useDispatch and useSelector but with types
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();