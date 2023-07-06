import { Trip } from "@prisma/client";
import Image from "next/image";
import React from "react";
import ReactCountryFlag from "react-country-flag";
//Com typescrip é possivel definir o tipo das props que ele irá receber
interface TripProps {
  trip: Trip;
}

const TripItem = ({ trip }: TripProps) => {
  return (
    <div className="flex flex-col shadow-md p-2 ">
      <div className="relative h-[280px] w-[280px]">
        <Image
          className="rounded-lg object-cover"
          fill
          alt={trip.name}
          src={trip.coverImage}
        />
      </div>

      <h3 className="text-primaryDarker font-medium text-sm mt-2">
        {trip.name}
      </h3>
      <div className="flex  gap-2 my-1">
        <ReactCountryFlag countryCode={trip.countryCode} svg />
        <p className="text-xs text-grayPrimary">{trip.location}</p>
      </div>
      <div>
        <p className="text-xs text-grayPrimary">
          {" "}
          <span className="text-primary font-semibold mr-1">
            R${trip.pricePerDay.toString()}
          </span>
          Por dia
        </p>
      </div>
    </div>
  );
};

export default TripItem;
