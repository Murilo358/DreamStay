"use client";
import TripItem from "@/components/TripItem";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { LiaSpinnerSolid } from "react-icons/lia";

const Trips = () => {
  const searchParams = useSearchParams();

  const text = searchParams.get("text");
  const endDate = searchParams.get("endDate");
  const budget = searchParams.get("budget");

  const [trips, setTrips] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchtrips = async () => {
      setLoading(true);
      const response = await fetch(
        `/api/trips/search?text=${text}&endDate=${endDate}&budget=${budget}`
      );

      const data = await response.json();
      setTrips(data);

      setLoading(false);
    };

    fetchtrips();
  }, [budget, endDate, text]);

  return (
    <div className="container mx-auto flex min-h-screen flex-col items-center gap-5 ">
      {loading && (
        <LiaSpinnerSolid className="animate-spin mt-20  w-[40px] h-[40px]" />
      )}
      {!loading && trips.length > 0 ? (
        <>
          <h1 className="  font-medium text-xl text-primaryDarker lg:text-3xl ">
            Hospedagens encontradas para "{text}"
          </h1>
          <h3 className="text-grayPrimary lg:text-2xl">
            Listamos os melhores locais para você
          </h3>
          <div className="flex flex-col items-center  gap-6 lg:flex-row lg:flex-wrap lg:justify-center lg:gap-10  mt-5 lg:mt-10">
            {trips.map((trip) => (
              <TripItem key={trip} trip={trip} />
            ))}
          </div>
        </>
      ) : !loading && trips.length === 0 ? (
        <p className="mt-3 font-medium text-primaryDarker">
          Nenhuma viagem foi encontrada :(
        </p>
      ) : (
        ""
      )}
    </div>
  );
};

export default Trips;
