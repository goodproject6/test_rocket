import React from "react";
import {
  Button
} from "@nextui-org/react";
import Iconify from "../Elements/icon";


interface ButtonProps {
  title: string;
  opacity?: boolean
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  isLoading?: boolean
  type?: "button" | "submit" | "reset";
}

const GeneralButton: React.FC<ButtonProps> = ({ title, opacity, onClick, isLoading, type }) => {
  return (
    <Button className={`w-full outline-none h-12 border-none rounded-full text-2xl bg-blue-500 text-white font-bold cursor-pointer ${opacity ? "opacity-[0.4]" : ""
      }`}
      onClick={onClick}
      type={type}
    >
     <p className="text-lg font-bold">{isLoading && (
        <Iconify
          icon="mingcute:loading-line"
          className="text-2xl animate-spin"
        />
      )}
      {!isLoading && title}</p>
    </Button>
  );
};

export default GeneralButton;
