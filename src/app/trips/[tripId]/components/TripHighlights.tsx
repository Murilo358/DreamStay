import React from "react";
import { Trip } from "@prisma/client";
import { AiOutlineCheckCircle } from "react-icons/ai";

interface TripHighlightsProps {
  trip: Trip;
}

const TripHighlights = ({ trip }: TripHighlightsProps) => {
  return (
    <div className="px-3">
      <h2 className="font-semibold mt-3  text-primaryDarker mb-2">Destaques</h2>

      <div className=" flex flex-wrap gap-y-3">
        {trip.highlights.map((highlight) => (
          <div key={highlight} className="flex items-center gap-2 w-1/2 ">
            <AiOutlineCheckCircle className="text-primary " />
            <p className="text-xs text-grayPrimary">{highlight}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TripHighlights;
