"use client";

import Button from "@/components/Button";
import DatePicker from "@/components/DatePicker";
import Input from "@/components/Input";
import { Trip } from "@prisma/client";
import React from "react";

interface TripReservationProps {
  trip: Trip;
}

const TripReservation = ({ trip }: TripReservationProps) => {
  return (
    <div>
      <div className="flex flex-col px-5">
        <div className="flex gap-4 ">
          <DatePicker
            className="w-full"
            placeholderText="Data de inicio"
            onChange={() => {}}
          />
          <DatePicker
            className="w-full"
            placeholderText="Data final"
            onChange={() => {}}
          />
        </div>
        <Input
          className="mt-4"
          placeholder={`Número máximo de hóspedes (${trip.maxGuests})`}
        />
        <div className="flex justify-between mt-3">
          <p className="font-medium text-sm text-primaryDarker">Total: </p>
          <p className="font-medium text-sm text-primaryDarker">R$2.500,00 </p>
        </div>
        <Button>Reservar agora!</Button>
      </div>
    </div>
  );
};

export default TripReservation;
