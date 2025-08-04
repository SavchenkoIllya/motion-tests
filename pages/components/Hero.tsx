"use client";
import { Ascii, Button, Typography } from "@/components";
import { useNavigatorInfo } from "@/hooks";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef, useState } from "react";

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const [textEnd, setTextEnd] = useState(false);
  const { scrollYProgress, scrollY } = useScroll({
    container,
  });
  const info = useNavigatorInfo();
  const x = useTransform(scrollYProgress, [0, 1], [0, 500]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    console.log("Page scroll: ", latest);
  });

  return (
    <div>
      <AnimatePresence>
        <div
          key={"ekosdf"}
          className={
            "relative container mx-auto min-h-[100dvh] m-8 flex flex-col justify-center items-center"
          }
        >
          <div className={"max-w-80"}>
            <Typography variant={"h1"}>Hello Visitor</Typography>

            <Typography variant={"h3"}>Analysing user data:</Typography>

            <Typography
              variant={"body1"}
              scrambleProps={{ onAnimationEnd: () => setTextEnd(true) }}
            >
              {Object.entries(info).map(([key, value]) => `${key}: ${value}`)}
            </Typography>

            <div className={"h-[300vh]"} ref={container}>
              {/*{textEnd && (*/}
              <motion.div
                className={"sticky top-8 flex justify-center mt-8"}
                style={{ x }}
              >
                <Ascii
                  video={"/eye.mp4"}
                  fps={15}
                  width={200}
                  height={200}
                  slotProps={{
                    wrapperProps: {
                      className: "grayscale-100",
                    },
                    videoProps: { loop: true },
                  }}
                />
              </motion.div>
              {/*)}*/}
            </div>
          </div>
        </div>
        <footer className={"fixed bottom-0 left-0"}>
          <div className={"flex flex-col"}>
            <Button
              label={"Click Me"}
              onClick={() => {
                console.log(info);
              }}
            />
            <Button
              label={"Click Me"}
              onClick={() => {
                console.log("clicked");
              }}
            />
          </div>
        </footer>
      </AnimatePresence>
    </div>
  );
}
