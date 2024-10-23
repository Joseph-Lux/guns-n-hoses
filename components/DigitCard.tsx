import React from "react";

interface DigitCardProps {
  number: number;
  isNext?: boolean;
  position: "top" | "center" | "bottom";
}

const DigitCard: React.FC<DigitCardProps> = ({
  number,
  isNext = false,
  position,
}) => {
  const getTransform = () => {
    switch (position) {
      case "top":
        return "translateY(-100%)";
      case "center":
        return "translateY(0)";
      case "bottom":
        return "translateY(100%)";
    }
  };

  return (
    <div
      className={`digit-card absolute w-full h-full flex items-center justify-center text-4xl font-bold ${
        position === "top"
          ? "transition-none"
          : "transition-transform duration-300"
      }`}
      style={{
        transform: getTransform(),
      }}
    >
      {number}
    </div>
  );
};

export default DigitCard;
