import { useState, useEffect } from "react";

function useNumberFormatter(number) {
  const [formattedNumber, setFormattedNumber] = useState("");

  useEffect(() => {
    function formatNumber(number) {
      if (number >= 1000000) {
        return (number / 1000000).toFixed(1) + "M";
      } else if (number >= 1000) {
        return (number / 1000).toFixed(0) + "K";
      } else {
        return number.toString();
      }
    }

    setFormattedNumber(formatNumber(number));
  }, [number]);

  return formattedNumber;
}

export default useNumberFormatter;
