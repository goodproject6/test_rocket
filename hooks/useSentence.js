import { useState } from "react";


const useSentence = (currency, currentLang, translations) => {

const [pageTexts, setPageTexts] = useState(translations[currentLang.alias]["reason"]);

 
  const constructReasonSentence = (item) => {
     // Determine filter value
     let filter;
     if (item.service_area_is_custom_filters_enabled) {
       filter = translations[currentLang.alias]["filter"].userCustomLocation;
     } else {
       filter =  translations[currentLang.alias]["filter"].user;
     }
    let sentence = pageTexts[item.reason] || item.reason;
    sentence = sentence.replace("{{currencySymbol}}", currency);
    sentence = sentence.replace("{{currencySymbol1}}", currency);
    sentence = sentence.replace("{{filter}}", filter);


    switch (item.reason) {
      case "HOURLY_PAY_TOO_LOW":
        sentence = sentence
          .replace(
            "{{blockHourlyPay}}",
            parseFloat(item.block_hourly_pay).toFixed(2)
          )
          .replace(
            "{{userMinHourlyPay}}",
            parseFloat(item.settings_min_hourly_pay).toFixed(2)
          );
        break;
      case "OVERALL_PAY_TOO_LOW":
        sentence = sentence
          .replace(
            "{{blockOverallPay}}",
            parseFloat(item.block_overall_pay).toFixed(2)
          )
          .replace(
            "{{userMinOverallPay}}",
            parseFloat(item.settings_min_overall_pay).toFixed(2)
          );
        break;
      case "BLOCK_TIME_TOO_LOW":
        sentence = sentence
          .replace("{{block_time_in_minutes}}", item.block_time_in_minutes)
          .replace("{{settings_min_block_time}}", item.settings_min_block_time);
        break;
      case "BLOCK_TIME_TOO_HIGH":
        sentence = sentence
          .replace("{{block_time_in_minutes}}", item.block_time_in_minutes)
          .replace("{{settings_max_block_time}}", item.settings_max_block_time);
        break;
      case "LEAD_TIME_TOO_LOW":
        sentence = sentence
          .replace(
            "{{block_lead_time_in_minutes}}",
            item.block_lead_time_in_minutes
          )
          .replace("{{settings_min_lead_time}}", item.settings_min_lead_time);
        break;
      case "OUTSIDE_OF_TIME_FILTERS":
        break;
      default:
        sentence = item.reason;
    }
    return sentence;
  };

  return constructReasonSentence;
};

export default useSentence;
