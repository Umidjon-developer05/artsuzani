import Link from "next/link";
import React from "react";

const Whatsapp = () => {
  return (
    <div className="fixed bottom-4 right-4 cursor-pointer">
      <Link
        href={
          "https://api.whatsapp.com/send/?phone=998917767714&text&type=phone_number&app_absent=0"
        }
        target="_blank"
      >
        <img className="w-10 h-10 mb-2" src="/whatsapp.png" alt="Payme" />
      </Link>
    </div>
  );
};

export default Whatsapp;
