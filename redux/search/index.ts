import { createSlice } from "@reduxjs/toolkit";
import { cancelBlock, getBlockMangement, getSearchHistory, getSearchStatus, startSearch, stopSearch } from "./features";
import { Block, Pagination } from "./interface";




// Define the state type
interface SearchState {
    isStartingSearch: boolean
    isStoppingSearch: boolean
    searchStatus: "stopped" | "attempting" | "ongoing"
    isGettingSearchStatus: boolean
    blockFeeds: Block[],
    filteredBlockFeeds: Block[]
    searchHistory: Block[]
    isGettingSearchHistory: boolean
    searchHistoryPagination: Pagination,
    blockManagement: Block[],
    isGettingBlockManagement: boolean
    isCancellingBlock: boolean
}

// Define the initial state with the type
const initialState: SearchState = {
    isStoppingSearch: false,
    isStartingSearch: false,
    searchStatus: "stopped",
    isGettingSearchStatus: false,
    blockFeeds: [],
    filteredBlockFeeds: [],
    searchHistory: [],
    isGettingSearchHistory: false,
    searchHistoryPagination: {},
    blockManagement: [
        
      ],
    isGettingBlockManagement: false,
    isCancellingBlock: false
};

// Create the slice with the type
export const SearchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setStartSearch: (state: SearchState, action) => {
            state.searchStatus = action.payload
            state.isStartingSearch = false;
        },
        setStopSearch: (state: SearchState, action) => {
            state.searchStatus = action.payload
            state.isStoppingSearch = false
        },
        updateBlockFeeds: (state: SearchState, action) => {
            state.blockFeeds = action.payload
        },
        setFilteredBlocks: (state: SearchState, action) => {
            state.filteredBlockFeeds = action.payload
        }
    },
    // redux http auto reducers
    extraReducers: (builder) => {
        builder
            // start search
            .addCase(startSearch.pending, (state: SearchState) => {
                state.isStartingSearch = true;
            })
            .addCase(startSearch.rejected, (state: SearchState) => {
                state.isStartingSearch = false
            })
            // stop search
            .addCase(stopSearch.pending, (state: SearchState) => {
                state.isStoppingSearch = true;
            })
            .addCase(stopSearch.fulfilled, (state: SearchState, action) => {
                state.searchStatus = "attempting"
            })
            .addCase(stopSearch.rejected, (state: SearchState) => {
                state.isStoppingSearch = false
            })
            // search details
            .addCase(getSearchStatus.pending, (state: SearchState) => {
                state.isGettingSearchStatus = true;
            })
            .addCase(getSearchStatus.fulfilled, (state: SearchState, action) => {
                const { is_attempting_to_stop } = action.payload
                state.isGettingSearchStatus = false;
                state.searchStatus = is_attempting_to_stop ? "stopped" : "ongoing"
            })
            .addCase(getSearchStatus.rejected, (state: SearchState) => {
                state.isGettingSearchStatus = false
            })
            // search history
            .addCase(getSearchHistory.pending, (state: SearchState) => {
                state.isGettingSearchHistory = true;
                state.searchHistory = []
                state.searchHistoryPagination = {}
            })
            .addCase(getSearchHistory.fulfilled, (state: SearchState, action) => {
                const { blocks, pagination } = action.payload
                state.isGettingSearchHistory = false
                state.searchHistory = blocks
                state.searchHistoryPagination = pagination
            })
            .addCase(getSearchHistory.rejected, (state: SearchState) => {
                state.isGettingSearchHistory = false
            })
            // block management
            .addCase(getBlockMangement.pending, (state: SearchState) => {
                state.isGettingBlockManagement = true;
            })
            .addCase(getBlockMangement.fulfilled, (state: SearchState, action) => {
                state.isGettingBlockManagement = false
                 state.blockManagement = action.payload
            })
            .addCase(getBlockMangement.rejected, (state: SearchState) => {
                state.isGettingBlockManagement = false
            })
            // cancel block
            .addCase(cancelBlock.pending, (state: SearchState) => {
                state.isCancellingBlock = true;
            })
            .addCase(cancelBlock.fulfilled, (state: SearchState, action) => {
                state.isCancellingBlock = false
            })
            .addCase(cancelBlock.rejected, (state: SearchState) => {
                state.isCancellingBlock = false
            })
    },
});

export default SearchSlice.reducer;
export const { setStartSearch, setStopSearch, updateBlockFeeds, setFilteredBlocks } = SearchSlice.actions;
