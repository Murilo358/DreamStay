"use client";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
const MyTrips = () => {
  const { status, data } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      toast.error("Oops, você precisa estar logado!", {
        position: "bottom-center",
      });
      router.push("/");
    }
    const fetchTripsReservations = async () => {
      const response = await fetch(
        `http://localhost:3000/api/user/${(data?.user as any)?.id}/trips`
      );
      const json = await response.json();
      console.log(json);
    };
    fetchTripsReservations();
  }, [status]);

  return <div>MyTrips</div>;
};

export default MyTrips;
