import Link from "next/link"
import { useState } from "react"
import { getImageUrl } from "@/lib/imageUtils"

export default function KompasHeroSection({ posts = [], popularPosts = [] }) {
  const [activeTab, setActiveTab] = useState("all")

  // Lead Headline (Top Story)
  const leadPost = posts[0] || null
  // 3 Sub-headlines
  const subHeadlines = posts.slice(1, 4)

  // Filter popular posts by tab
  const filteredPopular = popularPosts.filter(p => {
    if (activeTab === "all") return true
    const catSlug = p.category?.slug?.toLowerCase() || p.category?.name?.toLowerCase() || ""
    if (activeTab === "news") return catSlug.includes("news") || catSlug.includes("nasional") || catSlug.includes("technology")
    if (activeTab === "tren") return catSlug.includes("tren") || catSlug.includes("lifestyle") || catSlug.includes("marketing")
    return true
  }).slice(0, 5)

  const formatNumber = (num) => {
    if (num === null || num === undefined) return "0"
    return String(num).replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  }

  const formatTime = (dateStr) => {
    if (!dateStr) return "Baru saja"
    try {
      const d = new Date(dateStr)
      const day = String(d.getDate()).padStart(2, '0')
      const month = String(d.getMonth() + 1).padStart(2, '0')
      const year = d.getFullYear()
      const hours = String(d.getHours()).padStart(2, '0')
      const mins = String(d.getMinutes()).padStart(2, '0')
      return `${day}/${month}/${year}, ${hours}:${mins} WIB`
    } catch {
      return "Baru saja"
    }
  }

  const formatRelativeTime = (dateStr) => {
    if (!dateStr) return "Baru saja"
    try {
      const diffMs = Date.now() - new Date(dateStr).getTime()
      const diffMins = Math.floor(diffMs / 60000)
      if (diffMins < 60) return `${Math.max(1, diffMins)} menit lalu`
      const diffHours = Math.floor(diffMins / 60)
      if (diffHours < 24) return `${diffHours} jam lalu`
      const diffDays = Math.floor(diffHours / 24)
      return `${diffDays} hari lalu`
    } catch {
      return "Baru saja"
    }
  }

  return (
    <section className="kompas-hero-section">
      <div className="container">
        <div className="row g-4">
          {/* LEFT: Sorotan Utama & 3 Sub-Headlines */}
          <div className="col-lg-8">
            {leadPost && (
              <div className="kompas-lead-card">
                <Link href={`/blog/${leadPost.slug || leadPost.id}`} className="kompas-lead-img-box">
                  <img
                    src={getImageUrl(leadPost.img)}
                    alt={leadPost.title}
                    className="kompas-lead-img"
                    onError={(e) => {
                      e.currentTarget.src = "/assets/img/blog/blog-2-1.webp"
                    }}
                  />
                  {leadPost.category && (
                    <span className="kompas-badge-category">
                      {leadPost.category.name}
                    </span>
                  )}
                </Link>
                <div className="kompas-lead-content">
                  <h1 className="kompas-lead-title">
                    <Link href={`/blog/${leadPost.slug || leadPost.id}`}>
                      {leadPost.title}
                    </Link>
                  </h1>
                  {leadPost.excerpt && (
                    <p className="kompas-lead-excerpt">
                      {leadPost.excerpt}
                    </p>
                  )}
                  <div className="kompas-article-meta">
                    <span className="kompas-meta-source">Kompas.com</span>
                    <span className="kompas-meta-dot">•</span>
                    <span className="kompas-meta-time" suppressHydrationWarning>{formatTime(leadPost.createdAt)}</span>
                  </div>
                </div>
              </div>
            )}

            {/* 3 Sub-Headlines Grid */}
            <div className="kompas-subheadline-grid">
              <div className="row g-3">
                {subHeadlines.map((post) => (
                  <div key={post.id} className="col-md-4 col-sm-6">
                    <div className="kompas-sub-card">
                      <Link href={`/blog/${post.slug || post.id}`} className="kompas-sub-img-box">
                        <img
                          src={getImageUrl(post.img)}
                          alt={post.title}
                          className="kompas-sub-img"
                          onError={(e) => {
                            e.currentTarget.src = "/assets/img/blog/blog-2-2.webp"
                          }}
                        />
                      </Link>
                      <div className="kompas-sub-body">
                        {post.category && (
                          <span className="kompas-sub-category">
                            {post.category.name}
                          </span>
                        )}
                        <h2 className="kompas-sub-title">
                          <Link href={`/blog/${post.slug || post.id}`}>
                            {post.title}
                          </Link>
                        </h2>
                        <span className="kompas-sub-time" suppressHydrationWarning>
                          {formatRelativeTime(post.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: TERPOPULER Widget (Classic Kompas.com) */}
          <div className="col-lg-4">
            <div className="kompas-popular-widget">
              {/* Widget Header with Blue Line */}
              <div className="kompas-widget-header">
                <div className="kompas-widget-title-box">
                  <span className="kompas-widget-bar"></span>
                  <h3 className="kompas-widget-title">TERPOPULER</h3>
                </div>

                {/* Filter Tabs */}
                <div className="kompas-pop-tabs">
                  <button
                    className={`pop-tab-btn ${activeTab === 'all' ? 'active' : ''}`}
                    onClick={() => setActiveTab('all')}
                  >
                    Semua
                  </button>
                  <button
                    className={`pop-tab-btn ${activeTab === 'news' ? 'active' : ''}`}
                    onClick={() => setActiveTab('news')}
                  >
                    News
                  </button>
                  <button
                    className={`pop-tab-btn ${activeTab === 'tren' ? 'active' : ''}`}
                    onClick={() => setActiveTab('tren')}
                  >
                    Tren
                  </button>
                </div>
              </div>

              {/* Numbered Ranked List 1-5 */}
              <div className="kompas-pop-list">
                {filteredPopular.length > 0 ? (
                  filteredPopular.map((post, idx) => (
                    <div key={post.id} className="kompas-pop-item">
                      <div className="kompas-pop-rank">
                        {idx + 1}
                      </div>
                      <div className="kompas-pop-content">
                        {post.category && (
                          <span className="kompas-pop-cat">
                            {post.category.name}
                          </span>
                        )}
                        <h4 className="kompas-pop-title">
                          <Link href={`/blog/${post.slug || post.id}`}>
                            {post.title}
                          </Link>
                        </h4>
                        <div className="kompas-pop-meta">
                          <span suppressHydrationWarning>{formatRelativeTime(post.createdAt)}</span>
                          {post.views > 0 && (
                            <>
                              <span className="meta-sep">•</span>
                              <span suppressHydrationWarning>{formatNumber(post.views)} dibaca</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-muted p-3 text-center" style={{ fontSize: '13px' }}>
                    Belum ada berita terpopuler saat ini.
                  </div>
                )}
              </div>

              {/* Topik Pilihan Mini-Box */}
              <div className="kompas-topic-box">
                <div className="topic-box-header">
                  <i className="fas fa-layer-group text-primary me-2"></i>
                  <span>Sorotan Khusus</span>
                </div>
                <div className="topic-box-chips">
                  <Link href="/blog-filter-search?search=pemilu" className="topic-chip">
                    #Pemilu
                  </Link>
                  <Link href="/blog-filter-search?search=timnas" className="topic-chip">
                    #TimnasIndonesia
                  </Link>
                  <Link href="/blog-filter-search?search=ai" className="topic-chip">
                    #KecerdasanBuatan
                  </Link>
                  <Link href="/blog-filter-search?search=ekonomi" className="topic-chip">
                    #EkonomiDigital
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .kompas-hero-section {
          padding-top: 24px;
          padding-bottom: 24px;
          background: #ffffff;
        }

        /* Lead Headline Card */
        .kompas-lead-card {
          border-bottom: 1px solid #e2e8f0;
          padding-bottom: 20px;
          margin-bottom: 20px;
        }
        .kompas-lead-img-box {
          position: relative;
          display: block;
          width: 100%;
          aspect-ratio: 16 / 9;
          overflow: hidden;
          border-radius: 8px;
          background: #0f172a;
        }
        .kompas-lead-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.35s ease;
        }
        .kompas-lead-img-box:hover .kompas-lead-img {
          transform: scale(1.03);
        }
        .kompas-badge-category {
          position: absolute;
          top: 14px;
          left: 14px;
          background: #004085;
          color: #ffffff;
          font-size: 11px;
          font-weight: 800;
          text-transform: uppercase;
          padding: 4px 10px;
          border-radius: 4px;
          letter-spacing: 0.5px;
          z-index: 2;
        }
        .kompas-lead-content {
          padding-top: 16px;
        }
        .kompas-lead-title {
          font-size: 28px;
          font-weight: 800;
          line-height: 1.28;
          color: #0f172a;
          margin-bottom: 10px;
        }
        .kompas-lead-title a {
          color: inherit;
          text-decoration: none;
          transition: color 0.15s ease;
        }
        .kompas-lead-title a:hover {
          color: #004085;
        }
        .kompas-lead-excerpt {
          font-size: 14.5px;
          color: #475569;
          line-height: 1.6;
          margin-bottom: 10px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .kompas-article-meta {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12.5px;
          color: #64748b;
        }
        .kompas-meta-source {
          font-weight: 700;
          color: #004085;
        }
        .kompas-meta-dot {
          color: #cbd5e1;
        }

        /* 3 Sub-headlines */
        .kompas-subheadline-grid {
          padding-top: 4px;
        }
        .kompas-sub-card {
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .kompas-sub-img-box {
          display: block;
          width: 100%;
          aspect-ratio: 16 / 10;
          overflow: hidden;
          border-radius: 6px;
          background: #f1f5f9;
          margin-bottom: 10px;
        }
        .kompas-sub-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }
        .kompas-sub-img-box:hover .kompas-sub-img {
          transform: scale(1.04);
        }
        .kompas-sub-body {
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .kompas-sub-category {
          font-size: 11px;
          font-weight: 700;
          color: #004085;
          text-transform: uppercase;
          margin-bottom: 4px;
        }
        .kompas-sub-title {
          font-size: 14.5px;
          font-weight: 700;
          line-height: 1.35;
          color: #1e293b;
          margin-bottom: 6px;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          flex: 1;
        }
        .kompas-sub-title a {
          color: inherit;
          text-decoration: none;
          transition: color 0.15s ease;
        }
        .kompas-sub-title a:hover {
          color: #004085;
        }
        .kompas-sub-time {
          font-size: 11.5px;
          color: #94a3b8;
        }

        /* TERPOPULER WIDGET */
        .kompas-popular-widget {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 18px;
        }
        .kompas-widget-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 2px solid #e2e8f0;
          padding-bottom: 12px;
          margin-bottom: 14px;
        }
        .kompas-widget-title-box {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .kompas-widget-bar {
          display: inline-block;
          width: 4px;
          height: 18px;
          background: #004085;
          border-radius: 2px;
        }
        .kompas-widget-title {
          font-size: 16px;
          font-weight: 800;
          color: #0f172a;
          margin: 0;
          letter-spacing: 0.3px;
        }
        .kompas-pop-tabs {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .pop-tab-btn {
          background: none;
          border: none;
          font-size: 12px;
          font-weight: 600;
          color: #64748b;
          padding: 3px 8px;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .pop-tab-btn.active {
          background: #004085;
          color: #ffffff;
        }

        /* Numbered Items */
        .kompas-pop-list {
          display: flex;
          flex-direction: column;
        }
        .kompas-pop-item {
          display: flex;
          gap: 14px;
          padding: 12px 0;
          border-bottom: 1px solid #e2e8f0;
        }
        .kompas-pop-item:last-child {
          border-bottom: none;
          padding-bottom: 6px;
        }
        .kompas-pop-rank {
          font-size: 28px;
          font-weight: 900;
          line-height: 1;
          color: #004085;
          min-width: 22px;
          text-align: center;
          opacity: 0.9;
        }
        .kompas-pop-content {
          flex: 1;
        }
        .kompas-pop-cat {
          display: inline-block;
          font-size: 11px;
          font-weight: 700;
          color: #0284c7;
          text-transform: uppercase;
          margin-bottom: 2px;
        }
        .kompas-pop-title {
          font-size: 13.5px;
          font-weight: 700;
          line-height: 1.35;
          color: #1e293b;
          margin-bottom: 4px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .kompas-pop-title a {
          color: inherit;
          text-decoration: none;
          transition: color 0.15s ease;
        }
        .kompas-pop-title a:hover {
          color: #004085;
        }
        .kompas-pop-meta {
          font-size: 11px;
          color: #94a3b8;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .meta-sep {
          color: #cbd5e1;
        }

        /* Sorotan Khusus Topic Box */
        .kompas-topic-box {
          margin-top: 16px;
          padding-top: 14px;
          border-top: 1px dashed #cbd5e1;
        }
        .topic-box-header {
          font-size: 13px;
          font-weight: 700;
          color: #334155;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
        }
        .topic-box-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .topic-chip {
          font-size: 11.5px;
          font-weight: 600;
          color: #004085;
          background: #ffffff;
          border: 1px solid #cbd5e1;
          padding: 4px 9px;
          border-radius: 12px;
          text-decoration: none;
          transition: all 0.15s ease;
        }
        .topic-chip:hover {
          background: #004085;
          color: #ffffff;
          border-color: #004085;
        }

        @media (max-width: 767px) {
          .kompas-lead-title {
            font-size: 20px;
          }
          .kompas-subheadline-grid .col-sm-6 {
            margin-bottom: 15px;
          }
        }
      `}</style>
    </section>
  )
}

