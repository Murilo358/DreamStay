"use client";

import Button from "@/components/Button";
import DatePicker from "@/components/DatePicker";
import Input from "@/components/Input";
import { Trip } from "@prisma/client";
import React from "react";
import { Controller, useForm } from "react-hook-form";

interface TripReservationProps {
  tripStartDate: Date;
  tripEndDate: Date;
  maxGuests: number;
}

interface TripReservationForm {
  guests: number;
  startDate: Date | null;
  endDate: Date | null;
}

const TripReservation = ({
  maxGuests,
  tripStartDate,
  tripEndDate,
}: TripReservationProps) => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<TripReservationForm>();

  const onSubmit = (data: any) => {
    console.log({ data });
  };

  const startDate = watch("startDate");
  const endDate = watch("endDate");

  return (
    <div>
      <div className="flex flex-col px-5">
        <div className="flex gap-4 ">
          <Controller
            name="startDate"
            rules={{
              required: {
                value: true,
                message: "Por favor informe a data de inicio",
              },
            }}
            render={({ field }) => (
              <DatePicker
                className="w-full"
                placeholderText="Data de inicio"
                errorMessage={errors.startDate?.message}
                error={!!errors.startDate}
                onChange={field.onChange}
                selected={field.value}
                minDate={tripStartDate}
                maxDate={endDate ?? tripEndDate}
              />
            )}
            control={control}
          />

          <Controller
            name="endDate"
            rules={{
              required: {
                value: true,
                message: "Por favor informe a data final",
              },
            }}
            render={({ field }) => (
              <DatePicker
                className="w-full"
                placeholderText="Data final"
                errorMessage={errors.endDate?.message}
                error={!!errors.endDate}
                onChange={field.onChange}
                selected={field.value}
                minDate={startDate ?? tripStartDate}
                maxDate={tripEndDate}
              />
            )}
            control={control}
          />
        </div>
        <Input
          //prettier-ignore
          {...register("guests", { required: {
            value: true,
            message: "Por favor informe o número de hóspedes"
          }})}
          className="mt-4"
          placeholder={`Número máximo de hóspedes (${maxGuests})`}
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
