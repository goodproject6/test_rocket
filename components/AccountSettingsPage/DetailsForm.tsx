"use client";
import React, { useState } from "react";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { Language } from "../../redux/utils/interface";
import {  User } from "../../redux/auth/interface";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { handleUpdateUserDetails } from "../../utils/helper/updateUserDetails";

function DetailForm({
  translations,
  currentLang,
}: {
  translations: any;
  currentLang: Language;
}) {

  const { user, isUpdatingUser, } = useAppSelector((state) => state.auth)



  const [formData, setFormDetails] = useState<User>({
    email: user.email,
    timezone: user.timezone,
    telegram_sync_status: user.telegram_sync_status,
    timezone_dropdown_options: user.timezone_dropdown_options
  });

  const [zones, setZones] = useState<any>(formData.timezone_dropdown_options);


  const dispatch = useAppDispatch()


  return (
    <div>
      <div>
        <Input
          label={translations[currentLang.alias]["email"]}
          type="email"
          value={formData.email}
          labelPlacement="outside"
          variant="bordered"
          classNames={{
            inputWrapper: "rounded-md",
            label: "!text-custom-gray text-base !font-medium",
            input: "text-custom-gray h-[53px]",
          }}
          readOnly
        />
      </div>
      <div className="mt-12 md:mt-16">
        <Select
          label={translations[currentLang.alias]["timeZone"]}
          labelPlacement="outside"
          variant="bordered"
          placeholder="Select a time zone"
          onChange={(e) => {
            setFormDetails({ ...formData,timezone_dropdown_options: zones[e.target.value].value })
          }}
          classNames={{
            trigger: "rounded-md",
            label: "!text-custom-gray text-base !font-medium",
            value: "text-custom-gray",
          }}
        >
          {(zones).map((item: any, i: any) => (
            <SelectItem key={i} value={item.value}>
              {item.value}
            </SelectItem>
          ))}
        </Select>
      
        <div className="mt-8">
          <Button
            type="submit"
            className="bg-dark-blue rounded-lg text-white w-full"
            onClick={() => {
              handleUpdateUserDetails({ ...formData }, dispatch)
            }}
            isLoading={isUpdatingUser}
          >
            {translations[currentLang.alias]["saveChanges"]}
          </Button>
        </div>
      </div>
      
    </div>
  );
}

export default DetailForm;
