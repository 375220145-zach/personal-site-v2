import { useRef, useState, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'
import type { AIProject } from '../data/ai-projects'

export default function AiCardWall({ projects, onCardClick }: { projects: AIProject[]; onCardClick: (slug: string) => void }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [activeIndex, setActiveIndex] = useState(0)

  const checkScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 8)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8)
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    checkScroll()
    el.addEventListener('scroll', checkScroll, { passive: true })
    window.addEventListener('resize', checkScroll)
    return () => {
      el.removeEventListener('scroll', checkScroll)
      window.removeEventListener('resize', checkScroll)
    }
  }, [checkScroll])

  // Track active card on scroll
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const onScroll = () => {
      if (!el || !trackRef.current) return
      const cards = trackRef.current.children
      const center = el.scrollLeft + el.clientWidth / 2
      let best = 0, bestDist = Infinity
      for (let i = 0; i < cards.length; i++) {
        const card = cards[i] as HTMLElement
        const cardCenter = card.offsetLeft + card.offsetWidth / 2
        const dist = Math.abs(center - cardCenter)
        if (dist < bestDist) { bestDist = dist; best = i }
      }
      setActiveIndex(best)
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  const scroll = (dir: 'left' | 'right') => {
    const el = scrollRef.current
    if (!el) return
    const cardWidth = el.querySelector('[data-card]')?.clientWidth || 340
    const gap = 16
    el.scrollBy({ left: dir === 'left' ? -(cardWidth + gap) : cardWidth + gap, behavior: 'smooth' })
  }

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '100vw' }}>
      {/* Scroll container */}
      <div
        ref={scrollRef}
        style={{
          display: 'flex', gap: '16px', overflowX: 'auto', overflowY: 'visible',
          scrollSnapType: 'x mandatory', scrollBehavior: 'smooth',
          padding: '8px clamp(16px,4vw,40px) 24px',
          scrollbarWidth: 'none', msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
          maskImage: 'linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%)',
        }}
      >
        <div ref={trackRef} style={{ display: 'flex', gap: '16px', flexShrink: 0 }}>
          {projects.map((proj, i) => (
            <motion.div
              key={proj.slug}
              data-card
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              onClick={() => onCardClick(proj.slug)}
              style={{
                width: 'clamp(280px, 340px, 80vw)',
                flexShrink: 0,
                scrollSnapAlign: 'start',
                background: '#0d0d0d',
                border: '0.5px solid rgba(255,255,255,0.07)',
                padding: 'clamp(20px,3vw,28px)',
                cursor: 'pointer',
                display: 'flex', flexDirection: 'column', gap: '14px',
                transition: 'border-color 0.35s, background 0.35s, transform 0.35s',
                position: 'relative',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'; e.currentTarget.style.background = '#121212' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.background = '#0d0d0d' }}
            >
              {/* Number */}
              <div style={{ fontSize: '48px', fontWeight: 200, color: 'rgba(222,219,200,0.08)', lineHeight: 1, letterSpacing: '-0.03em' }}>
                {String(i + 1).padStart(2, '0')}
              </div>

              {/* Title */}
              <div style={{ fontSize: '18px', fontWeight: 300, color: '#E1E0CC', letterSpacing: '-0.01em' }}>
                {proj.title}
              </div>

              {/* Problem / Solution */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {proj.problem ? (
                  <>
                    <div style={{ fontSize: '11px', color: 'rgba(222,219,200,0.35)', lineHeight: 1.5 }}>
                      <span style={{ fontSize: '10px', letterSpacing: '0.08em', color: 'rgba(222,219,200,0.25)', textTransform: 'uppercase', marginRight: '6px' }}>问题</span>
                      {proj.problem}
                    </div>
                    <div style={{ fontSize: '12px', color: 'rgba(222,219,200,0.65)', lineHeight: 1.5 }}>
                      <span style={{ fontSize: '10px', letterSpacing: '0.08em', color: 'rgba(222,219,200,0.25)', textTransform: 'uppercase', marginRight: '6px' }}>解法</span>
                      {proj.solution}
                    </div>
                  </>
                ) : (
                  <div style={{ fontSize: '13px', color: 'rgba(222,219,200,0.5)', lineHeight: 1.6 }}>
                    {proj.tagline}
                  </div>
                )}
              </div>

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                {proj.tags.slice(0, 3).map(t => (
                  <span key={t} style={{ fontSize: '10px', color: 'rgba(222,219,200,0.35)', background: 'rgba(255,255,255,0.03)', border: '0.5px solid rgba(255,255,255,0.06)', padding: '2px 7px', borderRadius: '3px' }}>
                    {t}
                  </span>
                ))}
                {proj.tags.length > 3 && (
                  <span style={{ fontSize: '10px', color: 'rgba(222,219,200,0.2)' }}>+{proj.tags.length - 3}</span>
                )}
              </div>

              {/* View hint */}
              <div style={{ fontSize: '10px', letterSpacing: '0.1em', color: 'rgba(222,219,200,0.25)', textTransform: 'uppercase' }}>
                点击查看案例 →
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Scroll arrows — desktop only */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '8px' }}>
        {[['←', 'left', canScrollLeft], ['→', 'right', canScrollRight]].map(([label, dir, enabled]) => (
          <button
            key={dir as string}
            onClick={() => scroll(dir as 'left' | 'right')}
            disabled={!enabled}
            style={{
              width: '36px', height: '36px', borderRadius: '50%',
              background: enabled ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.01)',
              border: '0.5px solid rgba(255,255,255,0.08)',
              color: enabled ? 'rgba(222,219,200,0.5)' : 'rgba(222,219,200,0.12)',
              cursor: enabled ? 'pointer' : 'default',
              fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.3s',
            }}
          >{label}</button>
        ))}
      </div>

      {/* Page dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginTop: '8px' }}>
        {projects.map((_, i) => (
          <div key={i} style={{
            width: '6px', height: '6px', borderRadius: '50%',
            background: i === activeIndex ? 'rgba(222,219,200,0.4)' : 'rgba(222,219,200,0.1)',
            transition: 'background 0.3s',
          }} />
        ))}
      </div>

      {/* Hide scrollbar  */}
      <style>{`
        .ai-card-wall::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  )
}
