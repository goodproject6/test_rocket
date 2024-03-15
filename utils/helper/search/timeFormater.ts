 interface TimeFormat {
    hour: string;
    minute: string;
    ampm: string; // AM or PM
}

export function convertTimeFormat(timeString: string): TimeFormat | null {
    // Check if the time string is in the correct format
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
    if (!timeRegex.test(timeString)) {
        return null; // Return null if the format is incorrect
    }

    // Extract hour, minute, and second from the time string
    const [hourString, minuteString] = timeString.split(':');
    let hour = parseInt(hourString);

    // Determine the period (AM or PM)
    const period = hour >= 12 ? 'PM' : 'AM';

    // Convert hour to 12-hour format with leading zero
    if (hour > 12) {
        hour %= 12;
    } else if (hour === 0) {
        hour = 12;
    }
    const formattedHour = hour.toString().padStart(2, '0');

    return { hour: formattedHour, minute: minuteString, ampm:period };
}



export function revertTo24HourFormat(time: TimeFormat): string {
    // Convert the hour back to 24-hour format based on the period (AM or PM)
    let hour = parseInt(time.hour);
    if (time.ampm === 'PM' && hour < 12) {
        hour += 12;
    } else if (time.ampm === 'AM' && hour === 12) {
        hour = 0;
    }

    // Format the hour with leading zero if necessary
    const formattedHour = hour.toString().padStart(2, '0');

    // Combine hour and minute with a colon separator
    return `${formattedHour}:${time.minute}`;
}


// convert minutes to hours
export function minutesToDecimalHours(minutes:any) {
    let decimalHours = minutes / 60;
    return decimalHours.toFixed(2);
  }

  // for tootltips
  export function decimalHoursToHourMinute(decimalHours:any) {
    let hours = Math.floor(decimalHours);
    let minutes = Math.round((decimalHours - hours) * 60);

    let hoursLabel = hours === 1 ? "hr" : "hrs";
    let minutesLabel = minutes === 1 ? "min" : "mins";

    let output = "";
    if (hours > 0) {
      output += hours + " " + hoursLabel + " ";
    }
    if (minutes > 0) {
      output += minutes + " " + minutesLabel;
    }

    return output;
  }