import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/auth/api";
import { handleAxiosError } from "../../utils/auth/errorHandler";
import { getUserTokenCookie } from "../../utils/auth/cookieUtility";
import { setStartSearch, setStopSearch, updateBlockFeeds } from ".";
import moment from "moment";
import { generateUniqueId } from "../../components/GenerateUUID";
import { addAlert, removeAlert } from "../alert";
import { FINDING_BLOCKS } from "../../utils/constant";
import { SearchHistory } from "./interface";



export const startSearch = createAsyncThunk(
  "search/start",
  async (recaptcha_token: string) => {
    try {
      const response = await api.post("search", { recaptcha_token });
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  }
);

export const stopSearch = createAsyncThunk(
  "search/stop",
  async (dispatch: any) => {
    dispatch(removeAlert(localStorage.alertId));
    localStorage.removeItem("alertId")
    try {
      const response = await api.delete("search");
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  }
);





// Get search status
export const getSearchStatus = createAsyncThunk(
  "search/get",
  async (dispatch: any) => {
    try {
      const response = await api.get("search");
      const { is_attempting_to_stop } = response.data
      if (!is_attempting_to_stop) {
        const alertIdStarted = generateUniqueId()
        localStorage.setItem("alertId", alertIdStarted)
        dispatch(
          addAlert({
            id: alertIdStarted,
            type: "info",
            message: FINDING_BLOCKS,
            autoClose: false,
            icon: "mingcute:loading-line",
            spin: true,
          })
        );
      }
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  }
);




// WebSocket connection for search
export const connectSearchWebSocket = (dispatch: any) => {
  const socket = new WebSocket('wss://updator-l25eeg7pxq-uk.a.run.app');

  socket.onopen = () => {
    console.log("WebSocket connected");
    // Send the access token message after connecting
    socket.send(JSON.stringify({ access_token: getUserTokenCookie() || "", namespace: "search" }));
  };




  socket.onmessage = (args) => {
    const data = JSON.parse(args.data)
    switch (data.event) {
      case 'search_started':
        const alertIdStarted = generateUniqueId()
        localStorage.setItem("alertId", alertIdStarted)
        dispatch(
          addAlert({
            id: alertIdStarted,
            type: "info",
            message: FINDING_BLOCKS,
            autoClose: false,
            icon: "mingcute:loading-line",
            spin: true,
          })
        );
        dispatch(setStartSearch("ongoing"))
        break;
      case 'search_stopped_manually':
      case "search_stopped":
        dispatch(setStopSearch("stopped"))
        break;
      case "search_accepted_a_block":
        const alertId = generateUniqueId()
        dispatch(
          addAlert({
            id: alertId,
            type: "success",
            message: "A block was accepted",
          })
        );
        dispatch(setStopSearch("stopped"))
      case "feed_updated":
        dispatch(updateBlockFeeds(data.data))
        break;

    }
  };

  socket.onerror = (error) => {
    dispatch(setStopSearch("stopped"))
  };

  socket.onclose = () => {
    dispatch(setStopSearch("stopped"))
  };
};





// formatter 2
export const formattedTimestamp1 = (timestamp: string) => {
  return moment(timestamp).format("dddd, MMMM D, YYYY");
};

// formatter 3
export const formattedTimestamp2 = (timestamp: string) => {
  return moment(timestamp).format("h:mm A z");
};

// formatter 4
export const formattedTimestamp3 = (timestamp: string) => {
  const momentTimestamp = moment().startOf("day").add(timestamp, "minutes");
  return momentTimestamp.format("H:mm [Hrs]");
};





// get search history
export const getSearchHistory = createAsyncThunk(
  "search/history",
  async ({ result, page = 1 }: SearchHistory) => {
    try {
      const response = await api.get("search/history", {
        params: {
          result,
          page
        },
      });
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  }
);


// block management
export const getBlockMangement = createAsyncThunk(
  "blocks/management",
  async () => {
    try {
      const response = await api.get("blocks/management");
      return response.data
    } catch (error) {
      handleAxiosError(error);
    }
  }
);


export const cancelBlock = createAsyncThunk(
  "blocks/management/:id",
  async (uuid: string) => {
    try {
      const response = await api.delete(`blocks/management/${uuid}`);
      return response.data
    } catch (error) {
      handleAxiosError(error);
    }
  }
);