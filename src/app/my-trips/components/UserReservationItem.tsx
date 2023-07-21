"use client";
import { Prisma, TripReservation } from "@prisma/client";
import React from "react";
import Image from "next/image";
import ReactCountryFlag from "react-country-flag";
import ptBR from "date-fns/locale/pt-BR";
import { format } from "date-fns";
import Button from "@/components/Button";
import { toast } from "react-toastify";

import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
interface UserReservationItemProps {
  reservation: Prisma.TripReservationGetPayload<{
    include: { trip: true };
  }>;
}

const UserReservationItem = ({ reservation }: UserReservationItemProps) => {
  const { trip } = reservation;
  const router = useRouter();

  const handleDeleteClick = async () => {
    const result = await Swal.fire({
      title: "Você tem certeza?",
      text: "Você não poderá reverter isso",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Sim, cancelar!",
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`/api/trips/reservation/${reservation.id}`, {
          method: "DELETE",
        });

        if (!res.ok) {
          toast.error("Erro ao cancelar a viagem, tente novamente mais tarde", {
            position: "bottom-center",
          });
        } else {
          toast.success("Viagem cancelada com sucesso", {
            position: "bottom-center",
          });
        }
      } catch (error) {
        console.error("Erro ao realizar a requisição:", error);
        toast.error("Erro ao cancelar a viagem, tente novamente mais tarde", {
          position: "bottom-center",
        });
      }
    }
  };

  return (
    <div>
      <div className="flex flex-col p-5 mt-5 border-grayLighter border-solid border shadow-lg rouded-lg">
        <div className="flex flex-row gap-3 pb-5 border-b border-grayLighter border-solid ">
          <div className="relative h-[106px] w-[124px]  ">
            <Image
              src={trip.coverImage}
              fill
              className="object-cover rounded-lg"
              alt={trip.name}
            />
          </div>
          <div className="flex flex-col">
            <h2 className=" font-semibold text-primaryDarker text-xl ">
              {trip.name}
            </h2>
            <div className="flex items-center gap-1">
              <ReactCountryFlag countryCode={trip.countryCode} svg />
              <p className=" text-xs text-grayPrimary underline">
                {trip.location}
              </p>
            </div>
          </div>
        </div>
        <h3 className="font-semibold text-lg text-primaryDarker mt-5">
          Sobre a viagem
        </h3>
        <div className="flex flex-col mt-5">
          <h3 className="font-semibold text-primaryDarker">Data</h3>
          <p className="mt-2">
            {format(new Date(reservation.startDate), "dd 'de' MMMM", {
              locale: ptBR,
            })}{" "}
            à{" "}
            {format(new Date(reservation.endDate), "dd 'de' MMMM", {
              locale: ptBR,
            })}
          </p>
        </div>
        <div className="flex flex-col mt-5 border-b border-grayLighter border-solid pb-5">
          <h3 className="font-semibold text-primaryDarker">Hóspedes</h3>
          <p className="mt-2">{reservation.guests} hóspedes</p>
        </div>

        <h1 className="text-xl text-primaryDarker font-semibold">
          Informações de pagamento
        </h1>
        <div className="flex justify-between">
          <p className="text-primaryDarker">Total:</p>
          <p className="font-semibold">R${reservation.totalPaid.toString()}</p>
        </div>
        <Button
          onClick={handleDeleteClick}
          className="mt-10"
          variant="outlined"
        >
          Cancelar
        </Button>
      </div>
    </div>
  );
};

export default UserReservationItem;
