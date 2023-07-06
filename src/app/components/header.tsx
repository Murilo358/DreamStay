"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import React, { Children } from "react";

const header = () => {
  return (
    <div className="container mx-auto p-5 flex justify-between">
      {/* Se o next ja sabe o width e height ele ja irá reservar espaço */}

      <Image width={183} height={32} src="/logo.png" alt="DreamStay" />
      <button
        onClick={() => signIn()}
        className="text-primary text-sm font-semibold"
      >
        Login
      </button>
    </div>
  );
};

export default header;
