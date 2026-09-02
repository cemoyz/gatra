import React from 'react'

export const Button = React.forwardRef(({
  children,
  variant = 'default', // 'default' | 'outline' | 'secondary' | 'ghost' | 'destructive' | 'link'
  size = 'default', // 'default' (h-8) | 'sm' (h-7) | 'lg' (h-9) | 'icon' (size-8) | 'icon-sm' (size-7)
  className = '',
  style = {},
  disabled = false,
  loading = false,
  icon,
  type = 'button',
  ...props
}, ref) => {
  const variantStyles = {
    default: {
      background: 'var(--dash-primary, #da0105)',
      color: '#ffffff',
      border: '1px solid transparent'
    },
    outline: {
      background: 'transparent',
      color: 'var(--dash-text-main)',
      border: '1px solid var(--dash-border)'
    },
    secondary: {
      background: 'var(--dash-muted-bg)',
      color: 'var(--dash-text-main)',
      border: '1px solid var(--dash-border)'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--dash-text-muted)',
      border: '1px solid transparent'
    },
    destructive: {
      background: 'rgba(239, 68, 68, 0.12)',
      color: '#ef4444',
      border: '1px solid rgba(239, 68, 68, 0.25)'
    },
    link: {
      background: 'transparent',
      color: 'var(--dash-primary, #da0105)',
      border: 'none',
      textDecoration: 'underline'
    }
  }

  const sizeStyles = {
    default: { height: '34px', padding: '0 12px', fontSize: '13px', borderRadius: '8px' },
    sm: { height: '28px', padding: '0 9px', fontSize: '12px', borderRadius: '7px' },
    lg: { height: '38px', padding: '0 16px', fontSize: '14px', borderRadius: '10px' },
    icon: { width: '32px', height: '32px', padding: 0, fontSize: '13px', borderRadius: '8px', justifyContent: 'center' },
    'icon-sm': { width: '28px', height: '28px', padding: 0, fontSize: '12px', borderRadius: '7px', justifyContent: 'center' }
  }

  const activeVariant = variantStyles[variant] || variantStyles.default
  const activeSize = sizeStyles[size] || sizeStyles.default

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      className={`dash-btn dash-btn-${variant} ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        fontWeight: 600,
        cursor: disabled || loading ? 'not-allowed' : 'pointer',
        opacity: disabled || loading ? 0.6 : 1,
        transition: 'all 0.15s ease',
        userSelect: 'none',
        ...activeVariant,
        ...activeSize,
        ...style
      }}
      {...props}
    >
      {loading ? (
        <i className="fa fa-spinner fa-spin"></i>
      ) : icon ? (
        <i className={`fa ${icon}`}></i>
      ) : null}
      {children}
    </button>
  )
})
Button.displayName = 'Button'
