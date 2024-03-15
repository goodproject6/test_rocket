"use client";
import Iconify from "../Elements/icon";
import {
  Input,
  Button,
} from "@nextui-org/react";
import DoubleSlider from "../Elements/Common/DoubleSlider";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Language } from "../../redux/utils/interface";
import SearchSection from "../BlockSelection/SearchSection";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { showItem } from "../../redux/utils";
import { fetchSearchSettings } from "../../redux/searchSetup/features";
import { SearchSettings } from "../../redux/searchSetup/interface";
import { isObjectEmpty } from "./isObjectEmpty";
import { handleUpdateSearchSettings } from "../../utils/helper/search/updateSearchSettings";



const FilterSection = (props: {
  className?: string;
  children?: React.ReactNode;
  currentLang: Language, translations: any,
}) => {
  const { currentLang, translations, } = props


  const { searchSettings, isFetchingSearchSettings, isUpdatingSearchSettings, isFetchingStartSchedule } =
    useAppSelector((state) => state.searchSetup);



  const [disableSaveFilters, setEDisableSaveFilters] = useState(true)


  const [range, setRange] = useState<number[]>([]);

  useEffect(() => {
    if (searchSettings.min_block_time !== undefined && searchSettings.max_block_time !== undefined) {
      setRange([
        searchSettings.min_block_time,
        searchSettings.max_block_time,
      ]);
    }
  }, [searchSettings.min_block_time, searchSettings.max_block_time]);


  const { searchStatus } =
    useAppSelector((state) => state.search);





  // Data
  const [formData, setFormData] = useState<SearchSettings>({
    min_hourly_pay: "",
    min_overall_pay: "",
    max_block_time: 0,
    min_block_time: 0,
    min_lead_time: "",
    delay: "",
  });


  useEffect(() => {
    if (isObjectEmpty(searchSettings)) {
      dispatch(fetchSearchSettings());
    }
    setFormData(searchSettings)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchSettings])


  // Methods
  function submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  const router = useRouter();

  const dispatch = useAppDispatch()




  const handleUpdateFilters = () => {
    handleUpdateSearchSettings(dispatch,
      {
        ...formData, min_block_time: range[0],
        max_block_time: range[1],
      },
      "filters",
      "Filters"
    )
    setEDisableSaveFilters(true)
  };




  // convert range back to minutes before sending to BE
  function decimalHoursToMinutes(decimalHours: any) {
    var minutes = decimalHours * 60;
    return minutes;
  }

  const saveChanges = (newRange: any) => {
    setRange([
      parseInt(decimalHoursToMinutes(newRange[0]) as any),
      parseInt(decimalHoursToMinutes(newRange[1]) as any),
    ]);
  };

  const [showTooltip, setShowTooltip] = useState(false);


  const handleThumbMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleThumbMouseLeave = () => {
    setShowTooltip(false);
  };

  const getBackgroundStyle = () => {
    const threshold = 0.2;
    const percent =
      formData.delay >= threshold ? ((formData.delay - threshold) / (10 - threshold)) * 100 : 0;
    return `linear-gradient(to right, #007AFE ${percent}%, #DDDDDD ${percent}%)`;
  };



  // for mobile device hover
  const handleTouchStart = () => {
    setShowTooltip(true);
  };


  const handleChange = (e: any) => {
    setEDisableSaveFilters(false)
    setFormData({ ...formData, delay: parseFloat(e.target.value) })
  };

  // Jsx
  return (
    <div className={props.className}>
      {props.children && <div>{props.children}</div>}

      <SearchSection currentLang={currentLang} translations={translations} />

      <div
        className="text-danger border border-danger rounded-lg flex items-center justify-between py-2.5 px-5 lg:px-3 xl:px-5 cursor-pointer lg:text-xs xl:text-base"
        onClick={() => {
          if (isFetchingStartSchedule || searchStatus === "attempting" || searchStatus === "ongoing") return
          dispatch(showItem("futureSearch"))
        }}
      >
        <p>{translations[currentLang.alias]["scheduleSearch"]}</p>
        <Iconify icon="ant-design:right-outlined" />
      </div>

      <div className="mt-5">
        <div
          className="text-danger border border-danger rounded-lg flex items-center justify-between py-2.5 px-5 lg:px-3 xl:px-5 cursor-pointer lg:text-xs xl:text-base"
          onClick={() => {
            if (isFetchingSearchSettings || searchStatus === "attempting" || searchStatus === "ongoing") return
            router.push("/dashboard/time-filters")
          }}
        >
          <p>
          {translations[currentLang.alias]["timeFilters"]}
          </p>
          <Iconify icon="ant-design:right-outlined" />
        </div>
      </div>

      {/* Input forms */}
      <form onSubmit={submitForm} className="mt-5 lg:text-xs xl:text-base">
        <div>
          <label
            htmlFor="hourly_pay"
            className="text-custom-gray flex items-center space-x-2"
          >
            <p>{translations[currentLang.alias]["minimumHourlyPay"]}</p>
          </label>
          <Input
            onChange={(e) => {
              setEDisableSaveFilters(false)
              const value = parseInt(e.target.value);
              setFormData({ ...formData, min_hourly_pay: value });
            }}
            value={formData.min_hourly_pay}
            id="hourly_pay"
            aria-label="hourly pay"
            placeholder="0.00"
            labelPlacement="outside"
            variant="bordered"
            className="mt-1 mb-3"
            classNames={{
              inputWrapper: ["rounded-lg border"],
              input: ["py-5"],
            }}
            endContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 ">$</span>
              </div>
            }
            readOnly={isFetchingSearchSettings || searchStatus === "attempting" || searchStatus === "ongoing"}
          />
          <hr />
        </div>
        <div className="mt-5">
          <label
            htmlFor="offer_pay"
            className="text-custom-gray flex items-center space-x-2"
          >
            <p>{translations[currentLang.alias]["minimumOfferPay"]}</p>

          </label>
          <Input
            type="number"
            id="offer_pay"
            value={formData.min_overall_pay}
            onChange={(e) => {
              setEDisableSaveFilters(false)
              const value = parseInt(e.target.value);
              setFormData({ ...formData, min_overall_pay: value });
            }}
            aria-label="offer pay"
            placeholder="0.00"
            labelPlacement="outside"
            variant="bordered"
            className="mt-1 mb-3"
            classNames={{
              inputWrapper: ["rounded-lg border"],
              input: ["py-5"],
            }}
            endContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 ">$</span>
              </div>
            }
            readOnly={isFetchingSearchSettings || searchStatus === "attempting" || searchStatus === "ongoing"}
          />
          <hr />
        </div>
        <div className="mt-5">
          <label
            htmlFor="block_duration"
            className="text-custom-gray flex items-center space-x-2"
          >
            <p>{translations[currentLang.alias]["blockDuration"]}</p>

          </label>
          <div className="mt-1 mb-3">
            <DoubleSlider
              setEDisableSaveFilters={setEDisableSaveFilters}
              saveChanges={saveChanges}
              disabled={isFetchingSearchSettings || searchStatus === "attempting" || searchStatus === "ongoing"}
            />
          </div>
          <hr />
        </div>
        <div className="mt-5">
          <label
            htmlFor="arrival_time"
            className="text-custom-gray flex items-center space-x-2"
          >
            <p>{translations[currentLang.alias]["arrivalTime"]}</p>

          </label>
          <Input
            type="number"
            id="arrival_time"
            value={formData.min_lead_time}
            onChange={(e) => {
              setEDisableSaveFilters(false)
              const value = parseInt(e.target.value);
              setFormData({ ...formData, min_lead_time: value });
            }}
            placeholder="0.00"
            aria-label="Arrival time"
            labelPlacement="outside"
            variant="bordered"
            className="mt-1 mb-3"
            classNames={{
              inputWrapper: ["rounded-lg border"],
              input: ["py-5"],
            }}
            endContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 ">{translations[currentLang.alias]["minutes"]}</span>
              </div>
            }
            readOnly={isFetchingSearchSettings || searchStatus === "attempting" || searchStatus === "ongoing"}
          />
          <hr />
        </div>
        <div className="mt-5">
          <label
            htmlFor="refresh_speed"
            className="text-custom-gray flex items-center space-x-2"
          >
            <p>{translations[currentLang.alias]["refreshSpeed"]}</p>

          </label>
          <div className="relative">
            <input
              type="range"
              min={0.2}
              max={10}
              step={0.1}
              value={formData.delay}
              onChange={handleChange}
              onMouseOver={handleThumbMouseEnter}
              onMouseLeave={handleThumbMouseLeave}
              onTouchStart={handleTouchStart}
              className="w-full h-4 rounded-md focus:outline-none mt-4 custom-range"
              style={{ background: getBackgroundStyle() }}
              id="myInput"
              disabled={isFetchingSearchSettings || searchStatus === "attempting" || searchStatus === "ongoing"}
            />
            {showTooltip && (
              <div className="bg-light-theme shadow-sm text-active w-max p-2 rounded-lg tooltip text-sm">
                {formData.delay} {translations[currentLang.alias]["seconds"]}
              </div>
            )}
            <style>
              {`
        .custom-range {
          -webkit-appearance: none; /* Remove default styles for Safari */
          width: 100%;
          height: 8px;
          background-color: #ddd;
          border-radius: 5px;
          outline: none;
        }
        
        .custom-range::-webkit-slider-thumb {
          -webkit-appearance: none; /* Remove default thumb styles for Safari */
          width: 17px;
          height: 17px;
          background-color: #007AFF;
          border-radius: 50%;
          cursor: pointer;
        }
        
        .custom-range::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background-color: #888;
          border-radius: 50%;
          cursor: pointer;
        }
        
        .custom-range::-ms-thumb {
          width: 20px;
          height: 20px;
          background-color: #888;
          border-radius: 50%;
          cursor: pointer;
        }
    
        .tooltip {
          position: absolute;
          top: -25px;
          left: calc(${10 * formData.delay}% - 50px);
          display: inline-block;
          padding: 4px 8px;
          border-radius: 4px;
        
      }
        `}
            </style>
          </div>
        </div>
        <div className="mt-6">
          <Button
            type="submit"
            className="bg-dark-blue text-white rounded-md w-full"
            onClick={() => {
              handleUpdateFilters()
            }}
            isLoading={isUpdatingSearchSettings.value && isUpdatingSearchSettings.type === "filters"}
            isDisabled={isFetchingSearchSettings || searchStatus === "attempting" || searchStatus === "ongoing" || disableSaveFilters}
          >
            {translations[currentLang.alias]["saveAndApply"]}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FilterSection;
