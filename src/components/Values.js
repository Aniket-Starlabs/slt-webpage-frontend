import { AnimatePresence, motion } from "motion/react";
import React, { useState, useEffect } from "react";
import IntegritySvg from "../assets/SVG/Values/Integrity.svg";
import InnovationSvg from "../assets/SVG/Values/Innovation.svg";
import CollaborationSvg from "../assets/SVG/Values/Collaboration.svg";
import SustainabilitySvg from "../assets/SVG/Values/Sustainability.svg";

const CustomStar = ({ filled }) => (
  <svg
    width="68"
    height="64"
    viewBox="0 0 68 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M34.1033 0L41.9613 24.1844L67.3903 24.1844L46.8178 39.1312L54.6758 63.3156L34.1033 48.3688L13.5308 63.3156L21.3888 39.1312L0.816292 24.1844L26.2453 24.1844L34.1033 0Z"
      fill={filled ? "#53C888" : "#4B5563"}
    />
  </svg>
);

const Values = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      title: "Integrity",
      description:
        "We prioritize transparency, honesty, and ethics in all our operations, building trust and long-term partnerships with our clients and stakeholders.",
      image: IntegritySvg,
    },
    {
      title: "Innovation",
      description:
        "We embrace cutting-edge technologies and creative solutions to drive progress and stay ahead of industry trends.",
      image: InnovationSvg,
    },
    {
      title: "Collaboration",
      description:
        "Teamwork is vital for our success. We emphasize open communication and synergy between teams to overcome new challenges and craft solutions aligned with our goals.",
      image: CollaborationSvg,
    },
    {
      title: "Sustainability",
      description:
        "We are dedicated to developing sustainable solutions that benefit our clients and contribute to a better digital ecosystem.",
      image: SustainabilitySvg,
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="overflow-hidden relative z-40 pb-32 -mt-10 w-full text-white bg-black">
      <div className="px-4 mx-auto">
        <h1 className="mb-12 text-5xl font-bold text-center">Our Values</h1>

        <div className="relative h-[50vh]  ">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className=""
            >
              <div className="grid gap-10 items-center h-full md:grid-cols-3">
                <div className="relative w-full md:col-span-1 md:h-full">
                  <img
                    src={slides[currentSlide].image}
                    alt={slides[currentSlide].title}
                    className="object-cover w-full h-[50vh] rounded-lg"
                  />
                </div>
                <div className="space-y-4 md:col-span-2">
                  <h2 className="text-3xl font-semibold">
                    {slides[currentSlide].title}
                  </h2>
                  <p className="text-gray-400">
                    {slides[currentSlide].description}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        {/* star buttons */}
        <div className="flex relative justify-center items-center mt-8 w-full">
          <svg
            width="100%"
            height="54"
            viewBox="0 0 2200 84"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background line */}
            <line
              x1="10"
              y1="32"
              x2="2110"
              y2="32"
              stroke="#4B5563"
              strokeWidth="2"
              className="-z-20"
            />
            {/* Animated foreground line */}
            <motion.line
              x1="10"
              y1="32"
              x2={(currentSlide / (slides.length - 1)) * 2110}
              y2="32"
              stroke="#53C888"
              strokeWidth="3"
              initial={{ x2: 0 }}
              animate={{
                x2: (currentSlide / (slides.length - 1)) * 2110,
              }}
              transition={{ duration: 0.5 }}
              className="-z-20"
            />
            {/* Stars */}
            {slides.map((_, index) => (
              <g
                key={index}
                transform={`translate(${
                  (index / (slides.length - 1)) * 2100
                }, 0)`}
              >
                {/* Static star */}
                <CustomStar filled={false} />
                {/* Animated star fill */}
                <motion.g
                  initial={false}
                  animate={{
                    clipPath: `inset(0 ${
                      currentSlide >= index ? "0%" : "100%"
                    } 0 0)`,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <CustomStar filled={true} />
                </motion.g>
              </g>
            ))}
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Values;
