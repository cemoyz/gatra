import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import Editor to prevent SSR issues in Next.js
const WysiwygEditor = dynamic(
  () => import('react-simple-wysiwyg').then((mod) => mod.default || mod),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          minHeight: '260px',
          background: 'var(--dash-card-bg)',
          border: '1px solid var(--dash-border)',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--dash-text-muted)',
          fontSize: '13px'
        }}
      >
        <i className="fa fa-spinner fa-spin" style={{ marginRight: '8px' }}></i>
        Memuat Editor Teks...
      </div>
    )
  }
)

export function RichTextEditor({
  value = '',
  onChange,
  placeholder = 'Tulis isi artikel berita di sini...',
  minHeight = '320px',
  className = '',
  style = {}
}) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div
        style={{
          minHeight,
          background: 'var(--dash-card-bg)',
          border: '1px solid var(--dash-border)',
          borderRadius: '8px',
          padding: '16px',
          color: 'var(--dash-text-muted)',
          fontSize: '13px'
        }}
      >
        Memuat editor...
      </div>
    )
  }

  return (
    <div
      className={`dash-wysiwyg-wrapper ${className}`}
      style={{
        border: '1px solid var(--dash-border)',
        borderRadius: '8px',
        overflow: 'hidden',
        background: 'var(--dash-card-bg)',
        ...style
      }}
    >
      <WysiwygEditor
        value={value}
        onChange={(e) => {
          if (onChange) onChange(e.target.value)
        }}
        placeholder={placeholder}
        containerProps={{
          style: {
            minHeight,
            border: 'none',
            fontFamily: 'inherit',
            fontSize: '14px',
            lineHeight: '1.7',
            color: 'var(--dash-text-main)',
            background: 'var(--dash-card-bg)'
          }
        }}
      />
    </div>
  )
}

export default RichTextEditor
