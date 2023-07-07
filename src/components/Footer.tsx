import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <div className="bg-whitePrimary mt-1 justify-center p-5 items-center flex flex-col">
      <Image src="/logo.png" width={133} height={23} alt="DreamStay" />
      <p className="text-sm font-semibold text-primaryDarker">
        Todos os direitos reservados
      </p>
    </div>
  );
};

export default Footer;
