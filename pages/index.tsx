import WinningNumber from "../components/WinningNumber";
import RaffleButton from "../components/RaffleButton";
import { useEffect, useState } from "react";
import Winner from "@/components/Winner";
import RaffleCountdown from "@/components/RaffleCountdown";
import Image from "next/image";

export default function Home() {
  const [currentNumber, setCurrentNumber] = useState("000000000");
  const [raffleFinished, setRaffleFinished] = useState(false);
  const [winningName, setWinningName] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [beep, setBeep] = useState<HTMLAudioElement | null>(null);
  const [endBeep, setEndBeep] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    setBeep(new Audio("/beep.mp3"));
    setEndBeep(new Audio("/end-beep.mp3"));
  }, []);

  useEffect(() => {
    if (countdown > 0) {
      if (beep) {
        beep.play();
      }
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      if (endBeep) {
        endBeep.play();
      }
      const timer = setTimeout(() => {
        setCountdown(-1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  return (
    <div className="flex flex-col items-center justify-between h-screen py-10 gap-10 w-full">
      <div className="relative flex flex-col gap-10 w-full mt-32">
        <div
          className={`absolute -top-5 left-0 w-full h-full flex items-center justify-center ${
            countdown > 0
              ? "scale-[5]"
              : "scale-100 transition-scale duration-1000"
          }`}
        >
          <RaffleCountdown countdown={countdown} />
        </div>
        {/* <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4/5 z-50">
          <Image
            src="/ticket2.svg"
            alt="Ticket"
            width={497}
            height={855}
            className="w-full h-auto"
            priority
          />
        </div> */}

        <div className="flex justify-center">
          <WinningNumber
            finalNumber={currentNumber}
            raffleFinished={raffleFinished}
            setRaffleFinished={setRaffleFinished}
            countdown={countdown}
          />
        </div>

        <div className="flex justify-center">
          <Winner
            winningName={winningName}
            raffleFinished={raffleFinished}
            countdown={countdown}
          />
        </div>
      </div>

      <div>
        <RaffleButton
          onNewRaffle={setCurrentNumber}
          raffleFinished={raffleFinished}
          setRaffleFinished={setRaffleFinished}
          setWinningName={setWinningName}
          setCountdown={setCountdown}
        />
      </div>
    </div>
  );
}
