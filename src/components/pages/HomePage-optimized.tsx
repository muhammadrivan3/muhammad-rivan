"use client";
import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navigation } from "../Navigation";
import { Footer } from "../Footer";
import { Hero } from "./Hero";
import { CustomCursor } from "../ui/CustomCursor";
import dynamic from "next/dynamic";
import { StarField } from "../StarField";

// Optimized lazy loading with loading states
const About = dynamic(() => import("./About"), { 
  ssr: false,
  loading: () => <div className="min-h-screen bg-background" />
});
const PortfolioSection = dynamic(() => import("./Portfolio"), { 
  ssr: false,
  loading: () => <div className="min-h-screen bg-background" />
});
const Services = dynamic(() => import("./Services"), {
  loading: () => <div className="min-h-screen bg-background" />
});
const Contact = dynamic(() => import("./Contact"), {
  loading: () => <div className="min-h-screen bg-background" />
});

// Performance optimization for Android
const HomePage = () => {
  const [isDark, setIsDark] = useState(false);
  const [isAppReady, setIsAppReady] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  // Detect Android and low-end devices
  useEffect(() => {
    const isAndroid = /Android/i.test(navigator.userAgent);
    const isLowEnd = navigator.hardwareConcurrency <= 4;
    const hasLowMemory = navigator.deviceMemory && navigator.deviceMemory < 4;
    
    setReduceMotion(isAndroid || isLowEnd || hasLowMemory);
    setMounted(true);
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Memoize theme toggle
  const toggleTheme = useMemo(() => () => {
    setIsDark(prev => {
      const newDark = !prev;
      if (newDark) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
      return newDark;
    });
  }, []);

  // Optimized app ready handler
  const handleAppReady = () => {
    setTimeout(() => {
      setIsAppReady(true);
    }, reduceMotion ? 0 : 1000);
  };

  // Optimized loader for Android
  const OptimizedLoader = () => (
    <motion.div
      key="loader"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-background flex items-center justify-center z-50"
    >
      <div className="text-center">
        <div className={`w-12 h-12 bg-gradient-primary rounded-xl ${!reduceMotion ? 'animate-pulse' : ''} mb-3 mx-auto`} />
        <p className="text-muted-foreground text-sm font-medium">
          Loading...
        </p>
      </div>
    </motion.div>
  );

  if (!mounted) {
    return <div className="min-h-screen w-full bg-background"></div>;
  }

  // Optimized animations for Android
  const animationVariants = {
    initial: { opacity: 0 },
    animate: { opacity: isAppReady ? 1 : 0 },
    transition: { duration: reduceMotion ? 0.1 : 0.5 }
  };

  return (
    <div className="min-h-screen bg-background text-foreground cursor-none w-full overflow-x-hidden">
      {!reduceMotion && <CustomCursor />}
      <Navigation isDark={isDark} toggleTheme={toggleTheme} />
      
      {/* Optimized loader */}
      <AnimatePresence mode="wait">
        {!isAppReady && <OptimizedLoader />}
      </AnimatePresence>

      <motion.main
        {...animationVariants}
        className="relative"
      >
        {/* Optimized StarField - only render on non-low-end devices */}
        {!reduceMotion && (
          <div className="fixed inset-0 z-0 w-full min-h-screen overflow-hidden">
            <StarField />
          </div>
        )}
        
        <Hero onReady={handleAppReady} />
        <About />
        <PortfolioSection />
        <Services />
        <Contact />
      </motion.main>

      <Footer />
    </div>
  );
};

export default HomePage;
