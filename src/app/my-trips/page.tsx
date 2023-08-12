"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import UserReservationItem from "./components/UserReservationItem";
import { Prisma } from "@prisma/client";
const MyTrips = () => {
  const { status, data } = useSession();

  const router = useRouter();
  const [reservations, setReservations] = useState<
    Prisma.TripReservationGetPayload<{
      include: { trip: true };
    }>[]
  >([]);

  useEffect(() => {
    if (status === "unauthenticated") {
      toast.error("Oops, você precisa estar logado!", {
        position: "bottom-center",
      });
      router.push("/");
    }
    const fetchTripsReservations = async () => {
      const response = await fetch(
        `/api/user/${(data?.user as any)?.id}/trips`
      );
      const json = await response.json();
      setReservations(json);
    };
    fetchTripsReservations();
  }, [status]);

  return (
    <div className="container mx-auto p-5">
      {reservations.length > 0 ? (
        <>
          <h1 className="text-primaryDarker text-xl font-semibold">
            Minhas viagens
          </h1>
          <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-10">
            {reservations.map((reservation) => (
              <UserReservationItem
                key={reservation.id}
                reservation={reservation}
              />
            ))}
          </div>
        </>
      ) : (
        <p className="font-medium mt-3 text-center">
          Você ainda não tem nenhuma viagem reservada :(
        </p>
      )}
    </div>
  );
};

export default MyTrips;
