"use client"
import React  from "react";
import { FaTimes } from "react-icons/fa";
import { useAppDispatch } from "../../redux/store";
import { showItem } from "../../redux/utils";

export const CustomModal = ((props:any) => {
  let { title, children, desc } = props;
  const dispatch =  useAppDispatch()
  return (
    <>
      <div className="absolute top-0 left-0">
        <div className="inset-0 fixed bg-black w-screen z-20 h-[100vh] bg-opacity-80 flex items-center px-3">
          <div
            data-aos="fade-down"
            data-aos-duration="600"
            data-aos-easing="ease-in-out"
            className="rounded-lg mx-auto w-full md:w-1/2 lg:w-1/3 py-3"
          >
            <div className="relative bg-white rounded-3xl shadow-lg h-max pb-10">
              <div className="flex justify-between items-center p-8">
                <div className="space-y-2">
                  <h3 className="text-base font-bold text-black"> {title}</h3>
                  <p className="subtitles font-medium text-slate-600">{desc}</p>
                </div>
                <button
                  onClick={() => dispatch(showItem(""))}
                  type="button"
                  className="text-gray-400 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-slate-700 hover:text-white"
                >
                  <FaTimes className="text-xl" />
                </button>
              </div>
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
