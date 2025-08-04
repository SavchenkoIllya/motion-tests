"use client";
import { Ascii } from "@/components";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const VIDEO_DURATION = 5000;

export default function Greetings({
  onAnimationEnd,
}: Readonly<{
  onAnimationEnd?: () => void;
}>) {
  const [playing, setPlaying] = useState(true);

  const handleEnded = () => {
    setPlaying(false);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setPlaying(false);
    }, VIDEO_DURATION);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <AnimatePresence>
      {playing && (
        <motion.div
          key={"video"}
          className={"h-[100vh]"}
          exit={{ opacity: 0, transition: { duration: 1 } }}
          onAnimationComplete={() => {
            onAnimationEnd?.();
          }}
        >
          <Ascii
            video={"/cat_full.mp4"}
            fps={30}
            slotProps={{
              videoProps: { onEnded: handleEnded },
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
