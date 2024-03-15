import React, { useEffect, useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useAppSelector } from "../../../redux/store";
import { decimalHoursToHourMinute, minutesToDecimalHours } from "../../../utils/helper/search/timeFormater";




const DoubleSlider = ({ saveChanges, disabled ,  setEDisableSaveFilters}: { saveChanges?: any, disabled?: boolean,  setEDisableSaveFilters?:any }) => {
  const { searchSettings } =
    useAppSelector((state) => state.searchSetup);



    const [range, setRange] = useState<[number, number]>([0, 0]);

    useEffect(() => {
      if (searchSettings.min_block_time !== undefined && searchSettings.max_block_time !== undefined) {
        const minBlockTime = searchSettings.min_block_time
        const maxBlockTime = searchSettings.max_block_time
        
        if (!isNaN(minBlockTime) && !isNaN(maxBlockTime)) {
          setRange([minutesToDecimalHours(minBlockTime) as any, minutesToDecimalHours(maxBlockTime) as any]);
        }
      }
    }, [searchSettings.min_block_time, searchSettings.max_block_time]);



  const [showToolTip, setShowTooltip] = useState(false);


  const handleSliderChange = (newRange: any) => {
    setEDisableSaveFilters(false)
    setRange(newRange);
    saveChanges(newRange);
  };


  return (
    <div className="relative range-slider-container mt-1 mb-3">
      <Slider
        range
        min={0.5}
        max={6}
        step={0.5}
        value={range as any}
        onChange={handleSliderChange}
        onFocus={() => setShowTooltip(true)}
        onBlur={() => setShowTooltip(false)}
        className="range-slider"
        disabled={disabled}
      />
      <div>
        {/* Display the selected range values */}
        {showToolTip && (
          <>
            <p className="absolute tooltip1 bg-light-theme shadow-sm p-2 text-sm -top-12 rounded-lg non-selectable text-active">
              {decimalHoursToHourMinute(range[0])}
            </p>
            <p className="absolute tooltip2 bg-light-theme shadow-sm p-2 text-sm rounded-lg right-0 -top-12 w-max non-selectable text-active">
              {decimalHoursToHourMinute(range[1])}
            </p>
          </>
        )}
      </div>
      <style>
        {`
         .tooltip1 {
            left: calc(${range[0] as any / 6} * ${40}% ) ;
          }
          .tooltip2 {
            left: calc(${range[1] as any / 6} * ${100}% ) ;
          }
        `}
      </style>
    </div>
  );
};

export default DoubleSlider;
