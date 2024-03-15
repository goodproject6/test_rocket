"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import TimeSettings from "../../../components/SchedulePage/TimeSettings";
import DateSettings from "../../../components/SchedulePage/DateSettings";
import { TIME_SETTINGS } from "../../../types/others";
import Iconify from "../../../components/Elements/icon";
import { useRouter } from "next/navigation";
import {  useAppSelector } from "../../../redux/store";
import TimeZoneModal from "../../../components/Modals/timeZoneModal";
import { convertTimeFormat } from "../../../utils/helper/search/timeFormater";





function SchedulePage() {
  interface DATE_TYPE {
    [key: string]: any;
    title: string;
    isSelected: boolean;
    startTime: TIME_SETTINGS;
    endTime: TIME_SETTINGS;
  }

  const router = useRouter()

  const { searchSettings} =
    useAppSelector((state) => state.searchSetup);

  const { show } =
    useAppSelector((state) => state.utils);


  const [dateSettings, setDateSettings] = useState<DATE_TYPE[]>([]);

  useEffect(() => {
    setDateSettings([
      {
        title: "monday",
        isSelected: searchSettings.monday_enabled
        ,
        startTime: {
          hour: convertTimeFormat(searchSettings.
            monday_start)?.hour || "",
          minute: convertTimeFormat(searchSettings.
            monday_start)?.minute || "",
          ampm: convertTimeFormat(searchSettings.
            monday_start)?.ampm || "",
        },
        endTime: {
          hour: convertTimeFormat(searchSettings.
            monday_end)?.hour || "",
          minute: convertTimeFormat(searchSettings.
            monday_end)?.minute || "",
          ampm: convertTimeFormat(searchSettings.
            monday_end)?.ampm || "",
        },
      },
      {
        title: "tuesday",
        isSelected: searchSettings.tuesday_enabled,
        startTime: {
          hour: convertTimeFormat(searchSettings.
           tuesday_start)?.hour || "",
          minute: convertTimeFormat(searchSettings.
            tuesday_start)?.minute || "",
          ampm: convertTimeFormat(searchSettings.
            tuesday_start)?.ampm || "",
        },
        endTime: {
          hour: convertTimeFormat(searchSettings.
            tuesday_end)?.hour || "",
          minute: convertTimeFormat(searchSettings.
            tuesday_end)?.minute || "",
          ampm: convertTimeFormat(searchSettings.
            tuesday_end)?.ampm || "",
        },
      },
      {
        title: "wednesday",
        isSelected: searchSettings.wednesday_enabled,
        startTime: {
          hour: convertTimeFormat(searchSettings.
            wednesday_start)?.hour || "",
          minute: convertTimeFormat(searchSettings.
            wednesday_start)?.minute || "",
          ampm: convertTimeFormat(searchSettings.
            wednesday_start)?.ampm || "",
        },
        endTime: {
          hour: convertTimeFormat(searchSettings.
            wednesday_end)?.hour || "",
          minute: convertTimeFormat(searchSettings.
            wednesday_end)?.minute || "",
          ampm: convertTimeFormat(searchSettings.
            wednesday_end)?.ampm || "",
        },
      },
      {
        title: "thursday",
        isSelected: searchSettings.thursday_enabled,
        startTime: {
          hour: convertTimeFormat(searchSettings.
            thursday_start)?.hour || "",
          minute: convertTimeFormat(searchSettings.
            thursday_start)?.minute || "",
          ampm: convertTimeFormat(searchSettings.
            thursday_start)?.ampm || "",
        },
        endTime: {
          hour: convertTimeFormat(searchSettings.
            thursday_end)?.hour || "",
          minute: convertTimeFormat(searchSettings.
            thursday_end)?.minute || "",
          ampm: convertTimeFormat(searchSettings.
            thursday_end)?.ampm || "",
        },
      },
      {
        title: "friday",
        isSelected: searchSettings.friday_enabled,
        startTime: {
          hour: convertTimeFormat(searchSettings.
            friday_start)?.hour || "",
          minute: convertTimeFormat(searchSettings.
            friday_start)?.minute || "",
          ampm: convertTimeFormat(searchSettings.
           friday_start)?.ampm || "",
        },
        endTime: {
          hour: convertTimeFormat(searchSettings.
            friday_end)?.hour || "",
          minute: convertTimeFormat(searchSettings.
            friday_end)?.minute || "",
          ampm: convertTimeFormat(searchSettings.
           friday_end)?.ampm || "",
        },
      },
      {
        title: "saturday",
        isSelected: searchSettings.saturday_enabled,
        startTime: {
          hour: convertTimeFormat(searchSettings.
            saturday_start)?.hour || "",
          minute: convertTimeFormat(searchSettings.
            saturday_start)?.minute || "",
          ampm: convertTimeFormat(searchSettings.
            saturday_start)?.ampm || "",
        },
        endTime: {
          hour: convertTimeFormat(searchSettings.
            saturday_end)?.hour || "",
          minute: convertTimeFormat(searchSettings.
            saturday_end)?.minute || "",
          ampm: convertTimeFormat(searchSettings.
            saturday_end)?.ampm || "",
        },
      },
      {
        title: "sunday",
        isSelected: searchSettings.sunday_enabled,
        startTime: {
          hour: convertTimeFormat(searchSettings.
            sunday_start)?.hour || "",
          minute: convertTimeFormat(searchSettings.
            sunday_start)?.minute || "",
          ampm: convertTimeFormat(searchSettings.
            sunday_start)?.ampm || "",
        },
        endTime: {
          hour: convertTimeFormat(searchSettings.
            sunday_end)?.hour || "",
          minute: convertTimeFormat(searchSettings.
            sunday_end)?.minute || "",
          ampm: convertTimeFormat(searchSettings.
            sunday_end)?.ampm || "",
        },
      }
    ])
    // eslint-disable-next-line
  }, [searchSettings]);

   

 

  function updateDateVisibility(e: ChangeEvent<HTMLInputElement>, day: string) {
    e.preventDefault();
    setDateSettings(
      dateSettings.map((date) =>
        date.title === day
          ? {
            ...date,
            isSelected: !date.isSelected,
          }
          : date
      )
    );
  }

  function updateDateTime(value: string, type: string, day: string) {
    const [time, timeType] = type.split("_");
    const newDateSettings = dateSettings.map((date) =>
      date.title === day
        ? {
          ...date,
          [time]: {
            ...date[time],
            [timeType]: value,
          },
        }
        : date
    );
    setDateSettings(newDateSettings);
  }


  return (
    <div className="bg-dashboard-bg min-h-[100dvh] px-4 lg:px-8 py-10">

      <button className="flex items-center gap-3 h-9 px-3 rounded-xl hover:bg-gray-200 w-max mb-6" onClick={() => {
        router.push("/dashboard")
      }}>
        <Iconify icon="ph:arrow-left-bold" className="text-lg" />
        <p className="font-semibold">Back</p>
      </button>

      <div>
        <TimeSettings className="bg-white rounded-t-3xl rounded-b-3xl md:rounded-b-none p-3 sm:px-6 py-4 shadow-lg shadow-gray-300/30"  dateSettings={dateSettings}/>
      </div>
      <div className="mt-10">
        {dateSettings.map((date) => (
          <DateSettings
            className="bg-white rounded-2xl px-2 xxs:px-3  py-2 md:h-16 flex items-center shadow-lg shadow-gray-300/30 mb-5 last:mb-0"
            key={date.title}
            day={date.title}
            isSelected={date.isSelected}
            startTime={date.startTime}
            endTime={date.endTime}
            changeDateVisibility={(e, day) => updateDateVisibility(e, day)}
            changeDateTime={(value, type, day) =>
              updateDateTime(value, type, day)
            }
          />
        ))}
      </div>
      {show === "time-zone" && <TimeZoneModal />}
    </div>
  );
}

export default SchedulePage;
