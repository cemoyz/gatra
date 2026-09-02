import React from 'react'

export const Badge = React.forwardRef(({
  children,
  variant = 'default', // 'default' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'success' | 'warning' | 'info'
  dot = false,
  className = '',
  style = {},
  ...props
}, ref) => {
  const variantStyles = {
    default: {
      background: 'var(--dash-primary, #da0105)',
      color: '#ffffff',
      border: '1px solid transparent'
    },
    secondary: {
      background: 'var(--dash-muted-bg)',
      color: 'var(--dash-text-main)',
      border: '1px solid var(--dash-border)'
    },
    destructive: {
      background: 'rgba(239, 68, 68, 0.12)',
      color: '#ef4444',
      border: '1px solid rgba(239, 68, 68, 0.25)'
    },
    outline: {
      background: 'transparent',
      color: 'var(--dash-text-muted)',
      border: '1px solid var(--dash-border)'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--dash-text-muted)',
      border: '1px solid transparent'
    },
    success: {
      background: 'rgba(16, 185, 129, 0.12)',
      color: '#10b981',
      border: '1px solid rgba(16, 185, 129, 0.25)'
    },
    warning: {
      background: 'rgba(245, 158, 11, 0.12)',
      color: '#f59e0b',
      border: '1px solid rgba(245, 158, 11, 0.25)'
    },
    info: {
      background: 'rgba(59, 130, 246, 0.12)',
      color: '#3b82f6',
      border: '1px solid rgba(59, 130, 246, 0.25)'
    },
    danger: {
      background: 'rgba(239, 68, 68, 0.12)',
      color: '#ef4444',
      border: '1px solid rgba(239, 68, 68, 0.25)'
    }
  }

  const activeStyle = variantStyles[variant] || variantStyles.default

  return (
    <span
      ref={ref}
      className={`dash-badge ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '4px',
        height: '20px',
        padding: '0 8px',
        fontSize: '11px',
        fontWeight: 600,
        borderRadius: '9999px',
        whiteSpace: 'nowrap',
        lineHeight: 1,
        ...activeStyle,
        ...style
      }}
      {...props}
    >
      {dot && (
        <span
          style={{
            width: '5px',
            height: '5px',
            borderRadius: '50%',
            backgroundColor: 'currentColor',
            display: 'inline-block'
          }}
        />
      )}
      {children}
    </span>
  )
})
Badge.displayName = 'Badge'
