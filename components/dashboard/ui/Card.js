import React from 'react'

export const Card = React.forwardRef(({ className = '', style = {}, children, ...props }, ref) => (
  <div
    ref={ref}
    className={`dash-card ${className}`}
    style={{
      background: 'var(--dash-card-bg)',
      border: '1px solid var(--dash-border)',
      borderRadius: 'var(--dash-radius, 12px)',
      boxShadow: 'var(--dash-shadow, 0 1px 3px 0 rgba(0, 0, 0, 0.05))',
      color: 'var(--dash-text-main)',
      position: 'relative',
      overflow: 'hidden',
      ...style
    }}
    {...props}
  >
    {children}
  </div>
))
Card.displayName = 'Card'

export const CardHeader = React.forwardRef(({ className = '', style = {}, children, ...props }, ref) => (
  <div
    ref={ref}
    className={`dash-card-header ${className}`}
    style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '18px 22px',
      borderBottom: '1px solid var(--dash-border)',
      gap: '12px',
      flexWrap: 'wrap',
      ...style
    }}
    {...props}
  >
    {children}
  </div>
))
CardHeader.displayName = 'CardHeader'

export const CardTitle = React.forwardRef(({ className = '', style = {}, icon, children, ...props }, ref) => (
  <h3
    ref={ref}
    className={`dash-card-title ${className}`}
    style={{
      fontSize: '15px',
      fontWeight: 600,
      color: 'var(--dash-text-main)',
      letterSpacing: '-0.2px',
      margin: 0,
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      lineHeight: 1.2,
      ...style
    }}
    {...props}
  >
    {icon && <i className={`fa ${icon}`} style={{ opacity: 0.75 }}></i>}
    {children}
  </h3>
))
CardTitle.displayName = 'CardTitle'

export const CardDescription = React.forwardRef(({ className = '', style = {}, children, ...props }, ref) => (
  <p
    ref={ref}
    className={`dash-card-desc ${className}`}
    style={{
      fontSize: '12.5px',
      color: 'var(--dash-text-muted)',
      margin: '3px 0 0',
      lineHeight: 1.4,
      ...style
    }}
    {...props}
  >
    {children}
  </p>
))
CardDescription.displayName = 'CardDescription'

export const CardContent = React.forwardRef(({ className = '', style = {}, children, ...props }, ref) => (
  <div
    ref={ref}
    className={`dash-card-content ${className}`}
    style={{
      padding: '20px 22px',
      ...style
    }}
    {...props}
  >
    {children}
  </div>
))
CardContent.displayName = 'CardContent'

// Alias for backward compatibility with CardBody
export const CardBody = CardContent

export const CardFooter = React.forwardRef(({ className = '', style = {}, children, ...props }, ref) => (
  <div
    ref={ref}
    className={`dash-card-footer ${className}`}
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '14px 22px',
      borderTop: '1px solid var(--dash-border)',
      background: 'var(--dash-muted-bg)',
      gap: '12px',
      flexWrap: 'wrap',
      ...style
    }}
    {...props}
  >
    {children}
  </div>
))
CardFooter.displayName = 'CardFooter'

export const CardLoadingOverlay = ({ loading, text = 'Memuat data...' }) => {
  if (!loading) return null
  return (
    <div className="dash-card-overlay">
      <div
        style={{
          width: '32px',
          height: '32px',
          border: '3px solid rgba(148, 163, 184, 0.25)',
          borderTopColor: '#da0105',
          borderRadius: '50%',
          animation: 'dashSpin 0.7s linear infinite'
        }}
      />
      {text && (
        <span style={{ marginTop: '12px', fontSize: '13px', fontWeight: 600, color: 'var(--dash-text-muted)' }}>
          {text}
        </span>
      )}
      <style jsx>{`
        @keyframes dashSpin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
