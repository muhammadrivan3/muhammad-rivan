import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [open, setOpen] = useState(false);
  const nav = ["Home", "About", "Skill", "Contact"];
  const parentVariantsLogos = {
    initial: { scale: 1, rotate: 0 },
    hover: { scale: 1.05, rotate: -1 },
  };

  const childVariantsLogos = {
    initial: { y: 0, color: "#facc15" }, // Tailwind yellow-400
    hover: { y: -4, color: "#fde68a", marginRight: "2px", marginLeft: "2px" }, // Tailwind yellow-300
  };
  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md shadow-[0_2px_10px_rgba(255,255,255,0.05)] border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* LOGO */}
        <motion.div
          variants={parentVariantsLogos}
          initial="initial"
          whileHover="hover"
          className="text-2xl font-bold tracking-widest text-yellow-400 select-none"
        >
          <motion.span variants={childVariantsLogos}>M</motion.span>|
          <motion.span variants={childVariantsLogos}>R</motion.span>
        </motion.div>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center space-x-10">
          {nav.map((item, i) => (
            <motion.a
              key={i}
              href={`#${item.toLowerCase()}`}
              whileHover={{ scale: 1.06 }}
              className="text-white/90 text-sm uppercase tracking-[0.15em] hover:text-yellow-400 transition-all duration-300"
            >
              {item}
            </motion.a>
          ))}

          {/* CTA Button */}
          <motion.a
            href="https://wa.me/6283186239530"
            target="_blank"
            whileHover={{ scale: 1.05 }}
            className="ml-4 bg-yellow-400 text-black font-medium px-4 py-2 rounded-full text-sm shadow-md hover:bg-yellow-300 transition-all"
          >
            Hire Me
          </motion.a>
        </nav>

        {/* MOBILE MENU ICON */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-white">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE NAV */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden px-6 pt-2 pb-4 bg-black/90 border-t border-white/10 space-y-3"
          >
            {nav.map((item, i) => (
              <a
                key={i}
                href={`#${item.toLowerCase()}`}
                onClick={() => setOpen(false)}
                className="block text-white/90 hover:text-yellow-400 text-base tracking-wide transition-colors"
              >
                {item}
              </a>
            ))}

            <a
              href="#book"
              onClick={() => setOpen(false)}
              className="block bg-yellow-400 text-black font-medium text-center px-4 py-2 rounded-full text-sm shadow hover:bg-yellow-300 transition-all"
            >
              Book Now
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
