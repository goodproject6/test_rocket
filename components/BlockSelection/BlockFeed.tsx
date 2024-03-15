"use client";
import React, { useEffect, useState } from "react";
import BoardDetail from "./BoardDetail";
import { Language } from "../../redux/utils/interface";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { Block } from "../../redux/search/interface";
import { setFilteredBlocks } from "../../redux/search";

const BlockFeed = ({ className, currentLang, translations }: { className?: string, currentLang: Language, translations: any }) => {
  const [headerList, setHeaderList] = useState([
    { title: "accepted", isSelected: true},
    { title: "rejected", isSelected: false },
    { title: "missed", isSelected: false },
  ]);


  const { blockFeeds, filteredBlockFeeds } =
    useAppSelector((state) => state.search);


  const dispatch = useAppDispatch()



  const handleFilterBlocks = (header: string) => {
    const localBlockFeeds = [...blockFeeds]
    const filteredBlocks = localBlockFeeds.filter((item) => item.result === header)
    dispatch(setFilteredBlocks(filteredBlocks))
  }


  useEffect(() => {
    const localBlockFeeds = [...blockFeeds]
    const filteredBlocks = localBlockFeeds.filter((item) => item.result === "ACCEPTED")
    dispatch(setFilteredBlocks(filteredBlocks))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Methods
  function setNewHeader(title: string) {
    return () => {
      setHeaderList(
        headerList.map((header) => {
          if (header.title === title) {
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
        {filteredBlockFeeds.length >= 1 ? <ul>
          {filteredBlockFeeds.map((block: Block, i: number) => (
            <BoardDetail
              key={i}
              block={block}
              currentLang={currentLang}
              translations={translations}
              header={headerList.find((item) => item.isSelected === true)?.title || ""}
            />
          ))}
        </ul> : <div className="flex items-center justify-center h-80 p-4">
          <div className="space-y-3">
            <div className="text-center">
              <p className="text-center text-gray-400 text-sm">No {headerList.find((item) => item.isSelected == true)?.title} blocks</p>
            </div>
          </div>
        </div>}
      </div>
    </div>
  );
};

export default BlockFeed;