"use client";

import { data } from "autoprefixer";
import { signIn, signOut, useSession } from "next-auth/react";
import TripSearch from "./components/TripSearch";
import Input from "@/components/Input";
import DatePicker from "@/components/DatePicker";
import CurrencyInput from "@/components/CurrencyInput";

export default function Home() {
  //useSession pega o user da context
  const { data } = useSession();

  return (
    <div className="">
      <TripSearch />
      <div className="flex flex-col gap-4 mt-5">
        <Input placeholder="Onde você quer ir?" />
        <div className="flex gap-4">
          <DatePicker
            className="w-full"
            onChange={() => {}}
            placeholderText="Data de ida"
          />
          <CurrencyInput placeholder="Orçamento" />
        </div>
      </div>
    </div>
  );
}
