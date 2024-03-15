"use client"
import React, { useRef, useState } from "react";
import BlockFeed from "../../components/BlockSelection/BlockFeed";
import FilterSection from "../../components/LocationSelection/FilterSection";
import dashboardTranslation from "../../utils/translations/dashboard.json"
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { setTranslations } from "../../redux/utils";
import LocaltionList from "../../components/LocationSelection/LocationList";
import FutureSearchModal from "../../components/Modals/FutureSearchModal";
import Iconify from "../../components/Elements/icon";





const Dashboard = () => {
  const dispatch = useAppDispatch()
  dispatch(setTranslations(dashboardTranslation));
  const { currentLang, translations, show } = useAppSelector((state) => state.utils);
  const { searchStatus } = useAppSelector((state) => state.search);

  const filterSectionRef = useRef<HTMLDivElement>(null);
  const locationSectionRef = useRef<HTMLDivElement>(null);

  const [currentSection, setCurrentSection] = useState({ filter: false, location: true })



  const goToFilterSection = () => {
    if (filterSectionRef.current) {
      filterSectionRef.current.scrollIntoView({ behavior: "smooth" });
      setCurrentSection({ filter: false, location: true })
    }
  };

  const goLocationSection = () => {
    if (locationSectionRef.current) {
      locationSectionRef.current.scrollIntoView({ behavior: "smooth" });
      setCurrentSection({ filter: true, location: false })
    }
  };




  return (
    <div className="bg-dashboard-bg min-h-[100dvh] overflow-y-auto overflow-x-hidden px-4 lg:px-8 py-8" ref={filterSectionRef}>
      <div className="flex flex-col lg:flex-row gap-6 items-stretch h-full mt-6">
        <div className="lg:w-[25%]">
          <FilterSection className="bg-white px-4 sm:px-6 pt-4 pb-6 rounded-2xl space-y-5" currentLang={currentLang} translations={translations} />
        </div>

        <div className="md:flex-grow" ref={locationSectionRef}>
          {
            searchStatus === "ongoing" || searchStatus === "attempting" ?
              <BlockFeed className="bg-white px-4 sm:px-6 pt-6 sm:pt-12 pb-6 h-full rounded-2xl" currentLang={currentLang} translations={translations} />
              :
              <LocaltionList className="bg-white px-6 py-8 rounded-2xl h-full" currentLang={currentLang} translations={translations} />
          }
        </div>
        {currentSection.filter && <button onClick={goToFilterSection} className="lg:hidden bg-dark-blue rounded-lg flex items-center justify-center h-10 w-10 fixed right-4 bottom-24">
          <Iconify icon="heroicons-solid:arrow-sm-up" className="text-white text-2xl" />
        </button>}
        {currentSection.location && <button onClick={goLocationSection} className="lg:hidden bg-dark-blue rounded-lg flex items-center justify-center h-10 w-10 fixed right-4 bottom-24">
          <Iconify icon="heroicons-solid:arrow-sm-down" className="text-white text-2xl" />
        </button>}
      </div>

      {show === "futureSearch" && <FutureSearchModal />}
    </div>
  );
}

export default Dashboard