"use client";

import Button from "@/components/Button";
import CurrencyInput from "@/components/CurrencyInput";
import DatePicker from "@/components/DatePicker";
import Input from "@/components/Input";
import { useRouter } from "next/navigation";
import React from "react";
import { Controller, useForm } from "react-hook-form";

interface tripSearchfrom {
  text: string;
  endDate: Date | null;
  budget: string;
}

const TripSearch = () => {

  const {
    control,
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<tripSearchfrom>();
  const router = useRouter();
  const onSubmit = (data: tripSearchfrom) => {
    console.log({ data });
    router.push(
      `/trips/search?text=${
        data.text
      }&endDate=${data.endDate?.toISOString()}&budget=${data.budget}`
    );
  };

  return (
    <div className="container mx-auto bg-search-background bg-cover bg-center items-center bg-no-repeat lg:py-28">
      <h1 className=" text-center font-semibold text-2xl text-grayPrimary lg:text-[2.5rem] ">
        Encontre sua proxima <span className="text-primary">viagem!</span>
      </h1>

      <div className="flex flex-col gap-4 mt-5 lg:flex-row lg:max-w-[948px] mx-auto lg:p-4 lg:bg-primary lg:bg-opacity-20 lg:rounded-lg">
        <Input
          placeholder="Onde você quer ir?"
          error={!!errors.text}
          errorMessage={errors.text?.message}
          {...register("text", {
            required: {
              value: true,
              message: "Insira o local da viagem",
            },
          })}
        />
        <div className="flex gap-4 lg:w-full">
          <Controller
            name="endDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                className="w-full"
                placeholderText="Data final"
                onChange={field.onChange}
                selected={field.value}
                minDate={new Date()}
              />
            )}
          />

          <Controller
            name="budget"
            control={control}
            render={({ field }) => (
              <CurrencyInput
                placeholder="Orçamento"
                allowDecimals={false}
                onValueChange={field.onChange as any}
                value={field.value}
                onBlur={field.onBlur}
              />
            )}
          />
        </div>
        <Button onClick={() => handleSubmit(onSubmit)()} className="lg:w-1/2">
          Buscar
        </Button>
      </div>
    </div>
  );
};

export default TripSearch;
