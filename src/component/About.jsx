import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function About() {
  const fullText = `> execute: survival_mode\nstatus: trying to understand the world, where it is headed`;
  const [typedText, setTypedText] = useState("");
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    let index = 0;
    const delay = 25;
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, index));
      index++;

      if (index > fullText.length) {
        clearInterval(interval);
        setIsBlinking(true);
      }
    }, delay);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="about" className="relative w-full min-h-screen px-6 py-12 md:px-20 md:py-24 bg-gradient-to-b from-black to-neutral-900 text-white flex flex-col md:flex-row items-center gap-16 overflow-hidden">
      {/* Glitch Noise Overlay */}
      <div className="pointer-events-none absolute inset-0 z-0 mix-blend-overlay bg-[url('/img/noise.gif')] opacity-10" />

      {/* Text Section */}
      <motion.div
        initial={{ opacity: 0, x: -80 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="flex-1 z-10"
      >
        <h2 className="text-3xl md:text-5xl font-bold text-yellow-400 mb-4 tracking-widest glitch-text">
          Who Am I?
        </h2>
        <p className="text-gray-300 text-md md:text-lg leading-relaxed font-light">
          I'm just an ordinary human being, looking for work, needing to eat,
          and waiting to die
        </p>
        <p className="text-gray-300 text-md md:text-lg leading-relaxed font-light">
          {`"Hiduik Baraka, Mati Baiman, Hiduik nda baraka, Mati Kanai Tangan"`}
        </p>
        {/* Typing Effect */}
        <div className="mt-6 font-mono text-green-500 text-sm md:text-base">
          <span className="whitespace-pre-wrap">
            {typedText}
            <span
              className={`inline-block w-2 h-5 ml-1 bg-green-500 ${
                isBlinking ? "animate-blink" : ""
              }`}
            />
          </span>
        </div>

        {/* <div className="mt-6">
          <a
            href="#contact"
            className="inline-block px-5 py-2 border border-yellow-400 text-yellow-400 rounded-full text-sm font-medium hover:bg-yellow-400 hover:text-black transition"
          >
            Connect the Dots
          </a>
        </div> */}
      </motion.div>

      {/* Image / Anon Visual */}
      <motion.div
        initial={{ opacity: 0, x: 80 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="flex-1 z-10 relative flex items-center justify-center"
      >
        <div className="relative w-[150px] h-[200px] md:w-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-2xl border border-neutral-800 group">
          {/* Silhouette Image */}
          <motion.img
            src="/img/my r.png"
            alt="Anon Face"
            className="w-full h-full object-cover mix-blend-screen group-hover:opacity-100 transition duration-500 ease-in-out"
          />

          {/* Glitch Lines */}
          {/* <div className="absolute top-[30%] w-full h-[2px] bg-yellow-500/20 animate-[glitchAnim_1.4s_infinite]" />
          <div className="absolute bottom-[28%] left-1/4 w-2/3 h-[1px] bg-yellow-500/10 animate-[glitchAnim_2.3s_infinite]" />
          <div className="absolute inset-0 bg-black/40" /> */}
          <div className="absolute inset-0 bg-black/20" />
        </div>
      </motion.div>
    </section>
  );
}
