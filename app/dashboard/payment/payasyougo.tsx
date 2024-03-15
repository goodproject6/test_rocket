"use client";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { setTranslations } from "../../../redux/utils";
import dashboardTranslation from "../../../utils/translations/dashboard.json";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";
import { buyCredits } from "../../../redux/payment/features";




function PayAsYouGo() {
  const dispatch = useAppDispatch();

  const router = useRouter()



  const { currentLang, translations } = useAppSelector((state) => state.utils);


  const { walletBalance, weeklySpend, isBuyingCredits } = useAppSelector((state) => state.payment);



  const handleBuyCredits = () => {
    dispatch(buyCredits(dispatch))
  }




  return (
    <div className="bg-dashboard-bg px-4 lg:px-8 py-10">
      <section className="lg:py-28">
        <div className="bg-white pt-10 pb-8 px-4 xs:px-6 rounded-xl">
          <div>
            <h2 className="text-theme text-lg font-semibold sm:pr-20 sm:w-fit pb-1">
              Payment Management
            </h2>
          </div>
          <ul className="flex flex-wrap justify-center lg:justify-between mt-10 px-1 sm:px-8 gap-6">

            <li className="flex-1 bg-white px-3 rounded-lg min-w-[15rem] max-w-[17rem] shadow-lg w-full pt-4 pb-8">
              <div>
                <h2 className="text-theme font-semibold border-b pb-1 border-custom-gray/30">
                  Remaining Funds
                </h2>
              </div>
              <div className="mt-5 flex justify-center">

                <h1 className="text-4xl font-medium text-custom-gray">
                  {walletBalance ? `$${parseInt(walletBalance)}` : 0}
                </h1>

              </div>
            </li>
            <li className="flex-1 bg-white px-3 rounded-lg min-w-[15rem] max-w-[17rem] shadow-lg w-full pt-4 pb-8">
              <div>
                <h2 className="text-theme font-semibold border-b pb-1 border-custom-gray/30">
                  Weekly Spend
                </h2>
              </div>
              <div className="mt-5 flex justify-center">

                <h1 className="text-4xl font-medium text-custom-gray">
                  {weeklySpend ? `$${parseInt(weeklySpend)}` : 0}
                </h1>

              </div>
            </li>
            <li className="flex-1 bg-white px-3 rounded-lg min-w-[15rem] max-w-[17rem] shadow-lg w-full pt-4 pb-8">
              <div>
                <h2 className="text-theme font-semibold border-b pb-1 border-custom-gray/30">
                  Manage Credits
                </h2>
              </div>
              <div className="mt-5 flex justify-center">
                <Button className="text-success bg-success/10 border rounded-full border-success" onClick={() => {
                  handleBuyCredits()
                }}
                  isLoading={isBuyingCredits}
                >
                  Add Funds
                </Button>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default PayAsYouGo;
