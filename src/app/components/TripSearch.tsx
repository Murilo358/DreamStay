"use client";

import Button from "@/components/Button";
import CurrencyInput from "@/components/CurrencyInput";
import DatePicker from "@/components/DatePicker";
import Input from "@/components/Input";
import React from "react";

const TripSearch = () => {
  return (
    <div className="container mx-auto bg-search-background bg-cover bg-center items-center bg-no-repeat">
      <h1 className=" text-center font-semibold text-2xl text-grayPrimary ">
        Encontre sua proxima <span className="text-primary">viagem!</span>
      </h1>

      <div className="flex flex-col gap-4 mt-5">
        <Input placeholder="Onde você quer ir?" />
        <div className="flex gap-4">
          <DatePicker
            placeholderText="Data de Ida"
            onChange={() => {}}
            className="w-full"
          />
          <CurrencyInput placeholder="Orçamento" />
        </div>
        <Button>Buscar</Button>
      </div>
    </div>
  );
};

export default TripSearch;
