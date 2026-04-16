import './App.css'
import { Link as ScrollLink, Element as Section } from 'react-scroll'
import { useMemo, useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import EmailButton from './EmailButton'
import WaterBackground from './components/WaterBackground'
import FloatingBubbles from './components/FloatingBubbles'
import ContactForm from './components/ContactForm'
import {
  Store,
  CalendarDays,
  Microscope,
  Gamepad2,
  Ghost,
  Smartphone,
  Cable,
  LayoutDashboard,
  Briefcase,
  Code2,
  Terminal,
  Braces,
  Cpu,
  Binary,
  Globe,
  FileCode,
  Paintbrush,
  Wind,
  KeyRound,
  Server,
  Database,
  Brain,
  Network,
  LineChart,
  BarChart2,
  Grid3x3,
  GitBranch,
  Wrench,
  BookOpen,
  Sigma,
  Layers,
  Languages,
  MessageCircle,
  BookText,
  Workflow,
  Share2,
  ExternalLink,
  Cloud,
} from 'lucide-react'

// eslint (no-unused-vars) doesn't always count JSXMemberExpression usage (e.g. <motion.button />)
// This keeps the import “used” without affecting runtime.
const _motion = motion

const sectionMotion = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
}

const HERO_PHOTO_SRC = `${import.meta.env.BASE_URL}images/cropped.jpg`

function Navbar() {
  const [navOpen, setNavOpen] = useState(false)
  const closeNav = () => setNavOpen(false)

  return (
    <header>
      <button
        type="button"
        className="menu-toggle"
        id="menuToggle"
        onClick={() => setNavOpen(!navOpen)}
        aria-expanded={navOpen}
        aria-controls="sideNav"
        aria-label="Open menu"
      >
        {'\u2630'}
      </button>
      <nav className={`side-nav${navOpen ? ' open' : ''}`} id="sideNav">
        <ul>
          <li>
            <ScrollLink
              to="home"
              smooth="easeInOutCubic"
              duration={700}
              className="nav-link"
              onClick={closeNav}
            >
              Home
            </ScrollLink>
          </li>
          <li>
            <ScrollLink
              to="projects"
              smooth="easeInOutCubic"
              duration={700}
              className="nav-link"
              onClick={closeNav}
            >
              Projects
            </ScrollLink>
          </li>
          <li>
            <ScrollLink
              to="experience"
              smooth="easeInOutCubic"
              duration={700}
              className="nav-link"
              onClick={closeNav}
            >
              Experience
            </ScrollLink>
          </li>
          <li>
            <ScrollLink
              to="skills"
              smooth="easeInOutCubic"
              duration={700}
              className="nav-link"
              onClick={closeNav}
            >
              Skills
            </ScrollLink>
          </li>
          <li>
            <ScrollLink
              to="about"
              smooth="easeInOutCubic"
              duration={700}
              className="nav-link"
              onClick={closeNav}
            >
              About Me
            </ScrollLink>
          </li>
          <li>
            <ScrollLink
              to="contact"
              smooth="easeInOutCubic"
              duration={700}
              className="nav-link"
              onClick={closeNav}
            >
              Contact
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
        onKeyDown={(e) => e.key === 'Escape' && closeNav()}
        role="presentation"
      />
    </header>
  )
}

