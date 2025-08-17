import { motion } from 'framer-motion';
import { Heart, ArrowUp } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-xl font-display font-bold">
            <span className="text-gradient-primary">
                {portfolioData.personal.name}
              </span>
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {portfolioData.personal.tagline}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">Quick Links</h4>
            <div className="space-y-2">
              {['Home', 'About', 'Work', 'Services', 'Contact'].map((item) => (
                <motion.button
                  key={item}
                  onClick={() => {
                    const element = document.querySelector(`#${item.toLowerCase()}`);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  whileHover={{ x: 5 }}
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {item}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-semibold">Get In Touch</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>{portfolioData.personal.email}</p>
              <p>{portfolioData.personal.location}</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>© {currentYear} {portfolioData.personal.name}. Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>and lots of coffee.</span>
          </div>

          {/* Back to Top */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 bg-primary/10 text-primary rounded-xl hover:bg-primary/20 transition-colors"
          >
            <ArrowUp size={16} />
          </motion.button>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2" />
    </footer>
  );
};