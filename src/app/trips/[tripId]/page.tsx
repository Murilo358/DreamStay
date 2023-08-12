import { prisma } from "@/lib/prisma";
import Image from "next/image";
import React from "react";
import ReactCountryFlag from "react-country-flag";
import TripHeader from "./components/TripHeader";
import TripReservation from "./components/TripReservation";
import TripDescription from "./components/TripDescription";
import TripHighlights from "./components/TripHighlights";
import TripLocation from "./components/TripLocation";

const getTripDetails = async (tripId: string) => {
  const trip = await prisma.trip.findUnique({
    where: {
      id: tripId,
    },
  });
  return trip;
};

const TripDetaills = async ({ params }: { params: { tripId: string } }) => {
  const trip = await getTripDetails(params.tripId);

  if (!trip) return null;

  return (
    <div className="container mx-auto lg:px-40">
      <TripHeader trip={trip} />
      <div className="flex flex-col lg:flex-row lg:gap-20">
        <div className="lg:order-2">
          <TripReservation
            tripId={trip.id}
            maxGuests={trip.maxGuests}
            tripStartDate={trip.startDate}
            tripEndDate={trip.endDate}
            tripPrice={Number(trip.pricePerDay)}
          />
        </div>
        <div className="lg:order-1">
          <TripDescription trip={trip} />
          <TripHighlights trip={trip} />
        </div>
      </div>

      <TripLocation
        location={trip.location}
        locationDescription={trip.locationDescription}
      />
    </div>
  );
};

export default TripDetaills;
