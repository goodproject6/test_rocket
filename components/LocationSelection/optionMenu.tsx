"use client"
import React from "react";
import Iconify from "../Elements/icon";
import { showItem } from "../../redux/utils";
import { useAppDispatch, useAppSelector } from "../../redux/store";



const OptionMenu = ({ uid, enable, edit, isSelected }: { uid: string, enable: any, edit: any, isSelected:boolean }) => {
  const dispatch = useAppDispatch()

  const { show } =
    useAppSelector((state) => state.utils);

  return (
    <>
      <div className="relative w-max">
        <div>
          <button
            onClick={() => {
              if(!isSelected) return
              dispatch(showItem("option" + uid));
            }}
            className="border rounded h-8 w-8 flex items-center justify-center"
          >
            <Iconify icon="iwwa:option" className="text-xl" />
          </button>
        </div>

        <div
          className={`absolute bg-white rounded-lg p-2 z-50 h-max right-0 shadow-lg ${show === "option" + uid ? "block" : "hidden"
            }`}
        >
             {enable}
          
             {edit}
          {/* <div
            className="hover:bg-gray-100 px-3 h-8 flex items-center gap-3 rounded cursor-pointer"
          >
            {edit}
            <p className="text-sm">Customize</p>
          </div> */}

        </div>
      </div>
    </>
  );
};

export default OptionMenu;
