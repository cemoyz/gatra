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
    <section className="kompas-hl-section">
      <div className="kompas-container">
        <div className="row g-4">
          {/* LEFT COLUMN: articleHL (Headline Utama + 3 Sub-Headlines) */}
          <div className="col-lg-8">
            <div className="articleHL headline_wp">
              {/* Big Lead Headline */}
              {leadPost && (
                <article className="articleHL-big">
                  <Link href={`/blog/${leadPost.slug || leadPost.id}`} className="articleHL-img-link">
                    <div className="articleItem-img">
                      <img
                        src={getImageUrl(leadPost.img)}
                        alt={leadPost.title}
                        className="hl-img"
                        onError={(e) => {
                          e.currentTarget.src = "/assets/img/blog/blog-2-1.webp"
                        }}
                      />
                      {leadPost.category && (
                        <div className="articlePost-subtitle">
                          {leadPost.category.name}
                        </div>
                      )}
                    </div>
                  </Link>

                  <div className="articleHL-box">
                    <h1 className="articleTitle">
                      <Link href={`/blog/${leadPost.slug || leadPost.id}`}>
                        {leadPost.title}
                      </Link>
                    </h1>
                    {leadPost.excerpt && (
                      <p className="articleExcerpt">
                        {leadPost.excerpt}
                      </p>
                    )}
                    <div className="articleMeta">
                      <span className="metaSource">Kompas.com</span>
                      <span className="metaDot">•</span>
                      <span className="metaTime" suppressHydrationWarning>{formatTime(leadPost.createdAt)}</span>
                    </div>
                  </div>
                </article>
              )}

              {/* 3 Sub-Headlines in Grid (articleHL-small) */}
              <div className="articleHL-small clearfix --Grid">
                <div className="row g-3">
                  {subHeadlines.map((post) => (
                    <div key={post.id} className="col-md-4 col-sm-6">
                      <article className="articleItem subHL-item">
                        <Link href={`/blog/${post.slug || post.id}`} className="article-link">
                          <div className="subHL-img-wrap">
                            <img
                              src={getImageUrl(post.img)}
                              alt={post.title}
                              className="subHL-img"
                              onError={(e) => {
                                e.currentTarget.src = "/assets/img/blog/blog-2-2.webp"
                              }}
                            />
                          </div>
                          <div className="subHL-box">
                            {post.category && (
                              <div className="subHL-category">
                                {post.category.name}
                              </div>
                            )}
                            <h2 className="subHL-title">
                              {post.title}
                            </h2>
                            <span className="subHL-time" suppressHydrationWarning>
                              {formatRelativeTime(post.createdAt)}
                            </span>
                          </div>
                        </Link>
                      </article>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: mostList most_side (TERPOPULER) */}
          <div className="col-lg-4">
            <aside className="mostList most_side">
              {/* Header with Blue Bar Accent */}
              <div className="mostHeader">
                <div className="mostTitleBox">
                  <span className="mostBar"></span>
                  <h3 className="mostHeading">TERPOPULER</h3>
                </div>

                {/* Tabs */}
                <div className="mostTabs">
                  <button
                    className={`mostTabBtn ${activeTab === 'all' ? 'active' : ''}`}
                    onClick={() => setActiveTab('all')}
                  >
                    Semua
                  </button>
                  <button
                    className={`mostTabBtn ${activeTab === 'news' ? 'active' : ''}`}
                    onClick={() => setActiveTab('news')}
                  >
                    News
                  </button>
                  <button
                    className={`mostTabBtn ${activeTab === 'tren' ? 'active' : ''}`}
                    onClick={() => setActiveTab('tren')}
                  >
                    Tren
                  </button>
                </div>
              </div>

              {/* Numbered List 1-5 (mostItem) */}
              <div className="mostItemsList">
                {filteredPopular.length > 0 ? (
                  filteredPopular.map((post, idx) => (
                    <div key={post.id} className="mostItem">
                      <Link href={`/blog/${post.slug || post.id}`} className="mostLink">
                        <div className="mostFlex">
                          <div className="mostNumber">
                            {idx + 1}
                          </div>
                          <div className="mostBox">
                            {post.category && (
                              <span className="mostChannel">
                                {post.category.name}
                              </span>
                            )}
                            <h4 className="mostTitle">
                              {post.title}
                            </h4>
                            <div className="mostMeta">
                              <span suppressHydrationWarning>{formatRelativeTime(post.createdAt)}</span>
                              {post.views > 0 && (
                                <>
                                  <span className="metaDot">•</span>
                                  <span suppressHydrationWarning>{formatNumber(post.views)} dibaca</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))
                ) : (
                  <div className="text-muted p-3 text-center" style={{ fontSize: '13px' }}>
                    Belum ada berita terpopuler saat ini.
                  </div>
                )}
              </div>

              {/* Sorotan Khusus Topic Card */}
              <div className="mostTopicCard">
                <div className="topicCardHead">
                  <i className="fas fa-layer-group text-primary me-2"></i>
                  <span>Sorotan Khusus</span>
                </div>
                <div className="topicChips">
                  <Link href="/blog-filter-search?search=pemilu" className="chip">#Pemilu</Link>
                  <Link href="/blog-filter-search?search=timnas" className="chip">#TimnasIndonesia</Link>
                  <Link href="/blog-filter-search?search=ai" className="chip">#KecerdasanBuatan</Link>
                  <Link href="/blog-filter-search?search=ekonomi" className="chip">#EkonomiDigital</Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>

      <style jsx>{`
        .kompas-hl-section {
          padding-top: 20px;
          padding-bottom: 24px;
          background: #ffffff;
          font-family: 'Roboto', -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }

        .kompas-container {
          max-width: 1180px;
          margin: 0 auto;
          padding: 0 16px;
          width: 100%;
        }

        /* ── articleHL (Main Headline) ── */
        .articleHL-big {
          border-bottom: 1px solid #e5e7eb;
          padding-bottom: 20px;
          margin-bottom: 20px;
        }
        .articleHL-img-link {
          text-decoration: none;
          display: block;
        }
        .articleItem-img {
          position: relative;
          display: block;
          width: 100%;
          aspect-ratio: 16 / 9;
          overflow: hidden;
          border-radius: 6px;
          background: #111827;
        }
        .hl-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.35s ease;
        }
        .articleHL-img-link:hover .hl-img {
          transform: scale(1.025);
        }
        .articlePost-subtitle {
          position: absolute;
          top: 12px;
          left: 12px;
          background: #0077d7;
          color: #ffffff;
          font-size: 11px;
          font-weight: 800;
          text-transform: uppercase;
          padding: 3px 8px;
          border-radius: 4px;
          letter-spacing: 0.5px;
        }
        .articleHL-box {
          padding-top: 14px;
        }
        .articleTitle {
          font-size: 26px;
          font-weight: 800;
          line-height: 1.28;
          color: #111827;
          margin-bottom: 8px;
        }
        .articleTitle a {
          color: inherit;
          text-decoration: none;
          transition: color 0.15s ease;
        }
        .articleTitle a:hover {
          color: #0077d7;
        }
        .articleExcerpt {
          font-size: 14px;
          color: #4b5563;
          line-height: 1.55;
          margin-bottom: 10px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .articleMeta {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: #6b7280;
        }
        .metaSource {
          font-weight: 700;
          color: #0077d7;
        }
        .metaDot {
          color: #d1d5db;
        }

        /* ── articleHL-small (3 Sub-headlines) ── */
        .subHL-item {
          height: 100%;
        }
        .article-link {
          text-decoration: none;
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .subHL-img-wrap {
          display: block;
          width: 100%;
          aspect-ratio: 16 / 10;
          overflow: hidden;
          border-radius: 6px;
          background: #f3f4f6;
          margin-bottom: 8px;
        }
        .subHL-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }
        .article-link:hover .subHL-img {
          transform: scale(1.04);
        }
        .subHL-box {
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .subHL-category {
          font-size: 11px;
          font-weight: 700;
          color: #0077d7;
          text-transform: uppercase;
          margin-bottom: 3px;
        }
        .subHL-title {
          font-size: 14px;
          font-weight: 700;
          line-height: 1.35;
          color: #111827;
          margin-bottom: 6px;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          flex: 1;
          transition: color 0.15s ease;
        }
        .article-link:hover .subHL-title {
          color: #0077d7;
        }
        .subHL-time {
          font-size: 11.5px;
          color: #9ca3af;
        }

        /* ── mostList most_side (TERPOPULER) ── */
        .mostList {
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 18px;
        }
        .mostHeader {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 2px solid #e5e7eb;
          padding-bottom: 10px;
          margin-bottom: 12px;
        }
        .mostTitleBox {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .mostBar {
          display: inline-block;
          width: 4px;
          height: 18px;
          background: #0077d7;
          border-radius: 2px;
        }
        .mostHeading {
          font-size: 16px;
          font-weight: 800;
          color: #111827;
          margin: 0;
          letter-spacing: 0.3px;
        }
        .mostTabs {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .mostTabBtn {
          background: none;
          border: none;
          font-size: 12px;
          font-weight: 600;
          color: #6b7280;
          padding: 3px 8px;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .mostTabBtn.active {
          background: #0077d7;
          color: #ffffff;
        }

        /* Numbered Items */
        .mostItemsList {
          display: flex;
          flex-direction: column;
        }
        .mostItem {
          border-bottom: 1px solid #e5e7eb;
        }
        .mostItem:last-child {
          border-bottom: none;
        }
        .mostLink {
          text-decoration: none;
          display: block;
          padding: 12px 0;
        }
        .mostFlex {
          display: flex;
          gap: 12px;
          align-items: flex-start;
        }
        .mostNumber {
          font-size: 26px;
          font-weight: 900;
          line-height: 1;
          color: #0077d7;
          min-width: 22px;
          text-align: center;
          padding-top: 2px;
        }
        .mostBox {
          flex: 1;
        }
        .mostChannel {
          display: inline-block;
          font-size: 11px;
          font-weight: 700;
          color: #0284c7;
          text-transform: uppercase;
          margin-bottom: 2px;
        }
        .mostTitle {
          font-size: 13.5px;
          font-weight: 700;
          line-height: 1.35;
          color: #1f2937;
          margin-bottom: 4px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          transition: color 0.15s ease;
        }
        .mostLink:hover .mostTitle {
          color: #0077d7;
        }
        .mostMeta {
          font-size: 11px;
          color: #9ca3af;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        /* Topic Card */
        .mostTopicCard {
          margin-top: 14px;
          padding-top: 14px;
          border-top: 1px dashed #d1d5db;
        }
        .topicCardHead {
          font-size: 12.5px;
          font-weight: 700;
          color: #374151;
          margin-bottom: 8px;
          display: flex;
          align-items: center;
        }
        .topicChips {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .chip {
          font-size: 11.5px;
          font-weight: 600;
          color: #0077d7;
          background: #ffffff;
          border: 1px solid #d1d5db;
          padding: 3px 8px;
          border-radius: 12px;
          text-decoration: none;
          transition: all 0.15s ease;
        }
        .chip:hover {
          background: #0077d7;
          color: #ffffff;
          border-color: #0077d7;
        }

        @media (max-width: 767px) {
          .articleTitle {
            font-size: 20px;
          }
        }
      `}</style>
    </section>
  )
}
