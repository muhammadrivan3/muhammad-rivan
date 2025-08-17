"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navigation } from "../Navigation";
import { Footer } from "../Footer";
import { Hero } from "./Hero";
import { CustomCursor } from "../ui/CustomCursor";
import dynamic from "next/dynamic";
import { StarField } from "../StarField";

// Lazy load heavy components
const About = dynamic(() => import("./About"), { ssr: false });
const PortfolioSection = dynamic(() => import("./Portfolio"));
const Services = dynamic(() => import("./Services"));
const Contact = dynamic(() => import("./Contact"));

const HomePage = () => {
  const [isDark, setIsDark] = useState(false);
  const [isAppReady, setIsAppReady] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);

    if (!isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };
  const handleAppReady = () => {
    // setIsAppReady(true);
    setTimeout(() => {
      setIsAppReady(true);
    }, 1000);
  };

  if (!mounted) {
    return <div className="min-h-screen w-full bg-background"></div>;
  }

  return (
    <div className="min-h-screen bg-background text-foreground cursor-none w-full overflow-x-hidden">
      <CustomCursor />
      <Navigation isDark={isDark} toggleTheme={toggleTheme} />
      {/* Animated Background Layers */}

      {!isAppReady && (
        <motion.div
          key="loader"
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 bg-background flex items-center justify-center z-50"
        >
          {/* Ambil JSX loading screen kamu yang sebelumnya */}
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-primary rounded-2xl animate-pulse mb-4 mx-auto" />
            <p className="text-muted-foreground mt-4 font-medium">
              Preparing Experience...
            </p>
          </div>
        </motion.div>
      )}
      <AnimatePresence mode="wait">
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: isAppReady ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="fixed inset-0 z-0 w-full min-h-screen overflow-hidden">
            <StarField />
          </div>
          <Hero onReady={handleAppReady} />
          <About />
          <PortfolioSection />
          <Services />
          {/* <Testimonials /> */}
          <Contact />
        </motion.main>
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default HomePage;
