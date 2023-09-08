"use client";
import AOS from "aos";
import "aos/dist/aos.css";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import TripOptions from "./components/TripOptions";
import TripCity from "./components/TripCity";
import TripHighLights from "./components/TripHighLights";
import TripImages from "./components/TripImages";
import TripDescriptions from "./components/TripDescriptions";

const Page = () => {
  const [optionsSelected, setOptionsSelected] = useState(null);
  const [citysSelected, setCitysSelected] = useState("");
  const [highLights, setHighLights] = useState([]);
  const [highLightsSelected, setHighLightsSelected] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [countryCode, setCountryCode] = useState("");
  const [descriptions, setDescriptions] = useState("");
  const { status, data } = useSession();
  const router = useRouter();

  useEffect(() => {
    AOS.init();
    if (status === "unauthenticated") {
      toast.error("Oops, você precisa estar logado!", {
        position: "bottom-center",
      });
      router.push("/");
    }
  }, [status]);

  async function createTrip() {
    const data = await {
      citysSelected,
      highLights,
      uploadedImages,
      countryCode,
      descriptions,
    };

    if (descriptions != "") {
      try {
        const res = await fetch("/api/trips/create", {
          method: "POST",
          body: Buffer.from(JSON.stringify({ data })),
        });
        if (res.ok) {
          toast.success("Viagem criada com sucesso", {
            position: "bottom-center",
          });
          router.push("/");
        }
      } catch (err) {
        toast.error(
          "Não foi possivel criar a viagem, tente novamente mais tarde",
          {
            position: "bottom-center",
          }
        );
        console.error(err);
        router.push("/");
      }
    }
  }

  return (
    <div className="container mx-auto flex  flex-col items-center">
      {!optionsSelected && (
        <TripOptions setOptionsSelected={setOptionsSelected} />
      )}
      {optionsSelected && !citysSelected && (
        <TripCity
          setCountryCode={setCountryCode}
          setCitysSelected={setCitysSelected}
        />
      )}
      {citysSelected && !highLightsSelected && (
        <TripHighLights
          setHighLightsSelected={setHighLightsSelected}
          highLights={highLights}
          setHighLights={setHighLights}
        />
      )}
      {highLightsSelected && uploadedImages.length < 5 && (
        <TripImages setUploadedImages={setUploadedImages} />
      )}
      {highLightsSelected && uploadedImages.length >= 5 && (
        <TripDescriptions
          setDescriptions={setDescriptions}
          createTrip={createTrip}
        />
      )}
    </div>
  );
};

export default Page;
