import React, { useState, useEffect } from "react";
import Digit from "./Digit";

interface WinnerProps {
  winningName: string;
  raffleFinished: boolean;
  countdown: number;
  showButtons: boolean;
  doors: boolean;
}

const Winner: React.FC<WinnerProps> = ({
  winningName,
  raffleFinished,
  countdown,
  showButtons,
  doors,
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
      raffleFinished ? (
        <div
          className="p-4 mb-[3vh] border-[0.5vh] border-rounded-xl border-yellow-300 rounded-xl text-center text-black w-[60vh]"
          style={{
            animation: "winnerGlow 4s infinite, fadeIn 1s ease-out forwards",
            boxShadow: "0 0 20px rgba(255, 244, 199, 0.5)",
          }}
        >
          <h3 className="text-[3vh] font-semibold">Congratulations!</h3>
          <p className="font-nikea font-bold text-[7vh]">{winningName}</p>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default Winner;
