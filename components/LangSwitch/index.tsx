"yse client"
import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { setLanguage } from "../../redux/utils";


const LangSwitch = ({ showLanguage, setShowLanguage }: { setShowLanguage: any, showLanguage: any }) => {
    const dispatch = useAppDispatch()
    const { langugages } = useAppSelector((state) => state.utils)
    return (
        <div className="absolute w-3/4 mt-2 shadow-lg border rounded-md text-sm bg-white">
            {langugages.map((item, i) => (
                <button className="subtitles rounded block w-full py-3 hover:bg-gray-200" key={i} onClick={() => {
                    dispatch(setLanguage(item))
                    setShowLanguage(!showLanguage)
                }}>
                    {item.name}
                </button>
            ))}
        </div>
    )

}

export default LangSwitch