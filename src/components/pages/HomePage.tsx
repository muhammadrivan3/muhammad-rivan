"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navigation } from "../Navigation";
import { Footer } from "../Footer";
import { Hero } from "./Hero";
import { CustomCursor } from "../ui/CustomCursor";
import { About } from "./About";
import { Portfolio as PortfolioSection } from '@/components/pages/Portfolio';
import { Services } from "./Services";
// import { Testimonials } from "./Testimonials";
import { Contact } from "./Contact";

const HomePage = () => {
  const [isDark, setIsDark] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }

    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
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

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 bg-gradient-primary rounded-2xl animate-pulse mb-4 mx-auto" />
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="h-1 bg-gradient-primary rounded-full"
          />
          <p className="text-muted-foreground mt-4 font-medium">
            Loading Experience...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground cursor-none">
      <CustomCursor />
      <Navigation isDark={isDark} toggleTheme={toggleTheme} />
      <AnimatePresence mode="wait">
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <Hero />
          <About/>
          <PortfolioSection />
          <Services/>
          {/* <Testimonials /> */}
          <Contact/>
        </motion.main>
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default HomePage;
