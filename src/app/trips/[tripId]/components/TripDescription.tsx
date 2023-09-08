import { Trip } from "@prisma/client";
import React from "react";

interface TripDescriptionProps {
  trip: Trip;
}

const TripDescription = ({ trip }: TripDescriptionProps) => {
  return (
    <div className="p-3 lg:min-w-[700px]">
      <h3 className="font-semibold mt-3 lg:text-xl text-primaryDarker">
        {" "}
        Sobre a viagem
      </h3>
      <p className="text-sm mt-3 lg:text-base text-grayPrimary">
        {trip.description}
      </p>
    </div>
  );
};

export default TripDescription;
