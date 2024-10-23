import React, { useState } from "react";

interface RaffleButtonProps {
  onNewRaffle: (newNumber: string) => void;
  raffleFinished: boolean;
  setRaffleFinished: (value: boolean) => void;
  setWinningName: (value: string) => void;
}

// https://goraisedough.com/cgi-bin/1_reset_drawing.cgi
// https://goraisedough.com/cgi-bin/2_do_the_drawing.cgi
// https://goraisedough.com/cgi-bin/3_display_drawing.cgi

const RaffleButton: React.FC<RaffleButtonProps> = ({
  onNewRaffle,
  raffleFinished,
  setRaffleFinished,
  setWinningName,
}) => {
  const generateNewRaffle = () => {
    const newNumber = Array.from({ length: 9 }, () =>
      Math.floor(Math.random() * 10)
    ).join("");
    console.log("New raffle number:", newNumber);
    onNewRaffle(newNumber);
    setRaffleFinished(false);
  };

  const callUrl = async (url: string) => {
    try {
      const proxyUrl =
        process.env.NODE_ENV === "development"
          ? `/api/proxy?url=${encodeURIComponent(url)}`
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
    <div className="flex flex-col space-y-2">
      <button
        onClick={generateNewRaffle}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
      >
        Start New Raffle
      </button>
      <button
        onClick={() => {
          callUrl("https://goraisedough.com/cgi-bin/1_reset_drawing.cgi");
          setWinningName("");
        }}
        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
      >
        Reset Drawing
      </button>
      <button
        onClick={() =>
          callUrl("https://goraisedough.com/cgi-bin/2_do_the_drawing.cgi")
        }
        className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors"
      >
        Do Drawing
      </button>
      <button
        onClick={() => {
          callUrl("https://goraisedough.com/cgi-bin/3_display_drawing.cgi");
          setRaffleFinished(false);
        }}
        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
      >
        Display Drawing
      </button>
    </div>
  );
};

export default RaffleButton;
