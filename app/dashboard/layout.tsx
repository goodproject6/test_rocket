"use client";
import React, {  useLayoutEffect, useRef, useState } from "react";
import SideNavbar from "../../components/Elements/sideNavbar";
import Iconify from "../../components/Elements/icon";
import Logo from "../../components/Logo/Index";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { setTranslations } from "../../redux/utils";
import dashboardTranslation from "../../utils/translations/dashboard.json";
import Middleware from "../../utils/auth/middleware";
import useFetchDataUtility from "../../utils/helper/userDetails";
import { usePathname } from "next/navigation";
import { fetchSearchSettings } from "../../redux/searchSetup/features";
import { connectSearchWebSocket, getSearchStatus } from "../../redux/search/features";
import { connectTopUpWebSocket } from "../../redux/payment/features";



const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const navhandler = () => {
    setIsOpen(!isOpen);
  };

  const dispatch = useAppDispatch();
  dispatch(setTranslations(dashboardTranslation));

  const { currentLang, translations } = useAppSelector((state) => state.utils);

  useFetchDataUtility({ dispatch, pathname: pathname || "" });

  const hasRun = useRef(false);

  useLayoutEffect(() => {
    if (!hasRun.current) {
      dispatch(fetchSearchSettings());
      dispatch(getSearchStatus(dispatch))
      connectSearchWebSocket(dispatch)
      connectTopUpWebSocket(dispatch)
      hasRun.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  
 

  return (
     <main className="flex flex-wrap w-screen h-screen overflow-y-scroll ">
      <SideNavbar open={isOpen} closeNavbar={() => setIsOpen(false)} currentLang={currentLang} translations={translations} />
      <section className="flex-1 lg:ml-64 ">
        <div className="bg-white lg:hidden p-4">
          <div className="flex gap-4">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? (
                <Iconify icon="iconamoon:close-bold" className="text-3xl" />
              ) : (
                <Iconify icon="heroicons:bars-3-bottom-left-16-solid" className="text-3xl" />
              )}
            </button>
            <div>
              <Logo />
            </div>
          </div>
        </div>

        {/* overlay */}
        <div onClick={navhandler}
          className={`fixed inset-0 h-full z-30 flex items-end bg-black bg-opacity-30 sm:items-center sm:justify-center lg:hidden ${isOpen ? "translate-x-0" : "-translate-x-full"
            }`}
        ></div>
        <section className="min-h-[100dvh]"><Middleware>{children}</Middleware></section>
      </section>
    </main>
  );
};

export default DashboardLayout;
