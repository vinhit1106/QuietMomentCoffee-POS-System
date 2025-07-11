import Image from "next/image";
import React from "react";
import Logo from "@/assets/logo/logo-coffee.png";
const QuietMomentCoffeeLogo = () => {
  return (
    <div className="flex items-center select-none">
      <Image
        src={Logo.src}
        width={86}
        height={86}
        alt="Quiet Moment Coffee Logo"
      />
      <span className="font-montserrat-alternates -ml-3 text-lg leading-[1.1] font-bold whitespace-pre text-[#B3724D]">
        Quiet Moment
        <br />
        Coffee
      </span>
    </div>
  );
};

export default QuietMomentCoffeeLogo;
