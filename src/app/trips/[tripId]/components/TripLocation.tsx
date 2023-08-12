import Button from "@/components/Button";
import Image from "next/image";
import React from "react";

interface TripLocationProps {
  location: string;
  locationDescription: string;
}

const TripLocation = ({ location, locationDescription }: TripLocationProps) => {
  return (
    <div className="px-3 lg:p-0 flex flex-col">
      {" "}
      <h2 className="font-semibold  lg:text-xl mt-3 mb-5 text-primaryDarker ">
        Localização
      </h2>
      <div className=" items-center relative w-full h-[266px] lg:hidden">
        <Image
          className="object-cover rounded-lg shadow-md"
          src="/Map-mobile.png"
          alt={location}
          fill
        />
      </div>
      <div className=" items-center relative w-full hidden lg:block h-[480px]">
        <Image
          className="object-cover rounded-lg shadow-md"
          src="/Map-desktop.png"
          alt={location}
          fill
        />
      </div>
      <p className="text-primaryDarker lg:text-base text-sm font-semibold mt-3">
        {location}
      </p>
      <p className="text-grayPrimary lg:text-base  text-xs leading-5">
        {locationDescription}
      </p>
      <Button variant="outlined" className="mt-5 w-full">
        Ver no google maps
      </Button>
    </div>
  );
};

export default TripLocation;
