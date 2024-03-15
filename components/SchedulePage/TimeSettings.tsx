import { Button } from "@nextui-org/react";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { showItem } from "../../redux/utils";
import { revertTo24HourFormat } from "../../utils/helper/search/timeFormater";
import { handleUpdateSearchSettings } from "../../utils/helper/search/updateSearchSettings";

function TimeSettings({ className, dateSettings }: { className: string,  dateSettings:any }) {
  const { user } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()



  const { searchSettings, isUpdatingSearchSettings } =
  useAppSelector((state) => state.searchSetup);



// Modify search settings
  const modifyTimeFiltersSettings = (value: any) => {
    let updatedItems = value.map((item: any) => {
        if (item.startTime && item.endTime) {
            const startTime = revertTo24HourFormat(item.startTime);
            const endTime = revertTo24HourFormat(item.endTime);
            return {
                ...item,
                startTime: startTime,
                endTime: endTime
            };
        }
        return item;
    });

    // Create a mutable copy of the searchSettings object
    let mutableSettings = { ...searchSettings };

    updatedItems.forEach((item: any) => {
        // Get the title and other properties from the item
        const { title, isSelected, startTime, endTime } = item;

        // Generate the keys for the start and end times based on the day title
        const startKey = `${title.toLowerCase()}_start`;
        const endKey = `${title.toLowerCase()}_end`;

        // Update the corresponding properties in the mutableSettings object
        if (mutableSettings[startKey] !== undefined) {
            mutableSettings[startKey] = startTime;
        }
        if (mutableSettings[endKey] !== undefined) {
            mutableSettings[endKey] = endTime;
        }

        // Update the 'enabled' property based on the 'isSelected' value
        const enabledKey = `${title.toLowerCase()}_enabled`;
        if (mutableSettings[enabledKey] !== undefined) {
            mutableSettings[enabledKey] = isSelected;
        }
    });

     return mutableSettings
};


const handleUpdateFilters = () =>{
  const payload =  modifyTimeFiltersSettings(dateSettings)
  handleUpdateSearchSettings(dispatch,
    payload,
    "time-filters",
    "Time FIlters"
  )
}

  


  return (
    <div className={`${className} font-semibold`}>
      <div className="flex items-center justify-between">
        <h1 className="text-danger md:text-2xl ">Time Zone</h1>
        <Button className="text-white bg-dark-blue md:text-xl px-6 py-5 md:font-semibold" onClick={()=>{
          handleUpdateFilters()
        }}
        isLoading={isUpdatingSearchSettings.value && isUpdatingSearchSettings.type === "time-filters"}
        >
          Save Changes
        </Button>
      </div>
      <div className="flex items-center justify-between mt-3 sm:mt-6 md:text-xl">
        <p className="text-custom-gray">{user.timezone}</p>
        <Button className="bg-transparent text-danger md:text-lg font-semibold" onClick={()=>{
          dispatch(showItem("time-zone"))
        }}>
          Edit
        </Button>
      </div>
    </div>
  );
}

export default TimeSettings;
