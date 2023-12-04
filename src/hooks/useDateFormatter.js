import { useState, useEffect } from "react";

function useDateFormatter(date) {
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    function timeAgo(previousDate) {
      const currentDate = new Date();
      const previousDateObj = new Date(previousDate);

      const timeDifference = currentDate - previousDateObj;
      const secondsDifference = Math.floor(timeDifference / 1000);
      const minutesDifference = Math.floor(secondsDifference / 60);
      const hoursDifference = Math.floor(minutesDifference / 60);
      const daysDifference = Math.floor(hoursDifference / 24);
      const yearsDifference = Math.floor(daysDifference / 365);

      if (yearsDifference >= 1) {
        return `${yearsDifference} ${yearsDifference === 1 ? "year" : "years"} ago`;
      } else if (daysDifference >= 1) {
        return `${daysDifference} ${daysDifference === 1 ? "day" : "days"} ago`;
      } else if (hoursDifference >= 1) {
        return `${hoursDifference} ${hoursDifference === 1 ? "hour" : "hours"} ago`;
      } else if (minutesDifference >= 1) {
        return `${minutesDifference} ${minutesDifference === 1 ? "minute" : "minutes"} ago`;
      } else {
        return "Just now";
      }
    }

    setFormattedDate(timeAgo(date));
  }, [date]);

  return formattedDate;
}

export default useDateFormatter;
