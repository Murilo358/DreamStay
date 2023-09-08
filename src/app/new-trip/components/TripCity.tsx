"use client";
import Button from "@/components/Button";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";
import React, { useState, useEffect } from "react";

interface TripOptionProps {
  setCitysSelected: any;
  setCountryCode: any;
}

const TripCity = ({ setCitysSelected, setCountryCode }: TripOptionProps) => {
  const googleApiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
  const [positions, setPositions] = useState({ lat: 0, lng: 0 });
  const [cityName, setCityName] = useState("");
  const [autocomplete, setAutocomplete] = useState(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: googleApiKey ? googleApiKey : "",
    libraries: ["places"],
  });

  const handlePlaceSelect = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        setPositions({ lat, lng });

        const geocoder = new window.google.maps.Geocoder();
        const latLng = new window.google.maps.LatLng(lat, lng);

        geocoder.geocode({ location: latLng }, (results, status) => {
          if (status === "OK" && results.length > 0) {
            const countryComponent = results.find((result) =>
              result.types.includes("country")
            );
            if (countryComponent) {
              const countryCode = countryComponent.address_components.find(
                (component) => component.types.includes("country")
              ).short_name;
              setCountryCode(countryCode);
            }
          }
        });
      }
    }
  };

  const handleMarkerDragEnd = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setPositions({ lat, lng });
  };

  useEffect(() => {
    const successCallback = (position) => {
      setPositions({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    };

    const errorCallback = (error) => {};

    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  }, []);

  return (
    <>
      <h1
        data-aos="zoom-in"
        className=" mt-14  font-medium  mb-10 text-xl text-primaryDarker lg:text-3xl text-center"
      >
        Onde sua acomodação está localizada?
      </h1>
      <div data-aos="zoom-in" className="flex items-center flex-col w-full">
        <div className="rounded-md border border-gray-300 bg-white ">
          {isLoaded && (
            <Autocomplete
              onLoad={(autocomplete) => {
                setAutocomplete(autocomplete);
                autocomplete.setFields(["geometry"]);
              }}
              onPlaceChanged={handlePlaceSelect}
            >
              <div>
                <input
                  type="text"
                  onChange={(e) => setCityName(e.target.value)}
                  placeholder="Digite o nome da sua cidade aqui * "
                  className="p-2 rounded-3xl text-sm font-normal min-w-[300px] text-dark placeholder-black placeholder-opacity-80 outline-none transition-all"
                />
              </div>
            </Autocomplete>
          )}
        </div>
        <p
          data-aos="zoom-in"
          className="  text-primaryDarker text-center text-xs"
        >
          (Esse nome será utilizado na sua viagem)
        </p>
        <div className="items-center relative w-full h-[266px] mt-4 lg:hidden">
          {isLoaded ? (
            <GoogleMap
              mapContainerStyle={{ width: "100%", height: "100%" }}
              center={positions}
              zoom={15}
            >
              <Marker
                position={positions}
                draggable={true}
                onDragEnd={handleMarkerDragEnd}
              ></Marker>
            </GoogleMap>
          ) : (
            <></>
          )}
        </div>
        <div className="items-center relative w-full hidden lg:block h-[480px]">
          {isLoaded ? (
            <GoogleMap
              mapContainerStyle={{ width: "100%", height: "100%" }}
              center={positions}
              zoom={15}
            >
              <Marker
                position={positions}
                draggable={true}
                onDragEnd={handleMarkerDragEnd}
              ></Marker>
            </GoogleMap>
          ) : (
            <></>
          )}
        </div>
        {positions.lat != 0 && positions.lng != 0 && cityName != "" && (
          <Button
            onClick={() => setCitysSelected({ positions, cityName })}
            variant="outlined"
            className="mt-5 w-full"
          >
            Confirmar
          </Button>
        )}
      </div>
    </>
  );
};

export default TripCity;
