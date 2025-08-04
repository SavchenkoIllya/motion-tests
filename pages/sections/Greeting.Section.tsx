"use client";
import Greetings from "@/pages/components/Greetings";
import Hero from "@/pages/components/Hero";
import { useState } from "react";

export default function GreetingSection() {
  const [enterEnd, setEnterEnd] = useState(false);

  return (
    <div>
      <Greetings
        onAnimationEnd={() => {
          setEnterEnd(true);
        }}
      />

      {enterEnd && <Hero />}
    </div>
  );
}
