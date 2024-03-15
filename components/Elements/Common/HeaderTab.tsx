import React from "react";
import { Language } from "../../../redux/utils/interface";

function HeaderTab({
  className,
  itemClassName,
  activeClassName,
  inActiveClassName,
  tabs,
  activeTab,
  currentLang,
  translations,
  updateTab,
  
}: {
  className: string;
  itemClassName?: string;
  activeClassName?: string;
  inActiveClassName?: string;
  tabs: string[];
  activeTab: string;
  currentLang:Language,
  translations:any,
  updateTab: (tab: string) => void;
}) {
  return (
    <ul className={className}>
      {tabs.map((item) => (
        <li
          key={item}
          onClick={() => updateTab(item)}
          className={`${itemClassName} ${
            item === activeTab ? `${activeClassName}` : `${inActiveClassName}`
          }`}
        >

          {item === "FAQs" ? "FAQs":translations[currentLang.alias]["payAsYouGo"]}
        </li>
      ))}
    </ul>
  );
}

export default HeaderTab;
