"use client"
import * as React from "react";
import { IoCheckmarkCircle } from "react-icons/io5";
import Logo from "../../../components/Logo/Index";
import InputField from "../../../components/Input";
import Button from "../../../components/Button";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { setTranslations } from "../../../redux/utils";
import welcomeTranslationsJson from "../../../utils/translations/welcome.json"
import { useFormik } from "formik";
import * as Yup from "yup";
import { SignUp } from "../../../redux/auth/interface";
import useReCaptcha from "../../../hooks/useReCaptcha";
import { submitGeneratedSignUpUrl } from "../../../redux/auth/features";
import { addAlert } from "../../../redux/alert";
import {  errorMsg } from "../../../utils/constant";




const Welcome = () => {
    const router = useRouter()
    const dispatch = useAppDispatch();
    dispatch(setTranslations(welcomeTranslationsJson));
    const { translations, currentLang } = useAppSelector((state) => state.utils);
    const { isUrl } =
        useAppSelector((state) => state.auth);

    const { generateReCaptchaToken } = useReCaptcha();

    const searchParams = useSearchParams();
    const referral: any = searchParams?.get("referral") || "";


    // Initialize formik
    const formik = useFormik<SignUp>({
        initialValues: {
            login_result: "",
            recaptcha_token: "",
            referral_code: referral
        },
        validationSchema: Yup.object({
            login_result: Yup.string().required(translations[currentLang.alias]["required"]),
        }),
        onSubmit: (payload) => {
            handleSubmitUrl(payload, dispatch)
        },
    });

 

    const errorMessage = (code: number) => {
        switch (code) {
            case 400:
                return errorMsg(currentLang.alias)
            case 409:
                return translations[currentLang.alias]["emailExists"];
            case 429:
                return  translations[currentLang.alias]["tooMany"]
            default: errorMsg(currentLang.alias)
        }

    }
    //Submit result url and signup
    const handleSubmitUrl = async (
        payload: SignUp,
        dispatch: ReturnType<typeof useAppDispatch>
    ) => {
        // generate recaptcha token
        const recaptcha_token = await generateReCaptchaToken("login");
        const actionResult = await dispatch(submitGeneratedSignUpUrl({ ...payload, recaptcha_token }));
        if (submitGeneratedSignUpUrl.fulfilled.match(actionResult)) {
            router.push("/dashboard");
        } else if (submitGeneratedSignUpUrl.rejected.match(actionResult)) {
            if (actionResult.error) {
                const errorCode = parseInt(actionResult.error.message || "")
                dispatch(
                    addAlert({
                        message: errorMessage(errorCode) ||errorMsg(currentLang.alias),
                        type: "error",
                    })
                );
            }
        }
    };

    return (
        <main className='grid grid-cols-1 lg:grid-cols-2 min-h-screen overflow-hidden'>
            <section className="bg-[#007AFF] order-2 lg:order-1 flex items-center justify-center flex-col gap-6">
                <div className="space-y-6 py-10 px-4">
                    
                    <div className="flex flex-row items-center space-x-2">
                        <IoCheckmarkCircle className="text-xl text-white" />
                        <p className="text-white text-xl font-medium self-center grow shrink basis-auto my-auto">
                            {translations[currentLang.alias]["followLink"]}
                        </p>
                    </div>

                    <div className="flex flex-row items-center space-x-2">
                        <IoCheckmarkCircle className="text-xl text-white" />
                        <p className="text-white  xl:text-xl font-medium self-center grow shrink basis-auto my-auto">
                            {translations[currentLang.alias]["processAuthorization"]}
                        </p>
                    </div>

                    <div className="flex flex-row items-center space-x-2">
                        <IoCheckmarkCircle className="text-xl text-white" />
                        <p className="text-white xl:text-xl font-medium self-center grow shrink basis-auto my-auto">
                            {translations[currentLang.alias]["copyResultURL"]}
                        </p>
                    </div>
                </div>
            </section>

            <section className='order-1 lg:order-2 max-w-lg w-full mx-auto lg:h-screen space-y-8 flex items-center flex-col justify-center py-16 md:py-10 px-6'>
                <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-2xl font-semibold text-neutral-500"> {translations[currentLang.alias]["welcomeTo"]}</p>
                    <Logo size="xl" />
                </div>
                <form onSubmit={formik.handleSubmit} className="space-y-4 w-full max-w-md">
                    <div className="space-y-1">
                        <InputField
                            onChange={formik.handleChange}
                            value={formik.values.login_result}
                            name="login_result"
                            type="text"
                            placeholder={translations[currentLang.alias]["resultUrl"]}
                        />
                        {formik.errors.login_result && formik.touched.login_result && (
                            <p className="text-red-600 text-sm">{formik.errors.login_result}</p>
                        )}
                    </div>
                    <InputField placeholder={translations[currentLang.alias]["optional"]}
                        onChange={formik.handleChange}
                        value={formik.values.referral_code}
                        name="referral_code"
                        type="text"
                    />
                    <div className="space-y-2 w-full">
                        <Button title={translations[currentLang.alias]["link"]} type="submit" isLoading={isUrl} />
                    </div>
                </form>

            </section>
        </main>
    );
}

export default Welcome


