import React, { useState } from "react";
import { AiOutlineCheckCircle, AiOutlineClose } from "react-icons/ai";

interface TripHighLightsOptionProps {
  text: string;
  highLights?: any;
  setHighLights?: any;
  added?: boolean;
}

const TripHighLightsOption: React.FC<TripHighLightsOptionProps> = ({
  setHighLights,
  highLights,
  text,
  added,
}) => {
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    if (highLights.includes(text)) {
      setHighLights(
        highLights.filter((highlight: string) => highlight !== text)
      );
      setSelected(false);
    } else {
      setHighLights([...highLights, text]);
      setSelected(true);
    }
  };

  return (
    <button
      disabled={selected}
      onClick={handleClick}
      className={` ${
        selected ? "bg-gray-200" : ""
      } hover:bg-grayLighter flex gap-2 p-3  rounded-2xl shadow-md items-center text-center`}
    >
      <AiOutlineCheckCircle className="text-primary" />
      <p className="text-sm">{text}</p>
      {added && <AiOutlineClose />}
    </button>
  );
};

export default TripHighLightsOption;
