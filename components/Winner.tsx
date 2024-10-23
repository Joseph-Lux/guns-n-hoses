import React, { useState, useEffect } from "react";
import Digit from "./Digit";

interface WinnerProps {
  winningName: string;
  raffleFinished: boolean;
}

const Winner: React.FC<WinnerProps> = ({ winningName, raffleFinished }) => {
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    if (raffleFinished) {
      setTimeout(() => {
        setDisplay(true);
      }, 1000);
    } else {
      setDisplay(false);
    }
  }, [raffleFinished]);

  return (
    <>
      {winningName && display && (
        <div className="mt-4 p-4 bg-yellow-100 border border-yellow-300 rounded-md">
          <h3 className="text-lg font-semibold">Winner:</h3>
          <p>{winningName}</p>
        </div>
      )}
    </>
  );
};

export default Winner;
