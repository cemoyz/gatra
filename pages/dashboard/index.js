import DashboardLayout from '@/components/dashboard/DashboardLayout'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import AnimatedCounter from '@/components/dashboard/AnimatedCounter'

// Dynamically import Recharts components with SSR disabled for optimal responsive rendering
const RevenueChart = dynamic(() => import('@/components/dashboard/DashboardCharts').then(m => m.RevenueChart), { ssr: false })
const VisitorsChart = dynamic(() => import('@/components/dashboard/DashboardCharts').then(m => m.VisitorsChart), { ssr: false })
const ActivityInsightsChart = dynamic(() => import('@/components/dashboard/DashboardCharts').then(m => m.ActivityInsightsChart), { ssr: false })

export default function DashboardOverview() {
  const [stats, setStats] = useState({
    totalPosts: 0,
    publishedPosts: 0,
    draftPosts: 0,
    totalCategories: 0,
    totalUsers: 0,
    totalComments: 0,
    totalViews: 0
  })
  const [trends, setTrends] = useState([])
  const [recentPosts, setRecentPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [animateBars, setAnimateBars] = useState(false)
  const [animKey, setAnimKey] = useState(1)

  useEffect(() => {
    // Function to load stats (silent update in background without flickering)
    const loadStats = (isInitial = false) => {
      fetch('/api/stats')
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setStats(data.stats || {})
            setTrends(data.trends || [])
            setRecentPosts(data.recentPosts || [])
            setAnimKey(prev => prev + 1)
          }
        })
        .catch(console.error)
        .finally(() => {
          if (isInitial) {
            setLoading(false)
            setAnimateBars(true)
          }
        })
    }

    // Initial fetch
    loadStats(true)

    // 1. Passive Server-Sent Events (SSE) stream listener (0 continuous polling)
    let eventSource
    try {
      eventSource = new EventSource('/api/events')
      eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)
          if (data.type === 'view_incremented' || data.type === 'post_updated' || data.type === 'new_comment' || data.type === 'new_message') {
            loadStats(false)
          }
        } catch (e) {}
      }
    } catch (e) {}

    // 2. Smart Focus / Visibility Listener (instant fresh stats on tab focus)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        loadStats(false)
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      if (eventSource) eventSource.close()
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  // Calculate real ratios
  const publishedRatio = stats.totalPosts > 0 ? Math.round((stats.publishedPosts / stats.totalPosts) * 100) : 0
  const commentsRatio = Math.min(Math.round((stats.totalComments / Math.max(stats.totalPosts, 1)) * 100), 100)
  const categoryRatio = Math.min(stats.totalCategories * 10, 100)

  // Map real database trends into chart datasets
  const viewsChartData = trends.map(t => ({
    month: t.month || t.shortDate,
    desktop: t.views || 0
  }))

  const articlesChartData = trends.map(t => ({
    month: t.month || t.shortDate,
    desktop: Math.max(t.articles, 1)
  }))

  const activityChartData = trends.map(t => ({
    month: t.month || `${t.dayName} (${t.shortDate})`,
    desktop: t.desktop || 0,
    mobile: t.mobile || 0
  }))

  return (
    <DashboardLayout title="Ringkasan Redaksi & Analitik">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* ROW 1: Growth & Editorial Insights (6 cols), Total Views (3 cols), Total Articles (3 cols) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '24px' }}>
          
          {/* CARD 1: Growth & Editorial Insights (Welcome Banner) */}
          <div
            className="dash-card dash-animate-fade-in"
            style={{
              gridColumn: 'span 6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '28px 32px',
              minHeight: '210px',
              boxSizing: 'border-box'
            }}
          >
            <div style={{ maxWidth: '340px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--dash-text-main)' }}>
                <i className="fa fa-newspaper-o"></i> Pusat Kontrol Redaksi Hoom
              </div>
              <h2 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--dash-text-main)', margin: 0, letterSpacing: '-0.3px', lineHeight: 1.2 }}>
                Analitik & Jangkauan Media
              </h2>
              <p style={{ fontSize: '13px', color: 'var(--dash-text-muted)', lineHeight: '1.5', margin: 0 }}>
                Portal memiliki <strong>{stats.totalPosts}</strong> total artikel pada <strong>{stats.totalCategories}</strong> kategori dengan <strong>{stats.totalViews?.toLocaleString() || 0}</strong> akumulasi pembaca aktif.
              </p>
              <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
                <Link
                  href="/dashboard/posts/new"
                  className="dash-btn dash-btn-primary"
                  style={{ padding: '8px 18px', fontSize: '13px', borderRadius: '8px' }}
                >
                  <i className="fa fa-pencil"></i> Tulis Berita
                </Link>
                <Link
                  href="/dashboard/posts"
                  className="dash-btn dash-btn-secondary"
                  style={{ padding: '8px 18px', fontSize: '13px', borderRadius: '8px' }}
                >
                  Semua Berita ({stats.totalPosts})
                </Link>
              </div>
            </div>

            {/* Illustration with Entrance & Hover Transition */}
            <div className="dash-illustration-box" style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img
                src="/illustrations/graphic-designer-workplace-1.png"
                alt="Editorial illustration"
                className="dash-illustration-img"
                onError={(e) => { e.currentTarget.style.display = 'none' }}
              />
            </div>
          </div>

          {/* CARD 2: Total Pembaca / Views (Real Database Data) */}
          <div className="dash-card dash-animate-fade-in" style={{ gridColumn: 'span 3', display: 'flex', flexDirection: 'column' }}>
            <div className="dash-card-header" style={{ padding: '24px 24px 10px', alignItems: 'flex-start' }}>
              <div>
                <div className="dash-card-desc" style={{ fontSize: '14px', fontWeight: 600 }}>Total Pembaca</div>
                <div style={{ fontSize: '28px', fontWeight: 700, color: 'var(--dash-text-main)', marginTop: '4px', letterSpacing: '-0.5px' }}>
                  <AnimatedCounter value={stats.totalViews || 0} />
                </div>
              </div>
              <span className="dash-badge" style={{ fontSize: '11px', fontWeight: 700 }}>
                <i className="fa fa-arrow-up" style={{ fontSize: '9px' }}></i> Real Live
              </span>
            </div>

            {/* Recharts Area with Real Data */}
            <div style={{ marginTop: 'auto', width: '100%', height: '110px', overflow: 'hidden' }}>
              <RevenueChart data={viewsChartData} animKey={animKey} />
            </div>
          </div>

          {/* CARD 3: Total Artikel (Real Database Data) */}
          <div className="dash-card dash-animate-fade-in" style={{ gridColumn: 'span 3', display: 'flex', flexDirection: 'column' }}>
            <div className="dash-card-header" style={{ padding: '24px 24px 10px', alignItems: 'flex-start' }}>
              <div>
                <div className="dash-card-desc" style={{ fontSize: '14px', fontWeight: 600 }}>Total Artikel</div>
                <div style={{ fontSize: '28px', fontWeight: 700, color: 'var(--dash-text-main)', marginTop: '4px', letterSpacing: '-0.5px' }}>
                  <AnimatedCounter value={stats.totalPosts || 0} />
                </div>
              </div>
              <span className="dash-badge" style={{ fontSize: '11px', fontWeight: 700 }}>
                {stats.publishedPosts} Terbit
              </span>
            </div>

            {/* Recharts Bar with Real Data */}
            <div style={{ marginTop: 'auto', width: '100%', height: '110px', padding: '0 16px 12px', boxSizing: 'border-box' }}>
              <VisitorsChart data={articlesChartData} animKey={animKey} />
            </div>
          </div>

        </div>

        {/* ROW 2: Activity Insights & Monochrome Animated Performance Metrics */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '24px' }}>
          
          {/* CARD 4: Activity Insights (Real 7-Day View & Interaction Waves) */}
          <div className="dash-card dash-animate-fade-in" style={{ gridColumn: 'span 6' }}>
            <div className="dash-card-header">
              <div>
                <h3 className="dash-card-title">Tren Aktivitas Pembaca 7 Hari</h3>
                <div className="dash-card-desc">Volume pembacaan artikel dan interaksi harian dari database</div>
              </div>
              <span className="dash-badge" style={{ fontSize: '11px', fontWeight: 600 }}>
                Data Live PostgreSQL
              </span>
            </div>

            <div className="dash-card-body" style={{ padding: '10px 24px 20px' }}>
              <ActivityInsightsChart data={activityChartData} animKey={animKey} />
            </div>
          </div>

          {/* CARD 5: Metrik Redaksi & Pembaca (Monochrome Black & White + Animated Progress Bars) */}
          <div className="dash-card dash-animate-fade-in" style={{ gridColumn: 'span 6' }}>
            <div className="dash-card-header">
              <div>
                <h3 className="dash-card-title">Metrik Redaksi & Pembaca</h3>
                <div className="dash-card-desc">Status performa konten, topik, dan interaksi komunitas</div>
              </div>
              <Link
                href="/dashboard/posts"
                className="dash-topbar-link"
                style={{ fontSize: '12px', color: 'var(--dash-text-muted)', textDecoration: 'none', fontWeight: 600, padding: '4px 8px' }}
              >
                Kelola Berita &rarr;
              </Link>
            </div>

            <div className="dash-card-body" style={{ padding: '10px 24px 28px' }}>
              {/* Big Stat: Real Total Views */}
              <div style={{ marginBottom: '24px' }}>
                <div style={{ fontSize: '38px', fontWeight: 800, color: 'var(--dash-text-main)', letterSpacing: '-0.8px', lineHeight: 1.1 }}>
                  <AnimatedCounter value={stats.totalViews || 0} />
                </div>
                <div style={{ fontSize: '13.5px', color: 'var(--dash-text-muted)', marginTop: '4px', fontWeight: 500 }}>
                  Total Pembacaan Seluruh Artikel
                </div>
              </div>

              {/* Metrics Rows with Monochrome Animated Progress Bars */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                
                {/* Metric 1: Rasio Berita Terbit */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '12px',
                      background: 'var(--dash-muted-bg)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '17px',
                      color: 'var(--dash-text-main)',
                      flexShrink: 0,
                      border: '1px solid var(--dash-border)'
                    }}
                  >
                    <i className="fa fa-file-text-o"></i>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13.5px', marginBottom: '6px' }}>
                      <span style={{ color: 'var(--dash-text-muted)', fontWeight: 600 }}>Rasio Berita Terbit</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <strong style={{ color: 'var(--dash-text-main)' }}>{stats.publishedPosts} dari {stats.totalPosts}</strong>
                        <span style={{ fontSize: '12px', color: 'var(--dash-text-muted)', fontWeight: 700 }}>({publishedRatio}%)</span>
                      </div>
                    </div>
                    {/* Monochrome Animated Progress Track */}
                    <div style={{ width: '100%', height: '8px', background: 'var(--dash-muted-bg)', borderRadius: '9999px', overflow: 'hidden' }}>
                      <div
                        key={`bar1-${animKey}`}
                        className="dash-progress-fill"
                        style={{
                          width: `${publishedRatio}%`,
                          height: '100%',
                          background: 'var(--dash-chart-1)',
                          borderRadius: '9999px'
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Metric 2: Kategori & Topik Berita */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '12px',
                      background: 'var(--dash-muted-bg)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '16px',
                      color: 'var(--dash-text-main)',
                      flexShrink: 0,
                      border: '1px solid var(--dash-border)'
                    }}
                  >
                    <i className="fa fa-folder-open-o"></i>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13.5px', marginBottom: '6px' }}>
                      <span style={{ color: 'var(--dash-text-muted)', fontWeight: 600 }}>Kategori & Topik Berita</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <strong style={{ color: 'var(--dash-text-main)' }}>{stats.totalCategories} Kategori</strong>
                        <span style={{ fontSize: '12px', color: 'var(--dash-text-muted)', fontWeight: 700 }}>Aktif</span>
                      </div>
                    </div>
                    {/* Monochrome Animated Progress Track */}
                    <div style={{ width: '100%', height: '8px', background: 'var(--dash-muted-bg)', borderRadius: '9999px', overflow: 'hidden' }}>
                      <div
                        key={`bar2-${animKey}`}
                        className="dash-progress-fill"
                        style={{
                          width: `${categoryRatio}%`,
                          height: '100%',
                          background: 'var(--dash-chart-1)',
                          borderRadius: '9999px'
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Metric 3: Interaksi Komentar */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '12px',
                      background: 'var(--dash-muted-bg)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '16px',
                      color: 'var(--dash-text-main)',
                      flexShrink: 0,
                      border: '1px solid var(--dash-border)'
                    }}
                  >
                    <i className="fa fa-comments-o"></i>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13.5px', marginBottom: '6px' }}>
                      <span style={{ color: 'var(--dash-text-muted)', fontWeight: 600 }}>Interaksi Komentar</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <strong style={{ color: 'var(--dash-text-main)' }}>{stats.totalComments} Komentar</strong>
                        <span style={{ fontSize: '12px', color: 'var(--dash-text-muted)', fontWeight: 700 }}>Terverifikasi</span>
                      </div>
                    </div>
                    {/* Monochrome Animated Progress Track */}
                    <div style={{ width: '100%', height: '8px', background: 'var(--dash-muted-bg)', borderRadius: '9999px', overflow: 'hidden' }}>
                      <div
                        key={`bar3-${animKey}`}
                        className="dash-progress-fill"
                        style={{
                          width: `${Math.max(commentsRatio, 15)}%`,
                          height: '100%',
                          background: 'var(--dash-chart-1)',
                          borderRadius: '9999px'
                        }}
                      />
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>

        {/* ROW 3: Real Recent Articles Table (TrafficTable.tsx) */}
        <div className="dash-card dash-animate-fade-in">
          <div className="dash-card-header">
            <div>
              <h3 className="dash-card-title">Berita & Konten Terbaru</h3>
              <div className="dash-card-desc">Daftar artikel yang baru dipublikasikan di portal secara real-time</div>
            </div>
            <Link href="/dashboard/posts" style={{ color: 'var(--dash-text-main)', fontSize: '13px', textDecoration: 'none', fontWeight: 600 }}>
              Lihat Semua ({stats.totalPosts}) &rarr;
            </Link>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--dash-border)', background: 'var(--dash-muted-bg)' }}>
                  <th style={{ padding: '12px 18px', fontSize: '12px', color: 'var(--dash-text-muted)', fontWeight: 700 }}>Judul Berita</th>
                  <th style={{ padding: '12px 18px', fontSize: '12px', color: 'var(--dash-text-muted)', fontWeight: 700 }}>Kategori</th>
                  <th style={{ padding: '12px 18px', fontSize: '12px', color: 'var(--dash-text-muted)', fontWeight: 700 }}>Penulis</th>
                  <th style={{ padding: '12px 18px', fontSize: '12px', color: 'var(--dash-text-muted)', fontWeight: 700 }}>Pembaca</th>
                  <th style={{ padding: '12px 18px', fontSize: '12px', color: 'var(--dash-text-muted)', fontWeight: 700 }}>Status</th>
                  <th style={{ padding: '12px 18px', fontSize: '12px', color: 'var(--dash-text-muted)', fontWeight: 700, textAlign: 'right' }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {recentPosts.length === 0 ? (
                  <tr>
                    <td colSpan="6" style={{ textAlign: 'center', padding: '32px', color: 'var(--dash-text-muted)' }}>
                      {loading ? 'Memuat artikel...' : 'Belum ada artikel. Klik "Tulis Berita" untuk memulai.'}
                    </td>
                  </tr>
                ) : (
                  recentPosts.slice(0, 6).map((post) => (
                    <tr key={post.id} style={{ borderBottom: '1px solid var(--dash-border)' }}>
                      <td style={{ padding: '12px 18px', maxWidth: '300px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <img
                            src={post.img?.startsWith('http') ? post.img : `/assets/img/blog/${post.img || 'blog-2-1.webp'}`}
                            alt=""
                            style={{ width: '38px', height: '38px', objectFit: 'cover', borderRadius: '8px', flexShrink: 0, backgroundColor: 'var(--dash-border)' }}
                            onError={(e) => { e.currentTarget.src = '/assets/img/blog/blog-2-1.webp' }}
                          />
                          <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: 600, fontSize: '13.5px', color: 'var(--dash-text-main)' }}>
                            {post.title}
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '12px 18px' }}>
                        <span className="dash-badge" style={{ fontSize: '11px' }}>
                          {post.category || 'Berita'}
                        </span>
                      </td>
                      <td style={{ padding: '12px 18px', fontSize: '13px', color: 'var(--dash-text-main)', fontWeight: 600 }}>
                        {post.author || 'Redaksi'}
                      </td>
                      <td style={{ padding: '12px 18px', fontSize: '13px', color: 'var(--dash-text-muted)' }}>
                        <i className="fa fa-eye" style={{ marginRight: '4px' }}></i> {post.views?.toLocaleString() || 0}
                      </td>
                      <td style={{ padding: '12px 18px' }}>
                        <span style={{
                          fontSize: '11px',
                          fontWeight: 700,
                          padding: '3px 8px',
                          borderRadius: '20px',
                          background: post.status === 'PUBLISHED' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                          color: post.status === 'PUBLISHED' ? '#10b981' : '#f59e0b'
                        }}>
                          {post.status}
                        </span>
                      </td>
                      <td style={{ padding: '12px 18px', textAlign: 'right' }}>
                        <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                          <Link
                            href={`/dashboard/posts/edit/${post.id}`}
                            className="dash-icon-btn"
                            style={{ width: '28px', height: '28px', fontSize: '12px', border: '1px solid var(--dash-border)', borderRadius: '6px' }}
                            title="Edit"
                          >
                            <i className="fa fa-pencil"></i>
                          </Link>
                          <Link
                            href={`/blog/${post.id}`}
                            target="_blank"
                            className="dash-icon-btn"
                            style={{ width: '28px', height: '28px', fontSize: '12px', border: '1px solid var(--dash-border)', borderRadius: '6px' }}
                            title="Pratinjau"
                          >
                            <i className="fa fa-external-link"></i>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
      <style jsx>{`
        .dash-illustration-box {
          perspective: 1000px;
        }

        .dash-illustration-img {
          max-height: 150px;
          width: auto;
          object-fit: contain;
          opacity: 0;
          filter: grayscale(1);
          transform: translateY(14px) scale(0.96);
          animation: illustrationEnter 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards;
          transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.6s ease, filter 0.6s ease;
          will-change: transform, opacity;
        }

        .dash-illustration-img:hover {
          transform: translateY(-4px) scale(1.02);
          opacity: 1 !important;
          filter: grayscale(1) drop-shadow(0 8px 16px rgba(0, 0, 0, 0.12));
        }

        @keyframes illustrationEnter {
          0% {
            opacity: 0;
            transform: translateY(16px) scale(0.94);
            filter: grayscale(1);
          }
          100% {
            opacity: 0.92;
            transform: translateY(0) scale(1);
            filter: grayscale(1);
          }
        }
      `}</style>
    </DashboardLayout>
  )
}
