import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

interface Alert {
  id?: string;
  message: string;
  type: "error" | "warning" | "success" | "info";
  autoClose?: boolean;
  icon?: string;
  spin?: boolean;
}

interface AlertsState {
  messages: Alert[];
}

const initialState: AlertsState = {
  messages: [],
};

export const AlertsSlice = createSlice({
  name: "alerts",
  initialState,
  reducers: {
    addAlert: (state, action: PayloadAction<Alert>) => {
      // Generate a unique ID using uuidv4
      const newAlert = {
        id: action.payload.id || uuidv4(),
        ...action.payload,
      };
      // Add the generated alert and push it into the state
      state.messages.push(newAlert);
    },
    removeAlert: (state: AlertsState, action: PayloadAction<string>) => {
      // action payload is the id of the alert
      state.messages = state.messages.filter(
        (alert) => alert.id !== action.payload
      );
    },
  },
});

export const { addAlert, removeAlert } = AlertsSlice.actions;
export default AlertsSlice.reducer;
