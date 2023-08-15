"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LiaSpinnerSolid } from "react-icons/lia";
import { toast } from "react-toastify";
import UserReservationItem from "./components/UserReservationItem";
import { Prisma } from "@prisma/client";
const MyTrips = () => {
  const { status, data } = useSession();
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
      const response = await fetch(
        `/api/user/${(data?.user as any)?.id}/trips`
      );
      const json = await response.json();
      setLoading(false);
      setReservations(json);
    };
    fetchTripsReservations();
  }, [status]);

  return (
    <div className="container mx-auto p-5 ">
      {loading && (
        <LiaSpinnerSolid className="animate-spin mt-20  w-[40px] h-[40px]" />
      )}
      {!loading && reservations.length > 0 ? (
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
      ) : !loading && reservations.length === 0 ? (
        <p className="mt-3 font-medium text-primaryDarker">
          Nenhuma viagem foi reservada :(
        </p>
      ) : (
        ""
      )}
    </div>
  );
};

export default MyTrips;
