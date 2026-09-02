import React from 'react'

export function Toast({ toast, onClose }) {
  if (!toast) return null

  const isError = toast.type === 'error'
  const isWarning = toast.type === 'warning'
  const isInfo = toast.type === 'info'

  let iconClass = 'fa-check-circle'
  let borderColor = '#10b981'
  let iconColor = '#10b981'

  if (isError) {
    iconClass = 'fa-exclamation-circle'
    borderColor = '#ef4444'
    iconColor = '#ef4444'
  } else if (isWarning) {
    iconClass = 'fa-exclamation-triangle'
    borderColor = '#f59e0b'
    iconColor = '#f59e0b'
  } else if (isInfo) {
    iconClass = 'fa-info-circle'
    borderColor = '#3b82f6'
    iconColor = '#3b82f6'
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: '24px',
        right: '24px',
        background: 'var(--dash-card-bg)',
        border: `1px solid ${borderColor}`,
        borderRadius: '12px',
        padding: '12px 18px',
        boxShadow: 'var(--dash-shadow-lg)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        zIndex: 9999,
        fontSize: '13.5px',
        fontWeight: 600,
        color: 'var(--dash-text-main)',
        animation: 'dashFadeSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        maxWidth: '90vw'
      }}
    >
      <i className={`fa ${iconClass}`} style={{ color: iconColor, fontSize: '17px' }}></i>
      <span style={{ flex: 1 }}>{toast.msg || toast.message || toast}</span>
      {onClose && (
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--dash-text-muted)',
            cursor: 'pointer',
            padding: '2px 4px',
            fontSize: '13px'
          }}
        >
          <i className="fa fa-times"></i>
        </button>
      )}
    </div>
  )
}
