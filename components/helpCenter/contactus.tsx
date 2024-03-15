import React from 'react'
import Iconify from '../Elements/icon'
import { Language } from '../../redux/utils/interface'

const Contactus = ({currentLang,translations}:{ currentLang: Language,
    translations: any}) => {
    return (
        <section className='space-y-4'>
            <p className='font-semibold text-gray-700'>{translations[currentLang.alias]["title"]}</p>
            <p className='text-sm'>{translations[currentLang.alias]["availability"]}</p>

            <div className='flex gap-3 items-center'>
                <Iconify icon='fa:telegram' className='text-theme text-2xl' />

                <p className="underline text-sm font-medium">@username</p>

                <Iconify icon='solar:copy-bold-duotone' className='text-xl' />
            </div>

        </section>
    )
}

export default Contactus