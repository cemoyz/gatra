import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'

const numberFormat = new Intl.NumberFormat('id-ID')

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null

  return (
    <div style={{ padding: '10px 12px', border: '1px solid var(--dash-border)', borderRadius: '6px', background: 'var(--dash-card-bg)', boxShadow: 'var(--dash-shadow-lg)' }}>
      <strong style={{ display: 'block', marginBottom: '6px', color: 'var(--dash-text-main)', fontSize: '12px' }}>{label}</strong>
      {payload.map(item => (
        <div key={item.dataKey} style={{ display: 'flex', justifyContent: 'space-between', gap: '18px', color: item.color, fontSize: '12px', lineHeight: 1.8 }}>
          <span>{item.name}</span>
          <strong>{numberFormat.format(item.value || 0)}</strong>
        </div>
      ))}
    </div>
  )
}

export default function SearchPerformanceChart({ data = [] }) {
  const chartData = data.map(point => ({
    ...point,
    label: new Date(`${point.date}T00:00:00`).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })
  }))

  return (
    <div style={{ width: '100%', height: '310px', minWidth: 0 }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 10, right: 12, left: -14, bottom: 0 }}>
          <defs>
            <linearGradient id="analyticsClicksFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#dc2626" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#dc2626" stopOpacity={0.01} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="var(--dash-border)" strokeDasharray="3 4" vertical={false} />
          <XAxis dataKey="label" tick={{ fill: 'var(--dash-text-muted)', fontSize: 11 }} tickLine={false} axisLine={false} minTickGap={20} />
          <YAxis yAxisId="clicks" tick={{ fill: 'var(--dash-text-muted)', fontSize: 11 }} tickLine={false} axisLine={false} width={44} />
          <YAxis yAxisId="impressions" orientation="right" tick={{ fill: 'var(--dash-text-muted)', fontSize: 11 }} tickLine={false} axisLine={false} width={52} />
          <Tooltip content={<ChartTooltip />} />
          <Legend verticalAlign="top" align="right" height={34} iconType="circle" wrapperStyle={{ fontSize: '12px', color: 'var(--dash-text-muted)' }} />
          <Area yAxisId="clicks" type="monotone" dataKey="clicks" name="Klik" stroke="#dc2626" strokeWidth={2} fill="url(#analyticsClicksFill)" activeDot={{ r: 4 }} />
          <Line yAxisId="impressions" type="monotone" dataKey="impressions" name="Impresi" stroke="#0891b2" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}