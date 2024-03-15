import React, {  useState } from "react";
import { Button } from "@nextui-org/react";
import { CustomModal } from "./customModal";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { handleUpdateUserDetails } from "../../utils/helper/updateUserDetails";


const TimeZoneModal = () => {
  const [zone, setZone] = useState("");
  const { user,isUpdatingUser } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()
  return (
    <div>
      <CustomModal title="Time zone">
        <div className="flex-1 p-6 space-y-10">
          <select
            className="rounded-lg w-full border h-14 p-3 bg-white text-2xl font-semibold"
            onChange={(e) => {
              setZone(e.target.value);
            }}
          >
            {user.timezone_dropdown_options?.map((each:any, i) => {
              return (
                <option
                  className="text-base font-normal"
                  value={each.value}
                  key={i}
                  selected={each.value === user.timezone_dropdown_options}
                >
                  {each.value}
                </option>
              );
            })}
          </select>
          <div className="flex flex-row gap-3 items-center justify-center">
            <Button
              className="bg-theme w-1/2 justify-center text-white"
              onClick={() => {
                handleUpdateUserDetails({...user, timezone:zone}, dispatch)
              }}
              isLoading={isUpdatingUser}
            >
              <p>Save</p>
            </Button>
          </div>
        </div>
      </CustomModal>
    </div>
  );
};

export default TimeZoneModal;
