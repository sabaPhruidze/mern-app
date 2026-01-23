import {configureStore} from '@reduxjs/toolkit'
import { useDispatch,useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux';
export const store = configureStore({
    reducer:{}
})

// necessary parameters for typescript 
export type RootState = ReturnType<typeof store.getState>;
export type appDispatch = typeof store.dispatch;

// This is same as useDispatch and useSelector but with types
export const useAppDispatch = () => useDispatch<appDispatch>();
export const useAppSelector:TypedUseSelectorHook<RootState> = useSelector;