import React from 'react'

export const Input = React.forwardRef(({ className = '', style = {}, type = 'text', ...props }, ref) => (
  <input
    ref={ref}
    type={type}
    className={`dash-input ${className}`}
    style={{
      height: '36px',
      width: '100%',
      borderRadius: '8px',
      border: '1px solid var(--dash-border)',
      background: 'var(--dash-card-bg)',
      padding: '0 12px',
      fontSize: '13px',
      color: 'var(--dash-text-main)',
      outline: 'none',
      transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
      ...style
    }}
    {...props}
  />
))
Input.displayName = 'Input'

export const Textarea = React.forwardRef(({ className = '', style = {}, rows = 3, ...props }, ref) => (
  <textarea
    ref={ref}
    rows={rows}
    className={`dash-textarea ${className}`}
    style={{
      width: '100%',
      borderRadius: '8px',
      border: '1px solid var(--dash-border)',
      background: 'var(--dash-card-bg)',
      padding: '8px 12px',
      fontSize: '13px',
      color: 'var(--dash-text-main)',
      outline: 'none',
      minHeight: '70px',
      lineHeight: '1.5',
      transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
      ...style
    }}
    {...props}
  />
))
Textarea.displayName = 'Textarea'



export const Label = React.forwardRef(({ className = '', style = {}, children, ...props }, ref) => (
  <label
    ref={ref}
    className={`dash-label ${className}`}
    style={{
      display: 'block',
      fontSize: '12.5px',
      fontWeight: 600,
      color: 'var(--dash-text-main)',
      marginBottom: '6px',
      ...style
    }}
    {...props}
  >
    {children}
  </label>
))
Label.displayName = 'Label'

export const Switch = React.forwardRef(({ checked = false, onChange, id, className = '', style = {}, ...props }, ref) => {
  const isChecked = checked === true || checked === 'true'

  const handleChange = (e) => {
    if (!onChange) return
    e.checked = e.target.checked
    onChange(e)
  }

  return (
    <label
      className={`dash-switch ${className}`}
      style={{
        position: 'relative',
        display: 'inline-block',
        width: '42px',
        height: '24px',
        margin: 0,
        cursor: 'pointer',
        userSelect: 'none',
        ...style
      }}
    >
      <input
        ref={ref}
        id={id}
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
        style={{ opacity: 0, width: 0, height: 0, position: 'absolute' }}
        {...props}
      />
      <span
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: isChecked ? 'var(--dash-primary, #da0105)' : 'var(--dash-border, #cbd5e1)',
          transition: 'all 0.2s ease',
          borderRadius: '24px'
        }}
      >
        <span
          style={{
            position: 'absolute',
            content: '""',
            height: '18px',
            width: '18px',
            left: isChecked ? '21px' : '3px',
            bottom: '3px',
            backgroundColor: '#ffffff',
            transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
            borderRadius: '50%',
            boxShadow: '0 1px 3px rgba(0,0,0,0.25)'
          }}
        />
      </span>
    </label>
  )
})
Switch.displayName = 'Switch'
