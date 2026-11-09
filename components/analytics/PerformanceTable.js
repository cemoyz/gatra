const numberFormat = new Intl.NumberFormat('id-ID')

function formatCell(value, format) {
  if (format === 'number') return numberFormat.format(value || 0)
  if (format === 'percent') return `${Number(value || 0).toFixed(2)}%`
  if (format === 'position') return Number(value || 0).toFixed(1)
  return value
}

export default function PerformanceTable({ title, description, rows = [], columns, rowKey }) {
  return (
    <section className="dash-card" style={{ minWidth: 0, overflow: 'hidden' }}>
      <header style={{ padding: '17px 20px', borderBottom: '1px solid var(--dash-border)' }}>
        <h2 style={{ margin: 0, color: 'var(--dash-text-main)', fontSize: '15px', fontWeight: 750 }}>{title}</h2>
        {description && <p style={{ margin: '5px 0 0', color: 'var(--dash-text-muted)', fontSize: '12px' }}>{description}</p>}
      </header>
      <div style={{ width: '100%', overflowX: 'auto' }}>
        <table style={{ width: '100%', minWidth: '520px', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr>
              {columns.map(column => (
                <th key={column.key} scope="col" style={{ padding: '11px 16px', background: 'var(--dash-muted-bg)', color: 'var(--dash-text-muted)', fontSize: '11px', fontWeight: 700, whiteSpace: 'nowrap' }}>
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={rowKey ? row[rowKey] : index} style={{ borderTop: '1px solid var(--dash-border)' }}>
                {columns.map(column => (
                  <td key={column.key} style={{ padding: '12px 16px', color: column.primary ? 'var(--dash-text-main)' : 'var(--dash-text-muted)', fontSize: '12px', fontWeight: column.primary ? 650 : 500, maxWidth: column.primary ? '280px' : 'none', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={String(row[column.key] ?? '')}>
                    {formatCell(row[column.key], column.format)}
                  </td>
                ))}
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={columns.length} style={{ padding: '24px 16px', color: 'var(--dash-text-muted)', textAlign: 'center', fontSize: '13px' }}>
                  Belum ada data untuk rentang ini.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}