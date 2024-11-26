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
  const [doors, setDoors] = useState(false);
  const [showButtons, setShowButtons] = useState(true);

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
      setTimeout(() => {
        setDoors(false);
      }, 200);

      const timer = setTimeout(() => {
        setCountdown(-1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  useEffect(() => {
    console.log("showButtons: ", showButtons);
  }, [showButtons]);

  useEffect(() => {
    console.log("Doors: ", doors);
  }, [doors]);

  return (
    <div
      className={`relative h-screen w-full ${
        doors ? "door-closed" : ""
      } overflow-hidden`}
    >
      <div className="bg-zinc-800 door door-top flex flex-col items-center justify-between z-10">
        <div></div>
      </div>
      <div className="bg-zinc-800 door door-bottom flex flex-col items-center justify-between z-10">
        <div></div>
      </div>

      <div
        className={`absolute top-[30vh] left-[110vh] z-20 bg-white rounded-md px-[5vh] py-[5vh] transition-all duration-500 ease-in-out ${
          !showButtons || doors ? "-translate-x-[55vh]" : ""
        }`}
      >
        <Image
          src="/text1.svg"
          alt="Ukon Logo with Tagline"
          className="w-[60vh] h-[20vh] z-20"
          width={145.675}
          height={40.347755}
          objectFit="cover"
        />
      </div>

      <div
        className={`absolute top-[30vh] right-[110vh] z-20 bg-white rounded-md p-[2vh] transition-all duration-500 ease-in-out ${
          !showButtons || doors ? "translate-x-[55vh]" : ""
        }`}
      >
        <Image
          src="/Go_Raise_Dough.jpeg"
          alt="Go Raise Dough"
          className="w-[70vh] h-[27vh] z-20"
          width={2125}
          height={796}
          objectFit="cover"
        />
      </div>

      <div
        className={`${
          showButtons ? "bg-white" : "bg-zinc-900"
        } h-full w-full flex flex-col`}
      >
        <div className="flex flex-col h-full">
          {showButtons && (
            <div className="w-full h-full flex items-center justify-between">
              <Image
                src="/GNH-art-left.jpg"
                alt="Guns N Hoses art left"
                className="w-[94vh] h-[100vh]"
                width={1761}
                height={1661}
                objectFit="cover"
              />

              <div className="h-full flex flex-col items-center justify-center p-[1vh] gap-[3vh]">
                <Image
                  src="/GunsNHosesLogo.jpg"
                  alt="Guns N Hoses"
                  className="w-[110vh] h-[44vh]"
                  width={862}
                  height={366}
                  objectFit="cover"
                />
                <RaffleButton
                  onNewRaffle={setCurrentNumber}
                  raffleFinished={raffleFinished}
                  setRaffleFinished={setRaffleFinished}
                  setWinningName={setWinningName}
                  setCountdown={setCountdown}
                  setDoors={setDoors}
                  setShowButtons={setShowButtons}
                />
              </div>

              <Image
                src="/GNH-art-right.jpg"
                alt="Guns N Hoses art right"
                className="w-[94vh] h-[100vh]"
                width={1800}
                height={1700}
                objectFit="cover"
              />
            </div>
          )}
          {!showButtons && doors && (
            <div className="w-full h-full flex items-center justify-center relative z-50">
              <RaffleCountdown countdown={countdown} />
            </div>
          )}
          {!showButtons && !doors && (
            <>
              {/* Stadium Lights taking up top 30% of screen */}
              <div className="h-[30vh] w-full flex justify-center items-center gap-[20vh]">
                <div className="flex">
                  {/* Left Light Left Side */}
                  <div className="container">
                    <div className="w-[30vh] grid grid-cols-10 gap-[0.75vh] rotate-left-left">
                      {[...Array(100)].map((_, i) => (
                        <div
                          key={i}
                          className="aspect-square rounded-full bg-white"
                          style={{
                            boxShadow: `
                        0 0 1vh 0.2vh rgba(255, 255, 255, 0.8),
                        0 0 2vh 0.6vh rgba(0, 149, 255, 0.6)
                      `,
                            animation: `pulse 1.5s infinite ${
                              Math.random() * 2
                            }s`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  {/* Left Light Right Side */}
                  <div className="container">
                    <div className="w-[30vh] grid grid-cols-10 gap-[0.75vh] rotate-left-right">
                      {[...Array(100)].map((_, i) => (
                        <div
                          key={i}
                          className="aspect-square rounded-full bg-white"
                          style={{
                            boxShadow: `
                        0 0 1vh 0.2vh rgba(255, 255, 255, 0.8),
                        0 0 2vh 0.6vh rgba(0, 149, 255, 0.6)
                      `,
                            animation: `pulse 1.5s infinite ${
                              Math.random() * 2
                            }s`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex">
                  {/* Right Light Left Side */}
                  <div className="container">
                    <div className="w-[30vh] grid grid-cols-10 gap-[0.75vh] rotate-right-left">
                      {[...Array(100)].map((_, i) => (
                        <div
                          key={i}
                          className="aspect-square rounded-full bg-white"
                          style={{
                            boxShadow: `
                        0 0 1vh 0.2vh rgba(255, 255, 255, 0.8),
                        0 0 2vh 0.6vh rgba(0, 149, 255, 0.6)
                      `,
                            animation: `pulse 1.5s infinite ${
                              Math.random() * 2
                            }s`,
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Right Lights Right Side */}
                  <div className="container">
                    <div className="w-[30vh] grid grid-cols-10 gap-[0.75vh] rotate-right-right">
                      {[...Array(100)].map((_, i) => (
                        <div
                          key={i}
                          className="aspect-square rounded-full bg-white"
                          style={{
                            boxShadow: `
                        0 0 1vh 0.2vh rgba(255, 255, 255, 0.8),
                        0 0 2vh 0.6vh rgba(0, 149, 255, 0.6)
                      `,
                            animation: `pulse 1.5s infinite ${
                              Math.random() * 2
                            }s`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Middle Section - Main Content */}
              <div className="flex-grow flex items-center justify-center relative">
                {!showButtons && (
                  <div className="relative flex flex-col w-full items-center z-50">
                    {!doors && (
                      <div className="w-full flex flex-col justify-center items-center">
                        <Winner
                          winningName={winningName}
                          raffleFinished={raffleFinished}
                          countdown={countdown}
                          showButtons={showButtons}
                          doors={doors}
                        />
                        <div
                          className={`relative transition-all duration-500 ease-in-out ${
                            raffleFinished ? "scale-75" : ""
                          }`}
                        >
                          <div className="h-[32vh] w-[132vh] bg-red-700 p-[1.1vh] rounded">
                            <div className="w-full h-full grid grid-cols-40 grid-rows-8 gap-[0.75vh]">
                              {[...Array(320)].map((_, i) => (
                                <div className="flex items-center justify-center">
                                  <div
                                    key={i}
                                    className="w-[1.4vh] aspect-square rounded-full bg-yellow-300"
                                    style={{
                                      boxShadow:
                                        "0 0 0.125vh 0.0625vh rgba(255, 200, 0, 0.3)",
                                      animation: `yellowToWhite 1.5s infinite ${
                                        Math.random() * 2
                                      }s`,
                                    }}
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="absolute left-[6.6vh] top-[1.5vh] inset-0 h-[90%] w-[90%] flex items-center justify-center">
                            <WinningNumber
                              finalNumber={currentNumber}
                              raffleFinished={raffleFinished}
                              setRaffleFinished={setRaffleFinished}
                              countdown={countdown}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              {/* Bottom Section - Floor Light */}
              <div className="h-[20vh] w-full absolute bottom-0 flex items-center justify-center">
                <div
                  className="h-full w-[180vh]"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, rgba(0, 149, 255, 0.8) 0%, transparent 70%)",
                  }}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
