import { useEffect, useRef, useState } from 'react'
import Spline from '@splinetool/react-spline'

function App() {
  const splineRef = useRef(null)
  const appRef = useRef(null)
  const [ready, setReady] = useState(false)
  const [currentAnim, setCurrentAnim] = useState('Idle')

  const onLoad = (app) => {
    appRef.current = app
    setReady(true)
  }

  const triggerAnimation = async (name) => {
    setCurrentAnim(name)
    try {
      // Try common Spline event patterns. If the scene has matching names, these will work.
      // These calls are safe no-ops if the target/event doesn't exist.
      const app = appRef.current
      if (!app) return

      // Option A: Directly play an animation clip by name
      if (app.play) app.play(name)

      // Option B: Emit custom events often wired in Spline (e.g., "Wave", "Walk", "Idle")
      if (app.emitEvent) {
        app.emitEvent('keyDown', name)
        app.emitEvent('start', name)
        app.emitEvent('mouseDown', name)
      }
    } catch (e) {
      // Silently ignore – scene may not expose programmatic controls
      // The UI still updates and the Spline remains interactive
    }
  }

  useEffect(() => {
    // Default to Idle on mount once Spline loads
    if (ready) triggerAnimation('Idle')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready])

  return (
    <div className="min-h-screen w-full bg-black text-white relative overflow-hidden">
      {/* 3D Cover Background */}
      <div className="absolute inset-0">
        <Spline
          ref={splineRef}
          scene="https://prod.spline.design/atN3lqky4IzF-KEP/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
          onLoad={onLoad}
        />
        {/* Soft gradient to improve foreground text contrast */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
      </div>

      {/* Hero Content */}
      <header className="relative z-10">
        <nav className="flex items-center justify-between max-w-6xl mx-auto px-6 py-5">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-gradient-to-br from-pink-500 to-violet-500" />
            <span className="font-semibold tracking-tight">Blue Studio</span>
          </div>
          <a href="/test" className="text-sm text-white/80 hover:text-white transition-colors">System Test</a>
        </nav>
      </header>

      <main className="relative z-10 flex items-center">
        <section className="w-full max-w-6xl mx-auto px-6 py-16 md:py-24 lg:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Real‑time 3D, web‑optimized, low‑poly
            </div>
            <h1 className="mt-5 text-4xl md:text-6xl font-extrabold leading-tight">
              Anime‑style 3D Portfolio Character
            </h1>
            <p className="mt-4 md:mt-6 text-white/80 text-base md:text-lg">
              Friendly, modular design built for smooth web performance. Ready for
              waving, walking, and idle animation states — perfect as a playful
              hero for your portfolio.
            </p>

            {/* Animation Controls */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {['Idle', 'Wave', 'Walk'].map((label) => (
                <button
                  key={label}
                  onClick={() => triggerAnimation(label)}
                  className={`rounded-full px-5 py-2.5 text-sm font-medium transition-colors backdrop-blur border ${
                    currentAnim === label
                      ? 'bg-white text-black border-white'
                      : 'bg-white/10 text-white/90 hover:bg-white/20 border-white/20'
                  }`}
                >
                  {label}
                </button>
              ))}
              <span className="text-xs text-white/70">
                {ready ? 'Scene ready' : 'Loading 3D scene...'}
              </span>
            </div>
          </div>
        </section>
      </main>

      {/* Footer note */}
      <footer className="relative z-10 px-6 py-6 text-xs text-white/60">
        <div className="max-w-6xl mx-auto">
          Modular rig for easy animation mixing. Low‑poly materials optimized for web.
        </div>
      </footer>
    </div>
  )
}

export default App
