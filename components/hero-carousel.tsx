"use client";

import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

export type Slide = {
  src: string;
  alt: string;
  caption?: string;
  badge?: string;
};

interface HeroCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  slides: Slide[];
  heightClass?: string; // e.g. "h-[60vh] min-h-[360px] max-h-[680px]"
  autoplayMs?: number; // default 4500
}

export function HeroCarousel({
  slides,
  className,
  heightClass = "h-[52vh] min-h-[320px] max-h-[560px]",
  autoplayMs = 4500,
  ...props
}: HeroCarouselProps) {
  const pluginRef = React.useRef(
    Autoplay({
      delay: autoplayMs,
      stopOnMouseEnter: true,
      stopOnInteraction: false,
    })
  );

  const [index, setIndex] = React.useState(0);
  const [isHover, setIsHover] = React.useState(false);

  const onEmblaInit = React.useCallback((emblaApi: any) => {
    const onSelect = () => setIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
  }, []);

  return (
    <div
      className={cn("relative w-full overflow-hidden", className)}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      {...props}
    >
      {/* Top progress bar */}
      <div className="absolute left-0 right-0 top-0 z-30 h-1 bg-black/10 dark:bg-white/10">
        <motion.div
          key={`${index}-${isHover}`}
          initial={{ width: 0 }}
          animate={{ width: isHover ? 0 : "100%" }}
          transition={{
            duration: isHover ? 0 : autoplayMs / 1000,
            ease: "linear",
          }}
          className="h-full bg-white/70 dark:bg-white/80 backdrop-blur-[1px]"
        />
      </div>

      <Carousel
        plugins={[pluginRef.current]}
        opts={{ loop: true, align: "start", duration: 24 }}
        setApi={(api) => {
          if (!api) return;
          const update = () => setIndex(api.selectedScrollSnap());
          api.on("select", update);
          update();
        }}
      >
        <CarouselContent
          className={cn("relative rounded-xl overflow-hidden", heightClass)}
        >
          {slides.map((s, i) => (
            <CarouselItem key={i} className="h-full">
              <div className="relative h-full w-full">
                {/* Ken Burns / Parallax wrapper */}
                <motion.div
                  className="absolute inset-0 will-change-transform"
                  initial={{ scale: 1.05 }}
                  animate={{ scale: 1.0, x: 0 }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Image
                    src={s.src}
                    alt={s.alt}
                    fill
                    priority={i === 1}
                    // sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1200px"
                    className="object-cover w-full"
                  />
                </motion.div>

                {/* Vignette + gradient overlays */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="pointer-events-none absolute inset-0 [box-shadow:inset_0_0_180px_rgba(0,0,0,0.35)]" />

                {/* Caption */}
                <AnimatePresence mode="popLayout">
                  {s.caption && index === i && (
                    <motion.div
                      key={`cap-${i}`}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 16 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 max-w-[92%] sm:max-w-[70%]"
                    >
                      <span className="inline-flex items-center gap-2 rounded-full bg-white/15 dark:bg-black/25 backdrop-blur-md px-4 py-2 text-sm sm:text-base font-medium text-white shadow-lg ring-1 ring-white/30">
                        {s.caption}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Prev/Next */}
        <CarouselPrevious
          className={cn(
            "left-3 sm:left-4 h-11 w-11 sm:h-12 sm:w-12 rounded-full z-30",
            "bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/50",
            "border border-border/60 shadow hover:shadow-md focus-visible:ring-2 focus-visible:ring-white/80"
          )}
          aria-label="Previous slide"
        />
        <CarouselNext
          className={cn(
            "right-3 sm:right-4 h-11 w-11 sm:h-12 sm:w-12 rounded-full z-30",
            "bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/50",
            "border border-border/60 shadow hover:shadow-md focus-visible:ring-2 focus-visible:ring-white/80"
          )}
          aria-label="Next slide"
        />
      </Carousel>

      {/* Dot indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            className={cn(
              "h-2.5 w-2.5 rounded-full transition-all",
              i === index ? "w-6 bg-white/90" : "bg-white/50 hover:bg-white/80"
            )}
            // embla dots can be wired if you expose API
          />
        ))}
      </div>

      {/* Slide counter chip */}
      <div className="absolute right-3 bottom-3 sm:right-4 sm:bottom-4 z-30">
        <div className="select-none rounded-full bg-black/35 text-white text-xs px-2.5 py-1.5 backdrop-blur ring-1 ring-white/25">
          {index + 1} / {slides.length}
        </div>
      </div>

      {/* Soft decorative glow */}
      <div className="pointer-events-none absolute -inset-x-10 -bottom-24 h-48 blur-3xl opacity-30 bg-gradient-to-r from-purple-500/40 via-pink-500/40 to-amber-500/40" />
    </div>
  );
}
