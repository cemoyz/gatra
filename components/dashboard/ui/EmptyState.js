import React from 'react'

export function EmptyState({
  icon = 'fa-folder-open-o',
  title = 'Tidak Ada Data',
  description = 'Belum ada data atau rekaman yang tersedia saat ini.',
  action,
  style = {}
}) {
  return (
    <div
      style={{
        padding: '48px 24px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        ...style
      }}
    >
      <div
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '16px',
          background: 'var(--dash-muted-bg)',
          border: '1px solid var(--dash-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '22px',
          color: 'var(--dash-text-muted)',
          marginBottom: '16px'
        }}
      >
        <i className={`fa ${icon}`}></i>
      </div>
      <h4
        style={{
          fontSize: '16px',
          fontWeight: 700,
          color: 'var(--dash-text-main)',
          margin: '0 0 6px'
        }}
      >
        {title}
      </h4>
      <p
        style={{
          fontSize: '13px',
          color: 'var(--dash-text-muted)',
          margin: 0,
          maxWidth: '380px',
          lineHeight: 1.5
        }}
      >
        {description}
      </p>
      {action && <div style={{ marginTop: '16px' }}>{action}</div>}
    </div>
  )
}
