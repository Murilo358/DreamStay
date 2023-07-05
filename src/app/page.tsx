"use client";

import { data } from "autoprefixer";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  //useSession pega o user da context
  const { data } = useSession();

  return <div></div>;
}