function Hero() {
  return (
    <div className="hero">
      <div className="hero-inner">
        <div className="hero-avatar-wrap" aria-hidden="true">
          <svg
            className="aquatic-vine"
            viewBox="0 0 360 360"
            fill="none"
            role="presentation"
            focusable="false"
          >
            <defs>
              <filter id="vineGlow" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="2.2" result="blur" />
                <feColorMatrix
                  in="blur"
                  type="matrix"
                  values="
                    0 0 0 0 0.13
                    0 0 0 0 0.93
                    0 0 0 0 0.86
                    0 0 0 0.9 0"
                  result="glow"
                />
                <feMerge>
                  <feMergeNode in="glow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <linearGradient id="vineStroke" x1="40" y1="40" x2="320" y2="320" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="rgba(34,211,238,0.95)" />
                <stop offset="0.55" stopColor="rgba(56,189,248,0.8)" />
                <stop offset="1" stopColor="rgba(168,85,247,0.65)" />
              </linearGradient>

              {/* Mask out the portrait area so the spiral looks like it goes behind the image */}
              <mask id="portraitHole">
                <rect x="0" y="0" width="360" height="360" fill="white" />
                <circle cx="180" cy="180" r="108" fill="black" />
              </mask>
            </defs>

            <g mask="url(#portraitHole)">
              {/* inner spiral vine (multiple wraps) */}
              <path
                d="M 312 180
                   C 312 110, 256 54, 186 54
                   C 108 54, 48 116, 48 194
                   C 48 276, 116 320, 192 320
                   C 266 320, 300 262, 300 200
                   C 300 132, 244 92, 184 92
                   C 126 92, 88 136, 88 190
                   C 88 244, 130 278, 188 278
                   C 236 278, 262 244, 262 206
                   C 262 164, 228 136, 188 136
                   C 150 136, 126 166, 126 198
                   C 126 234, 152 250, 182 250
                   C 214 250, 232 228, 232 204
                   C 232 174, 210 162, 188 162"
                stroke="rgba(34, 211, 238, 0.9)"
                strokeWidth="3.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#vineGlow)"
              />

              {/* sketchy offset spiral to feel hand-drawn */}
              <path
                d="M 308 182
                   C 308 112, 252 60, 184 60
                   C 114 60, 54 122, 54 194
                   C 54 270, 116 314, 192 314
                   C 258 314, 294 262, 294 206
                   C 294 140, 242 98, 186 98
                   C 132 98, 94 138, 94 190
                   C 94 238, 132 272, 186 272
                   C 230 272, 256 244, 256 212
                   C 256 170, 224 142, 188 142"
                stroke="rgba(255,255,255,0.22)"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.95"
              />

              {/* little aquatic fronds anchored to spiral */}
              <path
                d="M 250 96 C 266 92, 284 82, 296 70 C 282 78, 262 86, 244 92"
                stroke="rgba(34,211,238,0.7)"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M 78 236 C 62 242, 50 252, 42 266 C 58 262, 74 252, 88 242"
                stroke="rgba(168,85,247,0.6)"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M 238 292 C 254 298, 270 310, 282 324 C 264 320, 246 308, 232 296"
                stroke="rgba(34,211,238,0.55)"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>

          <motion.div
            className="hero-avatar"
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              className="hero-avatar-photo"
              src={HERO_PHOTO_SRC}
              alt="Portrait of M. Anas Khan"
              width={220}
              height={220}
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
          </motion.div>
        </div>

        <div className="hero-content">
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.5 }}
          >
            M. Anas Khan
          </motion.h1>
          <motion.h2
            className="hero-profession"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16, duration: 0.5 }}
          >
            Software Engineer
          </motion.h2>
          <motion.p
            className="hero-tagline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.24, duration: 0.5 }}
          >
            Passionate about building innovative solutions and enhancing user experiences. Aspiring developer who is
            always learning, building, and improving.
          </motion.p>
          <motion.div
            className="hero-cta"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.32, duration: 0.45 }}
          >
            <EmailButton />
            <a
              href="Muhammad_Anas_Khan_Resume.pdf"
              className="cta-button secondary"
              download
              target="_blank"
              rel="noopener noreferrer"
            >
              Download Resume
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

