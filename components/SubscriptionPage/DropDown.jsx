"use-client";
import React, { useState, useRef, useEffect } from "react";
import DropDownItem from "../../components/SubscriptionPage/DropDown";

// Utils
import Iconify from "../Elements/icon";

function DropDown({ title, list, className }) {
  const ref = useRef(null);
  const [newDropDownIsVisible, setDropDownVisibility] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setDropDownVisibility(false);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [newDropDownIsVisible]);
  return (
    <li
      className={`${className} relative flex items-center justify-between gap-14 bg-gray-100 rounded-md py-1 px-3 w-[15rem] ${
        !list && "cursor-pointer"
      }`}
    >
      <p className="font-bold text-sm">{title}</p>
      <div>
        {list && list?.length && (
          <button
            onClick={() => setDropDownVisibility(!newDropDownIsVisible)}
            className="bg-gray-700 p-1 w-5 h-5 flex items-center rounded-full"
          >
            <Iconify icon="ph:arrow-right-bold" className=" text-white" />
          </button>
        )}
      </div>
      {newDropDownIsVisible && (
        <ul
          ref={ref}
          className="absolute left-1 xxs:left-2 sm:left-[50%] z-10 xl:left-[110%] top-[110%] lg:top-[100%] xl:top-0 bg-white rounded-xl shadow-lg py-5 px-3 w-fit"
        >
          {list.map((item) => {
            return (
              <DropDownItem
                key={item?.id}
                title={item?.title}
                list={item?.list}
                className="mb-3 last:mb-0"
              />
            );
          })}
        </ul>
      )}
    </li>
  );
}

export default DropDown;