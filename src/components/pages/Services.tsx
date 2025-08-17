/* eslint-disable */
import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code, Box, Palette, Lightbulb, ArrowRight, Check } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { portfolioData } from '../../data/portfolio';

gsap.registerPlugin(ScrollTrigger);

const iconMap = {
  Code,
  Box,
  Palette,
  Lightbulb,
};

const ServiceCard = ({ service, index }: { service: any; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const IconComponent = iconMap[service.icon as keyof typeof iconMap];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(cardRef.current,
        { y: 100, opacity: 0, rotateX: 20 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1,
          delay: index * 0.2,
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
    }, cardRef);

    return () => ctx.revert();
  }, [index]);

  return (
    <motion.div
      ref={cardRef}
      whileHover={{ y: -10, rotateY: 5 }}
      className="card-premium group cursor-pointer"
    >
      {/* Icon */}
      <div className="relative mb-6">
        <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
          <IconComponent className="w-8 h-8 text-white" />
        </div>
        
        {/* Floating elements */}
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-accent rounded-full opacity-60 group-hover:opacity-100 transition-opacity" />
        <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-primary rounded-full opacity-40 group-hover:opacity-80 transition-opacity" />
      </div>

      {/* Content */}
      <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
        {service.title}
      </h3>
      
      <p className="text-muted-foreground mb-6 leading-relaxed">
        {service.description}
      </p>

      {/* Features */}
      <div className="space-y-3 mb-6">
        {service.features.map((feature: string, featureIndex: number) => (
          <motion.div
            key={featureIndex}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: featureIndex * 0.1 }}
            className="flex items-center gap-3"
          >
            <div className="w-5 h-5 bg-primary/20 rounded-full flex items-center justify-center">
              <Check className="w-3 h-3 text-primary" />
            </div>
            <span className="text-sm text-muted-foreground">{feature}</span>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <motion.div
        whileHover={{ x: 5 }}
        className="flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all"
      >
        <span>Learn More</span>
        <ArrowRight className="w-4 h-4" />
      </motion.div>

      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity pointer-events-none" />
    </motion.div>
  );
};

export const Services = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo('.services-header',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );

      // Background parallax
      gsap.to('.services-bg', {
        y: -100,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="services-bg absolute inset-0">
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="services-header text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium mb-4"
          >
            Services
          </motion.div>
          
          <h2 className="text-display mb-6">
            What I{' '}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Offer
            </span>
          </h2>
          
          <p className="text-body text-muted-foreground max-w-2xl mx-auto">
            Comprehensive digital solutions tailored to bring your vision to life 
            with cutting-edge technology and exceptional design.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {portfolioData.services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <div className="card-premium max-w-2xl mx-auto">
            <h3 className="text-heading mb-4">Ready to Start Your Project?</h3>
            <p className="text-muted-foreground mb-6">
              Let{"'"}s discuss how I can help bring your vision to life with exceptional 
              design and cutting-edge technology.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-hero"
              onClick={() => {
                const contactSection = document.querySelector('#contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Get In Touch
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};