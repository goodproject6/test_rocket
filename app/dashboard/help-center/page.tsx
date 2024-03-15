'use client'
import React, { useEffect, useState } from 'react'
import Contactus from '../../../components/helpCenter/contactus'
import Terms from '../../../components/helpCenter/terms'
import Privacy from '../../../components/helpCenter/privacy'
import dashboardTranslation from "../../../utils/translations/dashboard.json"
import { useAppDispatch, useAppSelector } from '../../../redux/store'
import { setTranslations } from '../../../redux/utils'


const HelpCenter = () => {

    const dispatch = useAppDispatch()


  
  useEffect(() => {
    dispatch(setTranslations(dashboardTranslation));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const { currentLang, translations } = useAppSelector((state) => state.utils);

    const [activeTab, setActiveTab] = useState(1)

    const tabs = [
        { id: 1, name: translations[currentLang.alias]["contactUs"] },
        { id: 2, name: translations[currentLang.alias]["terms"]  },
        { id: 3, name: translations[currentLang.alias]["privacy"]  },
    ]

    return (
        <div className="bg-dashboard-bg min-h-[100dvh] px-4 lg:px-8 py-10">
            <div className='bg-white w-full h-max space-y-6 rounded-2xl'>
                <div className='flex w-full gap-4 md:gap-10 pt-6 px-6 border-b'>
                    {
                        tabs.map((each, i) => {
                            return (
                                <div key={i} onClick={() => setActiveTab(each.id)} role='button' className={`${activeTab === each.id ? "border-b-2 border-theme" : "border-b-2 border-white"} duration-300 transition-all ease-in pb-2 px-3 flex flex-none items-center gap-2`}>
                                    <p className={`font-medium text-sm ${activeTab !== each.id ? "text-mute" : "text-theme"} transition-all ease-in-out duration-300`}>{each.name}</p>
                                </div>
                            )
                        })
                    }
                </div>

                <div className='px-6 pb-6'>
                    {activeTab === 1 && <Contactus currentLang={currentLang} translations ={translations}/>}
                    {activeTab === 2 && <Terms />}
                    {activeTab === 3 && <Privacy />}
                </div>
            </div>
        </div>
    )
}

export default HelpCenter