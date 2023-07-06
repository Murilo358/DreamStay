import TripItem from "@/components/TripItem";
import { Trip } from "@prisma/client";
import React from "react";

const RecommendedTrips = async () => {
  const data = await fetch("http://localhost:3000/hello").then((res) =>
    res.json()
  );
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
