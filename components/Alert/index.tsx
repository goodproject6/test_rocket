"use client";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../redux/store";
import { removeAlert } from "../../redux/alert";
import Iconify from "../Elements/icon";






const Alert: React.FC = () => {
  const dispatch = useDispatch();
  const { messages } = useAppSelector((state) => state.alerts);

  useEffect(() => {
    messages.forEach((message) => {
      if (message.autoClose !== false && message.id) {
        setTimeout(() => {
          dispatch(removeAlert(message.id as string));
        }, 500);
      }
    });
  }, [messages, dispatch]);

  const getBackgroundColor = (type: string) => {
    switch (type) {
      case "error":
        return "bg-red-100";
      case "warning":
        return "bg-yellow-100";
      case "success":
        return "bg-green-100";
      case "info":
      default:
        return "bg-blue-100";
    }
  };

  const getTextColor = (type: string) => {
    switch (type) {
      case "error":
        return "text-red-600";
      case "warning":
        return "text-yellow-600";
      case "success":
        return "text-green-600";
      case "info":
      default:
        return "text-blue-600";
    }
  };

  const getDefaultIcon = (type: string) => {
    switch (type) {
      case "error":
        return "jam:alert";
      case "warning":
        return "jam:warning";
      case "success":
        return "mdi:check-bold";
      case "info":
      default:
        return "jam:info";
    }
  };

  const getAlertStyle = (type: string, customIcon?: string, spin?: boolean) => {
    return {
      background: getBackgroundColor(type),
      textColor: getTextColor(type),
      icon: customIcon || getDefaultIcon(type),
      spin: spin || false,
    };
  };

  const splitCamelCaseAndCapitalize = (str: string) => {
    if (typeof str !== "string" || str.length === 0) {
      return str;
    }
    // Replace camel case boundaries with a space and capitalize the first letter
    const result = str.replace(/([a-z])([A-Z])/g, "$1 $2");
    return result.charAt(0).toUpperCase() + result.slice(1);
  };

  return (
    <>
      {messages.map((message, index) => {
        const alertStyle = getAlertStyle(
          message.type,
          message.icon,
          message.spin
        );
        const topPosition = `${4 + index * 60}px`;
        return (
          <div
            key={message.id}
            className={`inline-flex fixed top-4 right-4 ${alertStyle.background} ${alertStyle.textColor} p-3 rounded-lg shadow-md animate-pop-in`}
            style={{ top: topPosition, zIndex: 99999999 }}
          >
            <Iconify
              icon={alertStyle.icon}
              className={`text-1xl mr-1 self-center ${
                alertStyle.spin ? "animate-spin" : ""
              }`}
            />
            <span className="font-semibold text-sm self-center">
              {splitCamelCaseAndCapitalize(message.message)}
            </span>
          </div>
        );
      })}
    </>
  );
};

export default Alert;
