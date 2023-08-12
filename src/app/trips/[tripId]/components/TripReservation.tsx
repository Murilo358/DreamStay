"use client";

import Button from "@/components/Button";
import DatePicker from "@/components/DatePicker";
import Input from "@/components/Input";
import { Trip } from "@prisma/client";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { differenceInDays } from "date-fns";
import { start } from "repl";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

interface TripReservationProps {
  tripId: string;
  tripStartDate: Date;
  tripEndDate: Date;
  tripPrice: number;
  maxGuests: number;
}

interface TripReservationForm {
  guests: number;
  startDate: Date | null;

  endDate: Date | null;
}

const TripReservation = ({
  maxGuests,
  tripId,
  tripStartDate,
  tripPrice,
  tripEndDate,
}: TripReservationProps) => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
    setError,
  } = useForm<TripReservationForm>();
  const router = useRouter();

  const { status } = useSession();

  const onSubmit = async (data: TripReservationForm) => {
    const response = await fetch("/api/trips/check", {
      method: "POST",
      body: Buffer.from(
        JSON.stringify({
          startDate: data.startDate,
          endDate: data.endDate,
          tripId,
        })
      ),
    });

    const res = await response.json();

    if (res?.error?.code === "TRIP_ALREADY_RESERVED") {
      setError("startDate", {
        type: "error",
        message: "Essa data já está reservada",
      });
    }

    if (res?.error?.code === "TRIP_ALREADY_RESERVED") {
      return setError("endDate", {
        type: "error",
        message: "Essa data já está reservada",
      });
    }
    if (res?.error?.code === "INVALID_START_DATE") {
      return setError("startDate", {
        type: "error",
        message: "Data inicial invalida",
      });
    }
    if (res?.error?.code === "INVALID_END_DATE") {
      return setError("startDate", {
        type: "error",
        message: "Data final invalida",
      });
    }

    if (status === "authenticated") {
      router.push(
        `/trips/${tripId}/confirmation?startDate=${data.startDate?.toISOString()}&endDate=${data.endDate?.toISOString()}&guests=${
          data.guests
        }`
      );
    } else {
      toast.error("Oops, você precisa estar logado!", {
        position: "bottom-center",
      });
    }
  };

  const startDate = watch("startDate");
  const endDate = watch("endDate");
  const maxGuestsInput = watch("guests");

  return (
    <div>
      <div className="flex flex-col px-5 lg:min-w-[380px] lg:p-5 lg:border-grayLighter lg-border lg:rounded lg:shadow-md">
        <p className="hidden lg:block text-xl text-primaryDarker mb-4 ">
          <span className="font-semibold">R${tripPrice} por dia</span>
        </p>
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
          },
          max:{
            value: maxGuests,
            message: `O número máximo de hóspedes é ${maxGuests}`
          }
        })}
          className="mt-4"
          placeholder={`Número máximo de hóspedes (${maxGuests})`}
          error={!!errors?.guests}
          errorMessage={errors?.guests?.message}
          type="number"
        />
        <div className="flex justify-between mt-3">
          <p className="font-medium text-sm text-primaryDarker">Total: </p>
          <p className="font-medium text-sm text-primaryDarker">
            {startDate && endDate && maxGuestsInput
              ? `R$${differenceInDays(endDate, startDate) * tripPrice},00`
              : "R$00,00"}
          </p>
        </div>
        <div
          className=" pb-10 border-b lg:border-none border-grayLighter
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
