"use client";
import { Ascii, cn, Typography } from "@/components";
import { useNavigatorInfo } from "@/hooks";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef, useState } from "react";

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);

  const [textEnd, setTextEnd] = useState(false);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end end"],
  });
  const info = useNavigatorInfo();
  const scaleY = useTransform(scrollYProgress, [0.25, 0.4], [0.08, 3]);

  const textSectionWidth = useTransform(
    scrollYProgress,
    [0.4, 0.5],
    ["100%", "0%"],
  );
  const textSectionOpacity = useTransform(scrollYProgress, [0.4, 0.45], [1, 0]);
  const filterValue = useTransform(scrollYProgress, [0.4, 0.5], [0, 1]);

  const testSectionWidth = useTransform(
    scrollYProgress,
    [0.45, 0.5],
    ["0%", "100%"],
  );
  const testSectionOpacity = useTransform(scrollYProgress, [0.45, 0.5], [0, 1]);

  const filter = useTransform(filterValue, (v) => {
    return `grayscale(${100 - v * 100}%)`;
  });

  const [isAnimating, setIsAnimating] = useState(true);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest >= 0.25) {
      setIsAnimating(false);
    } else {
      setIsAnimating(true);
    }
  });

  return (
    <div
      className={"relative container mx-auto h-[400dvh] m-8 flex gap-8"}
      ref={container}
    >
      <motion.div
        style={{ width: textSectionWidth, opacity: textSectionOpacity }}
      >
        <div>
          <Typography variant={"h1"}>Hello Visitor</Typography>

          <Typography variant={"h3"}>Analysing user data:</Typography>

          <Typography
            scrambleProps={{ onAnimationEnd: () => setTextEnd(true) }}
          >
            {Object.entries(info).map(([key, value]) => `${key}: ${value}`)}
          </Typography>
        </div>

        <div className={"relative mt-16 h-[50vh]"}>
          <motion.div className={"sticky top-8"}>
            <motion.div
              className={cn(isAnimating && "animate-blink")}
              style={{ scaleY }}
            >
              <Typography variant={"h3"}>Keep on rolling baby:</Typography>
            </motion.div>
            <div className={"mt-10"}>
              <Typography scrambleProps={{ speed: 5 }}>
                is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard.
              </Typography>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <div className={"h-[200vh]"}>
        <motion.div
          className={"sticky top-8 flex justify-center mt-8"}
          style={{
            filter,
          }}
        >
          <Ascii
            video={"/eye.mp4"}
            fps={15}
            width={200}
            height={200}
            slotProps={{
              videoProps: { loop: true },
            }}
          />
        </motion.div>
      </div>

      <motion.div className={"h-[200vh]"} style={{ width: testSectionWidth }}>
        <motion.div
          className={"sticky top-8"}
          style={{ opacity: testSectionOpacity }}
        >
          <motion.div>
            <Typography variant={"h3"}>Keep on rolling baby:</Typography>
          </motion.div>
          <Typography scrambleProps={{ speed: 5 }}>
            is simply dummy text of the printing and typesetting industry. Lorem
            Ipsum has been the industry's standard.
          </Typography>
        </motion.div>
      </motion.div>
    </div>
  );
}
