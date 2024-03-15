"use client"
import React, { useState, useEffect } from "react";
import Iconify from "../Elements/icon";
import { cancelBlock, formattedTimestamp1, formattedTimestamp2, formattedTimestamp3, getBlockMangement } from "../../redux/search/features";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { Block } from "../../redux/search/interface";
import { generateUniqueId } from "../GenerateUUID";
import { addAlert, removeAlert } from "../../redux/alert";
import { errorMsg } from "../../utils/constant";




const BlockDetails = ({
  block
}: {
  block: Block
}) => {




  const [remainingTime, setRemainingTime] = useState("");

  const { isCancellingBlock } = useAppSelector((state) => state.search);

  const [inActionBtn, setInActionBtn] = useState("")



  useEffect(() => {
    let timerInterval: any;

    function updateCancellationTimer(blockStartTime: any) {
      const startTime = new Date(blockStartTime);
      const cancellationCutoffTime = new Date(startTime);
      cancellationCutoffTime.setMinutes(startTime.getMinutes() - 45);

      timerInterval = setInterval(() => {
        const currentTime = new Date();
        const timeDifference = cancellationCutoffTime.getTime() - currentTime.getTime();

        if (timeDifference <= 0) {
          clearInterval(timerInterval);
          setRemainingTime('');
        } else {
          const totalMinutesRemaining = Math.ceil(timeDifference / (1000 * 60));
          const hours = Math.floor(totalMinutesRemaining / 60);
          const minutes = totalMinutesRemaining % 60;

          if (hours === 0) {
            setRemainingTime(`Time Remaining to Cancel: ${minutes} Minutes`);
          } else {
            setRemainingTime(`Time Remaining to Cancel: ${hours} Hours ${minutes} Minutes`);
          }
        }
      }, 1000);
    }

    const blockStartTime = block.block_start_time;
    if (blockStartTime) {
      updateCancellationTimer(blockStartTime);
    }

    return () => clearInterval(timerInterval);
  }, [block]);


  const dispatch = useAppDispatch()





  const handleCancelBlock = async (uuid: string) => {
    setInActionBtn(uuid)
    const alertId = generateUniqueId()
    dispatch(
      addAlert({
        id: alertId,
        type: "info",
        message: "Cancelling block",
        autoClose: false,
        icon: "mingcute:loading-line",
        spin: true,
      })
    );
    const actionResult = await dispatch(cancelBlock(uuid));
    if (cancelBlock.fulfilled.match(actionResult)) {
      dispatch(
        addAlert({
          type: "success",
          message: "Block Cancelled",
          icon: "mingcute:loading-line",
        })
      );
      dispatch(getBlockMangement())
    }
    else if (cancelBlock.rejected.match(actionResult)) {
      if (actionResult.error) {
        dispatch(
          addAlert({
            message: "Unable to cancel block" || errorMsg("en"),
            type: "error",
          })
        );
      }
    }
    dispatch(removeAlert(alertId));
  }

  return (
    <li className="shadow-md border shadow-gray-200 px-2 py-6 rounded-lg flex space-x-1 duration-300 mb-8 last:mb-0">
      <Iconify
        icon="ion:location-outline"
        className="text-danger mt-1.5 hidden lg:block"
      />
      <div className="flex-1">
        <div className="flex sm:hidden text-custom-gray items-center space-x-1 text-[8px] xxs:text-[10px] xs:text-sm mb-1">
          <p>{formattedTimestamp1(block.time_created)}</p>
          <p>
            {formattedTimestamp2(block.block_start_time)} - {formattedTimestamp2(block.block_end_time)}
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap-reverse justify-between">
          <div className="flex items-center space-x-1 text-stone-600 font-medium sm:font-semibold text-sm xxs:text-sm xs:text-lg sm:text-xl">
            <h2>{block.service_area_name}</h2>
          </div>
          <div className="text-sm md:text-sm">
            <p>{block.status !== "CONFIRMED" && remainingTime}</p>
          </div>
        </div>
        <div className="mt-2 sm:mt-4 flex md:flex-col gap-3 lg:gap-8 lg:flex-row lg:items-center justify-between text-custom-gray">
          <div className="w-full max-w-sm hidden sm:block lg:text-sm xl:text-base">
            <div>
              <p>
                {formattedTimestamp2(block.block_start_time)} - {formattedTimestamp2(block.block_end_time)}
              </p>
            </div>
            <div>
              <p>{formattedTimestamp1(block.time_created)}</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center gap-6 flex-1 md:justify-between">
            <div className="flex items-center gap-2 md:gap-6 flex-1">
              <div className="flex md:items-center  gap-1 sm:space-x-0 text-sm md:text-sm sm:block">
                <h2 className="text-stone-800 font-medium">${parseFloat(block.overall_pay).toFixed(2)} <span className="text-gray-400 font-light">per offer</span></h2>
              </div>

              <div className="w-[1px] h-2 xxs:h-3 xs:h-4 sm:h-12 bg-stone-600 "></div>

              <div className="flex md:items-center gap-1 sm:space-x-0 text-sm md:text-sm sm:block">
                <h2 className="text-stone-800 font-medium">${parseFloat(block.hourly_pay).toFixed(2)} <span className="text-gray-400 font-light">per hour</span></h2>
              </div>

              <div className="w-[1px] h-2 xxs:h-3 xs:h-4 sm:h-12 bg-stone-600 "></div>

              <div className="flex items-center  gap-1 sm:space-x-0 text-sm md:text-sm sm:block">
                <h2 className="text-stone-800 font-medium">{formattedTimestamp3(
                  block.block_time_in_minutes
                )}<span className="text-gray-400 font-light">Duration</span></h2>
              </div>
            </div>
            {block.status === "AVAILABLE_TO_CANCEL" && <button className="w-36 h-10 bg-danger flex items-center justify-center text-sm rounded-lg text-white font-semibold" disabled={!remainingTime || remainingTime === ""} onClick={() => {
              handleCancelBlock(block.external_uid || "")
            }}>
              {isCancellingBlock  && inActionBtn === block.external_uid? <Iconify
                icon="mingcute:loading-line"
                className="text-xl animate-spin"
              /> : (block.status === "AVAILABLE_TO_CANCEL" && "CANCEL")}
            </button>}

            {block.status === "CONFIRMED" && <button className="w-36 h-10 bg-dark-blue flex items-center justify-center text-sm rounded-lg text-white font-semibold">
              {block.status}
            </button>}
          </div>
        </div>
      </div>
    </li>
  );
};

export default BlockDetails;