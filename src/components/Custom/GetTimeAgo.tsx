// import { formatDistanceToNowStrict, parseISO } from "date-fns";
// import { utcToZonedTime } from "date-fns-tz";

// const getTimeAgo = (
//   dateTimeString: string,
//   timeZone: string = "America/Denver"
// ): string => {
//   const dateTime = parseISO(dateTimeString);
//   const timeZoneDate = utcToZonedTime(dateTime, timeZone);

//   const yearsAgo = formatDistanceToNowStrict(timeZoneDate, { unit: "year" });
//   const monthsAgo = formatDistanceToNowStrict(timeZoneDate, { unit: "month" });
//   const daysAgo = formatDistanceToNowStrict(timeZoneDate, { unit: "day" });
//   const hoursAgo = formatDistanceToNowStrict(timeZoneDate, { unit: "hour" });

//   let result = "";
//   if (yearsAgo !== "0 years") {
//     result += yearsAgo + " ";
//   }
//   if (monthsAgo !== "0 months") {
//     result += monthsAgo + " ";
//   }

//   let days = parseInt(daysAgo.split(" ")[0]);
//   let hours = parseInt(hoursAgo.split(" ")[0]);

//   if (daysAgo !== "0 days") {
//     // If hours are more than 24, add one day to the days
//     if (hours >= 24) {
//       days += 1;
//     }
//     result += days + " days ";
//   }

//   if (hoursAgo !== "0 hours" && hours < 24) {
//     // If hours are not zero and less than 24, display only hours and omit minutes
//     result += hoursAgo + " ago";
//   } else {
//     // If hours are zero or greater than or equal to 24, display only days
//     if (days === 0) {
//       result += hoursAgo + " ago";
//     } else {
//       result += "ago";
//     }
//   }

//   return result === "" ? "just now" : result;
// };

// export default getTimeAgo;

import { formatDistanceToNowStrict, parseISO } from 'date-fns'

const getTimeAgo = (
    dateTimeString: string
    // timeZone: string = "America/Denver"
): string => {
    const dateTime = parseISO(dateTimeString)
    const now = new Date()
    const timeAgo = formatDistanceToNowStrict(dateTime, { addSuffix: true })

    return timeAgo
}

export default getTimeAgo

export const formattedDate = (dateString: string): string => {
    const date = new Date(dateString)
    const options: Intl.DateTimeFormatOptions = {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    }
    return date.toLocaleDateString('en-US', options)
}

export const formattedDateTime = (dateTimeString: string): string => {
    const date = new Date(dateTimeString)

    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ]

    const day = date.getDate()
    const month = months[date.getMonth()]
    const year = date.getFullYear()
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const period = hours >= 12 ? 'PM' : 'AM'
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes

    const formattedDate = `${day}-${month}-${year}`
    const formattedTime = `${formattedHours}:${formattedMinutes} ${period}`

    return `${formattedDate} ${formattedTime}`
}
