import React, { useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { CustomModal } from "./customModal";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import DoubleSlider from "../Elements/Common/DoubleSlider";


const CustomFilters = ({selectedLocation}: any) => {
  const [zone, setZone] = useState("");
  const { user,isUpdatingUser } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()
  return (
    <div>
      <CustomModal title={selectedLocation.name}>
         {/* Input forms */}
         <div  className="lg:text-xs xl:text-base px-10">
        <div>
          <label
            htmlFor="hourly_pay"
            className="text-custom-gray flex items-center space-x-2"
          >
            <p>Minimum Hourly Pay</p>
          </label>
          <Input
            // onChange={(e) => {
            //   const value = parseInt(e.target.value);
            //   setFormData({ ...formData, min_hourly_pay: value });
            // }}
            // value={formData.min_hourly_pay}
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
            // readOnly={isFetchingSearchSettings}
          />
          <hr />
        </div>
        <div className="mt-5">
          <label
            htmlFor="offer_pay"
            className="text-custom-gray flex items-center space-x-2"
          >
            <p>Minimum Block Pay</p>

          </label>
          <Input
            type="number"
            id="offer_pay"
            // value={formData.min_overall_pay}
            // onChange={(e) => {
            //   const value = parseInt(e.target.value);
            //   setFormData({ ...formData, min_overall_pay: value });
            // }}
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
            // readOnly={isFetchingSearchSettings}
          />
          <hr />
        </div>
        <div className="mt-5">
          <label
            htmlFor="block_duration"
            className="text-custom-gray flex items-center space-x-2"
          >
            <p>
              Block Duration</p>
              {/* {translations[currentLang.alias]["blockDuration"]}</p> */}
          </label>
          <div className="mt-1 mb-3">
            <DoubleSlider
              disabled={true}
            />
          </div>
          <hr />
        </div>
        <div className="mt-5">
          <label
            htmlFor="arrival_time"
            className="text-custom-gray flex items-center space-x-2"
          >
            <p> 
              Arrival Time</p>
              
              {/* {translations[currentLang.alias]["arrivalTime"]}</p> */}

          </label>
          <Input
            type="number"
            id="arrival_time"
            // value={formData.min_lead_time}
            // onChange={(e) => {
            //   const value = parseInt(e.target.value);
            //   setFormData({ ...formData, min_lead_time: value });
            // }}
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
                <span className="text-default-400 ">Minutes</span>
              </div>
            }
            // readOnly={isFetchingSearchSettings}
          />
        </div>
        
        <div className="mt-6">
          <Button
            type="submit"
            className="bg-dark-blue text-white rounded-md w-full"
            onClick={() => {
              // handleUpdateFilters()
            }}
            // isLoading={isUpdatingSearchSettings.value && isUpdatingSearchSettings.type === "filters"}
          >
            Save And Apply
            {/* {translations[currentLang.alias]["saveAndApply"]} */}
          </Button>
        </div>
      </div>
      </CustomModal>
    </div>
  );
};

export default CustomFilters;
