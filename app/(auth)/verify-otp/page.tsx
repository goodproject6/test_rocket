"use client"
import React, { useState } from "react";
import OtpInput from "../../../components/Elements/otpInput";
import GeneralButton from "../../../components/Button";
import { useRouter, useSearchParams } from "next/navigation";
import { VerifyOtp } from "../../../redux/auth/interface";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { addAlert, removeAlert } from "../../../redux/alert";
import { verifyOtp } from "../../../redux/auth/features";
import { generateUniqueId } from "../../../components/GenerateUUID";
import { errorMsg } from "../../../utils/constant";
import signInTrans from "../../../utils/translations/signin.json"
import { setTranslations } from "../../../redux/utils";




const VerifyOTP = () => {
  const searchParams = useSearchParams();
  const email: any = searchParams?.get("email") || "";
  const [code, setCode] = useState("")
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { isOtp} =
  useAppSelector((state) => state.auth);

  const isValidOTP = (otp: string): boolean => {
    // Check if the OTP is a 6-digit number
    return /^\d{6}$/.test(otp);
  }


  dispatch(setTranslations(signInTrans));
  const { translations, currentLang } = useAppSelector((state) => state.utils)


  const errorMessage = (code: number) => {
    switch (code) {
      case 400:
        return "Invalid user type";
      case 401:
        return "Authentication failed";
      case 429:
        return "Too many requests"
      default: errorMsg("en")
    }

  }


  // handle verify otp
  const handleVerifyOtp = async (
    payload: VerifyOtp,
    dispatch: ReturnType<typeof useAppDispatch>
  ) => {
    const alertId = generateUniqueId()
    dispatch(
      addAlert({
        id: alertId,
        type: "info",
        message: "Verifying",
        autoClose: false,
        icon: "mingcute:loading-line",
        spin: true,
      })
    );
    // check if code is valid
    if (isValidOTP(payload.otp)) {
      const actionResult = await dispatch(verifyOtp(payload));
      if (verifyOtp.fulfilled.match(actionResult)) {
       router.push("/dashboard");
      } else if (verifyOtp.rejected.match(actionResult)) {
        if (actionResult.error) {
          const errorCode = parseInt(actionResult.error.message || "")
          dispatch(
            addAlert({
              message: errorMessage(errorCode) || errorMsg("en"),
              type: "error",
            })
          );
        }
      }
    } else {
      dispatch(
        addAlert({
          message: "Invalid OTP",
          type: "error",
        })
      );
    }
    dispatch(removeAlert(alertId));
  };

  return (
    <main className='grid grid-cols-1 md:grid-cols-2 h-screen overflow-hidden'>
      {/* Hidden on small devices */}
      <section className="hidden md:flex flex-col gap-10 justify-between items-center order-2 md:order-1 bg-[#007AFF]">
       
      </section>

      {/* Visible on small devices */}
      <section className='order-1 md:order-2 w-full mx-auto lg:h-screen space-y-8 flex items-center flex-col justify-center py-16 px-4 md:px-6 md:py-10'>
        <h2 className="text-2xl text-neutral-500 font-bold">{translations[currentLang.alias]["enterCodeToSignIn"]}</h2>
        <OtpInput value={code} onChange={(value) => {
           setCode(value)
        }} />
        <div className="w-32">
          <GeneralButton title={translations[currentLang.alias]["verify"]} onClick={() => {
            handleVerifyOtp({ otp: code, email }, dispatch)
          }}
          isLoading={isOtp}
          />
        </div>
      </section>
    </main>


  );
}


export default VerifyOTP