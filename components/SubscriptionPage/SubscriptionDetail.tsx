"use client"
import { Button } from "@nextui-org/react";
import React, { useState } from "react";
import { Language } from "../../redux/utils/interface";
import Iconify from "../Elements/icon";
import { useAppSelector } from "../../redux/store";

function SubscriptionDetail({
  title,
  currentLang,
  translations,
  price,
}: {
  title: string;
  currentLang: Language;
  translations: any;
  price?: number;
}) {

  const {walletBalance,  weeklySpend } = useAppSelector((state) => state.payment);
  return (
    <li className="flex-1 bg-white px-3 rounded-lg min-w-[15rem] max-w-[17rem] shadow-lg w-full pt-4 pb-8">
      <div>
        <h2 className="text-theme font-semibold border-b pb-1 border-custom-gray/30">
          {title}
        </h2>
      </div>
      <div className="mt-5 flex justify-center">
        {/* {price && (
          <h1 className="text-4xl font-medium text-custom-gray">
            ${price?.toFixed(2)}
          </h1>
        )} */}
        {!price && (
          <Button className="text-success bg-success/10 border rounded-full border-success">
            Add Funds
          </Button>
        )}
      </div>
    </li>
  );
}

export default SubscriptionDetail;
