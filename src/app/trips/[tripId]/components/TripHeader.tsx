import React from "react";
import Image from "next/image";
import ReactCountryFlag from "react-country-flag";
import { Trip } from "@prisma/client";

interface TripHeaderProps {
  trip: Trip;
}

const TripHeader = ({ trip }: TripHeaderProps) => {
  return (
    <div className="flex flex-col mt-10">
      {" "}
      <div className="relative h-[300px] lg:hidden w-full">
        <Image
          src={trip?.coverImage}
          className="object-cover"
          fill
          alt={trip?.name}
        />
      </div>
      <div className="pb-16 hidden lg:grid grid-cols-[2fr,1fr,1fr] gap-2 grid-rows-2 ">
        <div className="relative row-span-2">
          <Image
            src={trip?.coverImage}
            className="object-cover"
            fill
            alt={trip?.name}
          />
        </div>
        <div className="relative h-[300px]  w-full">
          <Image
            src={trip.imagesUrl[0] ? trip.imagesUrl[0] : "/image-not-found.jpg"}
            className="object-cover"
            fill
            alt={trip?.name}
          />
        </div>
        <div className="relative h-[300px]  w-full">
          <Image
            src={trip.imagesUrl[1] ? trip.imagesUrl[1] : "/image-not-found.jpg"}
            className="object-cover"
            fill
            alt={trip?.name}
          />
        </div>
        <div className="relative h-[300px]  w-full">
          <Image
            src={trip.imagesUrl[2] ? trip.imagesUrl[2] : "/image-not-found.jpg"}
            className="object-cover"
            fill
            alt={trip?.name}
          />
        </div>
        <div className="relative h-[300px]  w-full">
          <Image
            src={
              trip?.imagesUrl[3] ? trip?.imagesUrl[3] : "/image-not-found.jpg"
            }
            className="object-cover"
            fill
            alt={trip?.name}
          />
        </div>
      </div>
      <div className="flex flex-col p-5">
        <h1 className="font-semibold text-xl lg:text-3xl text-primaryDarker">
          {trip.name}
        </h1>
        <div className="flex  gap-2 my-1">
          <ReactCountryFlag countryCode={trip.countryCode} svg />
          <p className="text-xs lg:text-base text-grayPrimary">
            {trip.location}
          </p>
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
