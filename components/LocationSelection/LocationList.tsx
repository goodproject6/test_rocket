"use client";
import React, { useEffect, useState } from "react";
import LocationDetail from "./LocationDetail";
import { Language } from "../../redux/utils/interface";
import { fetchLocations } from "../../redux/searchSetup/features";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import CustomFilters from "../Modals/customFilters";
import Iconify from "../Elements/icon";



export default function LocaltionList({ className, currentLang, translations }: { className?: string, currentLang: Language, translations: any}) {

  const dispatch = useAppDispatch()

  const [selectedLocation, setSelectedLocation] = useState({ uid: "", name: "" })

  const { locations, isFetchingLocations } =
    useAppSelector((state) => state.searchSetup);

  const { user } =
    useAppSelector((state) => state.auth);


  const { show } =
    useAppSelector((state) => state.utils);

  useEffect(() => {
    // fetch locations
    dispatch(fetchLocations())

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])




  return (
    <div className={className}>
      <p className="font-bold text-gray-500 mb-5">{translations[currentLang.alias]["timezone"]}: {user.iana ? user.iana: "N/A"}</p>
      <div>
        {isFetchingLocations ? <div className="h-full rounded-[20px] flex flex-col justify-center items-center py-10 lg:py-20">
            <div className="space-y-8 text-center font-semibold">
              <Iconify
                icon="ph:circles-three"
                className="text-2xl mx-auto animate-spin text-gray-500"
              />
            </div>
          </div> :
          <div className="max-h-[90vh] overflow-y-auto pb-6">
            <ul>
              {locations.map((location, index) => (
                <LocationDetail
                  key={index}
                  localtionName={location?.name || ""}
                  isSelected={location?.is_selected}
                  customFilter={translations[currentLang.alias]["customFilters"]}
                  customFilterIsSelected={location?.is_custom_filters_enabled
                  }
                  uid={location.uid}
                  edit={(data) => {
                    setSelectedLocation(data)
                  }}
                  currentLang={currentLang}
                  translations={translations}

                />
              ))}
            </ul>
          </div>
        }
      </div>
      {show === "customFilter" && <CustomFilters selectedLocation={selectedLocation} />}
    </div>
  );
}
