"use client";
import { Switch } from "@nextui-org/react";
import React, { ChangeEvent, useState } from "react";
import DropDown from "./DropDown";
import { TIME_SETTINGS } from "../../types/others";
import { useAppSelector } from "../../redux/store";

function DateSettings({
  className,
  day,
  isSelected,
  startTime,
  endTime,
  changeDateVisibility,
  changeDateTime,
}: {
  className: string;
  day: string;
  isSelected: boolean;
  startTime: TIME_SETTINGS;
  endTime: TIME_SETTINGS;
  changeDateVisibility: (
    e: ChangeEvent<HTMLInputElement>,
    type: string
  ) => void;
  changeDateTime: (value: string, type: string, day: string) => void;
}) {
  const [selectedTime, setSelectedTime] = useState({
    start: startTime,
    end: endTime,
  });

  const ampms = [
    {
      label: "AM",
      value: "AM",
    },
    {
      label: "PM",
      value: "PM",
    },
  ];

  function updateTime(value: string, type: string) {
    changeDateTime(value, type, day);
  }
  function updateDayVisibility(e: ChangeEvent<HTMLInputElement>) {
    changeDateVisibility(e, day);
  }


  const { isFetchingSearchSettings } =
  useAppSelector((state) => state.searchSetup);


  return (
    <div className={className + " font-semibold"}>
      <div className="flex flex-col md:flex-row w-full gap-6 lg:gap-10 items-center justify-center md:justify-between flex-wrap  text-custom-gray font-semibold">
        <div className="text-xl uppercase md:capitalize xl:w-40">
          {day}
        </div>
        {isSelected && (
          <div className="text-[10px] xxs:text-xs xs:text-sm sm:text-base uppercase flex items-center space-x-2 xs:space-x-3 md:space-x-6 justify-between min-w-[13rem] xxs:min-w-[16rem] sm:min-w-[30rem] xl:min-w-[34rem]">
            <div className="flex items-center space-x-1 md:space-x-2">
              <DropDown
                dropDownList={13}
                type="startTime_hour"
                skipFirst={true}
                defaultValue={startTime.hour}
                changeSelected={(value, type) => updateTime(value, type)}
              />
              <span className="text-theme text-xl">:</span>
              <DropDown
                dropDownList={61}
                type="startTime_minute"
                defaultValue={startTime.minute}
                changeSelected={(value, type) => updateTime(value, type)}
              />
              <DropDown
                dropDownList={ampms}
                type="startTime_ampm"
                defaultValue={startTime.ampm}
                changeSelected={(value, type) => updateTime(value, type)}
              />
            </div>
            <p>to</p>
            <div className="flex items-center space-x-1 md:space-x-2">
              <DropDown
                dropDownList={13}
                type="endTime_hour"
                skipFirst={true}
                defaultValue={endTime.hour}
                changeSelected={(value, type) => updateTime(value, type)}
              />
              <span className="text-theme text-xl">:</span>
              <DropDown
                dropDownList={61}
                type="endTime_minute"
                defaultValue={endTime.minute}
                changeSelected={(value, type) => updateTime(value, type)}
              />
              <DropDown
                dropDownList={ampms}
                type="endTime_ampm"
                defaultValue={endTime.ampm}
                changeSelected={(value, type) => updateTime(value, type)}
              />
            </div>
          </div>
        )}

        <div>
          <Switch
            color="danger"
            isSelected={isSelected}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              updateDayVisibility(e)
            }
            isDisabled={isFetchingSearchSettings}
          />
        </div>
      </div>
    </div>
  );
}

export default DateSettings;