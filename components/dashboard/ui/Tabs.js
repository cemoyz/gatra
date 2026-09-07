import React from 'react'

export function Tabs({ defaultValue, value, onValueChange, children, className = '', style = {} }) {
  const [activeTab, setActiveTab] = React.useState(value || defaultValue)

  React.useEffect(() => {
    if (value !== undefined) setActiveTab(value)
  }, [value])

  const handleTabChange = (val) => {
    setActiveTab(val)
    if (onValueChange) onValueChange(val)
  }

  return (
    <div className={`dash-tabs ${className}`} style={{ width: '100%', ...style }}>
      {React.Children.map(children, child => {
        if (!React.isValidElement(child)) return child
        return React.cloneElement(child, { activeTab, onTabChange: handleTabChange })
      })}
    </div>
  )
}

export function TabsList({ activeTab, onTabChange, children, className = '', style = {} }) {
  return (
    <div
      className={`dash-tabs-list dash-tabs-nav ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        background: 'var(--dash-muted-bg)',
        padding: '4px',
        borderRadius: '10px',
        border: '1px solid var(--dash-border)',
        gap: '4px',
        marginBottom: '24px',
        maxWidth: '100%',
        overflowX: 'auto',
        ...style
      }}
    >
      {React.Children.map(children, child => {
        if (!React.isValidElement(child)) return child
        return React.cloneElement(child, {
          isActive: activeTab === child.props.value,
          onClick: () => onTabChange(child.props.value)
        })
      })}
    </div>
  )
}

export function TabsTrigger({ value, isActive, onClick, icon, children, className = '', style = {} }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`dash-tabs-trigger ${isActive ? 'active' : ''} ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 16px',
        borderRadius: '7px',
        fontSize: '13px',
        fontWeight: 600,
        cursor: 'pointer',
        border: 'none',
        background: isActive ? 'var(--dash-card-bg)' : 'transparent',
        color: isActive ? 'var(--dash-text-main)' : 'var(--dash-text-muted)',
        boxShadow: isActive ? '0 1px 3px rgba(0, 0, 0, 0.08)' : 'none',
        transition: 'all 0.15s ease',
        userSelect: 'none',
        ...style
      }}
    >
      {icon && <i className={`fa ${icon}`} style={{ opacity: isActive ? 1 : 0.7 }}></i>}
      <span>{children}</span>
    </button>
  )
}

export function TabsContent({ value, activeTab, children, className = '', style = {} }) {
  if (value !== activeTab) return null

  return (
    <div
      className={`dash-tabs-content ${className}`}
      style={{
        animation: 'dashFadeSlideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        ...style
      }}
    >
      {children}
    </div>
  )
}
