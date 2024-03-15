import { Button, } from "@nextui-org/react";
import React, { useState } from "react";
import { Language } from "../../redux/utils/interface";
import Iconify from "../Elements/icon";
import { useAppSelector } from "../../redux/store";

function PlanDetails({
  title,
  currentLang,
  translations,
  price,
  buttonTitle,
  onClick
}: {
  title: string;
  currentLang: Language,
  translations: any,
  price: string,
  buttonTitle: string
  onClick:()=>void
}) {

  const AccordionItem = ({ item }:{item:any}) => {
    const [isOpen, setIsOpen] = useState(false);
  
    return (
      <div className="border-b border-gray-200 last:border-0">
        <button
          className="py-4 w-full text-left flex justify-between items-center bg-gray-100 rounded-lg mb-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="ml-4 font-medium text-gray-700">{item.name}</span>
          <Iconify
            icon={isOpen ? "akar-icons:chevron-up" : "akar-icons:chevron-down"}
            className="text-gray-700 mr-4"
          />
        </button>
        {isOpen && (
          <div className="p-4 bg-gray-50 rounded-lg mb-4">
            <p className="text-gray-600">{item.details}</p>
          </div>
        )}
      </div>
    );
  };

  const [checkList, setCheckList] = useState([
    {
      name: "How to add funds",
      details: "To be provided",

    },
    {
      name: "Stripe Payments",
      details: "To be provided",
    },
    {
      name: "Block Management",
      details: "To be provided",
    },
    {
      name: "Canceling Blocks ",
      details: "To be provided",
    },
    {
      name: "How You’re Charged ",
      details: "To be provided",
    },
   
  ]);


  const { isBuyingCredits } = useAppSelector((state) => state.payment);


  return (
    <div className="bg-white p-8 rounded-xl max-w-xl mx-auto space-y-14"
    >
      <div className="flex flex-col gap-12">

        <div className="flex justify-between gap-6 items-center">
          <div className="space-y-2">
            <p className="text-xs uppercase">subcription</p>
            <h1 className="text-xl font-bold">{title}</h1>
          </div>

          <Button className="font-semibold bg-transparent border-2 px-3 border-theme text-gray-700 h-10">{price}</Button>
        </div>


        <div className="space-y-4">
        {checkList.map((item, index) => (
            <AccordionItem key={index} item={item} />
          ))}
        </div>
      </div>

      <hr />

      <div className="flex items-center justify-center">
        <Button className="text-white font-semibold xl:w-1/2 bg-dark-blue h-11 text-base" onClick={()=>{
           onClick()
        }} isLoading={isBuyingCredits}>Add Funds</Button>
      </div>

    </div>
  );
}

export default PlanDetails;