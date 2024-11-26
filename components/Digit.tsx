import React, { useState, useEffect, useRef } from "react";
import DigitCard from "./DigitCard";

interface DigitProps {
  rotations: number;
  finalNumber: number;
  setFinished: (value: boolean) => void;
  finished: boolean;
}

const Digit: React.FC<DigitProps> = ({
  rotations,
  finalNumber,
  setFinished,
  finished,
}) => {
  const [numbers, setNumbers] = useState<number[]>([-1, 0, 1]);
  const [index, setIndex] = useState(0);
  const rotationCount = useRef(0);
  const positions = ["top", "center", "bottom"] as const;
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    setAudio(new Audio("/boxing-bell.mp3"));
  }, []);

  useEffect(() => {
    if (!finished) {
      rotationCount.current = 0;
      setNumbers([-1, 0, 1]);
      setIndex(0);
    }
  }, [finalNumber, finished]);

  useEffect(() => {
    const totalRotations = rotations * 10 + finalNumber;

    if (rotationCount.current < totalRotations) {
      const timer = setTimeout(() => {
        setTimeout(() => {
          setNumbers((prevNumbers) => {
            const newNumbers = [...prevNumbers];
            newNumbers[index] = (newNumbers[index] + 3) % 10;
            return newNumbers;
          });
          setIndex((index + 1) % 3);
          rotationCount.current += 1;

          if (rotationCount.current === totalRotations) {
            setFinished(true);
            audio?.play();
          }
        }, 25); // Duration of the animation
      }, 40); // Delay between animations

      return () => clearTimeout(timer);
    }
  }, [numbers, rotations, finalNumber, setFinished]);

  return (
    <div className="digit h-[14vh] w-[10.5vh] relative overflow-hidden shadow-inner-lg bg-white rounded-lg">
      <DigitCard number={numbers[2]} position={positions[index % 3]} />
      <DigitCard number={numbers[1]} position={positions[(index + 1) % 3]} />
      <DigitCard number={numbers[0]} position={positions[(index + 2) % 3]} />
    </div>
  );
};

export default Digit;
