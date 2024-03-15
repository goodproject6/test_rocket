"use client"
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { setTranslations } from "../../../redux/utils";
import dashboardTranslation from "../../../utils/translations/dashboard.json";
import SearchHistory from "../../../components/SearchHistory/searchHistory";


const SearchHistoryPage= () => {
  const dispatch = useAppDispatch()
  dispatch(setTranslations(dashboardTranslation));

  const { currentLang, translations } = useAppSelector((state) => state.utils);

  return (
    <div className="bg-dashboard-bg min-h-[100dvh] px-4 lg:px-8 py-8">
     <SearchHistory className="bg-white px-4 sm:px-6 pt-6 sm:pt-12 pb-6 h-full rounded-2xl" currentLang={currentLang} translations={translations} />
    </div>
  );
}

export default SearchHistoryPage