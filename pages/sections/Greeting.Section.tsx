"use client";
import { Footer } from "@/components";
import Greetings from "@/pages/components/Greetings";
import Hero from "@/pages/components/Hero";
import Lenis from "lenis";
import { useEffect, useState } from "react";

export default function GreetingSection() {
  const [enterEnd, setEnterEnd] = useState(false);

  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  return (
    <div>
      <Greetings
        onAnimationEnd={() => {
          setEnterEnd(true);
        }}
      />

      {enterEnd && <Hero />}
      <Footer />
    </div>
  );
}
