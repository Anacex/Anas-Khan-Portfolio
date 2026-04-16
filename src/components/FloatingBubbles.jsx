import { useEffect, useRef } from 'react'

function clamp(v, min, max) {
  return Math.min(max, Math.max(min, v))
}

function randBetween(rng, min, max) {
  return min + (max - min) * rng()
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

function bubbleColor(alpha) {
  // cyan-tinted bubble rim + subtle fill
  return {
    rim: `rgba(34, 211, 238, ${alpha})`,
    fill: `rgba(34, 211, 238, ${alpha * 0.12})`,
    shine: `rgba(255, 255, 255, ${alpha * 0.18})`,
  }
}

export default function FloatingBubbles() {
  const canvasRef = useRef(null)
  const pointerRef = useRef({ x: -9999, y: -9999, active: false })
  const smoothRef = useRef({ x: 0.5, y: 0.5 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let raf = 0
    let w = 0
    let h = 0
    let dpr = 1
    let last = performance.now()

    // deterministic-ish randomness so it doesn't feel jittery across reloads
    const rng = mulberry32(0x8a31f21 ^ (Date.now() & 0xffff))

    const bubbles = []
    const maxBubbles = reduced ? 0 : 22

    const flowAt = (x, y, t) => {
      // Sample a smooth "water-like" drift field so bubbles feel attached to the ripples.
      // Uses the same slowed timebase as WaterBackground (time * 0.00035).
      const nx = w > 0 ? x / w : 0.5
      const ny = h > 0 ? y / h : 0.5

      // base swirling field (subtle)
      const a = Math.sin((ny * 3.1 + t * 1.25) + Math.cos(nx * 2.2 - t * 0.85))
      const b = Math.cos((nx * 3.0 - t * 1.12) + Math.sin(ny * 2.0 + t * 0.92))
      let fx = a * 0.55 + Math.sin(t * 0.35 + nx * 8.0) * 0.18
      let fy = b * 0.55 + Math.cos(t * 0.33 + ny * 7.4) * 0.18

      // pointer-influenced drift so it "reacts" like the water does
      const px = smoothRef.current.x
      const py = smoothRef.current.y
      const dx = nx - px
      const dy = ny - py
      const dist = Math.max(0.12, Math.hypot(dx, dy))
      const pull = 0.12 / dist
      fx += -dx * pull
      fy += -dy * pull

      return { fx, fy }
    }

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const spawn = (immediate = false) => {
      if (reduced) return
      const isMobile = w < 720
      const r = randBetween(rng, isMobile ? 6 : 8, isMobile ? 22 : 32)

      const side = rng() < 0.2
      const x = side
        ? (rng() < 0.5 ? -r : w + r)
        : randBetween(rng, -r * 0.5, w + r * 0.5)

      const y = immediate ? randBetween(rng, 0, h) : h + r + randBetween(rng, 10, 120)

      const baseVy = randBetween(rng, isMobile ? -20 : -28, isMobile ? -48 : -62) // px/s
      const drift = randBetween(rng, -18, 18) // px/s
      const wobble = randBetween(rng, 0.4, 1.1)
      const phase = randBetween(rng, 0, Math.PI * 2)

      bubbles.push({
        x,
        y,
        r,
        vx: drift,
        vy: baseVy,
        wobble,
        phase,
        life: 0,
        ttl: randBetween(rng, 7.5, 12.5),
        popping: false,
        popT: 0,
      })
    }

    const seedInitial = () => {
      bubbles.length = 0
      const count = clamp(Math.round((w * h) / 65000), 10, maxBubbles)
      for (let i = 0; i < count; i++) spawn(true)
    }

    const setFromClient = (clientX, clientY) => {
      pointerRef.current.x = clientX
      pointerRef.current.y = clientY
      pointerRef.current.active = true
    }

    const onPointerMove = (e) => setFromClient(e.clientX, e.clientY)
    const onTouchMove = (e) => {
      const t = e.touches[0]
      if (t) setFromClient(t.clientX, t.clientY)
    }

    const onPointerLeave = () => {
      pointerRef.current.active = false
      pointerRef.current.x = -9999
      pointerRef.current.y = -9999
    }

    const drawBubble = (b, alpha, scale = 1) => {
      const rr = b.r * scale
      const { rim, fill, shine } = bubbleColor(alpha)

      // Fill
      ctx.beginPath()
      ctx.arc(b.x, b.y, rr, 0, Math.PI * 2)
      ctx.fillStyle = fill
      ctx.fill()

      // Rim
      ctx.lineWidth = Math.max(1, rr * 0.08)
      ctx.strokeStyle = rim
      ctx.stroke()

      // Shine
      ctx.beginPath()
      ctx.arc(b.x - rr * 0.28, b.y - rr * 0.28, rr * 0.22, 0, Math.PI * 2)
      ctx.fillStyle = shine
      ctx.fill()
    }

    const step = (now) => {
      const dt = Math.min(0.033, (now - last) / 1000)
      last = now

      ctx.clearRect(0, 0, w, h)
      if (!reduced) {
        // keep a few bubbles around
        while (bubbles.length < maxBubbles) spawn(false)
      }

      const px = pointerRef.current.x
      const py = pointerRef.current.y
      const pointerActive = pointerRef.current.active
      const t = reduced ? 0 : now * 0.00035

      // Smooth pointer like the water surface does
      if (w > 0 && h > 0 && pointerActive) {
        const tx = clamp(px / w, 0, 1)
        const ty = clamp(py / h, 0, 1)
        const follow = 0.06
        smoothRef.current.x += (tx - smoothRef.current.x) * follow
        smoothRef.current.y += (ty - smoothRef.current.y) * follow
      }

      for (let i = bubbles.length - 1; i >= 0; i--) {
        const b = bubbles[i]
        b.life += dt

        // Fade in/out
        const fadeIn = clamp(b.life / 0.9, 0, 1)
        const fadeOut = clamp((b.ttl - b.life) / 1.1, 0, 1)
        let alpha = 0.75 * fadeIn * fadeOut

        // Float
        if (!b.popping) {
          b.phase += dt * b.wobble
          const wobbleX = Math.sin(b.phase) * 0.9

          // Apply water-like flow so motion matches the background's "ripple directions"
          const flow = flowAt(b.x, b.y, t)
          const flowAmp = clamp(26 - b.r * 0.35, 9, 22) // smaller bubbles get pushed more
          b.x += (b.vx + wobbleX + flow.fx * flowAmp) * dt
          b.y += (b.vy + flow.fy * (flowAmp * 0.55)) * dt
        }

        // Pop on proximity
        if (!b.popping && pointerActive) {
          const popRadius = clamp(b.r * 1.45, 18, 54)
          const dx = b.x - px
          const dy = b.y - py
          if (dx * dx + dy * dy < popRadius * popRadius) {
            b.popping = true
            b.popT = 0
          }
        }

        if (b.popping) {
          b.popT += dt
          const t = clamp(b.popT / 0.22, 0, 1)
          alpha *= 1 - t
          const scale = 1 + t * 0.55
          drawBubble(b, alpha, scale)
          if (t >= 1) {
            bubbles.splice(i, 1)
            continue
          }
        } else {
          drawBubble(b, alpha, 1)
        }

        // Despawn when offscreen or old
        if (b.life > b.ttl || b.y < -b.r - 120 || b.x < -b.r - 140 || b.x > w + b.r + 140) {
          bubbles.splice(i, 1)
        }
      }

      raf = requestAnimationFrame(step)
    }

    resize()
    seedInitial()
    window.addEventListener('resize', () => {
      resize()
      seedInitial()
    })
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('pointerdown', onPointerMove, { passive: true })
    window.addEventListener('pointerleave', onPointerLeave)
    window.addEventListener('blur', onPointerLeave)
    window.addEventListener('touchstart', onTouchMove, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    window.addEventListener('touchend', onPointerLeave, { passive: true })

    raf = requestAnimationFrame(step)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerdown', onPointerMove)
      window.removeEventListener('pointerleave', onPointerLeave)
      window.removeEventListener('blur', onPointerLeave)
      window.removeEventListener('touchstart', onTouchMove)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onPointerLeave)
    }
  }, [])

  return <canvas ref={canvasRef} className="floating-bubbles-canvas" aria-hidden />
}

