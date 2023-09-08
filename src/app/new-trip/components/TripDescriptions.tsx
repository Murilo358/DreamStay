import Input from "@/components/Input";
import React from "react";
import CurrencyInput from "@/components/CurrencyInput";
import DatePicker from "@/components/DatePicker";
import { Controller, useForm } from "react-hook-form";
import Button from "@/components/Button";
import TextArea from "@/components/TextArea";

interface TripReservationForm {
  guests: number;
  startDate: Date | null;
  endDate: Date | null;
  title: string;
  description: string;
  pricePerDay: number;
}

const TripDescriptions = ({ setDescriptions, createTrip }: any) => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
    setError,
  } = useForm<TripReservationForm>();

  const title = watch("title");
  const startDate = watch("startDate");
  const endDate = watch("endDate");
  const description = watch("description");
  const pricePerDay = watch("pricePerDay");
  const maxGuestsInput = watch("guests");

  const onSubmit = async (data: TripReservationForm) => {
    await setDescriptions(data);
    createTrip();
  };

  return (
    <div>
      <h1 className="  font-medium mt-10 mb-5 text-xl text-primaryDarker lg:text-3xl ">
        Estamos quase lá... <br />
        Preencha os dados abaixo
      </h1>

      <div className="flex gap-3 ">
        <Input
          {...register("title", {
            required: {
              value: true,
              message: "Por favor informe o título",
            },
          })}
          placeholder="Título"
          error={!!errors?.title}
          errorMessage={errors?.title?.message}
        />
        <Controller
          name="startDate"
          rules={{
            required: {
              value: true,
              message: "Por favor informe a data inicial",
            },
          }}
          render={({ field }) => (
            <DatePicker
              className="w-full"
              placeholderText="Data inicial"
              errorMessage={errors.startDate?.message}
              error={!!errors.startDate}
              onChange={field.onChange}
              selected={field.value}
              maxDate={endDate}
            />
          )}
          control={control}
        />

        <Controller
          name="endDate"
          rules={{
            required: {
              value: true,
              message: "Por favor informe a data final",
            },
          }}
          render={({ field }) => (
            <DatePicker
              className="w-full"
              placeholderText="Data final"
              errorMessage={errors.endDate?.message}
              error={!!errors.endDate}
              onChange={field.onChange}
              selected={field.value}
              minDate={startDate}
            />
          )}
          control={control}
        />
      </div>
      <div>
        <TextArea
          {...register("description", {
            required: {
              value: true,
              message: "Por favor informe a descrição",
            },
          })}
          className="mt-3"
          placeholder="Descrição "
          cols={30}
          rows={10}
          error={!!errors?.description}
          errorMessage={errors?.description?.message}
        />
      </div>
      <div className="flex mt-3 gap-3">
        <Controller
          name="pricePerDay"
          control={control}
          rules={{
            required: {
              value: true,
              message: "Por favor informe o valor por dia",
            },
          }}
          render={({ field }) => (
            <CurrencyInput
              className="w-full"
              placeholder="Orçamento"
              allowDecimals={false}
              onValueChange={field.onChange as any}
              value={field.value}
              onBlur={field.onBlur}
              errorMessage={errors.pricePerDay?.message}
              error={!!errors.pricePerDay}
            />
          )}
        />
        <Input
          //prettier-ignore
          {...register("guests", { required: {
            value: true,
            message: "Por favor informe o número de hóspedes"
          },
        })}
          className=""
          placeholder={`Núm máximo de hóspedes`}
          error={!!errors?.guests}
          errorMessage={errors?.guests?.message}
          type="number"
        />
      </div>
      <Button
        onClick={() => handleSubmit(onSubmit)()}
        className="w-full mt-3 h-[40px]"
      >
        Criar reservar!
      </Button>
    </div>
  );
};

export default TripDescriptions;
