import { configureStore } from "@reduxjs/toolkit";
import sharesSlice from "./sharesSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
    reducer: {
    data: sharesSlice
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false}),
    
  });
  
  

  declare global {
    type RootState = ReturnType<typeof store.getState>
  }

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector