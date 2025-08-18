import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { Testimonials3D } from '../Testimonials3D';
import { portfolioData } from '../../data/portfolio';


export const Testimonials = () => {
  
  return (
    <section id="testimonials" className="py-24 bg-muted/20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="testimonials-header text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4"
          >
            <Quote className="w-4 h-4" />
            Testimonials
          </motion.div>
          
          <h2 className="text-display mb-6">
            What Clients{' '}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Say
            </span>
          </h2>
          
          <p className="text-body text-muted-foreground max-w-2xl mx-auto">
            Don{"'"}t just take my word for it. Here{"'"}s what clients and collaborators 
            have to say about working with me.
          </p>
        </div>

        {/* 3D Testimonials */}
        <div className="bg-card/30 backdrop-blur-sm rounded-2xl border border-border overflow-hidden">
          <Testimonials3D testimonials={portfolioData.testimonials} />
        </div>
      </div>
    </section>
  );
};