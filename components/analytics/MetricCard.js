export default function MetricCard({ label, value, detail, icon, accent }) {
  return (
    <section
      className="dash-card"
      aria-label={label}
      style={{ padding: '18px 20px', minWidth: 0, borderTop: `3px solid ${accent}` }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
        <div style={{ minWidth: 0 }}>
          <div style={{ color: 'var(--dash-text-muted)', fontSize: '13px', fontWeight: 600, lineHeight: 1.4 }}>
            {label}
          </div>
          <div style={{ marginTop: '10px', color: 'var(--dash-text-main)', fontSize: '26px', fontWeight: 800, lineHeight: 1.1, overflowWrap: 'anywhere' }}>
            {value}
          </div>
          <div style={{ marginTop: '7px', color: 'var(--dash-text-muted)', fontSize: '12px' }}>
            {detail}
          </div>
        </div>
        <span aria-hidden="true" style={{ color: accent, fontSize: '19px', flexShrink: 0 }}>
          <i className={`fa ${icon}`} />
        </span>
      </div>
    </section>
  )
}