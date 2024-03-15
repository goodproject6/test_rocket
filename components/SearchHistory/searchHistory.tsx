"use client";
import React, { useEffect, useState } from "react";
import { Language } from "../../redux/utils/interface";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { Block } from "../../redux/search/interface";
import BoardDetail from "../BlockSelection/BoardDetail";
import { formattedTimestamp1, formattedTimestamp2, formattedTimestamp3, getSearchHistory } from "../../redux/search/features";
import Pagination from "../Pagination";
import Iconify from "../Elements/icon";





const SearchHistory = ({ className, currentLang, translations }: { className?: string, currentLang: Language, translations: any }) => {
  const [headerList, setHeaderList] = useState([
    { title: "confirmed", isSelected: true },
    { title: "accepted", isSelected: false },
    { title: "rejected", isSelected: false },
    { title: "missed", isSelected: false },
  ]);

  const [currentHeader, setCurrentHeader] = useState("")


  const { searchHistory, searchHistoryPagination, isGettingSearchHistory } =
    useAppSelector((state) => state.search);


  const dispatch = useAppDispatch()



  const handleFilterBlocks = (header: string) => {
    dispatch(getSearchHistory({ result: header === "CONFIRMED" ? "CHARGED" : header }))
  }


  useEffect(() => {
    dispatch(getSearchHistory({ result: "CHARGED" }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Methods
  function setNewHeader(title: string) {
    return () => {
      setHeaderList(
        headerList.map((header) => {
          if (header.title === title) {
            setCurrentHeader(header.title.toUpperCase())
            handleFilterBlocks(header.title.toUpperCase())
            return {
              ...header,
              isSelected: true,
            };
          } else {
            return {
              ...header,
              isSelected: false,
            };
          }
        })
      );
    };
  }


  return (
    <div className={className}>
      <ul className="border-b flex items-center justify-around">
        {headerList.map((header, i) => (
          <li key={i} className="inline-block">
            <div
              className={
                "flex items-center space-x-1 font-semibold text-sm sm:text-base lg:text-xl px-1 sm:px-4 cursor-pointer pb-1 border-b-3" +
                (header.isSelected
                  ? " text-theme pb-1 border-b-3 border-danger"
                  : " text-custom-gray border-transparent")
              }
              onClick={setNewHeader(header.title)}
            >
              <p>{translations[currentLang.alias][header.title]}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-5 px-4 sm:px-6 max-h-[75vh] pb-6 overflow-y-auto">
        {searchHistory.length >= 1 ?
          <ul>
            {searchHistory.map((block: Block, i: number) => (
              block.result === "CHARGED" ?
                <li className="shadow-md border shadow-gray-200 px-2 py-6 rounded-lg flex space-x-1 duration-300 mb-8 last:mb-0" key={i}>
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
                        <p className="font-semibold text-gray-600">Block Fee Paid</p>
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


                          <div className="flex md:items-center gap-1 sm:space-x-0 text-sm md:text-sm sm:block">
                            <h2 className="text-stone-800 font-medium">${parseFloat(block.hourly_pay).toFixed(2)} <span className="text-gray-400 font-light">per hour</span></h2>
                          </div>


                          <div className="flex items-center  gap-1 sm:space-x-0 text-sm md:text-sm sm:block">
                            <h2 className="text-stone-800 font-medium">{formattedTimestamp3(
                              block.block_time_in_minutes
                            )}<span className="text-gray-400 font-light">Duration</span></h2>
                          </div>
                        </div>
                        <button className="w-36 h-10 bg-theme flex items-center justify-center text-sm rounded-xl text-white font-semibold ">
                          {block.charged}$
                        </button>

                        {block.status === "CONFIRMED" && <button className="w-36 h-10 bg-dark-blue flex items-center justify-center text-sm rounded-lg text-white font-semibold">
                          {block.status}
                        </button>}
                      </div>
                    </div>
                  </div>
                </li> :
                <BoardDetail
                  key={i}
                  block={block}
                  currentLang={currentLang}
                  translations={translations}
                  header={headerList.find((item) => item.isSelected === true)?.title || ""}
                />

            ))}
          </ul> 
          : <div className="flex items-center justify-center h-80 p-4">
            <div className="space-y-3">
              <div className="text-center">
                <p className="text-center text-gray-400 text-sm">{isGettingSearchHistory ? `Fetching ${headerList.find((item) => item.isSelected == true)?.title} blocks...` : `No ${headerList.find((item) => item.isSelected == true)?.title} blocks`}</p>
              </div>
            </div>
          </div>}
        {
          searchHistoryPagination &&
          searchHistoryPagination.total_items !== undefined &&
          searchHistoryPagination.current_page !== undefined &&
          searchHistoryPagination.total_items > searchHistory.length && (
            <Pagination
              pagination={{
                total: searchHistoryPagination.total_items,
                currentPage: searchHistoryPagination.current_page,
              }}
              onPageChange={(page: number) => {
                dispatch(getSearchHistory({ result: currentHeader === "CONFIRMED" ? "CHARGED" : currentHeader, page }))

              }}
            />
          )}
      </div>
    </div>
  );
};

export default SearchHistory;