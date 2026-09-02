import React from 'react'
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts'

// Custom Tooltip for Activity Insights
function CustomActivityTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    const desktopItem = payload.find(p => p.dataKey === 'desktop')
    const mobileItem = payload.find(p => p.dataKey === 'mobile')
    const desktopVal = desktopItem?.value || 0
    const mobileVal = mobileItem?.value || 0
    const total = desktopVal + mobileVal

    return (
      <div
        style={{
          background: 'var(--dash-card-bg)',
          border: '1px solid var(--dash-border)',
          borderRadius: '10px',
          padding: '10px 14px',
          boxShadow: 'var(--dash-shadow-lg)',
          fontSize: '12px',
          minWidth: '170px'
        }}
      >
        <div style={{ fontWeight: 700, color: 'var(--dash-text-main)', marginBottom: '6px', borderBottom: '1px solid var(--dash-border)', paddingBottom: '4px' }}>
          {label}
        </div>

        {/* Desktop Stat */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
          <span style={{ color: 'var(--dash-text-muted)', fontWeight: 500 }}>
            🖥️ Desktop:
          </span>
          <strong style={{ color: 'var(--dash-text-main)' }}>
            {desktopVal.toLocaleString()}
          </strong>
        </div>

        {/* Mobile Stat */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
          <span style={{ color: 'var(--dash-text-muted)', fontWeight: 500 }}>
            📱 Mobile:
          </span>
          <strong style={{ color: 'var(--dash-text-main)' }}>
            {mobileVal.toLocaleString()}
          </strong>
        </div>

        {/* Total Stat */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px dashed var(--dash-border)', paddingTop: '4px', marginTop: '4px' }}>
          <span style={{ color: 'var(--dash-text-muted)', fontWeight: 500 }}>Total:</span>
          <strong style={{ color: 'var(--dash-text-main)' }}>{total.toLocaleString()}</strong>
        </div>
      </div>
    )
  }
  return null
}

// 1. Revenue / Views Sparkline Area Chart (Synchronized animation)
export function RevenueChart({ data, animKey = 'default' }) {
  const defaultData = [
    { month: 'Jan', desktop: 145 },
    { month: 'Feb', desktop: 278 },
    { month: 'Mar', desktop: 192 },
    { month: 'Apr', desktop: 356 },
    { month: 'May', desktop: 221 },
    { month: 'Jun', desktop: 174 }
  ]

  const chartData = data && data.length > 0 ? data : defaultData

  return (
    <div style={{ width: '100%', height: '110px', position: 'relative' }}>
      <ResponsiveContainer width="100%" height={110}>
        <AreaChart
          key={animKey}
          data={chartData}
          margin={{ left: 0, right: 0, top: 8, bottom: 0 }}
        >
          <defs>
            <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--dash-chart-1)" stopOpacity={0.35} />
              <stop offset="100%" stopColor="var(--dash-chart-1)" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <XAxis hide dataKey="month" />
          <Area
            dataKey="desktop"
            type="monotone"
            fill="url(#revenueGrad)"
            stroke="var(--dash-chart-1)"
            strokeWidth={2.5}
            isAnimationActive={true}
            animationDuration={1400}
            animationBegin={0}
            animationEasing="ease-out"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

// 2. Visitors / Articles Bar Chart (Synchronized animation)
export function VisitorsChart({ data, animKey = 'default' }) {
  const defaultData = [
    { month: 'Jan', desktop: 163 },
    { month: 'Feb', desktop: 305 },
    { month: 'Mar', desktop: 187 },
    { month: 'Apr', desktop: 342 },
    { month: 'May', desktop: 256 },
    { month: 'Jun', desktop: 198 }
  ]

  const chartData = data && data.length > 0 ? data : defaultData

  return (
    <div style={{ width: '100%', height: '110px', position: 'relative' }}>
      <ResponsiveContainer width="100%" height={110}>
        <BarChart
          key={animKey}
          data={chartData}
          margin={{ left: 0, right: 0, top: 8, bottom: 0 }}
          barSize={18}
        >
          <XAxis hide dataKey="month" />
          <Bar
            dataKey="desktop"
            fill="var(--dash-chart-1)"
            radius={[6, 6, 0, 0]}
            isAnimationActive={true}
            animationDuration={1400}
            animationBegin={0}
            animationEasing="ease-out"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

// 3. Activity Insights Chart (Synchronized animation)
export function ActivityInsightsChart({ data, animKey = 'default' }) {
  const defaultData = [
    { month: 'Jan', desktop: 186, mobile: 80 },
    { month: 'Feb', desktop: 305, mobile: 200 },
    { month: 'Mar', desktop: 237, mobile: 120 },
    { month: 'Apr', desktop: 73, mobile: 190 },
    { month: 'May', desktop: 209, mobile: 130 },
    { month: 'Jun', desktop: 214, mobile: 140 }
  ]

  const chartData = data && data.length > 0 ? data : defaultData

  return (
    <div style={{ width: '100%', height: '260px', position: 'relative' }}>
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart
          key={animKey}
          data={chartData}
          margin={{ left: 0, right: 0, top: 10, bottom: 0 }}
        >
          <defs>
            <linearGradient id="mobileGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--dash-chart-2)" stopOpacity={0.6} />
              <stop offset="100%" stopColor="var(--dash-chart-2)" stopOpacity={0.05} />
            </linearGradient>
            <linearGradient id="desktopGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--dash-chart-1)" stopOpacity={0.4} />
              <stop offset="100%" stopColor="var(--dash-chart-1)" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke="var(--dash-border)" strokeDasharray="3 3" />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tick={{ fill: 'var(--dash-text-muted)', fontSize: 12 }}
          />

          <Tooltip content={<CustomActivityTooltip />} />

          <Legend
            verticalAlign="bottom"
            wrapperStyle={{ paddingTop: '10px', fontSize: '12px' }}
            formatter={(value) => {
              if (value === 'desktop') return <span style={{ color: 'var(--dash-text-main)', fontWeight: 600, marginRight: '16px' }}>Pembaca / Desktop</span>
              if (value === 'mobile') return <span style={{ color: 'var(--dash-text-muted)', fontWeight: 600 }}>Interaksi / Mobile</span>
              return value
            }}
          />

          {/* Layer 1: Mobile (Interaksi / Mobile) */}
          <Area
            name="mobile"
            dataKey="mobile"
            type="natural"
            fill="url(#mobileGrad)"
            stroke="var(--dash-chart-2)"
            fillOpacity={1}
            stackId="a"
            strokeWidth={2}
            isAnimationActive={true}
            animationDuration={1400}
            animationBegin={0}
            animationEasing="ease-out"
          />

          {/* Layer 2: Desktop (Pembaca / Desktop) */}
          <Area
            name="desktop"
            dataKey="desktop"
            type="natural"
            fill="url(#desktopGrad)"
            stroke="var(--dash-chart-1)"
            fillOpacity={1}
            stackId="a"
            strokeWidth={2}
            isAnimationActive={true}
            animationDuration={1400}
            animationBegin={0}
            animationEasing="ease-out"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
