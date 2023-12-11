import { useState, useEffect } from "react";

const useDurationConverter = (durationString) => {
  const [duration, setDuration] = useState({
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    const parseDuration = () => {
      const match = durationString.match(/PT(\d+H)?(\d+M)?(\d+S)?/);

      if (match) {
        const hours = match[1] ? String(parseInt(match[1])) : "00";
        const minutes = match[2] ? String(parseInt(match[2])) : "00";
        const seconds = match[3] ? String(parseInt(match[3])) : "00";

        setDuration({
          hours: hours.length === 1 ? `0${hours}` : hours,
          minutes: minutes.length === 1 ? `0${minutes}` : minutes,
          seconds: seconds.length === 1 ? `0${seconds}` : seconds,
        });
      }
    };

    parseDuration();
  }, [durationString]);

  return duration;
};

export default useDurationConverter;
