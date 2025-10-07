import './App.css'
import { Link as ScrollLink, Element as Section, animateScroll } from 'react-scroll'
import { useState, useEffect } from 'react'
import EmailButton from "./EmailButton";
import { easeInOut } from 'framer-motion';

function Navbar() {
  const [navOpen, setNavOpen] = useState(false);

  const closeNav = () => setNavOpen(false);

  return (
    <header>
      <button
        className="menu-toggle"
        id="menuToggle"
        onClick={() => setNavOpen(!navOpen)}
      >
        ☰
      </button>
      <nav className={`side-nav${navOpen ? ' open' : ''}`} id="sideNav">
        <ul>
          <li>
            <ScrollLink
              to="home"
              smooth="easeInOutExpo"
              duration={1000}
              className="nav-link"
              onClick={closeNav}
            >
              Home
            </ScrollLink>
          </li>
          <li>
            <ScrollLink
              to="projects"
              smooth="easeInOutExpo"
              duration={1000}
              className="nav-link"
              onClick={closeNav}
            >
              Projects
            </ScrollLink>
          </li>
          <li>
            <ScrollLink
              to="skills"
              smooth="easeInOutExpo"
              duration={1000}
              className="nav-link"
              onClick={closeNav}
            >
              Skills
            </ScrollLink>
          </li>
          <li>
            <ScrollLink
              to="about"
              smooth="easeInOutExpo"
              duration={1000}
              className="nav-link"
              onClick={closeNav}
            >
              About Me
            </ScrollLink>
          </li>
          <li className="nav-resume">
            <a 
              href="Muhammad_Anas_Khan_Resume.pdf"
              className="cta-button secondary"
              download
              target="_blank"
              rel="noopener noreferrer"
            >
              Download Resume
            </a>
          </li>
        </ul>
      </nav>
      <div
        className={`nav-overlay${navOpen ? ' show' : ''}`}
        id="navOverlay"
        onClick={closeNav}
      ></div>
    </header>
  )
}


function Hero() {
  return (
    <div className="hero">
      <img className="hero-image" src="images/mypic.png" alt="Professional headshot of M. Anas Khan" />
      <h1 className="hero-title">M. Anas Khan</h1>
      <h2 className="hero-profession">Software Engineer</h2>
      <p className="hero-tagline">
        Passionate about building innovative solutions and enhancing user experiences. 
        Aspiring developer who is always learning, building, and improving.
      </p>
      <div className="hero-cta">
        <EmailButton />   {/* 👈 replaced old button */}
        <a 
          href="Muhammad_Anas_Khan_Resume.pdf" 
          className="cta-button secondary" 
          download 
          target="_blank" 
          rel="noopener noreferrer"
        >
          Download Resume
        </a>
      </div>
    </div>
  );
}

function Projects() {
  return (
    <Section name="projects">
      <h2 className="page-name">My Projects</h2>
      <div className="project-container">
        <div className="project-item">
          <h3>Web-backend: Kiryana Store Management System</h3>
          <ul>
            <li>Backend: Built scalable Express.js backend with JWT authentication for 500+ stores.</li>
            <li>Database: Designed PostgreSQL database for centralized product cataloging and store-specific inventory.</li>
            <li>Performance: Used Redis caching and asynchronous operations to optimize API response times.</li>
          </ul>
          <a target="_blank" rel="noopener noreferrer" href="https://github.com/Anacex/Kiryana-Store-Management-System-Backend" className="project-link">View Project</a>
          <img src="images/kiryanastore.png" alt="Kiryana Store Management System Screenshot" className="project-image" />
        </div>
        <div className="project-item">
          <h3>Visual Daily Planner MVP</h3>
          <ul>
            <li>MVP for a visual daily planner app for autistic youth and young adults.</li>
            <li>Create and reorder daily routine steps with titles, emojis, and colors.</li>
            <li>Visual checklist with progress tracking; toggle completion per step.</li>
            <li>Automatic daily reset at midnight; saves completion history in Firestore.</li>
            <li>Tech: React, Redux, Firebase Auth + Firestore, Shadcn UI, Vite, React Router.</li>
            <li>Mobile-friendly, clean UI to avoid sensory overload.</li>
          </ul>
          <div className="project-links" style={{display:'flex',gap:'0.75rem',flexWrap:'wrap'}}>
            <a target="_blank" rel="noopener noreferrer" href="https://github.com/Anacex/Autism-visual-routine-planner" className="project-link">GitHub</a>
            <a target="_blank" rel="noopener noreferrer" href="https://autism-visual-routine.vercel.app/login" className="project-link">Live (Vercel)</a>
          </div>
          <img src="images/autism-tracker.png" alt="Visual Daily Planner screenshot" className="project-image" />
        </div>
        <div className="project-item">
          <h3>Deep Learning Model: Bacteria Image Classification System</h3>
          <ul>
            <li>Model: Developed EfficientNetB0 classifier using TensorFlow/Keras, achieving ~14.5% training accuracy.</li>
            <li>Preprocessing: Cleaned dataset, applied augmentation, and resized images to 224×224.</li>
            <li>Interface: Created Streamlit prototype for image upload and prediction.</li>
          </ul>
          <a target="_blank" rel="noopener noreferrer" href="https://github.com/Anacex/Bacteria-Image-Classification-Deep-Learning-Model" className="project-link">View Project</a>
          <img src="images/test.png" alt="Bacteria Image Classification Screenshot" className="project-image" />
        </div>
        <div className="project-item">
          <h3>Web-frontend: Snakey Game</h3>
          <ul>
            <li>Frontend: Built with JavaScript, HTML, and CSS for a responsive single-player game.</li>
            <li>Features: Implemented snake movement, food collection, and score tracking.</li>
            <li>Mechanics: Added collision detection for engaging gameplay.</li>
          </ul>
          <a href="https://github.com/Anacex/Snakey-JS" className="project-link" target="_blank" rel="noopener noreferrer">View Project</a>
          <video className="project-image" controls aria-label="Snakey Game gameplay">
            <source src="images/snakey.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="project-item">
          <h3>Console Game: PACMAN</h3>
          <ul>
            <li>Technologies: Developed in C++ using OOP principles for Windows console.</li>
            <li>Gameplay: Implemented arrow key controls and BFS-based ghost AI to chase Pacman.</li>
            <li>Features: Added difficulty levels, score tracking, and sound effects.</li>
          </ul>
          <a target="_blank" rel="noopener noreferrer" href="https://github.com/Anacex/OOP-Pacman-Game" className="project-link">View Project</a>
          <video className="project-image" controls aria-label="PACMAN Game gameplay">
            <source src="images/pacman.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </Section>
  )
}

