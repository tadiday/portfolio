"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Header from "@/components/navigation/Header";
import Home from "@/components/Home";
import About from "@/components/About";
import Project from "@/components/project/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";

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

  // useEffect(() => {
  //   if (window.history.scrollRestoration) {
  //     window.history.scrollRestoration = "manual";
  //   }
  //   window.scrollTo(0, 0);
  // }, []);

  return (
    <div className="relative w-full max-w-screen text-white ">

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
    </div>
  );
}
