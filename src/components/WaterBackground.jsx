import { useEffect, useRef } from 'react'

function lerp(a, b, t) {
  return a + (b - a) * t
}

function clamp(v, min, max) {
  return Math.min(max, Math.max(min, v))
}

function idx(x, y, w) {
  return x + y * w
}

export default function WaterBackground() {
  const canvasRef = useRef(null)
  const pointerRef = useRef({ x: 0.5, y: 0.5 })
  const smoothRef = useRef({ x: 0.5, y: 0.5 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) return

    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let raf = 0
    let w = 0
    let h = 0
    let dpr = 1

    // ripple simulation (heightfield)
    let simW = 0
    let simH = 0
    let prev = null
    let curr = null
    let imgData = null
    const off = document.createElement('canvas')
    const offCtx = off.getContext('2d')

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      // Keep the sim grid modest for smoothness.
      // Wide screens get a bit more detail, but still lightweight.
      const targetW = clamp(Math.round(w / 6), 140, 240)
      const targetH = clamp(Math.round(h / 6), 90, 180)
      simW = targetW
      simH = targetH
      prev = new Float32Array(simW * simH)
      curr = new Float32Array(simW * simH)
      imgData = ctx.createImageData(simW, simH)
      off.width = simW
      off.height = simH
    }

    const setFromClient = (clientX, clientY) => {
      if (w <= 0 || h <= 0) return
      pointerRef.current.x = Math.min(1, Math.max(0, clientX / w))
      pointerRef.current.y = Math.min(1, Math.max(0, clientY / h))
    }

    const onPointerMove = (e) => setFromClient(e.clientX, e.clientY)
    const onTouch = (e) => {
      const t = e.touches[0]
      if (t) setFromClient(t.clientX, t.clientY)
    }

    const disturb = (nx, ny, force = 1) => {
      if (!curr) return
      const x = Math.round(nx * (simW - 1))
      const y = Math.round(ny * (simH - 1))
      const r = 3
      for (let dy = -r; dy <= r; dy++) {
        for (let dx = -r; dx <= r; dx++) {
          const xx = x + dx
          const yy = y + dy
          if (xx <= 1 || yy <= 1 || xx >= simW - 2 || yy >= simH - 2) continue
          const d2 = dx * dx + dy * dy
          const falloff = Math.exp(-d2 / (r * r))
          curr[idx(xx, yy, simW)] += 0.55 * force * falloff
        }
      }
    }

    let lastPointer = { x: 0.5, y: 0.5 }

    const draw = (time) => {
      // Slow the whole animation down to stay subtle.
      const t = reduced ? 0 : time * 0.00035
      const follow = reduced ? 1 : 0.06
      smoothRef.current.x = lerp(smoothRef.current.x, pointerRef.current.x, follow)
      smoothRef.current.y = lerp(smoothRef.current.y, pointerRef.current.y, follow)

      const nx = smoothRef.current.x
      const ny = smoothRef.current.y

      // Inject disturbances based on pointer velocity.
      const vx = nx - lastPointer.x
      const vy = ny - lastPointer.y
      lastPointer = { x: nx, y: ny }
      if (!reduced) {
        const speed = Math.min(1, Math.hypot(vx, vy) * 14)
        if (speed > 0.04) disturb(nx, ny, speed)
        // subtle ambient drips so it doesn't go dead
        if (Math.sin(t * 0.55) > 0.9985) {
          disturb((Math.sin(t * 0.4) * 0.5 + 0.5), (Math.cos(t * 0.45) * 0.5 + 0.5), 0.14)
        }
      }

      // Base background
      ctx.fillStyle = '#000000'
      ctx.fillRect(0, 0, w, h)

      // Distant fog/water lights (slow drifting blobs)
      // Draw behind ripples, subtle pulse to feel like distant water/fog light.
      if (!reduced && w > 0) {
        ctx.save()
        ctx.globalCompositeOperation = 'screen'
        const blobs = [
          { a: 0.18, b: 0.12, s: 0.22, r: 0.22, c: 'rgba(34, 211, 238, 0.075)' }, // cyan
          { a: 0.72, b: 0.18, s: 0.17, r: 0.18, c: 'rgba(56, 189, 248, 0.06)' }, // aqua
          { a: 0.35, b: 0.74, s: 0.14, r: 0.26, c: 'rgba(167, 139, 250, 0.05)' }, // purple
          { a: 0.82, b: 0.7, s: 0.11, r: 0.22, c: 'rgba(124, 58, 237, 0.045)' }, // royal purple
          { a: 0.12, b: 0.52, s: 0.09, r: 0.2, c: 'rgba(34, 211, 238, 0.045)' }, // cyan
        ]
        for (let i = 0; i < blobs.length; i++) {
          const b = blobs[i]
          const pulse = Math.sin(t * (0.35 + b.s) + i * 1.9) * 0.5 + 0.5
          const driftX = Math.sin(t * (0.09 + b.s) + i * 2.3) * 0.06
          const driftY = Math.cos(t * (0.07 + b.s) + i * 2.1) * 0.05
          const gx = (b.a + driftX) * w
          const gy = (b.b + driftY) * h
          const rad = Math.max(w, h) * (b.r + pulse * 0.05)
          const g = ctx.createRadialGradient(gx, gy, 0, gx, gy, rad)
          g.addColorStop(0, b.c)
          g.addColorStop(0.55, 'rgba(0,0,0,0)')
          g.addColorStop(1, 'rgba(0,0,0,0)')
          ctx.fillStyle = g
          ctx.fillRect(0, 0, w, h)
        }
        ctx.restore()
      }

      if (prev && curr && imgData) {
        // step sim
        const damp = reduced ? 0.985 : 0.986
        const k = reduced ? 0.0 : 0.5
        // wave equation style update (neighbor sum - current) + damping
        for (let y = 1; y < simH - 1; y++) {
          let row = y * simW
          for (let x = 1; x < simW - 1; x++) {
            const i = row + x
            const n =
              curr[i - 1] +
              curr[i + 1] +
              curr[i - simW] +
              curr[i + simW]
            const next = (n * 0.5 - prev[i]) * damp
            prev[i] = next + (reduced ? 0 : (Math.sin(t * 0.35 + i * 0.0007) * 0.0015)) // tiny motion bias
          }
        }

        // swap buffers
        const tmp = curr
        curr = prev
        prev = tmp

        // render: convert heightfield to neon shading via normal approximation
        const data = imgData.data
        const lightX = (nx * 2 - 1) * 0.65
        const lightY = (ny * 2 - 1) * 0.65

        for (let y = 1; y < simH - 1; y++) {
          for (let x = 1; x < simW - 1; x++) {
            const i = idx(x, y, simW)
            const hC = curr[i]
            const dx = curr[i + 1] - curr[i - 1]
            const dy = curr[i + simW] - curr[i - simW]

            // normal (screen space)
            const nxv = -dx * 0.26
            const nyv = -dy * 0.26
            const nzv = 1.0
            const invLen = 1 / Math.hypot(nxv, nyv, nzv)
            const N0 = nxv * invLen
            const N1 = nyv * invLen
            const N2 = nzv * invLen

            // light
            const lx = -lightX
            const ly = -lightY
            const lz = 0.9
            const invLLen = 1 / Math.hypot(lx, ly, lz)
            const L0 = lx * invLLen
            const L1 = ly * invLLen
            const L2 = lz * invLLen

            const diff = clamp(N0 * L0 + N1 * L1 + N2 * L2, 0, 1)
            const rim = Math.pow(1 - N2, 1.6)
            const foam = clamp(Math.abs(hC) * 1.7, 0, 1)

            // pitch black base with purple/aqua/cyan energy
            const baseR = 0
            const baseG = 0
            const baseB = 0

            // diff drives "underwater glow", rim adds neon edge, foam brightens crests
            const glow = diff * 112 + rim * 70
            const crest = foam * 120

            // mix: cyan base + neon magenta highlights (kept subtle)
            const r = clamp(baseR + glow * 0.32 + crest * 0.78, 0, 255)
            const g = clamp(baseG + glow * 0.58 + crest * 0.48, 0, 255)
            const b = clamp(baseB + glow * 1.0 + crest * 0.9, 0, 255)

            const o = i * 4
            data[o] = r
            data[o + 1] = g
            data[o + 2] = b
            data[o + 3] = 255
          }
        }

        if (off.width !== simW || off.height !== simH) {
          off.width = simW
          off.height = simH
        }
        offCtx.putImageData(imgData, 0, 0)

        ctx.save()
        ctx.globalCompositeOperation = 'screen'
        ctx.imageSmoothingEnabled = true
        ctx.drawImage(off, 0, 0, w, h)
        ctx.restore()

        // small vignette
        const vg = ctx.createRadialGradient(w * 0.5, h * 0.55, 0, w * 0.5, h * 0.55, Math.max(w, h) * 0.65)
        vg.addColorStop(0, 'rgba(0,0,0,0)')
        vg.addColorStop(1, 'rgba(0,0,0,0.55)')
        ctx.fillStyle = vg
        ctx.fillRect(0, 0, w, h)
      }

      raf = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('touchstart', onTouch, { passive: true })
    window.addEventListener('touchmove', onTouch, { passive: true })

    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('touchstart', onTouch)
      window.removeEventListener('touchmove', onTouch)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="water-bg-canvas"
      aria-hidden
    />
  )
}
