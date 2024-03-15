"use client";
import React, { ChangeEvent, useState } from "react";
import { Checkbox } from "@nextui-org/react";
import Iconify from "../Elements/icon";
import { handleUpdateLocation } from "../../utils/helper/search/updateLocations";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import OptionMenu from "./optionMenu";
import { showItem } from "../../redux/utils";



export default function LocationDetail({
  localtionName,
  isSelected,
  customFilter,
  customFilterIsSelected,
  uid,
  edit,
  currentLang,
  translations
}: {
  localtionName: string;
  isSelected: boolean;
  customFilter: string;
  customFilterIsSelected: boolean;
  uid: string,
  currentLang:any,
  translations:any
  edit: (args: any) => void
}) {
  const dispatch = useAppDispatch()

  const { isUpdatingLocation } =
    useAppSelector((state) => state.searchSetup);


  const [isUpdating, setIsUpdating] = useState(false);



  const updateLocation = (e: ChangeEvent<HTMLInputElement>) => {
    setIsUpdating(true);
    dispatch(showItem(""))
    handleUpdateLocation(dispatch, { is_selected: e.target.checked, is_custom_filters_enabled: customFilterIsSelected, uid }, "location", "Location")
      .finally(() => setIsUpdating(false));
  };


  const updateCustomLocation = (e: ChangeEvent<HTMLInputElement>) => {
    setIsUpdating(true);
    handleUpdateLocation(dispatch, { is_selected: isSelected, is_custom_filters_enabled: e.target.checked, uid }, "custom-location", "Custom Location")
      .finally(() => setIsUpdating(false));
  };

  return (
    <li
      className={
        "flex items-center justify-between px-3 sm:px-4 py-4 space-x-4 text-custom-gray shadow-md shadow-slate-200 mb-10 last-of-type:mb-0 rounded-md text-xs sm:text-base"
      }
    >
      <div className="flex items-center space-x-3 justify-between flex-1">
        <p className="text-sm w-20 md:w-auto">{localtionName}</p>
        {isUpdating && isUpdatingLocation.value && isUpdatingLocation.type === "location" ? <Iconify
          icon="mingcute:loading-line"
          className="animate-spin text-xl text-theme"
        /> : <Checkbox
          isSelected={isSelected}
          size="md"
          color="danger"
          aria-label="danger checkbox"
          onChange={updateLocation}
          classNames={{ base: ["justify-self-end"] }}
        ></Checkbox>}

      </div>
      <span className="h-4 w-[1px] bg-stone-300"></span>
      <p className="text-sm truncate">{customFilter}</p>
      <OptionMenu
        uid={uid}
        enable={
          <div
            className="hover:bg-gray-100 px-3 h-8 flex items-center gap-3 rounded cursor-pointer"
            onClick={()=>{
            setIsUpdating(true);
            handleUpdateLocation(dispatch, {is_selected: isSelected, is_custom_filters_enabled:!customFilterIsSelected, uid }, "custom-location", "Custom Location")
            .finally(() => setIsUpdating(false));
            }}
          >
            {
              isUpdating && isUpdatingLocation.value && isUpdatingLocation.type === "custom-location" ?
                <Iconify
                  icon="mingcute:loading-line"
                  className="animate-spin text-xl text-theme"
                /> : 
                <Checkbox
                  isSelected={customFilterIsSelected}
                  size="md"
                  aria-label="custom checkbox"
                  onChange={updateCustomLocation}
                > 
                </Checkbox>
            }
            <p className="text-sm">{customFilterIsSelected ? translations[currentLang.alias]["disable"] : translations[currentLang.alias]["enable"] }</p>
          </div>
        }
        edit={
         customFilterIsSelected && 
        <div
         className="hover:bg-gray-100 px-3 h-8 flex items-center gap-3 rounded cursor-pointer"
         onClick={() => {
          dispatch(showItem("customFilter"))
          edit({ uid, name: localtionName })
        }}
       >
         {
          <div>
             <Iconify icon="tabler:edit" className="text-lg text-mute" />
           </div>
         }
         <p className="text-sm">{translations[currentLang.alias]["customize"]}</p>
       </div>
        }
        isSelected={isSelected}
      />
    </li>
  );
}
