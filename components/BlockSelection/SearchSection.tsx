"use client";
import React, { ChangeEvent } from "react";
import { Button, Checkbox } from "@nextui-org/react";
import Iconify from "../Elements/icon";
import { Language } from "../../redux/utils/interface";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { handleUpdateSearchSettings } from "../../utils/helper/search/updateSearchSettings";
import { generateUniqueId } from "../GenerateUUID";
import { addAlert, removeAlert } from "../../redux/alert";
import useReCaptcha from "../../hooks/useReCaptcha";
import {  startSearch, stopSearch } from "../../redux/search/features";
import { STARTING_SEARCH, errorMsg } from "../../utils/constant";



const SearchSection = ({ currentLang, translations }: { className?: string, currentLang: Language, translations: any}) => {

  const { searchSettings, isUpdatingSearchSettings, isFetchingSearchSettings, } =
    useAppSelector((state) => state.searchSetup);


  const { generateReCaptchaToken } = useReCaptcha();



  const { isStartingSearch, searchStatus, isGettingSearchStatus, isStoppingSearch } =
    useAppSelector((state) => state.search);


  const dispatch = useAppDispatch()

  const handleSolveCaptchaChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleUpdateSearchSettings(dispatch,
      { ...searchSettings, solve_captcha: event.target.checked },
      "captcha",
      "Solve Captcha"
    )
  };


  const handleAutoStartSearch = (event: ChangeEvent<HTMLInputElement>) => {
    handleUpdateSearchSettings(dispatch,
      { ...searchSettings, auto_resume: event.target.checked },
      "auto-resume",
      "Auto Restart Search"
    )
  };



  // Start search
  const handleStartSearch = async (
    dispatch: ReturnType<typeof useAppDispatch>
  ) => {
    const alertId = generateUniqueId()
    dispatch(
      addAlert({
        id: alertId,
        type: "info",
        message:  STARTING_SEARCH,
        autoClose: false,
        icon: "mingcute:loading-line",
        spin: true,
      })
    );
    // generate recaptcha token
    const recaptcha_token = await generateReCaptchaToken("login");
    const actionResult = await dispatch(startSearch(recaptcha_token));
    if (startSearch.rejected.match(actionResult)) {
      if (actionResult.error) {
        const errorCode = parseInt(actionResult.error.message || "")
        dispatch(
          addAlert({
            message: errorCode === 429 ? "Too many requests" : errorMsg("en"),
            type: "error",
          })
        );
      }
    }
    dispatch(removeAlert(alertId));
  };


  // Stop search
  const handleStopSearch = async (
    dispatch: ReturnType<typeof useAppDispatch>
  ) => {
    const alertId = generateUniqueId()
    dispatch(
      addAlert({
        id: alertId,
        type: "info",
        message: "Stopping...",
        autoClose: false,
        icon: "mingcute:loading-line",
        spin: true,
      })
    );
    const actionResult = await dispatch(stopSearch(dispatch));
    if (stopSearch.rejected.match(actionResult)) {
      if (actionResult.error) {
        const errorCode = parseInt(actionResult.error.message || "")
        dispatch(
          addAlert({
            message: errorCode === 429 ? "Too many requests" :errorMsg("en"),
            type: "error",
          })
        );
      }

    }
    dispatch(removeAlert(alertId));
  };



  return (
    <div className="space-y-5">

      <div className="">
        {searchStatus === "stopped" ? <Button className="bg-theme text-white flex items-center font-medium text-xl py-6 px-10 w-full" onClick={() => {
          handleStartSearch(dispatch)
        }}
          isDisabled={isGettingSearchStatus || isStartingSearch}
        >
          {isStartingSearch ? <Iconify icon="mingcute:loading-line" /> : <><Iconify icon="iconamoon:search-bold" /><p>{translations[currentLang.alias]["startSearch"]}</p></>}
        </Button>
          : <Button className="bg-red-600 text-white flex items-center font-medium text-xl py-6 px-10 w-full" onClick={() => {
            handleStopSearch(dispatch)
          }}
          isDisabled={isGettingSearchStatus || isStoppingSearch}
          >
          {searchStatus === "attempting" ? "Stopping Search" : "Stop"}
          </Button>}

      </div>
      <div>
        <Checkbox
          isSelected={searchSettings.solve_captcha}
          size="md"
          color="danger"
          radius="md"
          aria-label="custom checkbox"
          onChange={handleSolveCaptchaChange}
          isDisabled={isFetchingSearchSettings || searchStatus === "attempting" || searchStatus === "ongoing"}
        >
          <div className="flex items-center text-sm sm:text-base space-x-1">
            <p>{translations[currentLang.alias]["autoSolveCaptcha"]}</p>
            {isUpdatingSearchSettings.value && isUpdatingSearchSettings.type === "captcha" && <Iconify
              icon="mingcute:loading-line"
              className="animate-spin text-xl text-theme"
            />}
          </div>
        </Checkbox>
      </div>

      <div>
        <Checkbox
          isSelected={searchSettings.auto_resume}
          size="md"
          color="danger"
          radius="md"
          aria-label="auto search"
          onChange={handleAutoStartSearch}
          isDisabled={isFetchingSearchSettings || searchStatus === "attempting" || searchStatus === "ongoing"}
        >
          <div className="flex items-center text-sm sm:text-base space-x-1">
            <p>{translations[currentLang.alias]["autoSearch"]}</p>
            {isUpdatingSearchSettings.value && isUpdatingSearchSettings.type === "auto-resume" && <Iconify
              icon="mingcute:loading-line"
              className="animate-spin text-xl text-theme"
            />}
          </div>
        </Checkbox>
      </div>
    </div>
  );
}

export default SearchSection