import DashboardLayout from '@/components/dashboard/DashboardLayout'
import DateRangeSelect from '@/components/analytics/DateRangeSelect'
import MetricCard from '@/components/analytics/MetricCard'
import PerformanceTable from '@/components/analytics/PerformanceTable'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const SearchPerformanceChart = dynamic(
  () => import('@/components/analytics/SearchPerformanceChart'),
  { ssr: false, loading: () => <div style={{ height: '310px' }} /> }
)

const numberFormat = new Intl.NumberFormat('id-ID')

export default function AnalyticsDashboard() {
  const [range, setRange] = useState('7d')
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let active = true
    setLoading(true)
    setError(null)

    fetch(`/api/analytics?range=${range}`)
      .then(async response => {
        const result = await response.json()
        if (!response.ok || !result.success) {
          const requestError = new Error(result.message || 'Data Search Console gagal dimuat.')
          requestError.code = result.code
          throw requestError
        }
        return result.data
      })
      .then(result => {
        if (active) setData(result)
      })
      .catch(requestError => {
        if (active) {
          setData(null)
          setError({ code: requestError.code, message: requestError.message })
        }
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => { active = false }
  }, [range])

  const search = data?.searchConsole
  const summary = search?.summary
  const displayMetric = value => loading ? '…' : (data ? value : '—')

  return (
    <DashboardLayout title="Analytics & SEO">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <header style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ color: 'var(--dash-text-muted)', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '5px' }}>Performa pencarian & pembaca</div>
            <h1 style={{ margin: 0, color: 'var(--dash-text-main)', fontSize: '24px', fontWeight: 800 }}>Analytics & SEO</h1>
          </div>
          <DateRangeSelect value={range} onChange={setRange} disabled={loading} />
        </header>

        {error && (
          <div role="alert" className="alert alert-warning" style={{ margin: 0 }}>
            <strong>{error.code === 'GOOGLE_NOT_CONFIGURED' ? 'Search Console belum terhubung.' : 'Data Search Console tidak tersedia.'}</strong>{' '}
            {error.message}
            {error.code === 'GOOGLE_NOT_CONFIGURED' && ' Isi Service Account JSON serta Properti Search Console pada Pengaturan Website. Pastikan API Search Console aktif dan service account memiliki akses ke properti tersebut.'}
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(185px, 1fr))', gap: '14px' }}>
          <MetricCard label="Klik dari Google" value={displayMetric(numberFormat.format(summary?.clicks || 0))} detail="Search Console · klik web" icon="fa-mouse-pointer" accent="#dc2626" />
          <MetricCard label="Impresi" value={displayMetric(numberFormat.format(summary?.impressions || 0))} detail="Search Console · tampilan hasil" icon="fa-eye" accent="#0891b2" />
          <MetricCard label="CTR rata-rata" value={displayMetric(`${(summary?.ctr || 0).toFixed(2)}%`)} detail="Klik dibanding impresi" icon="fa-percent" accent="#d97706" />
          <MetricCard label="Posisi rata-rata" value={displayMetric((summary?.position || 0).toFixed(1))} detail="Search Console · posisi hasil" icon="fa-line-chart" accent="#15803d" />
        </div>

        <section className="dash-card" style={{ padding: '18px 20px 10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px', marginBottom: '6px' }}>
            <div>
              <h2 style={{ margin: 0, color: 'var(--dash-text-main)', fontSize: '15px', fontWeight: 750 }}>Klik & impresi dari Google Search</h2>
              <p style={{ margin: '5px 0 0', color: 'var(--dash-text-muted)', fontSize: '12px' }}>Pergerakan performa harian untuk {range === '7d' ? '7 hari' : '30 hari'} terakhir</p>
            </div>
            {loading && <span style={{ color: 'var(--dash-text-muted)', fontSize: '12px' }}>Memuat…</span>}
          </div>
          {search?.timeseries?.length ? (
            <SearchPerformanceChart data={search.timeseries} />
          ) : (
            <div style={{ height: '310px', display: 'grid', placeItems: 'center', color: 'var(--dash-text-muted)', fontSize: '13px' }}>
              {loading ? 'Memuat data Search Console…' : 'Grafik akan tampil setelah koneksi Search Console tersedia.'}
            </div>
          )}
        </section>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 430px), 1fr))', gap: '16px', alignItems: 'start' }}>
          <PerformanceTable
            title="Kata kunci teratas"
            description="Kueri yang membawa pengunjung dari Google Search"
            rows={search?.topQueries || []}
            rowKey="query"
            columns={[
              { key: 'query', label: 'Kueri', primary: true },
              { key: 'clicks', label: 'Klik', format: 'number' },
              { key: 'impressions', label: 'Impresi', format: 'number' },
              { key: 'ctr', label: 'CTR', format: 'percent' },
              { key: 'position', label: 'Posisi', format: 'position' }
            ]}
          />
          <PerformanceTable
            title="Halaman teratas"
            description="Halaman dengan performa pencarian tertinggi"
            rows={search?.topPages || []}
            rowKey="page"
            columns={[
              { key: 'page', label: 'Halaman', primary: true },
              { key: 'clicks', label: 'Klik', format: 'number' },
              { key: 'impressions', label: 'Impresi', format: 'number' },
              { key: 'ctr', label: 'CTR', format: 'percent' },
              { key: 'position', label: 'Posisi', format: 'position' }
            ]}
          />
        </div>
      </div>
    </DashboardLayout>
  )
}