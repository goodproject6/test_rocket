"use client"
import React from "react";
import { FaChevronCircleLeft } from "react-icons/fa";
import { IoMdInformationCircle } from "react-icons/io";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { setActiveFilter } from "../../../redux/utils";

const FilterSettingsCustom = () => {

const {activeFilter} =  useAppSelector((state)=>state.utils)

const dispatch = useAppDispatch()
  return (
    <section className="space-y-2">
      <section className="flex flex-col xl:flex-row gap-8">
        <div className="space-y-5 xl:w-80 2xl:w-1/3">
          <div className="space-y-2">
          <FaChevronCircleLeft className="text-2xl" />
          </div>
          <div className="space-y-4">
            <div className="border bg-white h-20 flex items-center px-6 rounded-lg w-full justify-between">
              <p className="text-sm">dddd</p>
            </div>
            { [
      { "id": 1, "name": "Select Locations" },
      { "id": 2, "name": "Minimum Hourly Pay" },
      { "id": 3, "name": "Minimum Offer Pay" },
      { "id": 4, "name": "Block Duration" },
      { "id": 5, "name": "Arrival Time" }
    ].map((each, i) => {
              return (
                <button
                  onClick={() => {
                    dispatch(setActiveFilter({ num: i + 6, name: each.name }))
                  
                  }}
                  key={i}
                  className={`${
                    1 === i + 6
                      ? "solid-btn"
                      : "border bg-white h-14 flex items-center px-6 rounded-lg"
                  } w-full justify-between`}
                >
                  <p className="text-sm">{each.name}</p>
                </button>
              );
            })}
            <div className="flex flex-row items-start space-x-1">
                <IoMdInformationCircle
                  className="text-blue-500 cursor-pointer"
                  style={{
                    fontSize: 15,
                  }}
                />
                {/* <p className="text-sm">{pageTexts.info}</p> */}
              </div>
          </div>
        </div>
        <div className="flex-1 box p-8 h-max">
          {/* {activeFilter.num === 6 && (
            <CustomMinimumHourlyPay
              tabTitle={activeFilter.name}
              curr={symbol}
            />
          )}
          {activeFilter.num === 7 && (
            <CustomMinimumBasePay tabTitle={activeFilter.name} curr={symbol} />
          )}
          {activeFilter.num === 8 && (
            <CustomBlockDuration tabTitle={activeFilter.name} />
          )}
          {activeFilter.num === 9 && (
            <CustomBlockLead tabTitle={activeFilter.name} />
          )} */}
        </div>
      </section>
    </section>
  );
};

export default FilterSettingsCustom;
