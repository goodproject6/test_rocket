import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { UtilSlice } from "./utils";
import { AuthSlice } from "./auth";
import { AlertsSlice } from "./alert";
import {  SearchSetupSlice } from "./searchSetup";
import { SearchSlice } from "./search";
import  { PaymentSlice } from "./payment";

export const store = configureStore({
  reducer: {
    utils: UtilSlice.reducer,
    auth: AuthSlice.reducer,
    alerts: AlertsSlice.reducer,
    searchSetup: SearchSetupSlice.reducer,
    search: SearchSlice.reducer,
    payment:PaymentSlice.reducer
  },
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
