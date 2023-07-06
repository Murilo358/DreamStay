import Image from "next/image";
import React from "react";
import { LiaHotelSolid } from "react-icons/lia";
import { MdOutlineCottage } from "react-icons/md";

const QuickSearch = () => {
  return (
    <div className="container mx-auto p-5 ">
      <div className="flex items-center">
        <div className="w-full h-[1px] bg-grayLighter"></div>
        <h2 className=" px-5 whitespace-nowrap text-center font-medium text-grayPrimary ">
          Tente pesquisar por
        </h2>
        <div className="w-full h-[1px] bg-grayLighter"></div>
      </div>
      <div className="flex justify-between  mt-5 text-grayPrimary ">
        <div className="flex flex-col  items-center ">
          <Image width={35} height={35} src="/hotel-icon.png" alt="Hotel" />
          <p className=" text-sm  ">Hotel</p>
        </div>

        <div className="flex flex-col items-center">
          <Image width={35} height={35} src="/farm-icon.png" alt="Hotel" />
          <p className="text-center text-sm  ">Fazenda</p>
        </div>

        <div className="flex flex-col items-center">
          <Image width={35} height={35} src="/cottage-icon.png" alt="Hotel" />
          <p className="text-center text-sm  ">Chalé</p>
        </div>

        <div className="flex flex-col items-center">
          <Image width={35} height={35} src="/inn-icon.png" alt="Hotel" />
          <p className="text-center text-sm  ">Pousada</p>
        </div>
      </div>
    </div>
  );
};

export default QuickSearch;
