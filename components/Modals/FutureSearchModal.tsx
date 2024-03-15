'use client'
import { useState, useEffect } from "react";
import { CustomModal } from "./customModal";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { Button } from "@nextui-org/react";
import { createOrUpdateStartSchedule, retriveStartSchedule } from "../../redux/searchSetup/features";
import { generateUniqueId } from "../GenerateUUID";
import { addAlert, removeAlert } from "../../redux/alert";
import { errorMsg } from "../../utils/constant";
import InputField from "../Input";




const FutureSearchModal = () => {
  const [selectedDate, setSelectedDate] = useState({ date: "", time: "" });
  const dispatch = useAppDispatch()


  const { should_start_at, isUpdatingStartSchedule } = useAppSelector((state) => state.searchSetup)

  function decoupleDateTime(isoString: string) {
    const dateTime = new Date(isoString);
    const date = dateTime.toISOString().split('T')[0]; 
    const hours = String(dateTime.getUTCHours()).padStart(2, '0');
    const minutes = String(dateTime.getUTCMinutes()).padStart(2, '0');
    const time = `${hours}:${minutes}`;
    return { date, time };
  }


  useEffect(() => {
    if (should_start_at === "") {
      dispatch(retriveStartSchedule())
    } else {
      setSelectedDate({ ...decoupleDateTime(should_start_at) });
    }

    // eslint-disable-next-line
  }, [should_start_at]);





  function joinDateTime(dateTimeObj:any) {
    return `${dateTimeObj.date}T${dateTimeObj.time}:00.000Z`;
  }


  // Handle schedule search
  const handleScheduleSearch = async (
    payload: any,
    dispatch: ReturnType<typeof useAppDispatch>
  ) => {
    const alertId = generateUniqueId()
    dispatch(
      addAlert({
        id: alertId,
        type: "info",
        message: "Scheduling search",
        autoClose: false,
        icon: "mingcute:loading-line",
        spin: true,
      })
    );
    const joindate =  joinDateTime(payload)
    const actionResult = await dispatch(createOrUpdateStartSchedule(joindate));
    if (createOrUpdateStartSchedule.fulfilled.match(actionResult)) {
      dispatch(
        addAlert({
          message: "Search scheduled",
          type: "success",
        })
      );
    } else if (createOrUpdateStartSchedule.rejected.match(actionResult)) {
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

  return (
    <CustomModal title={
      should_start_at ? "Search starts on" + " " +  moment.utc(should_start_at).format("ddd MMM DD YYYY hh:mm A") : "You have no scheduled search"
    }>
      <div className="space-y-20 px-4">
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="flex justify-center">
            <div className="grid grid-cols-2 gap-4">
              <InputField
                type="date"
                placeholder="Select Date"
                value={selectedDate.date}
                onChange={(e) => {
                  setSelectedDate({ ...selectedDate, date: e.target.value })

                }}

              />
              <InputField

                type="time"
                placeholder="00:00"
                value={selectedDate.time}
                onChange={(e) => {
                  setSelectedDate({ ...selectedDate, time: e.target.value })

                }}
              />
            </div>
          </div>
        </div>
        <div className="flex item-center justify-center px-5">
          <Button
            className="bg-theme text-white flex items-center font-medium text-xl py-6 px-20 w-full"
            onClick={() => {
              handleScheduleSearch(selectedDate, dispatch)
            }}
            isLoading={isUpdatingStartSchedule}
          >
            <p>Submit</p>
          </Button>
        </div>
      </div>
    </CustomModal>);
};

export default FutureSearchModal;
