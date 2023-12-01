import { useState, useEffect } from "react";

const useDurationConverter = (durationString) => {
  const [duration, setDuration] = useState({ minutes: "00", seconds: "00" });

  useEffect(() => {
    const parseDuration = () => {
      const match = durationString.match(/PT(\d+M)?(\d+S)?/);
      if (match) {
        const minutes = match[1] ? String(parseInt(match[1])) : "00";
        const seconds = match[2] ? String(parseInt(match[2])) : "00";

        setDuration({
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
