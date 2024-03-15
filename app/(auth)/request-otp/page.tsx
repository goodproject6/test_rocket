"use client"
import React from "react";
import GeneralButton from "../../../components/Button";
import { useRouter, useSearchParams } from "next/navigation";
import InputField from "../../../components/Input";
import * as Yup from "yup";
import { useFormik } from "formik";
import { RequestOtp } from "../../../redux/auth/interface";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { requestOtp } from "../../../redux/auth/features";
import { addAlert, removeAlert } from "../../../redux/alert";
import useReCaptcha from "../../../hooks/useReCaptcha";
import { generateUniqueId } from "../../../components/GenerateUUID";
import { errorMsg } from "../../../utils/constant";
import signInTrans from "../../../utils/translations/signin.json"
import { setTranslations } from "../../../redux/utils";



const RequestOtpPage = () => {
  const router = useRouter()
  const searchParams = useSearchParams();
  const method: any = searchParams?.get("method") || "";
  const dispatch = useAppDispatch();
  const { isOtp } =
    useAppSelector((state) => state.auth);
  const { generateReCaptchaToken } = useReCaptcha();


  dispatch(setTranslations(signInTrans));
  const { translations, currentLang } = useAppSelector((state) => state.utils)


  // Initialize formik
  const formik = useFormik<RequestOtp>({
    initialValues: {
      email: "",
      method,
      recaptcha_token: ""
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
    onSubmit: (payload) => {
      handleRequestOtp(payload, dispatch);
    },
  });




  // Request OTP
  const handleRequestOtp = async (
    payload: RequestOtp,
    dispatch: ReturnType<typeof useAppDispatch>
  ) => {
    const alertId = generateUniqueId()
    dispatch(
      addAlert({
        id: alertId,
        type: "info",
        message: translations[currentLang.alias]["requestingOtp"],
        autoClose: false,
        icon: "mingcute:loading-line",
        spin: true,
      })
    );
    // generate recaptcha token
    const recaptcha_token = await generateReCaptchaToken("login");
    const actionResult = await dispatch(requestOtp({ ...payload, recaptcha_token }));
    if (requestOtp.fulfilled.match(actionResult)) {
      dispatch(
        addAlert({
          message: `${method} ${translations[currentLang.alias]["otpSent"]}`,
          type: "success",
        })
      );
     
      router.push(`/verify-otp?email=${payload.email}`);
    } else if (requestOtp.rejected.match(actionResult)) {
      if (actionResult.error) {
        const errorCode = parseInt(actionResult.error.message || "")
        dispatch(
          addAlert({
            message: errorCode === 429 ? "Too many requests" : errorMsg("es"),
            type: "error",
          })
        );
      }
    }
    dispatch(removeAlert(alertId));
  };



  return (
    <main className='grid grid-cols-1 md:grid-cols-2 h-screen overflow-hidden'>
      {/* Hidden on small devices */}
      <section className="hidden md:flex flex-col gap-10 justify-between items-center order-2 md:order-1 bg-[#007AFF]">
       
      </section>

      {/* Visible on small devices */}
      <section className='order-1 md:order-2 w-full mx-auto lg:h-screen space-y-8 flex items-center flex-col justify-center py-16 px-6 md:py-10'>
        <h2 className="text-2xl text-neutral-500 font-bold">{translations[currentLang.alias]["enterYourEmail"]}</h2>
        <form onSubmit={formik.handleSubmit} className="w-full max-w-md">
          <div className="space-y-6">
            <div className="space-y-2">
              <InputField
                placeholder={translations[currentLang.alias]["enterYourEmail"]}
                onChange={formik.handleChange}
                value={formik.values.email}
                name="email"
                type="email"
              />
              <div className="relative">
                {formik.errors.email && formik.touched.email && (
                  <p className="text-red-600 text-sm absolute left-0">{formik.errors.email}</p>
                )}
              </div>
            </div>
            <GeneralButton title={translations[currentLang.alias]["sendOtp"]} type="submit" isLoading={isOtp} />
          </div>
        </form>
      </section>
    </main>
  );
}


export default RequestOtpPage