'use client';

import { GiRabbit } from "react-icons/gi";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center mt-20 gap-6 text-secondary">
      <GiRabbit size={100} className="text-blue-700" />
      <h1 className="text-4xl font bold">Velkommen til DenBlå Angora</h1>
    </div>
  );
}

