"use client";
import QuickSearch from "./components/QuickSearch";
import TripSearch from "./components/TripSearch";

export default function Home() {
  //useSession pega o user da context

  return (
    <div className="">
      <TripSearch />
      <QuickSearch />
    </div>
  );
}
