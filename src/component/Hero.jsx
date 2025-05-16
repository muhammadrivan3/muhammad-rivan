import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronsDown } from "lucide-react";

export default function Hero() {
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX - innerWidth / 2) / 40;
    const y = (e.clientY - innerHeight / 2) / 40;
    setParallax({ x, y });
  };

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      className="relative w-full h-[100vh] flex items-center justify-center bg-gradient-to-br from-black via-neutral-900 to-black overflow-hidden"
    >
      {/* Background Glow */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full bg-yellow-400 blur-3xl opacity-10"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 10 }}
      />

      {/* Parallax Layer */}
      <motion.div
        style={{
          x: parallax.x,
          y: parallax.y,
        }}
        className="absolute w-full h-full flex items-center justify-center pointer-events-none"
      >
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="text-5xl md:text-7xl font-bold text-yellow-400 drop-shadow-lg tracking-widest pointer-events-none text-center"
        >
          <span className="text-white">MUHAMMAD RIVAN</span>
        </motion.h1>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="absolute bottom-16 text-center flex flex-col items-center"
      >
        <motion.span
          className="text-white text-sm md:text-md font-semibold mb-2"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          Scroll For Explore
        </motion.span>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
          whileHover={{ scale: 1.2 }}
          className="cursor-pointer p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm"
        >
          <ChevronsDown width={28} height={28} color="white" />
        </motion.div>

        
      </motion.div>
    </section>
  );
}
