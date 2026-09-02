import React, { useState, useRef, useEffect, createContext, useContext } from 'react'

const SelectContext = createContext({
  value: '',
  onValueChange: () => {},
  open: false,
  setOpen: () => {},
  triggerRef: null,
  selectedLabel: ''
})

export function Select({
  value,
  defaultValue = '',
  onValueChange,
  onChange,
  children,
  placeholder = 'Pilih opsi...',
  options,
  disabled = false,
  className = '',
  style = {}
}) {
  const [internalValue, setInternalValue] = useState(value !== undefined ? value : defaultValue)
  const [open, setOpen] = useState(false)
  const [selectedLabel, setSelectedLabel] = useState('')
  const triggerRef = useRef(null)
  const containerRef = useRef(null)

  const currentValue = value !== undefined ? value : internalValue

  const handleValueChange = (val, label) => {
    if (value === undefined) setInternalValue(val)
    if (label) setSelectedLabel(label)
    if (onValueChange) onValueChange(val)
    if (onChange) {
      onChange({ target: { value: val, name: val } })
    }
    setOpen(false)
  }

  // Click outside and escape key listener
  useEffect(() => {
    if (!open) return
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  // Detect if children are <option> elements
  let parsedOptions = options
  if (!parsedOptions && React.Children.count(children) > 0) {
    const childArray = React.Children.toArray(children)
    const hasOptions = childArray.some((c) => React.isValidElement(c) && c.type === 'option')
    if (hasOptions) {
      parsedOptions = childArray
        .filter((c) => React.isValidElement(c) && c.type === 'option')
        .map((c) => ({
          value: c.props.value,
          label: c.props.children
        }))
    }
  }

  // Options Mode (explicit options prop OR <option> children)
  if (Array.isArray(parsedOptions)) {
    const selectedOption = parsedOptions.find(
      (o) => (typeof o === 'object' ? String(o.value) === String(currentValue) : String(o) === String(currentValue))
    )
    const displayLabel = selectedOption
      ? (typeof selectedOption === 'object' ? selectedOption.label : selectedOption)
      : placeholder

    const isFullWidth = style.width === '100%'

    return (
      <div
        ref={containerRef}
        className={`dash-select-wrapper ${className}`}
        style={{
          position: 'relative',
          display: isFullWidth ? 'block' : 'inline-block',
          verticalAlign: 'middle',
          width: style.width || (isFullWidth ? '100%' : 'auto'),
          ...style
        }}
      >
        <button
          type="button"
          disabled={disabled}
          onClick={() => setOpen(!open)}
          className="dash-select-trigger"
          style={{
            height: '36px',
            width: '100%',
            minWidth: style.minWidth || (isFullWidth ? 'auto' : '130px'),
            padding: '0 12px',
            borderRadius: '8px',
            border: open ? '1px solid var(--dash-text-main)' : '1px solid var(--dash-border)',
            background: 'var(--dash-card-bg)',
            color: 'var(--dash-text-main)',
            fontSize: '13px',
            fontWeight: 500,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '8px',
            cursor: disabled ? 'not-allowed' : 'pointer',
            outline: 'none',
            whiteSpace: 'nowrap',
            boxShadow: open ? '0 0 0 2px rgba(9, 13, 22, 0.08)' : 'none',
            transition: 'all 0.15s ease'
          }}
        >
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', textAlign: 'left', flex: 1 }}>
            {displayLabel}
          </span>
          <i
            className="fa fa-chevron-down"
            style={{
              fontSize: '10px',
              color: 'var(--dash-text-muted)',
              transform: open ? 'rotate(180deg)' : 'none',
              transition: 'transform 0.2s ease',
              flexShrink: 0
            }}
          />
        </button>

        {open && (
          <div
            className="dash-select-content"
            style={{
              position: 'absolute',
              top: 'calc(100% + 4px)',
              left: 0,
              right: 0,
              width: '100%',
              minWidth: '100%',
              maxHeight: '260px',
              overflowY: 'auto',
              backgroundColor: 'var(--dash-card-bg)',
              border: '1px solid var(--dash-border)',
              borderRadius: '10px',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
              padding: '4px',
              zIndex: 1100,
              animation: 'dashFadeSlideUp 0.15s ease forwards',
              boxSizing: 'border-box'
            }}
          >
            {parsedOptions.map((opt, idx) => {
              const optVal = typeof opt === 'object' ? opt.value : opt
              const optLabel = typeof opt === 'object' ? opt.label : opt
              const isSelected = String(optVal) === String(currentValue)

              return (
                <div
                  key={`${optVal}-${idx}`}
                  onClick={() => handleValueChange(optVal, optLabel)}
                  className="dash-select-item"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 10px',
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontWeight: isSelected ? 600 : 400,
                    color: isSelected ? 'var(--dash-primary)' : 'var(--dash-text-main)',
                    backgroundColor: isSelected ? 'var(--dash-muted-bg)' : 'transparent',
                    cursor: 'pointer',
                    transition: 'background-color 0.1s ease',
                    whiteSpace: 'nowrap'
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) e.currentTarget.style.backgroundColor = 'var(--dash-muted-bg)'
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) e.currentTarget.style.backgroundColor = 'transparent'
                  }}
                >
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {optLabel}
                  </span>
                  {isSelected && <i className="fa fa-check" style={{ fontSize: '11px', color: 'var(--dash-primary)', marginLeft: '8px', flexShrink: 0 }} />}
                </div>
              )
            })}
          </div>
        )}
      </div>
    )
  }

  // Composed Subcomponents Mode
  return (
    <SelectContext.Provider
      value={{
        value: currentValue,
        onValueChange: handleValueChange,
        open,
        setOpen,
        triggerRef,
        placeholder,
        selectedLabel,
        setSelectedLabel,
        disabled
      }}
    >
      <div
        ref={containerRef}
        className={`dash-select-wrapper ${className}`}
        style={{
          position: 'relative',
          display: style.width === '100%' ? 'block' : 'inline-block',
          verticalAlign: 'middle',
          width: style.width || 'auto',
          ...style
        }}
      >
        {children}
      </div>
    </SelectContext.Provider>
  )
}

