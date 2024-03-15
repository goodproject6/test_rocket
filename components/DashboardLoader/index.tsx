"use client";
import React, { FC } from "react";
import Iconify from "../Elements/icon";
import dashboardTranslation from "../../utils/translations/dashboard.json"
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { setTranslations } from "../../redux/utils";


const DashboardLoader: FC = ({}) => {
  const dispatch = useAppDispatch()
  dispatch(setTranslations(dashboardTranslation));
  const { currentLang, translations, } = useAppSelector((state) => state.utils);
  return (
    <main className="p-2 md:p-6 h-screen">
      <div className="bg-light-theme h-full rounded-[20px] flex flex-col justify-center items-center py-10 lg:py-20">
        <div className="space-y-8 text-theme text-center font-semibold">
          <Iconify
            icon="ph:circles-three"
            className="text-2xl mx-auto animate-spin"
          />
          <p>{translations[currentLang.alias]["settingUpDashboard"]}</p>
        </div>
        <div></div>
      </div>
    </main>
  );
};

export default DashboardLoader;
