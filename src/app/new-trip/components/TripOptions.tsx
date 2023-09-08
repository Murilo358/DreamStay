import React from "react";
import TripOption from "./TripOption";
import Input from "@/components/Input";

const TripOptions = ({ setOptionsSelected }) => {
  return (
    <>
      <h1
        data-aos="zoom-in"
        className=" mt-14 font-medium text-xl mb-10 text-primaryDarker lg:text-3xl text-center "
      >
        Descreva seu local com uma das opções abaixo
      </h1>
      <div
        data-aos="zoom-in"
        className="flex flex-wrap flex-row gap-5  justify-center  lg:w-1/2   "
      >
        <TripOption
          setOptionsSelected={setOptionsSelected}
          text={"Hotel"}
          imageSrc="/hotel-icon.png"
        />
        <TripOption
          setOptionsSelected={setOptionsSelected}
          text={"Fazenda"}
          imageSrc="/farm-icon.png"
        />
        <TripOption
          setOptionsSelected={setOptionsSelected}
          text={"Chalé"}
          imageSrc="/cottage-icon.png"
        />
        <TripOption
          setOptionsSelected={setOptionsSelected}
          text={"Pousada"}
          imageSrc="/inn-icon.png"
        />
        <TripOption
          setOptionsSelected={setOptionsSelected}
          text={"Apartamento"}
          imageSrc="/Apartment.png"
        />
        <TripOption
          setOptionsSelected={setOptionsSelected}
          text={"Celeiro"}
          imageSrc="/Barn.png"
        />
        <TripOption
          setOptionsSelected={setOptionsSelected}
          text={"Cabana"}
          imageSrc="/Cabin.png"
        />
        <TripOption
          setOptionsSelected={setOptionsSelected}
          text={"Van"}
          imageSrc="/Campervan.png"
        />
        <TripOption
          setOptionsSelected={setOptionsSelected}
          text={"Castelo"}
          imageSrc="/Castle.png"
        />
        <TripOption
          setOptionsSelected={setOptionsSelected}
          text={"Cúpula"}
          imageSrc="/Dome.png"
        />
        <TripOption
          setOptionsSelected={setOptionsSelected}
          text={"Tenda"}
          imageSrc="/Tent.png"
        />
        <TripOption
          setOptionsSelected={setOptionsSelected}
          text={"Barco"}
          imageSrc="/Houseboat.png"
        />
        <TripOption
          setOptionsSelected={setOptionsSelected}
          text={"Árvore"}
          imageSrc="/Tree house.png"
        />
        <TripOption
          setOptionsSelected={setOptionsSelected}
          text={"Torre"}
          imageSrc="/Tower.png"
        />
        <TripOption
          setOptionsSelected={setOptionsSelected}
          text={"Particular"}
          imageSrc="/Casa particular.png"
        />
      </div>
    </>
  );
};

export default TripOptions;
