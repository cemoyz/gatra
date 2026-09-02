import React, { useState, useRef, useEffect, createContext, useContext } from 'react'
import Link from 'next/link'

const DropdownContext = createContext({
  open: false,
  setOpen: () => {},
  triggerRef: null
})

export function DropdownMenu({ children, open: controlledOpen, onOpenChange }) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false)
  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : uncontrolledOpen
  const triggerRef = useRef(null)
  const menuRef = useRef(null)

  const setOpen = (val) => {
    if (!isControlled) setUncontrolledOpen(val)
    if (onOpenChange) onOpenChange(val)
  }

  // Click outside and escape key listener
  useEffect(() => {
    if (!open) return

    const handleClickOutside = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target)
      ) {
        setOpen(false)
      }
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  return (
    <DropdownContext.Provider value={{ open, setOpen, triggerRef, menuRef }}>
      <div style={{ position: 'relative', display: 'inline-block', zIndex: open ? 1200 : 'auto' }}>
        {children}
      </div>
    </DropdownContext.Provider>
  )
}

export function DropdownMenuTrigger({ children, asChild, className = '', ...props }) {
  const { open, setOpen, triggerRef } = useContext(DropdownContext)

  const handleClick = (e) => {
    e.stopPropagation()
    setOpen(!open)
  }

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      ref: triggerRef,
      onClick: (e) => {
        if (children.props.onClick) children.props.onClick(e)
        handleClick(e)
      },
      'aria-expanded': open,
      'aria-haspopup': true
    })
  }

  return (
    <button
      ref={triggerRef}
      type="button"
      onClick={handleClick}
      className={`dash-dropdown-trigger ${className}`}
      aria-expanded={open}
      aria-haspopup={true}
      style={{
        background: 'none',
        border: 'none',
        padding: 0,
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center'
      }}
      {...props}
    >
      {children}
    </button>
  )
}

export function DropdownMenuContent({
  children,
  align = 'end', // 'start' | 'center' | 'end'
  sideOffset = 8,
  width = '240px',
  className = '',
  style = {},
  ...props
}) {
  const { open, menuRef } = useContext(DropdownContext)

  if (!open) return null

  const alignStyles = {
    end: { right: 0 },
    start: { left: 0 },
    center: { left: '50%', transform: 'translateX(-50%)' }
  }

  return (
    <div
      ref={menuRef}
      className={`dash-dropdown-content ${className}`}
      style={{
        position: 'absolute',
        top: `calc(100% + ${sideOffset}px)`,
        ...(alignStyles[align] || alignStyles.end),
        width: width,
        maxWidth: '90vw',
        backgroundColor: 'var(--dash-card-bg)',
        border: '1px solid var(--dash-border)',
        borderRadius: '12px',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2), 0 8px 10px -6px rgba(0, 0, 0, 0.15)',
        padding: '6px',
        zIndex: 1300,
        animation: 'dashFadeSlideUp 0.18s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        boxSizing: 'border-box',
        ...style
      }}
      {...props}
    >
      {children}
    </div>
  )
}

export function DropdownMenuItem({
  children,
  onClick,
  href,
  target,
  icon,
  destructive = false,
  disabled = false,
  className = '',
  style = {},
  ...props
}) {
  const { setOpen } = useContext(DropdownContext)

  const handleClick = (e) => {
    if (disabled) return
    if (onClick) onClick(e)
    setOpen(false)
  }

  const itemStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    width: '100%',
    padding: '8px 12px',
    fontSize: '13px',
    fontWeight: 500,
    color: destructive ? '#ef4444' : 'var(--dash-text-main)',
    background: 'transparent',
    border: 'none',
    borderRadius: '8px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    textDecoration: 'none',
    boxSizing: 'border-box',
    textAlign: 'left',
    transition: 'background-color 0.12s ease, color 0.12s ease',
    userSelect: 'none',
    ...style
  }

  if (href) {
    return (
      <Link
        href={href}
        target={target}
        onClick={handleClick}
        className={`dash-dropdown-item ${destructive ? 'destructive' : ''} ${className}`}
        style={itemStyles}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = destructive ? 'rgba(239, 68, 68, 0.08)' : 'var(--dash-muted-bg)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent'
        }}
        {...props}
      >
        {icon && <i className={`fa ${icon}`} style={{ width: '16px', textAlign: 'center', opacity: 0.75 }}></i>}
        <span style={{ flex: 1 }}>{children}</span>
      </Link>
    )
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className={`dash-dropdown-item ${destructive ? 'destructive' : ''} ${className}`}
      style={itemStyles}
      onMouseEnter={(e) => {
        if (!disabled) e.currentTarget.style.backgroundColor = destructive ? 'rgba(239, 68, 68, 0.08)' : 'var(--dash-muted-bg)'
      }}
      onMouseLeave={(e) => {
        if (!disabled) e.currentTarget.style.backgroundColor = 'transparent'
      }}
      {...props}
    >
      {icon && <i className={`fa ${icon}`} style={{ width: '16px', textAlign: 'center', opacity: 0.75 }}></i>}
      <span style={{ flex: 1 }}>{children}</span>
    </button>
  )
}

export function DropdownMenuLabel({ children, className = '', style = {}, ...props }) {
  return (
    <div
      className={`dash-dropdown-label ${className}`}
      style={{
        padding: '8px 12px 6px',
        fontSize: '11.5px',
        fontWeight: 700,
        color: 'var(--dash-text-muted)',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        ...style
      }}
      {...props}
    >
      {children}
    </div>
  )
}

export function DropdownMenuSeparator({ className = '', style = {}, ...props }) {
  return (
    <div
      className={`dash-dropdown-separator ${className}`}
      style={{
        height: '1px',
        backgroundColor: 'var(--dash-border)',
        margin: '4px 0',
        ...style
      }}
      {...props}
    />
  )
}
