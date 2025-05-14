'use client';
import { Mail, Github, Linkedin, Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const contactItems = [
  {
    icon: <Mail className="w-5 h-5 text-green-400" />,
    label: 'Email',
    value: 'muhammadrivan888@gmail.com',
    href: 'mailto:muhammadrivan888@gmail.com',
  },
  {
    icon: <Phone className="w-5 h-5 text-green-400" />,
    label: 'WhatsApp',
    value: '+62 831 8623 9530',
    href: 'https://wa.me/6283186239530',
  },
  {
    icon: <Linkedin className="w-5 h-5 text-green-400" />,
    label: 'LinkedIn',
    value: 'linkedin.com/in/muhammad-rivan-856357279',
    href: 'https://www.linkedin.com/in/muhammad-rivan-856357279/',
  },
  {
    icon: <Github className="w-5 h-5 text-green-400" />,
    label: 'GitHub',
    value: 'github.com/muhammadrivan3',
    href: 'https://github.com/muhammadrivan3',
  },
  {
    icon: <MapPin className="w-5 h-5 text-green-400" />,
    label: 'Location',
    value: 'Padang, Indonesia',
    href: '',
  },
];

export default function Contact() {
  return (
    <section id="contact" className="relative min-h-screen w-full px-6 py-12 md:px-20 md:py-24 bg-black text-green-500 font-mono overflow-hidden">
      {/* Scanline & ASCII Background */}
      <div className="pointer-events-none absolute inset-0 z-0 mix-blend-overlay bg-[url('/img/scanline.png')] opacity-[0.03]" />
      <div className="pointer-events-none absolute inset-0 z-0 mix-blend-overlay bg-[url('/img/ascii.png')] opacity-[0.015]" />

      {/* Contact Card */}
      <div className="relative z-10 max-w-3xl mx-auto bg-black/80 border border-green-500 rounded-lg shadow-lg p-8">
        <h2 className="text-green-400 text-2xl mb-6 font-bold tracking-widest">CONTACT</h2>

        <motion.ul
          className="space-y-4"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
        >
          {contactItems.map((item, idx) => (
            <motion.li
              key={idx}
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0 },
              }}
              className="flex items-center space-x-4 p-3 hover:bg-green-500/10 rounded transition duration-300 group"
            >
              {item.icon}
              <div className="flex flex-col">
                <span className="text-green-300 text-sm">{item.label}</span>
                {item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-400 group-hover:underline group-hover:text-green-300 text-sm"
                  >
                    {item.value}
                  </a>
                ) : (
                  <span className="text-green-400 text-sm">{item.value}</span>
                )}
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
