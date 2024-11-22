import React, { useState } from "react";

interface RaffleButtonProps {
  onNewRaffle: (newNumber: string) => void;
  raffleFinished: boolean;
  setRaffleFinished: (value: boolean) => void;
  setWinningName: (value: string) => void;
  setCountdown: (value: number) => void;
  setDoors: (value: boolean) => void;
  setShowButtons: (value: boolean) => void;
}

// https://goraisedough.com/cgi-bin/1_reset_drawing.cgi
// https://goraisedough.com/cgi-bin/2_do_the_drawing.cgi
// https://goraisedough.com/cgi-bin/3_display_drawing.cgi

const RaffleButton: React.FC<RaffleButtonProps> = ({
  onNewRaffle,
  raffleFinished,
  setRaffleFinished,
  setWinningName,
  setCountdown,
  setDoors,
  setShowButtons,
}) => {
  const generateNewRaffle = () => {
    setDoors(true);
    setTimeout(() => {
      setShowButtons(false);
      setCountdown(3);
      onNewRaffle("000000000");
      setRaffleFinished(false);
      setTimeout(() => {
        const newNumber = Array.from({ length: 9 }, () =>
          Math.floor(Math.random() * 10)
        ).join("");
        console.log("New raffle number:", newNumber);
        onNewRaffle(newNumber);
        setWinningName("");
        setRaffleFinished(false);
      }, 3500);
    }, 1000);
  };

  const callUrl = async (url: string) => {
    try {
      const proxyUrl =
        process.env.NODE_ENV === "development"
          ? `/api/ukonProxy?url=${encodeURIComponent(url)}`
          : url;
      const response = await fetch(proxyUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.text();
      console.log(`Response from ${url}:`, data);

      if (url.includes("3_display_drawing.cgi")) {
        const parts = data.split("|");
        if (parts.length >= 3) {
          const winningNumber = parts[1].trim();
          const name = parts[2].trim();
          onNewRaffle(winningNumber);
          setWinningName(name);
        }
      }
    } catch (error) {
      console.error(`Error calling ${url}:`, error);
    }
  };

  return (
    <div className="flex flex-col space-y-2 w-[50%] mb-[6vh]">
      {/* <button
        onClick={generateNewRaffle}
        className="px-[5vh] py-[2.5vh] bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-[5vh]"
      >
        Random Raffle
      </button> */}
      {/* <button
        onClick={() => {
          callUrl("https://goraisedough.com/cgi-bin/1_reset_drawing.cgi");
          setWinningName("");
        }}
        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
      >
        Reset Drawing
      </button> */}
      {/* <button
        onClick={() =>
          callUrl("https://goraisedough.com/cgi-bin/2_do_the_drawing.cgi")
        }
        className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors"
      >
        Do Drawing
      </button> */}
      <button
        onClick={() => {
          setDoors(true);
          setTimeout(() => {
            setShowButtons(false);
            setCountdown(3);
            setWinningName("");
            onNewRaffle("000000000");
            setRaffleFinished(false);
            setTimeout(() => {
              callUrl("https://goraisedough.com/cgi-bin/3_display_drawing.cgi");
              setRaffleFinished(false);
            }, 3500);
          }, 1000);
        }}
        className="gold-button px-[5vh] py-[2.5vh] text-stone-800 rounded-md text-[5vh] shadow-lg hover:shadow-lg font-semibold"
      >
        Begin Raffle
      </button>
    </div>
  );
};

export default RaffleButton;
