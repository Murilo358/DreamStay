import { Trip } from "@prisma/client";
import React from "react";

interface TripDescriptionProps {
  trip: Trip;
}

const TripDescription = ({ trip }: TripDescriptionProps) => {
  return (
    <div className="p-3">
      <h3 className="font-semibold mt-3 text-primaryDarker"> Sobre a viagem</h3>
      <p className="text-sm mt-3 text-grayPrimary">{trip.description}</p>
    </div>
  );
};

export default TripDescription;
