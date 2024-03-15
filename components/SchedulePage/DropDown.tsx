"use client";
import React, { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@nextui-org/react";

import { DROPDOWN_OPTION } from "../../types/others";
import Iconify from "../Elements/icon";

function DropDown({
  className,
  dropDownList,
  type,
  skipFirst,
  defaultValue,
  changeSelected,
}: {
  className?: string;
  dropDownList: DROPDOWN_OPTION[] | number;
  type: string | undefined;
  skipFirst?: boolean;
  defaultValue?: string;
  changeSelected: (value: string, type: string) => void;
}) {
  const [defaultOpen, setDefaultOpen] = useState(false);
  function updateList(value: string) {
    changeSelected(value, type as string);
    setDefaultOpen(false);
  }

  return (
    <div className={className}>
      <Popover
        placement="bottom"
        showArrow={true}
        isOpen={defaultOpen}
        onClose={() => setDefaultOpen(false)}
        shouldCloseOnBlur={true}
      >
        <PopoverTrigger>
          <div
            className="bg-theme/20 border border-theme rounded-lg p-1 sm:p-2 w-fit flex items-center space-x-[1px] xs:space-x-1 cursor-pointer"
            onClick={() => setDefaultOpen(true)}
          >
            <p>{defaultValue}</p>
            <Iconify icon="eva:arrow-ios-downward-outline" className="ml-2" />
          </div>
        </PopoverTrigger>
        <PopoverContent>
          <ul className=" max-h-32 overflow-y-auto py-2">
            {typeof dropDownList === "number"
              ? [...Array(dropDownList)].map((_, i) => (
                  <li
                    key={i}
                    className="hover:bg-theme/20 rounded-sm cursor-pointer px-3"
                    onClick={() => updateList(i.toString().padStart(2, "0"))}
                  >
                    <div>
                      {i === 0 && !skipFirst && (
                        <div
                          className={` flex items-center space-x-[2px] ${
                            defaultValue === i.toString().padStart(2, "0")
                              ? " font-bold text-theme"
                              : ""
                          }
                              `}
                        >
                          <span>
                            {i.toString().padStart(2, "0").split("")[0]}
                          </span>
                          <span>
                            {i.toString().padStart(2, "0").split("")[1]}
                          </span>
                        </div>
                      )}
                      {i !== 0 && (
                        <div
                          className={` flex items-center space-x-[2px] ${
                            defaultValue === i.toString().padStart(2, "0")
                              ? " font-bold text-theme"
                              : ""
                          }
                              `}
                        >
                          <span>
                            {i.toString().padStart(2, "0").split("")[0]}
                          </span>
                          <span>
                            {i.toString().padStart(2, "0").split("")[1]}
                          </span>
                        </div>
                      )}
                    </div>
                  </li>
                ))
              : dropDownList.map((option) => (
                  <li
                    key={option.value}
                    className="hover:bg-theme/20 rounded-sm  cursor-pointer"
                    onClick={() => updateList(option.value)}
                  >
                    <p
                      className={`${
                        defaultValue === option.value
                          ? " font-bold text-theme"
                          : ""
                      }`}
                    >
                      {option.label}
                    </p>
                  </li>
                ))}
          </ul>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default DropDown;
