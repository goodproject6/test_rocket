"use client"
import React from "react";
import Button from "../../../components/Button";
import Logo from "../../../components/Logo/Index";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { setTranslations } from "../../../redux/utils";
import signUpTranslationsJson from "../../../utils/translations/signup.json"
import { handleGenerateSignUpUrl } from "../../../utils/auth/generateLoginUrl";


const SignUp = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    dispatch(setTranslations(signUpTranslationsJson));
    const { translations, currentLang } = useAppSelector((state) => state.utils)
    const searchParams = useSearchParams();
    const referral: any = searchParams?.get("referral") || "";


    const { isUrl } =
        useAppSelector((state) => state.auth);


    return (
        <main className='grid grid-cols-1 md:grid-cols-2 h-screen'>
            <section className="bg-[#007AFF] flex flex-col justify-center h-full items-center order-2 md:order-1">
                <div className='px-6 py-12 md:p-12 w-full space-y-10'>
                    <div className="space-y-4">
                        <h1 className='text-white md:text-lg font-extrabold'>{translations[currentLang.alias]["followStepsTitle"]}</h1>

                        <div className='flex flex-col items-start justify-between mt-5 h-48 md:w-5/6 relative'>
                            <div className="flex items-center w-full gap-4">
                                <div className="w-9 h-9 rounded-full bg-white text-blue-500 font-semibold z-2 text-lg flex items-center justify-center p-5">1</div>
                                <p className='font-semibold text-sm md:text-base leading-7 text-white'> {translations[currentLang.alias]["step1"]["title"]}</p>
                            </div>

                            <div className="flex items-center w-full gap-4">
                                <div className="w-9 h-9 rounded-full bg-white text-blue-500 font-semibold z-2 text-lg flex items-center justify-center p-5">2</div>
                                <p className='font-semibold text-sm md:text-base leading-7 text-white'> {translations[currentLang.alias]["step2"]["title"]}</p>
                            </div>

                            <div className="flex items-center w-full gap-4">
                                <div className="w-9 h-9 rounded-full bg-white text-blue-500 font-semibold z-2 text-lg flex items-center justify-center p-5">3</div>
                                <p className='font-semibold text-sm md:text-base  leading-7 text-white'>{translations[currentLang.alias]["step3"]["title"]}</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">

                        <div className="flex flex-col items-center space-y-4">
                            <iframe
                                width="350"
                                height="180"
                                className='rounded-lg'
                                src="https://www.youtube.com/embed/dykCIUpxIp0"
                                title="The Flash - Season 9 Best Moments"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            ></iframe>

                            <span className="font-bold underline text-white mt-2">{translations[currentLang.alias]["clickToWatchVideo"]}</span>
                        </div>
                    </div>

                </div>
            </section>

            <section className='order-1 md:order-2 max-w-lg w-full mx-auto h-full space-y-8 flex items-center flex-col justify-center px-6 py-8'>
                <Logo size="3xl" />
                <div className="text-neutral-500 text-2xl font-bold whitespace-nowrap mt-8">
                    {translations[currentLang.alias]["signUpViaAmazon"]}
                </div>

                <Button title={translations[currentLang.alias]["signUpButton"]} onClick={() => {
                    handleGenerateSignUpUrl(dispatch, translations[currentLang.alias]["generatingLink"], router, currentLang, true,referral)
                }}
                    isLoading={isUrl}
                />

                <div className="text-[#000000] text-sm whitespace-nowrap">
                    {translations[currentLang.alias]["alreadyHaveAccount"]}{" "}
                    <Link href="/">
                        <span className="font-bold text-[#007AFF]">{translations[currentLang.alias]["signInLink"]}</span>
                    </Link>
                </div>
            </section>
        </main>
    );
}

export default SignUp