"use client";

import Button from "@/components/Button";
import Image from "next/image";
import { useEffect, useState } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
// https://pt.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exintro=true&titles=NOME_DA_CIDADE

interface TripLocationProps {
  location: string;
  locationDescription: string;
}

const TripLocation = ({ location, locationDescription }: TripLocationProps) => {
  const newLocation = location.split(" ").join("_");

  const [positions, setpositions] = useState();

  const googleApiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: googleApiKey ? googleApiKey : "",
  });

  useEffect(() => {
    async function getPositions(location: string) {
      console.log(googleApiKey);
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${googleApiKey}`
      );
      const data = await res.json();
      setpositions(data.results[0].geometry.location);
    }

    // async function getPlaceDescription(location: string) {
    //   const res = await fetch(
    //     `https://pt.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exintro=true&titles=${newLocation}`
    //   );
    //   const data = await res.json();
    //   console.log(data);
    // }
    // getPlaceDescription(newLocation);
    getPositions(location);
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
        {locationDescription}
      </p>
      <Button variant="outlined" className="mt-5 w-full">
        Ver no google maps
      </Button>
    </div>
  );
};

export default TripLocation;
