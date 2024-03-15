import React, { useState } from "react";
import Iconify from "../Elements/icon";
import { Language } from "../../redux/utils/interface";
import { Block } from "../../redux/search/interface";
import { formattedTimestamp1, formattedTimestamp2, formattedTimestamp3 } from "../../redux/search/features";
import useSentence from "../../hooks/useSentence";


const BoardDetail = ({
  block,
  translations,
  currentLang,
  header
}: {
  block: Block
  translations: any;
  currentLang: Language
  header: string
}) => {

  const [showDetails, setShowDetails] = useState(false);


  const constructReasonSentence = useSentence("$", currentLang, translations);

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
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 text-stone-600 font-medium sm:font-semibold text-sm xs:text-lg sm:text-xl">
            <h2>{block.service_area_name}</h2>
          </div>
          {header === "rejected" && <div
            className={
              (showDetails ? "text-danger" : " text-custom-gray") +
              "lg:flex items-center space-x-[2px] duration-200 cursor-pointer text-sm"
            }
            onClick={() => setShowDetails(!showDetails)}
          >
            <p>{translations[currentLang.alias]["details"]}</p>
            <Iconify
              icon={showDetails ? "ion:chevron-up-outline" : "ion:chevron-down-outline"}
              className="text-sm"
            />
          </div>}
        </div>
        <div className="mt-2 sm:mt-4 flex items-center text-custom-gray">
          <div className="flex-1 hidden sm:block lg:text-sm xl:text-base">
            <div>
              <p>
                {formattedTimestamp2(block.block_start_time)} - {formattedTimestamp2(block.block_end_time)}
              </p>
            </div>
            <div>
              <p>
                {formattedTimestamp1(block.time_created)}
              </p>
            </div>
          </div>
          <div className="flex items-center flex-1 justify-evenly">
            <div className="flex items-center flex-row-reverse gap-1 sm:space-x-0 text-[10px] text-sm sm:text-base lg:text-sm xl:text-base sm:block">
              <h2 className="text-stone-800 font-medium">${parseFloat(block.overall_pay).toFixed(2)} <span className="text-gray-400 font-light text-sm">{translations[currentLang.alias]["perOffer"]}</span></h2>
            </div>

            <span className="w-[1px] h-2 xxs:h-3 xs:h-4 sm:h-12 bg-stone-600 "></span>

            <div className="flex items-center flex-row-reverse gap-1 sm:space-x-0 text-[10px] text-sm sm:text-base lg:text-sm xl:text-base sm:block">
              <h2 className="text-stone-800 font-medium">${parseFloat(block.hourly_pay).toFixed(2)} <span className="text-gray-400 font-light text-sm">{translations[currentLang.alias]["perHour"]}</span></h2>
            </div>

            <span className="w-[1px] h-2 xxs:h-3 xs:h-4 sm:h-12 bg-stone-600 "></span>
            <div className="flex items-center flex-row-reverse gap-1 sm:space-x-0 text-[10px] text-sm sm:text-base lg:text-sm xl:text-base sm:block">
              <h2 className="text-stone-800 font-medium">{formattedTimestamp3(
                block.block_time_in_minutes
              )} <span className="text-gray-400 font-light text-sm">{translations[currentLang.alias]["duration"]}</span></h2>
            </div>
          </div>
        </div>
     {header === "rejected" && showDetails && (
          <ul className="italic mt-4">
            {block.block_rejection_reasons?.map(
              (reason, index) => (
                <li className="text-custom-gray p-3 text-[10px] text-sm rounded-md bg-light-theme" key={index}>
                 {index + 1}. {" "}
                 {constructReasonSentence(reason)}      
                </li>
              )
            )}

          </ul>
        )} 
      </div>
    </li>
  );
};

export default BoardDetail;