const projects = [
  {
    title: 'FYP: Offline Payment System (Offlink)',
    Icon: Smartphone,
    accent: 'violet',
    points: [
      'Android app (Kotlin, Jetpack Compose) for offline peer-to-peer payments via QR-based exchange.',
      'FastAPI backend: offline transaction recording, deferred sync, basic double-spending checks.',
      'Security: asymmetric crypto, nonces, local secure storage; Android Keystore integration planned.',
      'Stack: Room (SQLite), PostgreSQL, REST, cryptography, QR — cloud deployment in scope.',
    ],
    href: 'https://github.com/Anacex/Offlink-Android-App',
    linkLabel: 'View on GitHub',
    badge: 'Ongoing 2025–2026',
  },
  {
    title: 'gRPC Log Collector & distributed tracing',
    Icon: Cable,
    accent: 'sky',
    proprietary: true,
    points: [
      'Production-style log collection in Go with gRPC (unary + client-streaming), worker pool, panic isolation, bounded queue.',
      'OpenTelemetry SDK with OTLP/gRPC export to Jaeger; nested traces across a 4-service chain with span attributes and errors.',
      'Docker Compose deploy, per-service Prometheus metrics, Slack webhooks for errors and queue saturation.',
      'Stack: Go, gRPC, Protobuf, OpenTelemetry, Jaeger, Docker, Prometheus.',
    ],
    badge: 'QBS Co. · 2026',
  },
  {
    title: 'Centralized monitoring & log aggregation',
    Icon: LayoutDashboard,
    accent: 'cyan',
    proprietary: true,
    points: [
      'On-prem logging and monitoring on Kubernetes (MicroK8s) with Grafana, Loki, and Fluent Bit.',
      'Deployed Grafana & Loki on K8s, exposed Loki via NodePort, ingested logs from remote Linux servers.',
      'Grafana dashboards and LogQL for troubleshooting and operational visibility.',
    ],
    badge: 'QBS Co. · 2026',
  },
  {
    title: 'Multi-store inventory backend (Kiryana)',
    Icon: Store,
    accent: 'sky',
    points: [
      'Scalable REST backend for 500–1,000+ stores with strict per-store data isolation.',
      'JWT auth and RBAC via middleware; protection against unauthorized cross-store access.',
      'PostgreSQL schema with event-driven async audit logging; Redis for fast reads.',
      'Hardening: rate limiting, bcrypt, negative-stock prevention, SQL-injection-safe queries.',
    ],
    href: 'https://github.com/Anacex/Kiryana-Store-Management-System-Backend',
    linkLabel: 'View on GitHub',
    badge: '2025',
  },
  {
    title: 'Visual Daily Planner MVP',
    Icon: CalendarDays,
    accent: 'violet',
    points: [
      'Routine steps with titles, emojis, and colors for neurodivergent-friendly UX.',
      'Firestore history; midnight reset; mobile-friendly, low-overload UI.',
      'React, Redux, Firebase Auth + Firestore, Shadcn UI, Vite, React Router.',
    ],
    links: [
      { href: 'https://github.com/Anacex/Autism-visual-routine-planner', label: 'GitHub' },
      { href: 'https://autism-visual-routine.vercel.app/login', label: 'Live demo' },
    ],
  },
  {
    title: 'Deep learning: bacterial colony classification',
    Icon: Microscope,
    accent: 'cyan',
    points: [
      'EfficientNetB0 transfer learning for 33 bacterial colony classes on a small, imbalanced dataset.',
      'Preprocessing and augmentation: cleaning, resize, normalization; fine-tuned CNN layers for generalization.',
      'Training phases with accuracy/loss analysis; Streamlit prototype for upload and inference.',
      'Python, TensorFlow, Keras, Streamlit, Colab, Kaggle API.',
    ],
    href: 'https://github.com/Anacex/Bacteria-Image-Classification-Deep-Learning-Model',
    linkLabel: 'View on GitHub',
    badge: '2025',
  },
  {
    title: 'Snakey (browser game)',
    Icon: Gamepad2,
    accent: 'emerald',
    points: [
      'Responsive JavaScript / HTML / CSS single-player game.',
      'Snake movement, food collection, score, and collision handling.',
    ],
    href: 'https://github.com/Anacex/Snakey-JS',
    linkLabel: 'View on GitHub',
  },
  {
    title: 'PACMAN (Windows console, C++)',
    Icon: Ghost,
    accent: 'amber',
    points: [
      'C++ OOP console game: arrow controls, BFS-based ghost AI, difficulty levels, score, sound.',
    ],
    href: 'https://github.com/Anacex/OOP-Pacman-Game',
    linkLabel: 'View on GitHub',
  },
]

