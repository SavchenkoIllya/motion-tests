import { cn } from "@/components/utils";
import { ComponentProps, FC, useEffect, useRef, useState } from "react";

interface AsciiProps {
  video: string;
  fps?: number;
  charWidth?: number;
  charHeight?: number;
  width?: number;
  height?: number;
  slotProps?: {
    videoProps?: ComponentProps<"video">;
    wrapperProps?: ComponentProps<"div">;
  };
}

export const Ascii: FC<AsciiProps> = ({
  video,
  fps = 15,
  charWidth = 8,
  charHeight = 8,
  width,
  height,
  slotProps,
}) => {
  const { className: wrapperClassName, ...wrapperProps } =
    slotProps?.wrapperProps ?? {};
  const videoRef = useRef<HTMLVideoElement>(null);
  const bufferRef = useRef<HTMLCanvasElement>(null);
  const outputRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [cols, setCols] = useState(0);
  const [rows, setRows] = useState(0);
  const [size, setSize] = useState({ w: 0, h: 0 });

  const chars = "_.,-+=:;cba!?01234567".split("");
  const charLen = chars.length;

  useEffect(() => {
    const recalc = () => {
      // Используем заданные размеры или размер контейнера/окна
      const w =
        width ||
        (containerRef.current
          ? containerRef.current.clientWidth
          : window.innerWidth);
      const h =
        height ||
        (containerRef.current
          ? containerRef.current.clientHeight
          : window.innerHeight);

      setSize({ w, h });
      setCols(Math.floor(w / charWidth));
      setRows(Math.floor(h / charHeight));
    };

    // Слушаем изменение размера окна только если не заданы явные размеры
    if (!width || !height) {
      window.addEventListener("resize", recalc);
    }

    recalc();

    return () => {
      if (!width || !height) {
        window.removeEventListener("resize", recalc);
      }
    };
  }, [charWidth, charHeight, width, height]);

  useEffect(() => {
    if (!cols || !rows) return;
    const vid = videoRef.current!;
    const buf = bufferRef.current!;
    const out = outputRef.current!;
    buf.width = cols;
    buf.height = rows;
    out.width = size.w;
    out.height = size.h;

    const bctx = buf.getContext("2d", { willReadFrequently: true })!;
    const octx = out.getContext("2d", { willReadFrequently: true })!;
    octx.font = `${charHeight}px monospace`;
    octx.textBaseline = "top";

    let last = 0;
    const interval = 1000 / fps;

    function draw(now: number) {
      requestAnimationFrame(draw);
      if (now - last < interval) return;
      last = now;

      bctx.drawImage(vid, 0, 0, cols, rows);
      const img = bctx.getImageData(0, 0, cols, rows).data;

      octx.fillStyle = "black";
      octx.fillRect(0, 0, size.w, size.h);

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const i = (y * cols + x) * 4;
          const r = img[i],
            g = img[i + 1],
            b = img[i + 2];
          const avg = (r + g + b) / 3;
          const idx = Math.floor((avg / 255) * (charLen - 1));
          const ch = chars[idx];
          octx.fillStyle = `rgb(${r},${g},${b})`;
          octx.fillText(ch, x * charWidth, y * charHeight);
        }
      }
    }

    requestAnimationFrame(draw);
  }, [cols, rows, size, video, fps, charWidth, charHeight]);

  useEffect(() => {
    const vid = videoRef.current;
    const playHandler = () => {
      if (vid) {
        vid.play().catch(() => {});
        document.removeEventListener("click", playHandler);
        document.removeEventListener("touchstart", playHandler);
      }
    };
    document.addEventListener("click", playHandler);
    document.addEventListener("touchstart", playHandler);
    return () => {
      document.removeEventListener("click", playHandler);
      document.removeEventListener("touchstart", playHandler);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn("overflow-hidden", wrapperClassName)}
      style={{
        width: width ? `${width}px` : "100%",
        height: height ? `${height}px` : "100%",
      }}
      {...wrapperProps}
    >
      <video
        ref={videoRef}
        className="size-0"
        muted
        autoPlay
        playsInline
        crossOrigin="anonymous"
        {...slotProps?.videoProps}
      >
        <source src={video} type={"video/mp4"} />
      </video>
      <canvas ref={outputRef} className="block w-full h-full" />
      <canvas ref={bufferRef} className="hidden" />
    </div>
  );
};
