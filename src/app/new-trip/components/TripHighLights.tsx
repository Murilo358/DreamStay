"use client";
import React, { useState } from "react";
import TripHighLightsOption from "./TripHighLightsOption";
import { AiOutlinePlus } from "react-icons/ai";
import Button from "@/components/Button";
import { toast } from "react-toastify";

interface TripHighLightsProps {
  setHighLights: any;
  highLights: any;
  setHighLightsSelected: any;
}

const TripHighLights = ({
  highLights,
  setHighLights,
  setHighLightsSelected,
}: TripHighLightsProps) => {
  const [newHighLight, setNewHighLights] = useState();

  const handleClick = () => {
    if (highLights.includes(newHighLight)) {
      toast.error("Oops, esse destaque ja foi adicionado!", {
        position: "bottom-center",
      });
    } else {
      setHighLights([...highLights, newHighLight]);
    }
  };

  return (
    <div data-aos="zoom-in" className="flex flex-col items-center ">
      <h1 className="  font-medium mt-10 mb-10 text-xl text-center text-primaryDarker lg:text-3xl ">
        Insira ao menos 2 destaques da sua acomodação
      </h1>

      <div className="flex flex-wrap lg:w-1/2  justify-center gap-2 lg:gap-5 items-center">
        <TripHighLightsOption
          text="Conforto e Design"
          highLights={highLights}
          setHighLights={setHighLights}
        />
        <TripHighLightsOption
          text="Café da manhã incluso"
          highLights={highLights}
          setHighLights={setHighLights}
        />
        <TripHighLightsOption
          text="Serviços e Conveniências"
          highLights={highLights}
          setHighLights={setHighLights}
        />
        <TripHighLightsOption
          text="Bem-estar e Relaxamento"
          highLights={highLights}
          setHighLights={setHighLights}
        />
        <TripHighLightsOption
          text="Sustentabilidade e Responsabilidade Social"
          highLights={highLights}
          setHighLights={setHighLights}
        />
        <TripHighLightsOption
          text="Piscina"
          highLights={highLights}
          setHighLights={setHighLights}
        />
        <TripHighLightsOption
          text="Estacionamento grátis"
          highLights={highLights}
          setHighLights={setHighLights}
        />
        <TripHighLightsOption
          text="Vista paradisíaca"
          highLights={highLights}
          setHighLights={setHighLights}
        />
        <TripHighLightsOption
          text="Wifi grátis"
          highLights={highLights}
          setHighLights={setHighLights}
        />
      </div>
      <div className="flex mt-4 border-grayLighter border-solid border rounded-full ">
        <input
          className="rounded-full border-none p-3"
          placeholder="Novo destaque"
          type="text"
          onChange={(e) => setNewHighLights(e.target.value)}
        />
        <button
          onClick={handleClick}
          className="p-5 rounded-full bg-primary text-white hover:bg-primaryDarker   "
        >
          <AiOutlinePlus />
        </button>
      </div>
      <h3 className="  font-medium mt-10 mb-10 text-xl text-primaryDarker lg:text-3xl ">
        Itens selecionados:
      </h3>
      <div className="flex flex-wrap w-1/2 gap-5 items-center">
        {highLights.length > 0 &&
          highLights.map((highLight: any) => (
            <TripHighLightsOption
              highLights={highLights}
              setHighLights={setHighLights}
              added={true}
              key={highLight}
              text={highLight}
            />
          ))}
      </div>
      {highLights.length > 1 && (
        <Button
          onClick={() => setHighLightsSelected(true)}
          className="mt-8 w-[300px]"
        >
          Confirmar
        </Button>
      )}
    </div>
  );
};

export default TripHighLights;
