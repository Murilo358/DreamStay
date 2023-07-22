import TripItem from "@/components/TripItem";
import { prisma } from "@/lib/prisma";
import { Trip } from "@prisma/client";
import React, { useState } from "react";

async function getTrips() {
  const trips = await prisma.trip.findMany({
    where: {
      recommended: true,
    },
  });

  return trips;
}

const RecommendedTrips = async () => {
  const data = await getTrips();

  return (
    <div className="container mx-auto">
      {" "}
      <div className="flex   items-center">
        <div className="w-full h-[1px] bg-grayLighter"></div>
        <h2 className=" px-5 whitespace-nowrap text-center font-medium text-grayPrimary ">
          Viagens recomendadas
        </h2>
        <div className="w-full h-[1px] bg-grayLighter"></div>
      </div>
      <div className="flex flex-col items-center  gap-6  mt-5">
        {data.map((trip: Trip) => (
          <TripItem key={trip.id} trip={trip} />
        ))}
      </div>
    </div>
  );
};

export default RecommendedTrips;
