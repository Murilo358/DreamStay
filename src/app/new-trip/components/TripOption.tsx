import React from "react";
import Image from "next/image";

interface TripOptionProps {
  text: string;
  setOptionsSelected: any;
  imageSrc: string;
}

const TripOption: React.FC<TripOptionProps> = ({
  setOptionsSelected,
  text,
  imageSrc,
}) => {
  return (
    <button
      data-aos="zoom-in"
      onClick={() => setOptionsSelected(text)}
      className=" hover:bg-grayLighter flex flex-col rounded-md shadow-md w-[100px] h-[100px] items-center justify-center text-center"
    >
      <Image
        className="w-1/2"
        width={35}
        height={35}
        src={imageSrc}
        alt="Hotel"
      />
      <p className="text-sm">{text}</p>
    </button>
  );
};

export default TripOption;
