import React from "react";

interface RaffleCountdownProps {
  countdown: number;
}

const RaffleCountdown: React.FC<RaffleCountdownProps> = ({ countdown }) => {
  return (
    <div
      className={`digit-card absolute w-full h-full flex items-center justify-center text-4xl font-bold ${
        countdown >= 0 ? "opacity-100" : "opacity-0"
      }`}
    >
      {countdown >= 0 ? countdown : "0"}
    </div>
  );
};

export default RaffleCountdown;