function Skills() {
  const [activeBubble, setActiveBubble] = useState(null); // clicked bubble id

  // close overlay on ESC
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') setActiveBubble(null);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const bubbles = [
    { 
      id: 'lang', 
      title: 'Programming Languages', 
      size: 'large', pos: { top: '10%', left: '15%' },
      items: [
        { name: 'Python', icon: 'images/python.png' },
        { name: 'JavaScript', icon: 'images/JS.png' },
        { name: 'C/C++', icon: 'images/C.png' },
        { name: 'Assembly (x86 - Irvine32)', icon: 'images/assembly.png' }
      ]
    },
    { 
      id: 'web', 
      title: 'Web Development', 
      size: 'medium', pos: { top: '35%', left: '5%' },
      items: [
        { name: 'HTML', icon: 'images/html.png' },
        { name: 'CSS', icon: 'images/css.png' },
        { name: 'JavaScript', icon: 'images/JS.png' },
        { name: 'Tailwind CSS', icon: 'images/tailwindcss.png' },
        { name: 'JWT', icon: 'images/jwt.png' },
        { name: 'Express-JS', icon: 'images/Expressjs.png' },
        { name: 'MongoDB', icon: 'images/mongodb.png' },
        { name: 'MySQL', icon: 'images/mysql.png' },
        { name: 'PostgreSQL', icon: 'images/postgresql.png' }
      ]
    },
    { 
      id: 'ml', 
      title: 'ML & DL', 
      size: 'small', pos: { top: '60%', left: '20%' },
      items: [
        { name: 'Scikit-learn', icon: 'images/scikitlearn.png' },
        { name: 'TensorFlow', icon: 'images/TensorFlow.png' },
        { name: 'PyTorch', icon: 'images/pytorch.png' },
        { name: 'Pandas', icon: 'images/pandas.png' },
        { name: 'NumPy', icon: 'images/numpy.png' },
        { name: 'CNNs', icon: 'images/neurals.png' },
        { name: 'Supervised/Unsupervised', icon: 'images/mlconcepts.png' }
      ]
    },
    { 
      id: 'parallel', 
      title: 'Parallel & Distributed Computing', 
      size: 'medium', pos: { top: '20%', left: '70%' },
      items: [
        { name: 'OpenMP', icon: 'images/OpenMP.png' },
        { name: 'MPI', icon: 'images/MPI.jpg' }
      ]
    },
    { 
      id: 'core', 
      title: 'Core CS', 
      size: 'large', pos: { top: '65%', left: '35%' },
      items: [
        { name: 'Data Structures and Algorithms' },
        { name: 'Computer Architecture and assembly'},
        { name: 'DBMS Systems'},
        { name: 'Algorithm Design and Analysis' },
        { name: 'OOP' }
      ]
    },
    {
      id: 'tools',
      title: 'Tools & Technologies',
      size: 'small',
      pos: { top: '75%', left: '80%' },
      items: [
        { 
          name: 'GitHub version control', 
          desc: 'Collaborated on projects and tracked versions.', 
          icon: 'images/git.png' 
        },
        { 
          name: 'Development Tools', 
          desc: 'Visual Studio Code, PyCharm, Jupyter Notebook, Microsoft Visual Studio', 
          icon: 'images/ides.png' 
        }
      ]
    },
    { 
      id: 'lang-speaking', 
      title: 'Speaking Languages', 
      size: 'medium', pos: { top: '40%', left: '85%' },
      items: [
        { name: 'English (Fluent)', icon: 'images/english.png' },
        { name: 'Urdu (Native)', icon: 'images/urdu.png' },
        { name: 'German (Beginner)', icon: 'images/german.jpeg' }
      ]
    }
  ];

  const active = bubbles.find(b => b.id === activeBubble) || null;

  return (
    <Section name="skills">
      <h2 className="page-name">My Skills</h2>

      {/* 1) the scattered bubbles (hover preview works as before) */}
      <div className="skills-bubbles" aria-live="polite">
        {bubbles.map(b => (
          <div 
            key={b.id} 
            className={`skill-bubble ${b.size} ${activeBubble === b.id ? 'active' : ''}`} 
            style={{ top: b.pos.top, left: b.pos.left }}
            tabIndex={0}
            role="button"
            aria-pressed={activeBubble === b.id}
            onClick={() => setActiveBubble(prev => prev === b.id ? null : b.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setActiveBubble(prev => prev === b.id ? null : b.id);
              }
            }}
          >
            <div className="bubble-core" aria-hidden={activeBubble === b.id}>
              <div className="bubble-title">{b.title}</div>
            </div>

            {/* keep in-place detail for hover only — this will be hidden while overlay open */}
            <div className="bubble-details" aria-hidden={activeBubble === b.id}>
              <ul>
                {b.items.map((it, idx) => (
                  <li key={b.id + '-' + idx}>
                    {it.icon && <img src={it.icon} alt={it.name} className="skill-icon-small" />}
                    {it.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* 2) overlay expanded card for clicked bubble (separate DOM to avoid layout fights) */}
      {active && (
        <div className="bubble-overlay" onClick={() => setActiveBubble(null)} role="dialog" aria-modal="true">
          <div className="bubble-expanded" onClick={(e) => e.stopPropagation()}>
            <button className="bubble-close" aria-label="Close" onClick={() => setActiveBubble(null)}>✕</button>

            <div className="bubble-expanded-header">
              <h3>{active.title}</h3>
            </div>

            <ul className="bubble-expanded-list">
              {active.items.map((it, idx) => (
                <li key={active.id + '-' + idx}>
                  {it.icon && <img src={it.icon} alt={`${it.name} icon`} className="skill-icon-large" />}
                  <div>
                    <div className="skill-name">{it.name}</div>
                    {it.desc && <div className="skill-desc">{it.desc}</div>}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </Section>
  );
}



function About() {
  return (
    <Section name="about" id="about">
      <h2 className="page-name">About Me</h2>
      <div className="about-container">
        <p className="about-me-text">I am a passionate software developer with a strong foundation in computer science and a keen interest in building innovative solutions. I enjoy tackling complex problems and continuously learning new technologies to enhance my skills. In my free time, I love exploring new programming languages, contributing to open-source projects, and engaging with the tech community.</p>
        <h3 className="edu-text">Education</h3>
        <p>Bachelor of Science in Computer Science from FAST-National University of Computer & Emerging Sciences, Karachi Pakistan</p>
        <h3 className="interest-text">Interests</h3>
        <ul className="interest-list">
          <li>Machine Learning/AI</li>
          <li>Web Development</li>
          <li>Cross Platform Development</li>
          <li>Cyber Security</li>
        </ul>
      </div>
    </Section>
  )
}

function Footer() {
  return (
    <footer>
      <p>© 2025 M. Anas Khan. All rights reserved.</p>
      <p>Connect with me on:</p>
      <div className="social-links">
        <a href="https://www.linkedin.com/in/muhammad-anas-khan-k224170/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href="https://github.com/Anacex" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="mailto:anacekhanx@gmail.com">Email me</a>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <>
      <Navbar />
      <Section name="home" className="section hero-section">
        <div className="fade-in-up">
          <Hero />
        </div>
      </Section>
      <div className="fade-in-up section" style={{ animationDelay: '120ms' }}>
        <Projects />
      </div>
      <div className="fade-in-up section" style={{ animationDelay: '220ms' }}>
        <Skills />
      </div>
      <div className="fade-in-up section" style={{ animationDelay: '320ms' }}>
        <About />
      </div>
      <Footer />
    </>
  )
}
