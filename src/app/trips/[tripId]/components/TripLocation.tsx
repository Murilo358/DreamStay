"use client";

import Button from "@/components/Button";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

interface TripLocationProps {
  location: string;
  locationDescription: string;
  lat: string;
  lng: string;
}

const TripLocation = ({
  location,
  locationDescription,
  lat,
  lng,
}: TripLocationProps) => {
  const newLocation = location.replaceAll(",", "").split(" ")[0];

  const [positions, setpositions] = useState({ lat: 0, lng: 0 });
  const [placeDescription, setPlaceDescription] = useState();

  const googleApiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: googleApiKey ? googleApiKey : "",
  });

  useEffect(() => {
    async function getPositions(location: string) {
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${googleApiKey}`
      );
      const data = await res.json();
      setpositions(data.results[0].geometry.location);
    }

    async function getPlaceDescription(location: string) {
      try {
        const response = await fetch(
          `https://pt.wikipedia.org/api/rest_v1/page/summary/${location}`
        );
        const data = await response.json();

        if (data.extract) {
          const description = data.extract;
          setPlaceDescription(description);
        } else {
          console.error("Description not found");
        }
      } catch (error) {
        console.error("Error fetching place description:", error);
      }
    }
    if ((lat && lng == null) || undefined || "") {
      getPositions(location);
    } else {
      setpositions({ lat: Number(lat), lng: Number(lng) });
    }

    getPlaceDescription(newLocation);
  }, []);

  return (
    <div className="px-3 lg:p-0 flex flex-col">
      {" "}
      <h2 className="font-semibold  lg:text-xl mt-3 mb-5 text-primaryDarker ">
        Localização
      </h2>
      <div className=" items-center relative w-full h-[266px] lg:hidden">
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "100%" }}
            center={positions}
            zoom={15}
          >
            <Marker position={positions}></Marker>
          </GoogleMap>
        ) : (
          <></>
        )}
      </div>
      <div className=" items-center relative w-full hidden lg:block h-[480px]">
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "100%" }}
            center={positions}
            zoom={15}
          >
            <Marker position={positions}></Marker>
          </GoogleMap>
        ) : (
          <></>
        )}
      </div>
      <p className="text-primaryDarker lg:text-base text-sm font-semibold mt-3">
        {location}
      </p>
      <p className="text-grayPrimary lg:text-base  text-xs leading-5">
        {placeDescription ? placeDescription : "Descrição não encontrada"}
      </p>
      <a
        href={`https://www.google.com/maps?q=${positions.lat},${positions.lng}`}
      >
        <Button variant="outlined" className="mt-5 w-full">
          Ver no google maps
        </Button>
      </a>
    </div>
  );
};

export default TripLocation;
