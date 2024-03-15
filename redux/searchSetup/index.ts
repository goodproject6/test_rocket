import { createSlice } from "@reduxjs/toolkit";
import { createOrUpdateStartSchedule, fetchLocations, fetchSearchSettings, retriveStartSchedule, updateLocation, updateSearchSettings } from "./features";
import { Locations, SearchSettings } from "./interface";


// Define the state type
interface SearchSetupState {
    locations: Locations[]
    isFetchingLocations: boolean
    isFetchingSearchSettings: boolean
    searchSettings: SearchSettings
    isUpdatingSearchSettings: { type: string, value: boolean }
    isUpdatingLocation: { type: string, value: boolean }
    should_start_at: string
    isFetchingStartSchedule: boolean
    isUpdatingStartSchedule: boolean

}

// Define the initial state with the type
const initialState: SearchSetupState = {
    locations: [],
    isFetchingLocations: false,
    isFetchingSearchSettings: false,
    searchSettings: {},
    isUpdatingSearchSettings: { type: "", value: false },
    isUpdatingLocation: { type: "", value: false },
    should_start_at: "",
    isFetchingStartSchedule: false,
    isUpdatingStartSchedule: false

};

// Create the slice with the type
export const SearchSetupSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setUpdatingSearchSettings: (state: SearchSetupState, action) => {
            state.isUpdatingSearchSettings = { value: true, type: action.payload }
        },
        setUpdatingLocation: (state: SearchSetupState, action) => {
            state.isUpdatingLocation = { value: true, type: action.payload }
        }
    },
    // redux http auto reducers
    extraReducers: (builder) => {
        builder
            // fetch locations
            .addCase(fetchLocations.pending, (state: SearchSetupState) => {
                state.isFetchingLocations = true;
            })
            .addCase(fetchLocations.fulfilled, (state: SearchSetupState, action) => {
                state.isFetchingLocations = false;
                state.locations = action.payload
            })
            .addCase(fetchLocations.rejected, (state: SearchSetupState) => {
                state.isFetchingLocations = false;

            })
            // fetch search settings
            .addCase(fetchSearchSettings.pending, (state: SearchSetupState) => {
                state.isFetchingSearchSettings = true;
            })
            .addCase(fetchSearchSettings.fulfilled, (state: SearchSetupState, action) => {
                state.isFetchingSearchSettings = false;
                state.searchSettings = action.payload
            })
            .addCase(fetchSearchSettings.rejected, (state: SearchSetupState) => {
                state.isFetchingSearchSettings = false;

            })
            // update search settings
            .addCase(updateSearchSettings.fulfilled, (state: SearchSetupState, action) => {
                state.isUpdatingSearchSettings = { value: false, type: "" }
                state.searchSettings = action.payload
            })
            .addCase(updateSearchSettings.rejected, (state: SearchSetupState) => {
                state.isUpdatingSearchSettings = { value: false, type: "" }
            })
            // update locations
            .addCase(updateLocation.fulfilled, (state: SearchSetupState, action) => {
                const updatedLocations = state.locations.map(location => {
                    if (location.uid === action.payload.uid) {
                        return { ...location, ...action.payload };
                    } else {
                        return location;
                    }
                });
                state.isUpdatingLocation = { value: false, type: "" }
                state.locations = updatedLocations;
            })
            .addCase(updateLocation.rejected, (state: SearchSetupState) => {
                state.isUpdatingSearchSettings = { value: false, type: "" }
            })
            // fetch start search schedule
            .addCase(retriveStartSchedule.pending, (state: SearchSetupState) => {
                state.isFetchingStartSchedule = true
            })
            .addCase(retriveStartSchedule.fulfilled, (state: SearchSetupState, action) => {
                state.isFetchingStartSchedule = false
                state.should_start_at = action.payload.should_start_at
            })
            .addCase(retriveStartSchedule.rejected, (state: SearchSetupState) => {
                state.isFetchingStartSchedule = false

            })
            // Create or update start search schedule
            .addCase(createOrUpdateStartSchedule.pending, (state: SearchSetupState) => {
                state.isUpdatingStartSchedule = true
            })
            .addCase(createOrUpdateStartSchedule.fulfilled, (state: SearchSetupState, action) => {
                state.isUpdatingStartSchedule = false
                state.should_start_at = action.payload.should_start_at
            })
            .addCase(createOrUpdateStartSchedule.rejected, (state: SearchSetupState) => {
                state.isUpdatingStartSchedule = false

            })
    },
});

export default SearchSetupSlice.reducer;
export const { setUpdatingSearchSettings, setUpdatingLocation } = SearchSetupSlice.actions;
