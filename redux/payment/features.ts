import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/auth/api";
import { handleAxiosError } from "../../utils/auth/errorHandler";
import { getUserTokenCookie } from "../../utils/auth/cookieUtility";
import { updateWalletBalance } from ".";





export const buyCredits = createAsyncThunk(
    "wallet/topup",
    async (payload: any) => {
        try {
            const response = await api.get("wallet/topup");
            connectTopUpWebSocket(payload)
            const { session_url } = response.data
            window.open(session_url, '_blank');
            return response.data;
        } catch (error) {
            handleAxiosError(error);
        }
    }
);



// WebSocket connection for wallet topup
export const connectTopUpWebSocket = (dispatch: any) => {
    const socket = new WebSocket('wss://updator-l25eeg7pxq-uk.a.run.app');

    socket.onopen = () => {
        socket.send(JSON.stringify({ access_token: getUserTokenCookie() || "", namespace: "wallet" }));
    };


    socket.onmessage = (args) => {
        const data = JSON.parse(args.data)
        switch (data.event) {
            case 'wallet_balance_updated':
                dispatch(updateWalletBalance({ bal: data.data.balance, week: data.data.weekly_spend }))
                break;
        }
    };

};



export const getReferralCode = createAsyncThunk(
    "referral/code",
    async () => {
        try {
            const response = await api.get("referral/code");
           return response.data.code
        } catch (error) {
            handleAxiosError(error);
        }
    }
);