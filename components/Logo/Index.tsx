import Image from "next/image";
import React from "react";
import logo from "../../public/logo.svg"


interface LogoProps {
  size?:string
  
}

const Logo:React.FC<LogoProps>  = ({size="2xl"}) => {
  return <div className="flex items-stretch">
    <div className={`text-[#F72D28] text-${size} font-bold whitespace-nowrap`}>
      T
    </div>
    <div className={`text-[#F72D28] text-${size} font-bold tracking-tighter`}>
      URB
    </div>
    <Image
      loading="lazy"
      src={logo}
      className="aspect-[1.03] object-contain object-center w-[30px] overflow-hidden shrink-0 max-w-full"
      width={100}
      height={100}
      alt="logo"
    />
    <div className="m-1"></div>
    <div className={`text-[#F72D28] text-${size} font-bold tracking-tighter`}>
      B
    </div>
    <div className={`text-[#F72D28] text-${size} font-bold tracking-tighter`}>
      L
    </div>
    <div className={`text-[#F72D28] text-${size} font-bold tracking-tighter`}>
      O
    </div>
    <div className={`text-[#F72D28] text-${size} font-bold tracking-tighter`}>
      C
    </div>
    <div className={`text-[#F72D28] text-${size} font-bold tracking-tighter`}>
      K
    </div>
    <div className={`text-[#F72D28] text-${size} font-bold tracking-tighter`}>
      S
    </div>
  </div>
}


export default Logo