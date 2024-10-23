import React, { useState, useEffect } from "react";
import Digit from "./Digit";

interface WinningNumberProps {
  finalNumber: string;
  raffleFinished: boolean;
  setRaffleFinished: (value: boolean) => void;
}

const WinningNumber: React.FC<WinningNumberProps> = ({
  finalNumber,
  raffleFinished,
  setRaffleFinished,
}) => {
  const [digits, setDigits] = useState<number[]>([]);
  const [finished, setFinished] = useState<boolean[]>(Array(9).fill(false));

  useEffect(() => {
    if (!raffleFinished) {
      setDigits(
        Array.from({ length: 9 }, () => Math.floor(Math.random() * 10))
      );
      setFinished(Array(9).fill(false));
    }
  }, [finalNumber, raffleFinished]);

  return (
    <div className="flex space-x-2 p-4 bg-white rounded-xl shadow-lg">
      {digits.map((digit, index) => (
        <Digit
          key={index}
          setFinished={(value) => {
            setFinished((prevFinished) => {
              const newFinished = [...prevFinished];
              newFinished[index] = value;
              if (newFinished.every((value) => value)) {
                setRaffleFinished(true);
              }
              return newFinished;
            });
          }}
          rotations={index + 1}
          finalNumber={parseInt(finalNumber[index])}
          finished={finished[index]}
        />
      ))}
    </div>
  );
};

export default WinningNumber;
