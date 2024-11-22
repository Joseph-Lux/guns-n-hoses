import React, { useState, useEffect } from "react";

interface RaffleCountdownProps {
  countdown: number;
}

const RaffleCountdown: React.FC<RaffleCountdownProps> = ({ countdown }) => {
  const [dots, setDots] = useState(0);

  useEffect(() => {
    if (countdown >= 0) {
      const dotsInterval = setInterval(() => {
        setDots((prev) => (prev + 1) % 4);
      }, 500);
      return () => clearInterval(dotsInterval);
    }
  }, [countdown]);

  return (
    <div className="flex flex-col items-center justify-center mb-[20vh]">
      <div className="text-white text-[5vh] font-bold pb-[3vh] font-mono w-[80vh] text-center mb-[30vh] ml-[6vh]">
        Randomly drawing ticket{".".repeat(dots)}
        {"\u00A0".repeat(3 - dots)}
      </div>
      <div
        className={`digit-card w-[10vh] h-[10vh] flex items-center justify-center text-[5vh] font-bold text-white z-50 ${
          countdown >= 0 ? "opacity-100" : "opacity-0"
        }`}
      >
        <div
          className={`z-50 ${
            countdown > 0
              ? "scale-[5]"
              : "scale-100 transition-scale duration-1000"
          } ${
            countdown % 2 === 0 ? "glow-red" : "glow-blue"
          } w-full h-full flex items-center justify-center rounded`}
        >
          <div>{countdown >= 0 ? countdown : "0"}</div>
        </div>
      </div>
    </div>
  );
};

export default RaffleCountdown;
