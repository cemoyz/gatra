const ranges = [
  { value: '7d', label: '7 hari' },
  { value: '30d', label: '30 hari' }
]

export default function DateRangeSelect({ value, onChange, disabled = false }) {
  return (
    <div
      aria-label="Rentang tanggal analitik"
      role="group"
      style={{
        display: 'inline-flex',
        padding: '4px',
        gap: '3px',
        border: '1px solid var(--dash-border)',
        borderRadius: '8px',
        background: 'var(--dash-muted-bg)'
      }}
    >
      {ranges.map(range => {
        const selected = value === range.value
        return (
          <button
            key={range.value}
            type="button"
            aria-pressed={selected}
            disabled={disabled}
            onClick={() => onChange(range.value)}
            style={{
              minWidth: '76px',
              minHeight: '34px',
              padding: '0 10px',
              border: selected ? '1px solid var(--dash-border)' : '1px solid transparent',
              borderRadius: '5px',
              background: selected ? 'var(--dash-card-bg)' : 'transparent',
              color: selected ? 'var(--dash-text-main)' : 'var(--dash-text-muted)',
              boxShadow: selected ? '0 1px 2px rgba(15, 23, 42, 0.08)' : 'none',
              fontSize: '13px',
              fontWeight: selected ? 700 : 500,
              cursor: disabled ? 'wait' : 'pointer',
              opacity: disabled ? 0.65 : 1
            }}
          >
            {range.label}
          </button>
        )
      })}
    </div>
  )
}