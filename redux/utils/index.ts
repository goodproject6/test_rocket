import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Language } from "./interface";


// Define the state type
interface UtilState {
  currentLang: Language
  langugages: Language[]
  translations: any;
  show?: string | null;
  activeFilter: any
}

// Define the initial state with the type
const initialState: UtilState = {
  langugages: [{ name: "English", alias: "en" }, { name: "Espanõl", alias: "es" }],
  currentLang: typeof window !== 'undefined' && localStorage.getItem("currentLang") ? JSON.parse(localStorage.getItem("currentLang") || "") : { name: "English", alias: "en" },
  translations: {},
  show: null,
  activeFilter: {
    num: 1,
    name: "Select Locations"
  }
};

// Create the slice with the type
export const UtilSlice = createSlice({
  name: "utils",
  initialState,
  reducers: {
    setLanguage: (state: UtilState, action: PayloadAction<Language>) => {
      localStorage.setItem("currentLang", JSON.stringify(action.payload))
      state.currentLang = action.payload;
    },
    setTranslations: (state: UtilState, action: PayloadAction<any>) => {
      state.translations = action.payload;
    },
    showItem: (state: UtilState, action: PayloadAction<string | null>) => {
      if (state.show === action.payload) {
        state.show = null;
      } else {
        state.show = action.payload;
      }
    },
    setActiveFilter:(state: UtilState, action)=>{
     state.activeFilter = action.payload
    }
  },

});

export default UtilSlice.reducer;
export const { setLanguage, setTranslations, showItem, setActiveFilter } = UtilSlice.actions;
