"use client";
import React, { FC, useState } from "react";
import Logo from "../Logo/Index";
import Iconify from "./icon";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { setLanguage } from "../../redux/utils";
import { Language } from "../../redux/utils/interface";
import { signOut } from "../../redux/auth";
import LangSwitch from "../LangSwitch";




interface Props {
  open: boolean;
  closeNavbar: () => void;
  currentLang: Language,
  translations: any
}

const SideNavbar: FC<Props> = ({ open, closeNavbar, currentLang, translations }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [showLanguage, setShowLanguage] = useState(false);
  const dispatch = useAppDispatch()


  const { langugages } = useAppSelector((state) => state.utils)

  const routes = [
    {
      id: 1,
      name: translations[currentLang.alias]["searchBlocks"],
      route: "/dashboard",
      icon: "iconamoon:search-bold",
    },
    {
      id: 2,
      name: translations[currentLang.alias]["searchHistory"],
      route: "/dashboard/search-history",
      icon: "ic:baseline-history",
    },
    {
      id: 7,
      name: translations[currentLang.alias]["blockManagement"],
      route: "/dashboard/block-management",
      icon: "ic:outline-manage-search",
    },
    {
      id: 8,
      name: translations[currentLang.alias]["referral"],
      route: "/dashboard/referral",
      icon: "healthicons:referral",
    },
    {
      id: 3,
      name: translations[currentLang.alias]["payment"],
      route: "/dashboard/payment",
      alt: "/dashboard/payment/plans",
      icon: "bx:dollar-circle",
    },
    {
      id: 4,
      name: translations[currentLang.alias]["myAccount"],
      route: "/dashboard/account-settings",
      icon: "iconamoon:profile-fill",
    },
    {
      id: 5,
      name: translations[currentLang.alias]["helpCenter"],
      route: "/dashboard/help-center",
      icon: "mingcute:question-line",
    },
    {
      id: 6,
      name: translations[currentLang.alias]["signOut"],
      icon: "solar:logout-line-duotone",
    },

  ];

  const { walletBalance } = useAppSelector((state) => state.payment);


  return (
    <section
      className={` overflow-y-auto overflow-x-hidden  bg-light-theme h-full -translate-x-full transition duration-300 ease-in-out lg:translate-x-0 inset-y-0 left-0 top-0 transform fixed ${open ? "translate-x-0" : "-translate-x-full"
        } z-50 `}
    >
      <div className="relative w-[18rem] lg:w-64 py-10 px-8 min-h-[40rem] md:min-h-[45rem] h-full space-y-6 sm:space-y-10">
        <div className="hidden md:block">
          <Logo />
        </div>

        <div className="space-y-1 lg:space-y-0">
          {routes.map((each, i) => {
            return (
              <div
                key={i}
                className={`flex gap-4 items-center h-10 md:h-11 rounded-lg px-4 cursor-pointer hover:[&>p]:text-theme
                }`}
                onClick={() => {
                  if (each.route) {
                    router.push(each.route);
                    closeNavbar();
                  } else {
                    dispatch(signOut())
                  }
                }}
              >
                <Iconify
                  icon={each.icon}
                  className={`${pathname === each.route || pathname === each.alt ? "text-danger" : "text-theme"
                    } text-2xl`}
                />
                <p
                  className={`${pathname === each.route || pathname === each.alt ? "text-danger" : "text-label"
                    } text-sm truncate`}
                >
                  {each.name}
                </p>
              </div>
            );
          })}
        </div>

        <div className="bottom-10 absolute w-full space-y-4">
          <div>
            <button
              onClick={() => setShowLanguage(!showLanguage)}
              className="border border-danger flex items-center justify-between p-3 h-11 text-danger w-3/4 rounded-lg"
            >
              <div className="flex items-center gap-4">
                <Iconify icon="mdi:language" className="text-xl" />
                <p>{currentLang.name}</p>
              </div>

              <Iconify
                icon="iconamoon:arrow-down-2-bold"
                className="text-lg flex-none"
              />
            </button>

            {showLanguage && (
              <LangSwitch setShowLanguage={setShowLanguage} showLanguage={showLanguage} />
            )}
          </div>
          <div className="bg-white border border-theme h-11 w-3/4 rounded-lg flex items-center justify-center overflow-hidden">
            <p className="text-black text-sm font-semibold truncate mx-2">
              ${walletBalance?walletBalance : 0} {translations[currentLang.alias]["creditsRemaining"]}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SideNavbar;