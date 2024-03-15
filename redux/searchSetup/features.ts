import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/auth/api";
import { handleAxiosError } from "../../utils/auth/errorHandler";
import { CreateOrUpdateSchedule, Locations, SearchSettings } from "./interface";


// Fetch locations
export const fetchLocations = createAsyncThunk(
    "search/service_areas",
    async () => {
        try {
            const response = await api.get("search/service_areas");
            return response.data;
        } catch (error) {
            handleAxiosError(error);
        }
    }
);


// Update a location
export const updateLocation = createAsyncThunk(
    "search/service_areas/uid",
    async ({ uid, is_selected, is_custom_filters_enabled }: Locations) => {
        try {
            const response = await api.patch(`search/service_areas/${uid}`, {
                is_custom_filters_enabled,
                is_selected
            })
            return response.data;
        } catch (error) {
            handleAxiosError(error);
        }
    }
);

// Fetch search settings
export const fetchSearchSettings = createAsyncThunk(
    "search/settings",
    async () => {
        try {
            const response = await api.get("search/settings");
            return response.data;
        } catch (error) {
            handleAxiosError(error);
        }
    }
);


// Update search settings
export const updateSearchSettings = createAsyncThunk(
    "search/settings/update",
    async (payload: SearchSettings) => {
        try {
            const response = await api.patch("search/settings", payload);
            return response.data;
        } catch (error) {
            handleAxiosError(error);
        }
    }
);

// Retrieve start schedule
export const retriveStartSchedule = createAsyncThunk(
    "search/schedule_start",
    async () => {
        try {
            const response = await api.get("search/schedule_start");
            return response.data;
        } catch (error) {
            handleAxiosError(error);
        }
    }
);


// Create or update start schedule
export const createOrUpdateStartSchedule = createAsyncThunk(
    "search/schedule_start/patch",
    async (payload: string) => {
        try {
            const response = await api.patch("search/schedule_start", {should_start_at:payload});
            return response.data;
        } catch (error) {
            handleAxiosError(error);
        }
    }
);

