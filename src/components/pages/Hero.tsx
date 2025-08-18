// 'use client';
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Download, Eye, Mail, Github, Linkedin, Twitter } from "lucide-react";
import { gsap } from "gsap";
// import { ThreeBackground } from "../ThreeBackground";
// import { StarField } from "../StarField";
import { portfolioData } from "../../data/portfolio";
import mr from "@/assets/img/mr.webp";
import Image from "next/image";

type HeroProps = {
  onReady?: () => void;
};

export const Hero = ({ onReady }: HeroProps) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
   // State untuk melacak kesiapan elemen-elemen internal
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  // const [isThreeReady, setIsThreeReady] = useState(false); // Kita asumsikan ThreeBackground akan memberi sinyal


  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate photo reveal
      gsap.fromTo(
        ".photo-reveal",
        { scale: 0.8, opacity: 0, rotation: -10 },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 1.2,
          ease: "power3.out",
          delay: 0.3,
        }
      );

      // Animate text elements
      gsap.fromTo(
        ".text-reveal",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          delay: 0.6,
        }
      );

      // Floating animation for subtle movement
      gsap.to(".float-subtle", {
        y: -15,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);
  useEffect(() => {
    // Jika gambar DAN background 3D sudah siap,
    // dan fungsi onReady ada, panggil fungsi tersebut.
    // if (isImageLoaded && isThreeReady && onReady) {
    //   // console.log("Hero is ready, telling HomePage to hide loader.");
    //   onReady();
    // }

    if (isImageLoaded && onReady) {
      // console.log("Hero is ready, telling HomePage to hide loader.");
      onReady();
    }
  }, [isImageLoaded,  onReady]);
  const scrollToWork = () => {
    const workSection = document.querySelector("#work");
    if (workSection) {
      workSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const downloadResume = () => {
    const link = document.createElement("a");
    link.href = portfolioData.personal.resumeUrl;
    link.download = "Cv_MR_en.pdf";
    link.click();
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      
      {/* <div className="absolute inset-0 bg-gradient-mesh opacity-20" /> */}
      {/* <ThreeBackground interactive={true} onReady={() => setIsThreeReady(true)}/> */}

      {/* Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Column - Text Content */}
          <motion.div 
            className="text-left space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Greeting Badge */}
            <motion.div
              className="text-reveal inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
              <span>Available for hire</span>
            </motion.div>

            {/* Main Title */}
            <div className="space-y-4">
              <h1 className="text-reveal text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="text-gradient-primary">Muhammad</span>
                <br />
                <span className="text-foreground">Rivan</span>
              </h1>
              
              <h2 className="text-reveal text-2xl md:text-3xl text-muted-foreground font-light">
                {portfolioData.personal.title}
              </h2>
            </div>

            {/* Description */}
            <p className="text-reveal text-lg text-muted-foreground max-w-lg leading-relaxed">
              {portfolioData.personal.tagline}
            </p>

            {/* Social Links */}
            <motion.div 
              className="flex gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              {[
                { icon: Github, href: portfolioData.personal.social.github },
                { icon: Linkedin, href: portfolioData.personal.social.linkedin },
                { icon: Twitter, href: portfolioData.personal.social.twitter },
                { icon: Mail, href: `mailto:${portfolioData.personal.email}` }
              ].map(({ icon: Icon, href }, index) => (
                <motion.a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg glass hover:bg-primary/20 transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 pt-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              <motion.button
                onClick={scrollToWork}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-hero group px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-2"
              >
                <Eye size={20} />
                View My Work
                <ArrowDown size={16} className="group-hover:translate-y-1 transition-transform" />
              </motion.button>

              <motion.button
                onClick={downloadResume}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group px-8 py-4 rounded-xl font-semibold border-2 border-white/20 hover:border-primary/50 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Download size={20} />
                Download Resume
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Column - Photo */}
          <motion.div 
            ref={photoRef}
            className="relative flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Background Elements */}
            <div className="absolute inset-0 bg-gradient-primary rounded-full blur-3xl opacity-20 scale-125" />
            <div className="absolute inset-0 bg-gradient-accent rounded-full blur-2xl opacity-10 scale-125" />
            
            {/* Photo Container */}
            <div className="relative float-subtle">
              {/* Gradient Border */}
              <div className="absolute inset-0 bg-gradient-primary rounded-2xl p-1">
                <div className="absolute inset-0 bg-gradient-accent rounded-2xl opacity-50" />
              </div>
              
              {/* Photo */}
              <div className="relative w-80 h-80 md:w-96 md:h-96 rounded-2xl overflow-hidden photo-reveal">
                <Image
                  src={mr}
                  alt="Muhammad Rivan"
                  className="object-cover "
                  priority
                  onLoad={() => setIsImageLoaded(true)}
                />
                
                {/* Overlay Gradient */}
                {/* <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" /> */}
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-primary rounded-full blur-xl opacity-60" />
              <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-accent rounded-full blur-lg opacity-50" />
            </div>

            {/* Experience Badge */}
            <motion.div
              className="absolute top-4 right-4 bg-glass backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
            >
              5+ Years Experience
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        // initial={{ opacity: 0 }}
        // animate={{ opacity: 1 }}
        // transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-sm text-muted-foreground">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2" />
          </div>
        </motion.div>
      </motion.div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/10 pointer-events-none" />
    </section>
  );
};
