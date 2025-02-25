import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import TechInterviewSvg from "../assets/SVG/Careers/TechInterview.svg";
import CodingChallengeSvg from "../assets/SVG/Careers/CodingChallenge.svg";
import TechnicaldebrifSvg from "../assets/SVG/Careers/Technicaldebrif.svg";
import HRInterviewSvg from "../assets/SVG/Careers/HRInterview.svg";
import WelcomeSvg from "../assets/SVG/Careers/Welcome.svg";
import { motion, useAnimation, useInView } from "motion/react";

const HiringProcess = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        duration: 0.5,
        staggerChildren: 0.2,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 100,
      },
    },
  };

  const HiringDetails = [
    {
      title: "Technical Interview",
      description:
        "Kick things off with an engaging conversation where you’ll have the chance to showcase your technical expertise. Whether you’re applying for a Backend Developer role or another position, this is your opportunity to demonstrate your problem-solving skills, knowledge, and passion for technology",
      image: TechInterviewSvg,
    },
    {
      title: "Coding Challenge",
      description:
        "Next, we’ll ask you to complete a coding task that reflects the kind of work you’ll be doing with us. This task helps us understand your approach to real-world problems, your coding style, and your technical thought process.",
      image: CodingChallengeSvg,
    },
    {
      title: "Technical Debrief",
      description:
        "Once you've submitted the coding task, we’ll review your solution together. This is a collaborative discussion where we’ll explore your approach, ask about any challenges you faced, and dive deeper into your problem-solving methodology. It’s as much an opportunity for you to learn as it is for us to understand your skillset.",
      image: TechnicaldebrifSvg,
    },
    {
      title: "HR Interview",
      description:
        "In this round, we’ll explore your background, experience, and motivations in more detail. We'll discuss how your values align with our culture and vision, and we'll also answer any questions you have about life at Starlabs Technologies. We’re not just looking for skills—we’re looking for a great fit.",
      image: HRInterviewSvg,
    },

    {
      title: "Welcome to Starlabs Technologies!",
      description:
        "If all goes well and we’re both excited about the opportunity, we’ll move forward with the next steps to welcome you aboard. We’ll finalize the details and set you up to start your journey with us—where exciting challenges, career growth, and innovation await!",
      image: WelcomeSvg,
    },
  ];
  return (
    <>
      <motion.section
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={containerVariants}
        className="relative pt-16 pb-20 mx-auto overflow-hidden text-white max-w-screen-2xl"
        id="services"
      >
        {/* Top Curved Divider */}
        <div
          className="absolute left-0 z-20 flex justify-center w-full bg-black top-6 xs:top-5 sm:top-0 h-96"
          style={{ clipPath: " ellipse(70% 44% at 50% 4%)" }}
        >
          <motion.div className="text-center" variants={titleVariants}>
            <div className="text-base tracking-wider text-white">
              <h1 className="pb-5 text-2xl text-white mt-14 sm:text-4xl">
                Ready To Make An Impact?
              </h1>
              <p className="text-sm sm:text-xl text-white/90 ">
                Our Hiring Process: Here's How to Join the Starlabs Technologies
                Team
              </p>
            </div>
          </motion.div>
        </div>

        {/* Section Content */}
        <div className="relative w-full overflow-hidden">
          {/*  */}
          <div className="-mt-48 ">
            {
              <>
                {/* Swiper Slider */}
                <Swiper
                  modules={[EffectCoverflow, Autoplay]}
                  effect="coverflow"
                  grabCursor={true}
                  centeredSlides={true}
                  slidesPerView="auto"
                  coverflowEffect={{
                    rotate: 30,
                    stretch: 0,
                    depth: 500,
                    modifier: 1.2,
                    slideShadows: true,
                  }}
                  loop={true}
                  className="w-full "
                  onSwiper={(swiper) => (swiperRef.current = swiper)}
                  speed={800} // Smooth out the slider animation
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                  }}
                  onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                >
                  {HiringDetails.map((service, index) => (
                    <SwiperSlide key={index}>
                      <motion.div
                        className={`pt-56 xl:pt-40 pb-36   w-11/12  mx-auto text-white bg-[#151515] rounded-lg overflow-hidden    ${
                          activeIndex === index
                            ? "opacity-100 blur-0"
                            : "opacity-50 blur-md"
                        } `}
                        style={{
                          transformStyle: "preserve-3d",
                          perspective: "1200px",
                          transform: `
                            perspective(1200px)
                            rotateX(${activeIndex === index ? 0 : 5}deg)
                            rotateY(${activeIndex === index ? 0 : -5}deg)
                            translateZ(${activeIndex === index ? 50 : 0}px)
                          `,
                          transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
                        }}
                        variants={containerVariants}
                      >
                        <div className="w-11/12 h-[30rem] md:h-[35rem]  pt-20 mx-auto md:w-full ">
                          {/* Title  */}

                          {/* Image and description */}
                          <div className="flex mt-20 text-white rounded-lg md:items-center xs:mt-20">
                            {/* Image */}
                            <motion.div
                              className=" md:mr-20 max-md:w-8/12"
                              variants={containerVariants}
                            >
                              <img
                                src={service.image}
                                alt={service.title}
                                className="object-cover md:w-80 lg:w-[23rem] lg:h-[24.5rem] md:h-80 -ml-6 md:-ml-2"
                              />
                            </motion.div>
                            <motion.div
                              className="flex flex-col w-8/12 pt-2 md:-mt-16 md:w-1/2 lg:-mt-28 "
                              variants={containerVariants}
                            >
                              {/* <div className="hidden text-lg tracking-wider text-gray-200 md:pb-8 md:flex md:-ml-40 md:text-sm lg:text-lg">
                                <p>
                                  Our Hiring Process: Here's How to Join the
                                  Starlabs Technologies Team
                                </p>
                              </div> */}
                              <div className="md:mt-10 ">
                                <h2 className="text-sm font-semibold tracking-tighter md:text-3xl">
                                  {index + 1}. {service.title}
                                </h2>
                                <p className="md:mt-8  text-[0.7rem] md:text-base xl:text-[1.1rem] leading-loose md:leading-relaxed  text-gray-400">
                                  {service.description}
                                </p>
                              </div>
                            </motion.div>
                          </div>
                        </div>
                      </motion.div>
                    </SwiperSlide>
                  ))}
                </Swiper>
                {/* Custom Navigation Buttons */}
                <div className="absolute flex justify-center w-full mt-4 space-x-4 bottom-24 ">
                  <button
                    className="z-40 px-4 py-2 text-base font-semibold transition-all duration-100 ease-in border rounded-full text-white/60 border-white/60 hover:border-white hover:text-white"
                    onClick={() => swiperRef.current?.slidePrev()}
                  >
                    &lt;
                  </button>
                  <button
                    className="z-40 px-4 py-2 text-base font-semibold transition-all duration-100 ease-in border rounded-full text-white/60 border-white/60 hover:border-white hover:text-white"
                    onClick={() => swiperRef.current?.slideNext()}
                  >
                    &gt;
                  </button>
                </div>
              </>
            }
          </div>
        </div>

        {/* Bottom Curved Divider */}
        <div
          className="absolute left-0 z-20 w-full bg-black bottom-6 md:bottom-0 h-80 md:h-96"
          style={{ clipPath: " ellipse(70% 44% at 50% 100%)" }}
        ></div>

        <div className="absolute bottom-0 z-30 w-full text-center ">
          <Link
            to="/careers"
            className="inline-block px-6 py-3 text-sm font-medium text-black transition-colors rounded-full md:mt-8 sm:px-8 bg-emerald-400 hover:bg-emerald-500 sm:text-base"
          >
            Explore Career
          </Link>
        </div>
      </motion.section>
    </>
  );
};

export default HiringProcess;
