"use client";
import React, {  useEffect} from "react";
import DetailForm from "../../../components/AccountSettingsPage/DetailsForm";
import TelegramSection from "../../../components/AccountSettingsPage/TelegramSection";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { setTranslations } from "../../../redux/utils";
import dashboardTranslation from "../../../utils/translations/dashboard.json"
import { accSyncStatus } from "../../../redux/auth/features";



const AccountSettings = () => {

  const dispatch = useAppDispatch()


  useEffect(() => {
    dispatch(setTranslations(dashboardTranslation));
    dispatch(accSyncStatus())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const { currentLang, translations } = useAppSelector((state) => state.utils);

  const { user, accountSynced } = useAppSelector((state) => state.auth)


  return (
    <div className="bg-dashboard-bg min-h-[100dvh] px-4 lg:px-8 py-10">

      <div className="bg-white rounded-xl py-10 px-6 flex flex-col items-stretch md:flex-row gap-x-6 gap-y-10 justify-between">
        <div
          className="flex-1 pt-3 md:flex flex-col justify-between xl:max-w-[45%]"
        >
          <DetailForm  currentLang={currentLang} translations={translations} />
         
        </div>
        <div className="flex-1 xl:max-w-[45%]">
          <TelegramSection
            is_telegram_active={user.telegram_sync_status}
            currentLang={currentLang} translations={translations}
            accountSynced={accountSynced}
          />
        </div>
      </div>
    </div>
  );
}

export default AccountSettings;
