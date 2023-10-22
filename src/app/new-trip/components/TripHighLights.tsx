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
  const [newHighLight, setNewHighLights] = useState("");

  const defaultHighlights = [
    { text: "Conforto e Design", disabled: false },
    { text: "Café da manhã incluso", disabled: false },
    { text: "Serviços e Conveniências", disabled: false },
    { text: "Bem-estar e Relaxamento", disabled: false },
    { text: "Sustentabilidade e Responsabilidade Social", disabled: false },
    { text: "Piscina", disabled: false },
    { text: "Estacionamento grátis", disabled: false },
    { text: "Wifi grátis", disabled: false },
  ];
  const [initialHighlights, setInitialHighlights] = useState(defaultHighlights);

  const handleClick = () => {
    if (
      newHighLight === "" ||
      newHighLight === undefined ||
      newHighLight === null
    ) {
      toast.error("O destaque não pode ser vázio!", {
        position: "bottom-center",
      });
    }
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
        {initialHighlights &&
          initialHighlights.map((highlight) => (
            <TripHighLightsOption
              initialHighlights={initialHighlights}
              disabled={highlight.disabled}
              defaults={true}
              setInitialHighlights={setInitialHighlights}
              key={highlight.text}
              text={highlight.text}
              highLights={highLights}
              setHighLights={setHighLights}
            />
          ))}
      </div>
      <div className="flex mt-4 border-grayLighter border-solid border rounded-full ">
        <input
          className="rounded-full border-none p-3"
          placeholder="Novo destaque"
          type="text"
          onChange={(e) => setNewHighLights(e?.target?.value)}
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
              setInitialHighlights={setInitialHighlights}
              initialHighlights={initialHighlights}
              highLights={highLights}
              setHighLights={setHighLights}
              added={true}
              disabled={false}
              defaults={false}
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
