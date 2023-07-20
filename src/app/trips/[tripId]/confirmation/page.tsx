"use client";

import { Trip } from "@prisma/client";
import { format } from "date-fns";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import ReactCountryFlag from "react-country-flag";
import ptBR from "date-fns/locale/pt-BR";
import Button from "@/components/Button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const TripConfirmation = ({ params }: { params: { tripId: string } }) => {
  const [trip, setTrip] = useState<Trip | null>();
  const [totalPrice, setTotalPrice] = useState();
  const searchParams = useSearchParams();

  const startDate = new Date(searchParams.get("startDate") as string);
  const endDate = new Date(searchParams.get("endDate") as string);
  const guests = searchParams.get("guests");

  const { status } = useSession();

  const router = useRouter();
  useEffect(() => {
    const fetchtrip = async () => {
      const response = await fetch(`http://localhost:3000/api/trips/check`, {
        method: "POST",
        body: JSON.stringify({
          tripId: params.tripId,
          startDate,
          endDate,
        }),
      });
      const { trip, totalPrice } = await response.json();
      setTrip(trip);
      setTotalPrice(totalPrice);
    };

    if (status === "authenticated") {
      fetchtrip();
    } else {
      alert("Você precisa estar logado para visualizar está página");
      router.push(`/trips/${params.tripId}`);
    }
  }, [status]);

  if (!trip) return null;

  console.log({ trip });
  return (
    <div className="container mx-auto p-5 h-screen">
      <h1 className="font-semibold text-xl text-primaryDarker">Sua viagem</h1>
      {/* Card */}
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
          Informações adicionais
        </h3>
        <div className="flex justify-between mt-1">
          <p className=" text-primaryDarker">Total:</p>
          <p className="font-medium">R${totalPrice}</p>
        </div>
      </div>
      {/*  */}
      <div className="flex flex-col mt-5">
        <h3 className="font-semibold text-primaryDarker">Data</h3>
        <p className="mt-2">
          {format(startDate, "dd 'de' MMMM", { locale: ptBR })} à{" "}
          {format(endDate, "dd 'de' MMMM", { locale: ptBR })}
        </p>
      </div>
      <div className="flex flex-col mt-5">
        <h3 className="font-semibold text-primaryDarker">Hóspedes</h3>
        <p className="mt-2">{guests} hóspedes</p>
      </div>

      <Button className="w-full mt-5">Finalizar compra!</Button>
    </div>
  );
};

export default TripConfirmation;
