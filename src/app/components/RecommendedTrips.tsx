"use client";
import TripItem from "@/components/TripItem";
import { prisma } from "@/lib/prisma";
import { Trip } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { LiaSpinnerSolid } from "react-icons/lia";

const RecommendedTrips = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAllTrips = async () => {
      setLoading(true);
      const response = await fetch(`/api/trips/getall`);
      const json = await response.json();
      setTrips(json.trips);
      setLoading(false);
    };
    fetchAllTrips();
  }, []);

  return (
    <div className="container mx-auto p-5">
      <div className="flex items-center">
        <div className="w-full h-[1px] bg-grayLighter"></div>
        <h2 className="px-5 font-medium text-grayPrimary whitespace-nowrap">
          Destinos Recomendados
        </h2>
        <div className="w-full h-[1px] bg-grayLighter"></div>
      </div>
      {loading && (
        <div className="flex items-center text-center justify-center w-100">
          <LiaSpinnerSolid className="animate-spin mt-20  w-[40px] h-[40px]" />
        </div>
      )}
      {!loading && trips.length > 0 && (
        <div className="flex flex-col items-center mt-5 lg:mt-12 gap-5 lg:flex-row gap lg:flex-wrap lg:justify-center lg:gap-10">
          {trips.length > 0 &&
            trips.map((trip: Trip) => <TripItem key={trip.id} trip={trip} />)}
        </div>
      )}
    </div>
  );
};

export default RecommendedTrips;
