'use client'
import React from 'react'
import Link from 'next/link';
import Logo from '../components/Logo/Index';
import GeneralButton from '../components/Button';
import { useRouter } from 'next/navigation';
import signInTrans from "../utils/translations/signin.json"
import { useAppDispatch, useAppSelector } from '../redux/store';
import { setTranslations } from '../redux/utils';


const SignIn = () => {
 const router =  useRouter()
 const dispatch = useAppDispatch()
 dispatch(setTranslations(signInTrans));
 const { translations, currentLang } = useAppSelector((state) => state.utils)

return (
    <main className='grid grid-cols-1 lg:grid-cols-2 h-screen overflow-hidden'>
    {/* Hidden on small devices */}
    <section className="hidden lg:flex flex-col justify-between gap-10 items-center order-2 lg:order-1 bg-[#007AFF]"> 
    </section>
  
    {/* Visible on small devices */}
    <section className='order-1 lg:order-2 max-w-lg w-full mx-auto lg:h-screen space-y-8 flex items-center flex-col justify-center py-16 md:py-10 px-6'>
      <Logo size="3xl" />
      <h1 className='text-xl font-bold text-neutral-500'>{translations[currentLang.alias]["signInViaAmazon"]}</h1>
  
      <div className='space-y-3 w-full text-sm'>
        <GeneralButton title={translations[currentLang.alias]["telegramButton"]} onClick={()=>{
             router.push("/request-otp?method=telegram")
        }}/>
        <GeneralButton title={translations[currentLang.alias]["emailButton"]}  onClick={()=>{
          router.push("/request-otp?method=email")
        }}/>
        <p className='text-center'>{translations[currentLang.alias]["noAccount"]} <Link href="/sign-up"><span className='font-bold text-blue-500'>{translations[currentLang.alias]["signUpLink"]}</span></Link></p>
      </div>
    </section>
  </main>
  
  )
}

export default SignIn