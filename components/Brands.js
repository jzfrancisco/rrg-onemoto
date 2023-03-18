import React from "react";
import Image from "next/image";

import yamaha from "../public/images/yamaha.jpg";

const Brands = () => {
  return (
    <div>
      <div>
        <div className="w-[100px] h-[100px]">
          <Image src={yamaha} alt="/" />
        </div>
      </div>
    </div>
  );
};

export default Brands;
