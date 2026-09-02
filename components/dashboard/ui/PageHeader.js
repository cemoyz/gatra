import React from 'react'

export function PageHeader({
  title,
  description,
  badge,
  icon,
  actions,
  children
}) {
  return (
    <div
      className="dash-page-header"
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        gap: '16px',
        marginBottom: '24px'
      }}
    >
      <div style={{ maxWidth: '680px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
          {icon && (
            <i
              className={`fa ${icon}`}
              style={{ fontSize: '20px', color: 'var(--dash-text-main)', opacity: 0.85 }}
            ></i>
          )}
          <h1
            style={{
              fontSize: '24px',
              fontWeight: 800,
              color: 'var(--dash-text-main)',
              margin: 0,
              letterSpacing: '-0.5px',
              lineHeight: 1.2
            }}
          >
            {title}
          </h1>
          {badge && (
            <span
              className="dash-badge"
              style={{
                fontSize: '11px',
                fontWeight: 700,
                padding: '3px 9px',
                borderRadius: '20px'
              }}
            >
              {badge}
            </span>
          )}
        </div>
        {description && (
          <p
            style={{
              fontSize: '13.5px',
              color: 'var(--dash-text-muted)',
              margin: 0,
              lineHeight: 1.5
            }}
          >
            {description}
          </p>
        )}
      </div>

      {actions && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          {actions}
        </div>
      )}

      {children}
    </div>
  )
}
