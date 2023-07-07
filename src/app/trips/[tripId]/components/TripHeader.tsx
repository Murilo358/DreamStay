import React from "react";
import Image from "next/image";
import ReactCountryFlag from "react-country-flag";
import { Trip } from "@prisma/client";

interface TripHeaderProps {
  trip: Trip;
}

const TripHeader = ({ trip }: TripHeaderProps) => {
  return (
    <div className="flex flex-col">
      {" "}
      <div className="relative h-[300px] w-full">
        <Image
          src={trip?.coverImage}
          className="object-cover"
          fill
          alt={trip?.name}
        />
      </div>
      <div className="flex flex-col p-5">
        <h1>{trip.name}</h1>
        <div className="flex  gap-2 my-1">
          <ReactCountryFlag countryCode={trip.countryCode} svg />
          <p className="text-xs text-grayPrimary">{trip.location}</p>
        </div>
        <p className="text-sm text-grayPrimary">
          {" "}
          <span className="text-primary font-semibold">
            {" "}
            R$
            {trip.pricePerDay.toString()}
          </span>{" "}
          Dia
        </p>
      </div>
    </div>
  );
};

export default TripHeader;
