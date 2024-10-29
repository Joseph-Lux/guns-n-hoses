import React, { useState, useEffect } from "react";
import Digit from "./Digit";

interface WinnerProps {
  winningName: string;
  raffleFinished: boolean;
  countdown: number;
}

const Winner: React.FC<WinnerProps> = ({
  winningName,
  raffleFinished,
  countdown,
}) => {
  const [display, setDisplay] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    setAudio(new Audio("/win.wav"));
  }, []);

  useEffect(() => {
    if (raffleFinished) {
      setTimeout(() => {
        setDisplay(true);
        audio?.play();
      }, 1000);
    } else {
      setDisplay(false);
    }
  }, [raffleFinished]);

  return (
    <>
      {winningName &&
        display &&
        (countdown === 0 || countdown === -1) &&
        raffleFinished && (
          <div className="mt-4 p-4 bg-yellow-100 border border-yellow-300 rounded-md text-center w-[30%]">
            <h3 className="text-lg font-semibold">Winner:</h3>
            <p>{winningName}</p>
          </div>
        )}
    </>
  );
};

export default Winner;
