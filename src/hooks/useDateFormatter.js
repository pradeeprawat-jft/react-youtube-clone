import { useState, useEffect } from "react";
function useDateFormatter(date) {
  const [formattedDay, setFormattedDay] = useState("");

  useEffect(() => {
    function daysAgo(previousDate) {
      const currentDate = new Date();
      const previousDateObj = new Date(previousDate);

      const timeDifference = currentDate - previousDateObj;
      const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

      if (daysDifference === 1) {
        return "1 day ago";
      } else if (daysDifference > 1) {
        return `${daysDifference} days ago`;
      } else {
        return "Today";
      }
    }

    setFormattedDay(daysAgo(date));
  }, [date]);

  return formattedDay;
}
export default useDateFormatter;
