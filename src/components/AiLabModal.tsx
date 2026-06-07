import { useEffect, useState } from 'react'
import { X, ArrowLeft, ArrowRight } from 'lucide-react'
import type { AIProject } from '../data/ai-projects'

export default function AiLabModal({ projects, initialSlug, open, onClose }: { projects: AIProject[]; initialSlug: string; open: boolean; onClose: () => void }) {
  const [slug, setSlug] = useState(initialSlug)
  const idx = projects.findIndex(p => p.slug === slug)
  const proj = projects[idx]

  // Reset slug when reopened
  useEffect(() => { if (open) setSlug(initialSlug) }, [open, initialSlug])

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft' && idx > 0) setSlug(projects[idx - 1].slug)
      if (e.key === 'ArrowRight' && idx < projects.length - 1) setSlug(projects[idx + 1].slug)
    }
    if (open) window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [open, idx, projects, onClose])

  if (!proj) return null

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      style={{
        position: 'fixed', inset: 0, zIndex: 100,
        background: 'rgba(0,0,0,0.78)', backdropFilter: 'blur(40px)', WebkitBackdropFilter: 'blur(40px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        opacity: open ? 1 : 0, visibility: open ? 'visible' : 'hidden', pointerEvents: open ? 'auto' : 'none',
        transition: 'opacity 0.35s, visibility 0.35s',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: 'rgba(12,12,12,0.95)', border: '0.5px solid rgba(255,255,255,0.1)',
          padding: 'clamp(20px,4vw,44px)', maxWidth: '780px', width: '94vw', maxHeight: '85vh', overflowY: 'auto',
          position: 'relative',
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: '16px', right: '20px', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'rgba(222,219,200,0.5)', background: 'none', border: 'none', fontSize: '20px', transition: 'color 0.3s' }}
          onMouseEnter={e => { e.currentTarget.style.color = '#DEDBC8' }}
          onMouseLeave={e => { e.currentTarget.style.color = 'rgba(222,219,200,0.5)' }}
        ><X size={20} strokeWidth={1} /></button>

        {/* Title */}
        <div style={{ fontSize: 'clamp(22px,2.8vw,32px)', fontWeight: 200, color: '#E1E0CC', letterSpacing: '-0.01em', marginBottom: '4px' }}>
          {proj.title}
        </div>
        <div style={{ fontSize: '13px', color: 'rgba(222,219,200,0.45)', marginBottom: '24px' }}>
          {proj.tagline}
        </div>

        {/* Content */}
        <div style={{ fontSize: '14px', lineHeight: 1.85, color: 'rgba(222,219,200,0.7)' }}>
          {proj.detail}
        </div>

        {/* Nav */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '32px', paddingTop: '20px', borderTop: '0.5px solid rgba(255,255,255,0.06)' }}>
          <button
            onClick={() => idx > 0 && setSlug(projects[idx - 1].slug)}
            disabled={idx <= 0}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              background: 'none', border: 'none',
              color: idx > 0 ? 'rgba(222,219,200,0.5)' : 'rgba(222,219,200,0.15)',
              cursor: idx > 0 ? 'pointer' : 'default',
              fontSize: '12px', padding: '0',
              transition: 'color 0.3s',
            }}
            onMouseEnter={e => { if (idx > 0) e.currentTarget.style.color = '#DEDBC8' }}
            onMouseLeave={e => { if (idx > 0) e.currentTarget.style.color = 'rgba(222,219,200,0.5)' }}
          >
            <ArrowLeft size={14} strokeWidth={1} />
            {idx > 0 ? projects[idx - 1].title : ''}
          </button>
          <div style={{ fontSize: '11px', color: 'rgba(222,219,200,0.25)', display: 'flex', alignItems: 'center' }}>
            {idx + 1} / {projects.length}
          </div>
          <button
            onClick={() => idx < projects.length - 1 && setSlug(projects[idx + 1].slug)}
            disabled={idx >= projects.length - 1}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              background: 'none', border: 'none',
              color: idx < projects.length - 1 ? 'rgba(222,219,200,0.5)' : 'rgba(222,219,200,0.15)',
              cursor: idx < projects.length - 1 ? 'pointer' : 'default',
              fontSize: '12px', padding: '0',
              transition: 'color 0.3s',
            }}
            onMouseEnter={e => { if (idx < projects.length - 1) e.currentTarget.style.color = '#DEDBC8' }}
            onMouseLeave={e => { if (idx < projects.length - 1) e.currentTarget.style.color = 'rgba(222,219,200,0.5)' }}
          >
            {idx < projects.length - 1 ? projects[idx + 1].title : ''}
            <ArrowRight size={14} strokeWidth={1} />
          </button>
        </div>
      </div>
    </div>
  )
}
