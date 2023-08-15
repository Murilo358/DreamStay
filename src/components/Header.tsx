"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { AiOutlineMenu } from "react-icons/ai";
import React, { useState } from "react";
import Link from "next/link";

const Header = () => {
  //Usar uma função para handle login melhora a performace
  //Faz com que a função não seja inline do botão
  const handleLoginClick = () => {
    signIn();
  };
  const handleSignOutClick = () => {
    signOut();
    setOpenedMenu(false);
  };

  //"authenticated" | "loading" | "unauthenticated"
  const { status, data } = useSession();

  const [openedMenu, setOpenedMenu] = useState(false);

  const handleMenuClick = () => {
    setOpenedMenu(!openedMenu);
  };

  return (
    <div className="container mx-auto p-5 py-0 h-[93px] flex justify-between items-center border-b border-grayLighter">
      {/* Uma div relative com o tamanho definido irá garantir que a imagem sempre será aquele tamanho */}
      {/* Lembrar de passar o fill como propriedadae */}

      <Link href={"/"}>
        <div className="relative h-[32px] w-[183px]">
          <Image src="/logo.png" alt="DreamStay" fill />
        </div>
      </Link>

      {status === "unauthenticated" && (
        <button
          onClick={handleLoginClick}
          className="text-primary text-sm font-semibold"
        >
          Login
        </button>
      )}
      {status === "authenticated" && data.user && (
        <div className="flex relative items-center gap-3 border p-2 px-3 border-solid border-grayLighter rounded-full">
          <AiOutlineMenu
            className="cursor-pointer"
            onClick={handleMenuClick}
            size={20}
          />

          <Image
            className="rounded-full shadow-md"
            width={35}
            src={data.user.image!}
            height={35}
            alt={data.user.name!}
          />
          {openedMenu && (
            <div className="absolute  z-20 top-14 bg-white right-1 h-full w-[150px] p-2 border-solid border-grayPrimary shadow-md flex flex-col justify-center items-center rounded-lg">
              <Link href="/my-trips">
                <button
                  onClick={handleMenuClick}
                  className="text-primary border-solid border-b border-grayLighter text-sm font-semibold"
                >
                  Minhas viagens
                </button>
              </Link>

              <button
                className="text-primary text-sm font-semibold"
                onClick={handleSignOutClick}
              >
                LogOut
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
