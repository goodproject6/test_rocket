"use client";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { setTranslations } from "../../../redux/utils";
import HeaderTab from "../../../components/Elements/Common/HeaderTab";
import PlanDetails from "../../../components/SubscriptionPage/planDetails";
import { buyCredits } from "../../../redux/payment/features";
import { useRouter } from "next/navigation";
// import PayAsYouGo from "./payasyougo";





function SubscriptionPlan() {
  
  const dispatch = useAppDispatch()

  const router = useRouter()

  // useLayoutEffect(() => {
  //   // dispatch(setTranslations(dashboardTranslation));


  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])


  const { currentLang, translations } = useAppSelector((state) => state.utils);

  const headers = ["Pay As You Go", "FAQs"];


  const [activeHeader, setActiveHeader] = useState(headers[0]);

  const handleBuyCredits = () => {
    dispatch(buyCredits(dispatch))
  }

  return (
    <div className="bg-dashboard-bg min-h-[100dvh] px-4 lg:px-8 py-10">
      <HeaderTab
        className="border-b border-stone-300 flex items-center space-x-3 xs:space-x-5 sm:space-x-12"
        itemClassName="text-custom-gray border-b-2 pb-1 xxs:pb-2 xs:pb-3 px-2 text-xs xxs:text-sm xs:text-base cursor-pointer transition-colors "
        activeClassName="text-theme border-theme font-semibold"
        inActiveClassName="border-transparent font-medium"
        tabs={headers}
        activeTab={activeHeader}
        currentLang={currentLang}
        translations={translations}
        updateTab={(val) => setActiveHeader(val)}
      />
      <div className="mt-10">
        <ul>
          {activeHeader === headers[0] && (
            <PayAsYouGo />
          )}
          {activeHeader === headers[1] &&
            <PlanDetails
              title="FAQs"
              currentLang={currentLang}
              translations={translations}
              price="$29 / 7 days"
              buttonTitle="Subscribe"
              onClick={() => {
                handleBuyCredits()
              }}
            />

          }
        </ul>
      </div>
    </div>
  );
}

export default SubscriptionPlan;
