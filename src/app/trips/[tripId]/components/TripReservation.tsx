"use client";

import Button from "@/components/Button";
import DatePicker from "@/components/DatePicker";
import Input from "@/components/Input";
import { Trip } from "@prisma/client";
import React from "react";
import { useForm } from "react-hook-form";

interface TripReservationProps {
  trip: Trip;
}

interface TripReservationForm {
  guests: number;
}

const TripReservation = ({ trip }: TripReservationProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TripReservationForm>();

  const onSubmit = (data: any) => {
    console.log({ data });
  };

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
          //prettier-ignore
          {...register("guests", { required: {
            value: true,
            message: "Por favor informe o número de hóspedes"
          }})}
          className="mt-4"
          placeholder={`Número máximo de hóspedes (${trip.maxGuests})`}
          error={!!errors?.guests}
          errorMessage={errors?.guests?.message}
        />
        <div className="flex justify-between mt-3">
          <p className="font-medium text-sm text-primaryDarker">Total: </p>
          <p className="font-medium text-sm text-primaryDarker">R$2.500,00 </p>
        </div>
        <div
          className=" pb-10 border-b border-grayLighter
        "
        >
          <Button
            onClick={() => handleSubmit(onSubmit)()}
            className="w-full mt-3"
          >
            Reservar agora!
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TripReservation;
