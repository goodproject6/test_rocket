import { createSlice } from "@reduxjs/toolkit";
import { buyCredits, getReferralCode } from "./features";


// Define the state type
interface PaymentState {
    isBuyingCredits: boolean
    walletBalance: string
    weeklySpend: string
    code: string
    isGettingCode: boolean
}

// Define the initial state with the type
const initialState: PaymentState = {
    isBuyingCredits: false,
    walletBalance: "",
    weeklySpend: "",
    code: "",
    isGettingCode: false

};

// Create the slice with the type
export const PaymentSlice = createSlice({
    name: "payment",
    initialState,
    reducers: {
        updateWalletBalance: (state: PaymentState, action) => {
            const { bal, week } = action.payload
            localStorage.setItem("gotCredits", "yes")
            state.walletBalance = bal
            state.weeklySpend = week
        }
    },
    // redux http auto reducers
    extraReducers: (builder) => {
        builder
            // buy credits
            .addCase(buyCredits.pending, (state: PaymentState) => {
                state.isBuyingCredits = true;
            })
            .addCase(buyCredits.rejected, (state: PaymentState) => {
                state.isBuyingCredits = false
            })
            .addCase(buyCredits.fulfilled, (state: PaymentState) => {
                state.isBuyingCredits = false
            })
            // referral code
            .addCase(getReferralCode.pending, (state: PaymentState) => {
                state.isGettingCode = true;
            })
            .addCase(getReferralCode.rejected, (state: PaymentState) => {
                state.isGettingCode = false
            })
            .addCase(getReferralCode.fulfilled, (state: PaymentState, action:any) => {
                state.isGettingCode = false
                state.code = action.payload
            })

    },
});

export default PaymentSlice.reducer;
export const { updateWalletBalance } = PaymentSlice.actions;
