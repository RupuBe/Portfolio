import { MotionConfig } from 'framer-motion';
import Nav from './components/Nav';
import Cursor from './components/Cursor';
import Hero from './sections/Hero';
import Proof from './sections/Proof';
import Experience from './sections/Experience';
import Projects from './sections/Projects';
import Profile from './sections/Profile';
import Skills from './sections/Skills';
import Education from './sections/Education';
import Faq from './sections/Faq';
import Footer from './sections/Footer';

function App() {
  return (
    // Honour the visitor's "reduce motion" setting for every animation
    <MotionConfig reducedMotion="user">
      <div className="w-full min-h-screen bg-cream">
        <a
          href="#proof"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-ink focus:text-cream focus:px-4 focus:py-2 text-xs"
        >
          Skip to content
        </a>
        <Cursor />
        <Nav />
        <main>
          <Hero />
          <Proof />
          <Experience />
          <Projects />
          <Profile />
          <Skills />
          <Education />
          <Faq />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}

export default App;
