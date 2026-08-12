"use client";
import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Header from "@/components/navigation/Header";
import NavBar from "@/components/navigation/NavBar";
import Home from "@/components/Home";
import About from "@/components/About";
import Project from "@/components/project/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import AIChat from "@/components/ai/AIChat";

export default function Main() {
  // About Section Scaling (Zoom in when entering)
  const aboutRef = useRef(null);
  const { scrollYProgress: aboutProgress } = useScroll({
    target: aboutRef,
    offset: ["start end", "end start"],
  });
  const scaleAbout = useTransform(aboutProgress, [0, 0.3], [0.95, 1]); // Scale up at 30%

  // Experience Section Scaling (Shrink when leaving)
  const experienceRef = useRef(null);
  const { scrollYProgress: experienceProgress } = useScroll({
    target: experienceRef,
    offset: ["start end", "end start"],
  });
  const scaleExperience = useTransform(experienceProgress, [0.7, 1], [1, 0.95]); // Shrink at 70%

  // NavBar animation
  const navSlideX = useTransform(aboutProgress, [0.2, 0.4], [-100, 0]);
  const navSlideY = useTransform(aboutProgress, [0.2, 0.4], [100, 0]);
  const navOpacity = useTransform(aboutProgress, [0.2, 0.4], [0, 1]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640); // Tailwind's 'sm' breakpoint
    };

    handleResize(); // Set initially
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // useEffect(() => {
  //   if (window.history.scrollRestoration) {
  //     window.history.scrollRestoration = "manual";
  //   }
  //   window.scrollTo(0, 0);
  // }, []);

  return (
    <div className="relative w-full max-w-screen text-white ">

      <div id="noise-overlay"></div>
      {/* <div className="bg-striped-lines z-[1000] fixed inset-0 opacity-5"></div> */}

      {/* NavBar */}
      <motion.div
        className="fixed sm:top-0 bottom-0 sm:left-0 z-60 flex flex-row sm:flex-col items-end justify-center w-[100%] sm:w-[10%] sm:max-w-[60px] sm:h-full"
        style={{
          x: isMobile ? 0 : navSlideX,
          y: isMobile ? navSlideY : 0,
          opacity: navOpacity,
        }}
      >
        <NavBar />
      </motion.div>

      {/* Header */}
      <Header />

      <div id="home" className="grid">
        <Home />
        <motion.div
          ref={aboutRef}
          id="about"
          style={{ scale: scaleAbout }}
          className="grid transition-transform duration-200 ease-out"
        >
          <About />
        </motion.div>
        <Project />
        <motion.div
          ref={experienceRef}
          id="experience"
          style={{ scale: scaleExperience }}
          className="grid transition-transform duration-200 ease-out"
        >
          <Experience />
        </motion.div>
        <Contact />
      </div>
      <AIChat />
    </div>
  );
}
