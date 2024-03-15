import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { accSyncStatus, generateSignUpUrl, getUserDetails, requestOtp, submitGeneratedSignUpUrl, updateUserDetails, verifyOtp } from "./features";
import { User } from "./interface";
import { removeUserTokenCookie } from "../../utils/auth/cookieUtility";


// Define the state type
interface AuthState {
    isOtp: boolean
    isUrl: boolean
    isAuthenticated: boolean
    isLoadingUser: boolean
    user: User
    isUpdatingUser: boolean
    accountSynced: boolean

}

// Define the initial state with the type
const initialState: AuthState = {
    isOtp: false,
    isUrl: false,
    isAuthenticated: false,
    isLoadingUser: true,
    user: {},
    isUpdatingUser: false,
    accountSynced: false

};

// Create the slice with the type
export const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        signOut: (state: AuthState) => {
            removeUserTokenCookie();
            state.isAuthenticated = false;
        },
    },
    // redux http auto reducers
    extraReducers: (builder) => {
        builder
            // request otp
            .addCase(requestOtp.pending, (state: AuthState) => {
                state.isOtp = true;
            })
            .addCase(requestOtp.fulfilled, (state: AuthState) => {
                state.isOtp = false;
            })
            .addCase(requestOtp.rejected, (state: AuthState) => {
                state.isOtp = false;

            })
            // verify otp
            .addCase(verifyOtp.pending, (state: AuthState) => {
                state.isOtp = true;
            })
            .addCase(verifyOtp.fulfilled, (state: AuthState) => {
                state.isOtp = false;
                state.isAuthenticated = true;
            })
            .addCase(verifyOtp.rejected, (state: AuthState) => {
                state.isOtp = false;
            })
            // generate signup url
            .addCase(generateSignUpUrl.pending, (state: AuthState) => {
                state.isUrl = true;
            })
            .addCase(generateSignUpUrl.fulfilled, (state: AuthState) => {
                state.isUrl = false;
            })
            .addCase(generateSignUpUrl.rejected, (state: AuthState) => {
                state.isUrl = false;
            })
            // submit generated signup url
            .addCase(submitGeneratedSignUpUrl.pending, (state: AuthState) => {
                state.isUrl = true;
            })
            .addCase(submitGeneratedSignUpUrl.fulfilled, (state: AuthState) => {
                state.isUrl = false;
                state.isAuthenticated = true;
            })
            .addCase(submitGeneratedSignUpUrl.rejected, (state: AuthState) => {
                state.isUrl = false;
            })
            // get user data
            .addCase(getUserDetails.rejected, (state: AuthState) => {
                removeUserTokenCookie();
                state.isLoadingUser = false;
                state.isAuthenticated = false;
            })
            .addCase(
                getUserDetails.fulfilled,
                (state: AuthState, action: PayloadAction<User>) => {
                    state.isLoadingUser = false;
                    state.isAuthenticated = true;
                    state.user = action.payload;
                }
            )
            // update user details
            .addCase(updateUserDetails.pending, (state: AuthState) => {
                state.isUpdatingUser = true
            })
            .addCase(updateUserDetails.rejected, (state: AuthState) => {
                state.isUpdatingUser = false
            })
            .addCase(
                updateUserDetails.fulfilled,
                (state: AuthState, action: PayloadAction<User>) => {
                    state.isUpdatingUser = false
                    state.user = action.payload;
                }
            )
            // get acc sync status
            .addCase(accSyncStatus.rejected, (state: AuthState) => {
                state.accountSynced = false
            })
            .addCase(
                accSyncStatus.fulfilled,
                (state: AuthState) => {
                    state.accountSynced = true
                }
            )

    },
});

export default AuthSlice.reducer;
export const { signOut } = AuthSlice.actions;
