

export const portfolioData = {
  personal: {
    name: "Muhammad Rivan",
    title: "Creative Developer & Digital Artist",
    tagline: "Crafting exceptional digital experiences with cutting-edge technology",
    email: "muhammadrivan888@gmail.com",
    location: "Batang Biyu, Sumatera Barat",
    resumeUrl: "/Cv_MR_en.pdf",
    social: {
      github: "https://github.com/muhammadrivan3",
      linkedin: "https://linkedin.com/in/muhammad-rivan-856357279",
      twitter: "https://twitter.com/M_Rivan3",
    }
  },
  
  
  about: {
    bio: "I'm a passionate creative developer with 5+ years of experience. I specialize in combining cutting-edge technology with exceptional design to create products that not only look stunning but deliver real value to users.",
    image: "/portrait.jpg",
    skills: [
      { name: "React & Next.js", level: 95, category: "Frontend" },
      { name: "TypeScript", level: 90, category: "Frontend" },
      { name: "Three.js & WebGL", level: 85, category: "3D Graphics" },
      { name: "GSAP & Framer Motion", level: 88, category: "Animation" },
      { name: "Node.js & Python", level: 82, category: "Backend" },
      { name: "UI/UX Design", level: 90, category: "Design" },
      { name: "Figma & Adobe Creative", level: 85, category: "Design" },
      { name: "AWS & Vercel", level: 80, category: "DevOps" },
    ],
    achievements: [
      "-",
    ]
  },

  projects: [
    {
      id: 1,
      title: "Immersive AR Shopping",
      description: "Revolutionary AR e-commerce platform that allows customers to visualize products in their space before purchasing.",
      category: "Web Development",
      tags: ["React", "Three.js", "WebAR", "E-commerce"],
      image: "/project1.jpg",
      liveUrl: "https://ar-shopping.demo",
      githubUrl: "https://github.com/alexmorgan/ar-shopping",
      featured: true,
      year: "2024"
    },
    {
      id: 2,
      title: "Neural Network Visualizer",
      description: "Interactive 3D visualization tool for understanding complex neural network architectures and data flow.",
      category: "Data Visualization",
      tags: ["Python", "Three.js", "Machine Learning", "WebGL"],
      image: "/project2.jpg",
      liveUrl: "https://neural-viz.demo",
      githubUrl: "https://github.com/alexmorgan/neural-viz",
      featured: true,
      year: "2024"
    },
    {
      id: 3,
      title: "Sustainable Fashion App",
      description: "Mobile-first platform connecting eco-conscious consumers with sustainable fashion brands worldwide.",
      category: "Mobile App",
      tags: ["React Native", "Node.js", "MongoDB", "Stripe"],
      image: "/project3.jpg",
      liveUrl: "https://eco-fashion.demo",
      githubUrl: "https://github.com/alexmorgan/eco-fashion",
      featured: false,
      year: "2023"
    },
    {
      id: 4,
      title: "Creative Portfolio Site",
      description: "Award-winning portfolio website featuring advanced animations and interactive 3D elements.",
      category: "Web Development",
      tags: ["Next.js", "GSAP", "Three.js", "Tailwind"],
      image: "/project4.jpg",
      liveUrl: "https://creative-portfolio.demo",
      githubUrl: "https://github.com/alexmorgan/portfolio",
      featured: true,
      year: "2023"
    },
    {
      id: 5,
      title: "Fintech Dashboard",
      description: "Comprehensive financial dashboard with real-time data visualization and advanced analytics.",
      category: "Web Development",
      tags: ["React", "D3.js", "TypeScript", "GraphQL"],
      image: "/project5.jpg",
      liveUrl: "https://fintech-dash.demo",
      githubUrl: "https://github.com/alexmorgan/fintech-dash",
      featured: false,
      year: "2023"
    },
    {
      id: 6,
      title: "VR Art Gallery",
      description: "Virtual reality art gallery allowing artists to showcase their work in immersive 3D environments.",
      category: "VR/AR",
      tags: ["A-Frame", "WebXR", "Three.js", "Blockchain"],
      image: "/project6.jpg",
      liveUrl: "https://vr-gallery.demo",
      githubUrl: "https://github.com/alexmorgan/vr-gallery",
      featured: false,
      year: "2022"
    }
  ],

  services: [
    {
      id: 1,
      title: "Web Development",
      description: "Custom websites and web applications built with modern technologies and best practices.",
      icon: "Code",
      features: ["React/Next.js Development", "Performance Optimization", "SEO Implementation", "Responsive Design"]
    },
    {
      id: 2,
      title: "3D & Animation",
      description: "Immersive 3D experiences and smooth animations that bring your digital products to life.",
      icon: "Box",
      features: ["Three.js Integration", "WebGL Development", "GSAP Animations", "Interactive Experiences"]
    },
    {
      id: 3,
      title: "UI/UX Design",
      description: "User-centered design solutions that combine aesthetics with functionality and usability.",
      icon: "Palette",
      features: ["User Research", "Prototyping", "Design Systems", "Usability Testing"]
    },
    {
      id: 4,
      title: "Consulting",
      description: "Strategic guidance to help businesses leverage technology for growth and innovation.",
      icon: "Lightbulb",
      features: ["Technology Strategy", "Code Reviews", "Team Training", "Architecture Planning"]
    }
  ],

  testimonials: [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Head of Design at TechCorp",
      company: "TechCorp",
      content: "Alex delivered an exceptional website that exceeded all our expectations. The attention to detail and creative vision was outstanding.",
      avatar: "/testimonial1.jpg",
      rating: 5
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      role: "CEO at StartupXYZ",
      company: "StartupXYZ",
      content: "Working with Alex was a game-changer for our product. The interactive features and animations brought our vision to life perfectly.",
      avatar: "/testimonial2.jpg",
      rating: 5
    },
    {
      id: 3,
      name: "Emily Watson",
      role: "Product Manager at InnovateLab",
      company: "InnovateLab",
      content: "Alex's technical expertise and creative approach resulted in a product that our users absolutely love. Highly recommended!",
      avatar: "/testimonial3.jpg",
      rating: 5
    }
  ]
};

export const projectCategories = [
  "All",
  "Web Development",
  "Mobile App",
  "Data Visualization",
  "VR/AR"
];