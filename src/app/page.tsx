'use client';

import { Button } from "@nextui-org/react";
import { GiRabbit } from "react-icons/gi";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center mt-20 gap-6 text-secondary">
      <GiRabbit size={100} className="text-blue-700" />
      <h1 className="text-4xl font bold">Velkommen til den Blå Kanin</h1>
      <Button>
        Click me
      </Button>
    </div>
  );
}