export function SelectTrigger({ children, className = '', style = {}, ...props }) {
  const { open, setOpen, triggerRef, disabled } = useContext(SelectContext)

  return (
    <button
      ref={triggerRef}
      type="button"
      disabled={disabled}
      onClick={() => setOpen(!open)}
      className={`dash-select-trigger ${className}`}
      aria-expanded={open}
      style={{
        height: '36px',
        width: '100%',
        minWidth: style.minWidth || '120px',
        padding: '0 12px',
        borderRadius: '8px',
        border: open ? '1px solid var(--dash-text-main)' : '1px solid var(--dash-border)',
        background: 'var(--dash-card-bg)',
        color: 'var(--dash-text-main)',
        fontSize: '13px',
        fontWeight: 500,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '8px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        outline: 'none',
        whiteSpace: 'nowrap',
        boxShadow: open ? '0 0 0 2px rgba(9, 13, 22, 0.08)' : 'none',
        transition: 'all 0.15s ease',
        ...style
      }}
      {...props}
    >
      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', textAlign: 'left', flex: 1 }}>
        {children}
      </span>
      <i
        className="fa fa-chevron-down"
        style={{
          fontSize: '10px',
          color: 'var(--dash-text-muted)',
          transform: open ? 'rotate(180deg)' : 'none',
          transition: 'transform 0.2s ease',
          flexShrink: 0
        }}
      />
    </button>
  )
}

export function SelectValue({ placeholder: customPlaceholder, className = '', children }) {
  const { value, placeholder, selectedLabel } = useContext(SelectContext)
  const displayText = selectedLabel || children || (value !== '' && value !== undefined ? String(value) : (customPlaceholder || placeholder))

  return (
    <span className={`dash-select-value ${className}`} style={{ color: value ? 'var(--dash-text-main)' : 'var(--dash-text-muted)', whiteSpace: 'nowrap' }}>
      {displayText}
    </span>
  )
}

export function SelectContent({ children, align = 'start', width, className = '', style = {}, ...props }) {
  const { open } = useContext(SelectContext)

  if (!open) return null

  return (
    <div
      className={`dash-select-content ${className}`}
      style={{
        position: 'absolute',
        top: 'calc(100% + 4px)',
        left: 0,
        right: 0,
        width: width || '100%',
        minWidth: '100%',
        maxHeight: '260px',
        overflowY: 'auto',
        backgroundColor: 'var(--dash-card-bg)',
        border: '1px solid var(--dash-border)',
        borderRadius: '10px',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        padding: '4px',
        zIndex: 1100,
        animation: 'dashFadeSlideUp 0.15s ease forwards',
        boxSizing: 'border-box',
        ...style
      }}
      {...props}
    >
      {children}
    </div>
  )
}

export function SelectItem({ value: itemValue, children, className = '', style = {}, disabled = false, ...props }) {
  const { value, onValueChange, setSelectedLabel } = useContext(SelectContext)
  const isSelected = String(value) === String(itemValue)

  // Register label on mount if selected
  useEffect(() => {
    if (isSelected && typeof children === 'string') {
      setSelectedLabel(children)
    }
  }, [isSelected, children, setSelectedLabel])

  const handleClick = (e) => {
    e.stopPropagation()
    if (disabled) return
    const label = typeof children === 'string' ? children : String(itemValue)
    onValueChange(itemValue, label)
  }

  return (
    <div
      onClick={handleClick}
      className={`dash-select-item ${isSelected ? 'selected' : ''} ${className}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 10px',
        borderRadius: '6px',
        fontSize: '13px',
        fontWeight: isSelected ? 600 : 400,
        color: isSelected ? 'var(--dash-primary)' : 'var(--dash-text-main)',
        backgroundColor: isSelected ? 'var(--dash-muted-bg)' : 'transparent',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        transition: 'background-color 0.1s ease',
        userSelect: 'none',
        whiteSpace: 'nowrap',
        ...style
      }}
      onMouseEnter={(e) => {
        if (!isSelected && !disabled) e.currentTarget.style.backgroundColor = 'var(--dash-muted-bg)'
      }}
      onMouseLeave={(e) => {
        if (!isSelected && !disabled) e.currentTarget.style.backgroundColor = 'transparent'
      }}
      {...props}
    >
      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {children}
      </span>
      {isSelected && <i className="fa fa-check" style={{ fontSize: '11px', color: 'var(--dash-primary)', marginLeft: '8px', flexShrink: 0 }} />}
    </div>
  )
}

export function SelectGroup({ children, className = '', ...props }) {
  return (
    <div className={`dash-select-group ${className}`} style={{ padding: '2px 0' }} {...props}>
      {children}
    </div>
  )
}

export function SelectLabel({ children, className = '', style = {}, ...props }) {
  return (
    <div
      className={`dash-select-label ${className}`}
      style={{
        padding: '6px 10px 4px',
        fontSize: '11px',
        fontWeight: 700,
        color: 'var(--dash-text-muted)',
        textTransform: 'uppercase',
        letterSpacing: '0.6px',
        ...style
      }}
      {...props}
    >
      {children}
    </div>
  )
}

export function SelectSeparator({ className = '', style = {}, ...props }) {
  return (
    <div
      className={`dash-select-separator ${className}`}
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
