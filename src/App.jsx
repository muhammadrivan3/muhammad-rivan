import { useState } from 'react'
import './App.css'
import Hero from './component/Hero'
import About from './component/About'
import SkillsSection from './component/SkillsSection'
import ExperienceSection from './component/ExperienceSection'
import Contact from './component/Contact'

function App() {

  return (
    <>
      <div>
        <Hero/>
        <About/>
        <ExperienceSection/>
        <SkillsSection/>
        <Contact/>
      </div>
      
    </>
  )
}

export default App