function Projects() {
  return (
    <Section name="projects">
      <div className="surface-card">
        <h2 className="page-name">My Projects</h2>
        <div className="project-container">
          {projects.map((p) => (
            <motion.article
              key={p.title}
              className={`project-item project-item--${p.accent}`}
              {...sectionMotion}
              whileHover={{ y: -6, transition: { duration: 0.22 } }}
            >
              <div className="project-visual" aria-hidden>
                <p.Icon className="project-visual-icon" strokeWidth={1.25} />
              </div>
              <div className="project-card-head">
                <h3>{p.title}</h3>
                {p.badge && <span className="project-badge">{p.badge}</span>}
              </div>
              <ul>
                {p.points.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
              {p.proprietary ? (
                <p className="project-proprietary">Proprietary — skills demonstratable upon request.</p>
              ) : p.links ? (
                <div className="project-links">
                  {p.links.map((l) => (
                    <a
                      key={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      href={l.href}
                      className="project-link"
                    >
                      {l.label}
                      <ExternalLink size={14} className="project-link-icon" aria-hidden />
                    </a>
                  ))}
                </div>
              ) : (
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={p.href}
                  className="project-link"
                >
                  {p.linkLabel}
                  <ExternalLink size={14} className="project-link-icon" aria-hidden />
                </a>
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </Section>
  )
}

const experiences = [
  {
    id: 'outsecure',
    role: 'Web Development Intern (MERN Stack)',
    org: 'OutSecure',
    location: 'Rawalpindi · Remote',
    period: 'Jul 2025 – Sep 2025',
    points: [
      'Structured remote internship focused on React and the MERN stack.',
      'Collaborative workflows and industry-standard development tooling.',
    ],
  },
  {
    id: 'qbs',
    role: 'DevOps Intern',
    org: 'QBS Co.',
    location: 'Karachi',
    period: 'Dec 2025 – Present',
    points: [
      'CI/CD, containerization, and server infrastructure for cloud-native and on-prem deployments.',
      'gRPC APIs, log monitoring, and MLOps integration toward scalable, secure backend systems.',
    ],
  },
]

function Experience() {
  return (
    <Section name="experience">
      <div className="surface-card">
        <h2 className="page-name">Experience</h2>
        <p className="experience-intro">Internships and roles from my resume.</p>
        <div className="experience-list">
          {experiences.map((ex, i) => (
            <motion.article
              key={ex.id}
              className="experience-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.45, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="experience-card-accent" aria-hidden />
              <div className="experience-card-top">
                <span className="experience-icon-wrap">
                  <Briefcase className="experience-icon" strokeWidth={1.35} aria-hidden />
                </span>
                <div>
                  <h3 className="experience-role">{ex.role}</h3>
                  <p className="experience-org">
                    {ex.org}
                    <span className="experience-sep"> · </span>
                    {ex.location}
                  </p>
                </div>
              </div>
              <p className="experience-period">{ex.period}</p>
              <ul className="experience-bullets">
                {ex.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </Section>
  )
}

const skillCategories = [
  {
    id: 'lang',
    title: 'Programming Languages',
    Icon: Code2,
    bubble: { size: 'lg', tint: 'cyan' },
    items: [
      { name: 'Python', Icon: Terminal },
      { name: 'JavaScript', Icon: Braces },
      { name: 'C/C++', Icon: Cpu },
      { name: 'Go', Icon: Cpu },
      { name: 'Kotlin', Icon: Cpu },
      { name: 'Bash', Icon: Terminal },
      { name: 'Assembly (x86 — Irvine32)', Icon: Binary },
    ],
  },
  {
    id: 'web',
    title: 'Web & backend',
    Icon: Globe,
    bubble: { size: 'lg', tint: 'magenta' },
    items: [
      { name: 'HTML', Icon: FileCode },
      { name: 'CSS', Icon: Paintbrush },
      { name: 'JavaScript', Icon: Braces },
      { name: 'React & MERN', Icon: Layers },
      { name: 'Tailwind CSS', Icon: Wind },
      { name: 'FastAPI', Icon: Server },
      { name: 'REST & gRPC APIs', Icon: Network },
      { name: 'JWT', Icon: KeyRound },
      { name: 'Express.js', Icon: Server },
      { name: 'MongoDB', Icon: Database },
      { name: 'MySQL', Icon: Database },
      { name: 'PostgreSQL', Icon: Database },
    ],
  },
  {
    id: 'ml',
    title: 'ML & DL',
    Icon: Brain,
    bubble: { size: 'md', tint: 'purple' },
    items: [
      { name: 'Scikit-learn', Icon: LineChart },
      { name: 'TensorFlow', Icon: Network },
      { name: 'PyTorch', Icon: Grid3x3 },
      { name: 'Pandas', Icon: BarChart2 },
      { name: 'NumPy', Icon: Sigma },
      { name: 'CNNs', Icon: Layers },
      { name: 'Supervised / unsupervised learning', Icon: Brain },
    ],
  },
  {
    id: 'parallel',
    title: 'Parallel & distributed',
    Icon: Workflow,
    bubble: { size: 'sm', tint: 'cyan' },
    items: [
      { name: 'OpenMP', Icon: Workflow },
      { name: 'MPI', Icon: Share2 },
    ],
  },
  {
    id: 'core',
    title: 'Core CS',
    Icon: BookOpen,
    bubble: { size: 'lg', tint: 'magenta' },
    items: [
      { name: 'Data structures & algorithms', Icon: Sigma },
      { name: 'Computer architecture & assembly', Icon: Cpu },
      { name: 'DBMS', Icon: Database },
      { name: 'Algorithm design & analysis', Icon: LineChart },
      { name: 'OOP', Icon: Layers },
    ],
  },
  {
    id: 'devops',
    title: 'DevOps & cloud',
    Icon: Workflow,
    bubble: { size: 'md', tint: 'purple' },
    items: [
      { name: 'Docker & Kubernetes', Icon: Layers },
      { name: 'CI/CD & Jenkins', Icon: Workflow },
      { name: 'Linux & Bash', Icon: Terminal },
      { name: 'AWS', Icon: Cloud },
      { name: 'Jaeger, Grafana, Loki, Prometheus', Icon: LineChart },
    ],
  },
  {
    id: 'tools',
    title: 'Tools & IDEs',
    Icon: Wrench,
    bubble: { size: 'md', tint: 'cyan' },
    items: [
      { name: 'Git / GitHub', Icon: GitBranch },
      { name: 'VS Code, PyCharm, Jupyter, Visual Studio', Icon: Wrench },
    ],
  },
  {
    id: 'lang-speaking',
    title: 'Languages',
    Icon: Languages,
    bubble: { size: 'sm', tint: 'magenta' },
    items: [
      { name: 'English (fluent)', Icon: Globe },
      { name: 'Urdu (native)', Icon: MessageCircle },
      { name: 'German (beginner)', Icon: BookText },
    ],
  },
]

function hashString(str) {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

function mulberry32(seed) {
  let a = seed >>> 0
  return () => {
    a += 0x6d2b79f5
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function bubblePxFor(size, isMobile) {
  if (isMobile) {
    if (size === 'sm') return 160
    if (size === 'md') return 200
    return 235
  }
  if (size === 'sm') return 190
  if (size === 'md') return 235
  return 275
}

function Skills() {
  const [openId, setOpenId] = useState(null)
  const [layout, setLayout] = useState({ height: 640, positions: {} })
  const wrapRef = useRef(null)

  const seed = useMemo(() => hashString(skillCategories.map((c) => c.id).join('|')), [])

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') setOpenId(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    let raf = 0

    const compute = () => {
      const el = wrapRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const w = Math.max(320, Math.floor(rect.width))
      const isMobile = w < 720

      const gap = isMobile ? 14 : 18
      const pad = isMobile ? 10 : 16

      const bubbles = skillCategories.map((cat) => {
        const s = bubblePxFor(cat.bubble.size, isMobile)
        return { id: cat.id, size: s, r: s / 2 }
      })

      const rand = mulberry32(seed ^ hashString(`${w}x${isMobile ? 'm' : 'd'}`))

      // Start with a reasonable height; expand if we can't place all bubbles.
      let h = isMobile ? 740 : 880
      let positions = null

      const tryPlace = (height) => {
        const placed = []
        const out = {}

        for (let i = 0; i < bubbles.length; i++) {
          const b = bubbles[i]
          const r = b.r
          const minX = pad + r
          const maxX = w - pad - r
          const minY = pad + r
          const maxY = height - pad - r

          let ok = false
          for (let attempt = 0; attempt < 900; attempt++) {
            const x = minX + rand() * Math.max(1, maxX - minX)
            const y = minY + rand() * Math.max(1, maxY - minY)

            let collides = false
            for (let j = 0; j < placed.length; j++) {
              const p = placed[j]
              const dx = x - p.x
              const dy = y - p.y
              const minDist = r + p.r + gap
              if (dx * dx + dy * dy < minDist * minDist) {
                collides = true
                break
              }
            }

            if (!collides) {
              placed.push({ id: b.id, x, y, r })
              out[b.id] = { x, y }
              ok = true
              break
            }
          }

          if (!ok) return null
        }

        // compute bottom-most extent to avoid too much dead space
        let maxBottom = 0
        for (const p of placed) maxBottom = Math.max(maxBottom, p.y + p.r)
        return { out, height: Math.ceil(maxBottom + pad) }
      }

      for (let tries = 0; tries < 5; tries++) {
        const res = tryPlace(h)
        if (res) {
          positions = res.out
          h = Math.max(res.height, isMobile ? 660 : 720)
          break
        }
        h += isMobile ? 160 : 200
      }

      if (!positions) {
        // Fallback: simple stacked layout (still non-overlapping).
        positions = {}
        let y = 0
        for (const b of bubbles) {
          y += b.r + gap
          positions[b.id] = { x: Math.min(w - pad - b.r, Math.max(pad + b.r, w / 2)), y }
          y += b.r
        }
        h = Math.ceil(y + pad)
      }

      setLayout({ height: h, positions })
    }

    const schedule = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(compute)
    }

    schedule()
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', schedule)
    }
  }, [seed])

  const active = skillCategories.find((c) => c.id === openId) || null

  return (
    <Section name="skills">
      <h2 className="page-name">My Skills</h2>
      <p className="skills-intro" aria-hidden="true" />

      <div
        className="skills-bubbles"
        ref={wrapRef}
        style={{ height: `${layout.height}px` }}
        data-layout="scatter"
        role="list"
        aria-label="Skill categories"
      >
        {skillCategories.map((cat) => (
          <motion.button
            key={cat.id}
            type="button"
            role="listitem"
            className={`skill-bubble skill-bubble--${cat.bubble.tint} skill-bubble--${cat.bubble.size}`}
            data-open={openId === cat.id ? 'true' : 'false'}
            style={{
              position: 'absolute',
              left: `${layout.positions[cat.id]?.x ?? 0}px`,
              top: `${layout.positions[cat.id]?.y ?? 0}px`,
              transform: 'translate(-50%, -50%)',
            }}
            onClick={() => setOpenId((prev) => (prev === cat.id ? null : cat.id))}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            whileHover={{ scale: 1.07, y: -6 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            aria-expanded={openId === cat.id}
            aria-haspopup="dialog"
            aria-label={`${cat.title}. Click to open skills.`}
          >
            <span className="skill-bubble-glow" aria-hidden />
            <span className="skill-bubble-head">
              <cat.Icon className="skill-bubble-icon" strokeWidth={1.35} aria-hidden />
              <span className="skill-bubble-title">{cat.title}</span>
            </span>
            <span className="skill-bubble-hover" aria-hidden="true">
              <ul className="skill-bubble-list">
                {cat.items.slice(0, 8).map((it) => (
                  <li key={it.name}>
                    <it.Icon className="skill-bubble-list-icon" size={14} strokeWidth={1.5} aria-hidden />
                    <span>{it.name}</span>
                  </li>
                ))}
                {cat.items.length > 8 && <li className="skill-bubble-more">+{cat.items.length - 8} more</li>}
              </ul>
            </span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="leaf-overlay"
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenId(null)}
          >
            <motion.div
              className="leaf-modal"
              initial={{ opacity: 0, y: 14, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 14, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="leaf-close" type="button" onClick={() => setOpenId(null)} aria-label="Close">
                ×
              </button>
              <div className="leaf-modal-head">
                <active.Icon className="leaf-modal-icon" strokeWidth={1.25} aria-hidden />
                <h3>{active.title}</h3>
              </div>
              <ul className="leaf-skill-list">
                {active.items.map((it) => (
                  <li key={it.name}>
                    <it.Icon className="leaf-skill-icon" size={16} strokeWidth={1.5} aria-hidden />
                    <span>{it.name}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  )
}

function ContactSection() {
  return (
    <Section name="contact">
      <div className="surface-card">
        <h2 className="page-name">Contact</h2>
        <p className="contact-section-intro">
          Send a message the same way you would compose an email: recipient is fixed to my inbox, you set
          subject and body. I typically reply within a few days.
        </p>
        <ContactForm />
      </div>
    </Section>
  )
}

function About() {
  return (
    <Section name="about" id="about">
      <div className="surface-card">
        <h2 className="page-name">About Me</h2>
        <motion.div className="about-container" {...sectionMotion}>
          <p className="about-me-text">
            Final-year computer science student with hands-on full-stack development, DevOps, and AI/ML
            experience. I like building scalable web and mobile systems, improving reliability with CI/CD and
            observability, and shipping thoughtful UIs. I am always learning and contributing through personal
            projects and internships.
          </p>
          <h3 className="edu-text">Education</h3>
          <p>
            Bachelor of Science in Computer Science, FAST–National University of Computer &amp; Emerging
            Sciences, Karachi (2022–present). CGPA: 3.13.
          </p>
          <h3 className="interest-text">Interests</h3>
          <ul className="interest-list">
            <li>Web development</li>
            <li>Machine learning / AI</li>
            <li>Android development</li>
            <li>DevOps</li>
            <li>Cross-platform development</li>
            <li>Cyber security</li>
          </ul>
        </motion.div>
      </div>
    </Section>
  )
}

function Footer() {
  return (
    <footer>
      <p>© 2026 M. Anas Khan. All rights reserved.</p>
      <p>Connect with me on:</p>
      <div className="social-links">
        <a
          href="https://www.linkedin.com/in/muhammad-anas-khan-k224170/"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
        <a href="https://github.com/Anacex" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <a href="mailto:anacekhanx@gmail.com">Email me</a>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <>
      <WaterBackground />
      <FloatingBubbles />
      <Navbar />
      <Section name="home" className="section hero-section">
        <Hero />
      </Section>
      <motion.div className="section" {...sectionMotion}>
        <Projects />
      </motion.div>
      <motion.div className="section" {...sectionMotion}>
        <Experience />
      </motion.div>
      <motion.div className="section" {...sectionMotion}>
        <Skills />
      </motion.div>
      <motion.div className="section" {...sectionMotion}>
        <About />
      </motion.div>
      <motion.div className="section" {...sectionMotion}>
        <ContactSection />
      </motion.div>
      <Footer />
    </>
  )
}
