"use client"
import React, { useEffect } from 'react'
import Iconify from '../../../components/Elements/icon'
import { useAppDispatch, useAppSelector } from '../../../redux/store'
import { getReferralCode } from '../../../redux/payment/features'
import { handleCopyClick } from '../../../utils/helper/handleCopyClick'



const ReferralPage = () => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(getReferralCode())
    }, [])

    const { code } = useAppSelector((state) => state.payment);


    // const shareReferralLink = async () => {
    //     const referralLink = `${window.location.hostname}/sign-up?referral=${code}`; // Your referral link
    //     if (navigator.share) {
    //       try {
    //         await navigator.share({
    //           title: 'Share Referral Link', // Optional
    //           text: 'Refer friends, Earn credits together', // Optional
    //           url: referralLink,
    //         });
    //         console.log('Referral link shared successfully');
    //       } catch (error) {
    //         console.error('Error sharing referral link', error);
    //       }
    //     } else {
        
    //       console.log('Web Share API is not supported in your browser.');
    //     }
    //   };
      
    return (
        <section className='md:h-[90vh]'>
            <div className='px-4 md:p-12 mt-10 md:mt-0  space-y-12 w-full'>
                <div className='space-y-4 max-w-3xl '>
                    <div className='text-3xl font-bold'>
                        <h2>Refer friends.</h2>
                        <h2>Earn credits together</h2>
                    </div>
                </div>

                <div className='mx-auto max-w-3xl w-full'>
                    <div className='border shadow-sm w-full p-4 rounded-xl space-y-8'>
                        <div className='flex flex-col md:flex-row md:items-center justify-evenly bg-theme/20 p-6 rounded-2xl gap-6 md:gap-12'>
                            <div className='flex gap-6 text-theme items-center justify-between flex-1'>
                                <h1 className='text-2xl md:text-3xl font-bold'>Friends <br /> Receive</h1>
                                <h1 className='text-2xl'>$10</h1>
                            </div>
                            <span className="md:w-[1px] h-[1px] md:h-12 bg-theme "></span>

                            <div className='flex gap-6 text-theme items-center justify-between flex-1'>
                                <h1 className='text-2xl md:text-3xl font-bold'>You <br /> Receive</h1>
                                <h1 className='text-2xl'>$10</h1>
                            </div>
                        </div>

                        <div className='space-y-2'>
                            <p className='text-sm'>Invitation Code</p>
                            <div className="flex items-center space-x-2 justify-between border  rounded-md px-3 py-1.5 text-xs xxs:text-sm xs:text-base cursor-copy">
                                <p className='font-bold'>{code}</p>
                                <div onClick={()=>{
                                    handleCopyClick(code, "code copied", dispatch)
                                }}>
                                    <Iconify icon="solar:copy-linear" />
                                </div>
                            </div>
                        </div>

                        <div className='space-y-2'>
                            <p className='text-sm'>Invitation Link</p>
                            <div className="flex items-center space-x-2 justify-between border  rounded-md px-3 py-1.5 text-xs xxs:text-sm xs:text-base cursor-copy">
                                <p className='font-bold truncate max-w-[280px] md:max-w-full'>
                                {window.location.hostname}/sign-up?referral={code}
                                    </p>
                                <div>
                                    <button onClick={()=>{
                                    handleCopyClick(`${window.location.hostname}/sign-up?referral=${code}`, "Link copied", dispatch)
                                }}>
                                        <Iconify icon="solar:copy-linear" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div>
                            <button className='bg-theme w-full font-semibold text-white rounded-lg h-12 flex items-center justify-center'>
                                Share Referral Link
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ReferralPage