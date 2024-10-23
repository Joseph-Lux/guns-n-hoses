import WinningNumber from "../components/WinningNumber";
import RaffleButton from "../components/RaffleButton";
import { useState } from "react";
import Winner from "@/components/Winner";

export default function Home() {
  const [currentNumber, setCurrentNumber] = useState("521041219");
  const [raffleFinished, setRaffleFinished] = useState(false);
  const [winningName, setWinningName] = useState("");

  return (
    <>
      <h1 className="text-4xl font-bold mb-8">Raffle Drawing</h1>

      <RaffleButton
        onNewRaffle={setCurrentNumber}
        raffleFinished={raffleFinished}
        setRaffleFinished={setRaffleFinished}
        setWinningName={setWinningName}
      />
      <WinningNumber
        finalNumber={currentNumber}
        raffleFinished={raffleFinished}
        setRaffleFinished={setRaffleFinished}
      />
      <Winner winningName={winningName} raffleFinished={raffleFinished} />
    </>
  );
}
