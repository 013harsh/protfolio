import React, { useState, useEffect } from "react";

const Clock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDateTime = (date) => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const day = days[date.getDay()];
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${day} ${hours}:${minutes}`;
  };

  return (
    <div className="absolute flex items-center h-full -translate-x-1/2 left-1/2">
      <button className="h-full px-3 transition-colors duration-200 hover:bg-white/10">
        {formatDateTime(currentTime)}
      </button>
    </div>
  );
};

export default Clock;
