import Link from "next/link"
import { useState, useEffect } from "react"
import { getImageUrl } from "@/lib/imageUtils"

export default function KompasArticleSidebar({ popularPosts: propPopular = [], relatedPosts: propRelated = [], currentPostId }) {
  const [popularPosts, setPopularPosts] = useState(propPopular)
  const [activeTab, setActiveTab] = useState("all")
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  useEffect(() => {
    if (propPopular && propPopular.length > 0) {
      setPopularPosts(propPopular)
    } else {
      fetch('/api/posts?limit=5&sortBy=popular&status=PUBLISHED')
        .then(res => res.json())
        .then(data => {
          if (data.success && Array.isArray(data.posts)) {
            setPopularPosts(data.posts)
          }
        })
        .catch(console.error)
    }
  }, [propPopular])

  const formatNumber = (num) => {
    if (num === null || num === undefined) return "0"
    return String(num).replace(/\B(?=(\d{3})+(?!\d))/g, ".")
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

  const handleSubscribe = async (e) => {
    e.preventDefault()
    if (!email.trim()) return
    try {
      await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() })
      })
      setSubscribed(true)
      setEmail("")
    } catch {
      setSubscribed(true)
    }
  }

  const filteredPopular = popularPosts.filter(p => {
    if (p.id === currentPostId) return false
    if (activeTab === "all") return true
    const catSlug = p.category?.slug?.toLowerCase() || p.category?.name?.toLowerCase() || ""
    if (activeTab === "news") return catSlug.includes("news") || catSlug.includes("nasional") || catSlug.includes("technology")
    if (activeTab === "tren") return catSlug.includes("tren") || catSlug.includes("lifestyle") || catSlug.includes("marketing")
    return true
  }).slice(0, 5)

  return (
    <aside className="kompas-article-sidebar">
      {/* 1. TERPOPULER WIDGET */}
      <div className="sidebar-box most-popular-box">
        <div className="box-header">
          <div className="box-title-wrap">
            <span className="box-bar"></span>
            <h3 className="box-title">TERPOPULER</h3>
          </div>
          <div className="box-tabs">
            <button
              className={`box-tab-btn ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              Semua
            </button>
            <button
              className={`box-tab-btn ${activeTab === 'news' ? 'active' : ''}`}
              onClick={() => setActiveTab('news')}
            >
              News
            </button>
            <button
              className={`box-tab-btn ${activeTab === 'tren' ? 'active' : ''}`}
              onClick={() => setActiveTab('tren')}
            >
              Tren
            </button>
          </div>
        </div>

        <div className="popular-items-list">
          {filteredPopular.map((post, idx) => (
            <div key={post.id} className="popular-item">
              <Link href={`/blog/${post.slug || post.id}`} className="popular-link">
                <div className="popular-flex">
                  <div className="popular-number">{idx + 1}</div>
                  <div className="popular-content">
                    {post.category && (
                      <span className="popular-channel">{post.category.name || (typeof post.category === 'string' ? post.category : '')}</span>
                    )}
                    <h4 className="popular-title">{post.title}</h4>
                    <div className="popular-meta">
                      <span suppressHydrationWarning>{formatRelativeTime(post.createdAt)}</span>
                      {post.views > 0 && (
                        <>
                          <span className="dot-sep">•</span>
                          <span suppressHydrationWarning>{formatNumber(post.views)} dibaca</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* 2. TOPIK TERKAIT */}
      <div className="sidebar-box topics-box">
        <div className="box-header">
          <div className="box-title-wrap">
            <span className="box-bar"></span>
            <h3 className="box-title">TOPIK PILIHAN</h3>
          </div>
        </div>
        <div className="topic-chips-cloud">
          <Link href="/blog-filter-search?search=timnas" className="topic-chip">#TimnasIndonesia</Link>
          <Link href="/blog-filter-search?search=pilkada" className="topic-chip">#Pilkada2024</Link>
          <Link href="/blog-filter-search?search=ekonomi" className="topic-chip">#EkonomiDigital</Link>
          <Link href="/blog-filter-search?search=ai" className="topic-chip">#KecerdasanBuatan</Link>
          <Link href="/blog-filter-search?search=emas" className="topic-chip">#HargaEmas</Link>
          <Link href="/blog-filter-search?search=cuaca" className="topic-chip">#CuacaEkstrem</Link>
        </div>
      </div>

      {/* 3. CEK FAKTA (KOMPAS HOAKS ATAU FAKTA) */}
      <div className="sidebar-box fact-check-box">
        <div className="fact-header">
          <div className="fact-badge-icon">
            <i className="fas fa-shield-alt"></i>
          </div>
          <div>
            <h4 className="fact-title">CEK FAKTA</h4>
            <span className="fact-subtitle">Verifikasi & Klarifikasi Hoaks</span>
          </div>
        </div>
        <div className="fact-body">
          <p className="fact-intro">
            Jangan mudah percaya informasi yang belum terverifikasi. Kompas.com menyaring dan memeriksa kebenaran kabar yang beredar.
          </p>
          <Link href="/blog-filter-category?category=cek-fakta" className="btn-fact-check">
            <i className="fas fa-check-circle me-1"></i> Periksa Fakta Terbaru
          </Link>
        </div>
      </div>

      {/* 4. NEWSLETTER */}
      <div className="sidebar-box newsletter-box">
        <div className="nl-icon">
          <i className="far fa-envelope-open"></i>
        </div>
        <h4 className="nl-title">Buletin Berita Pagi</h4>
        <p className="nl-desc">
          Rangkuman berita terpopuler dan terpenting dikirim langsung ke kotak masuk email Anda setiap pagi.
        </p>
        {subscribed ? (
          <div className="nl-alert-success">
            <i className="fas fa-check-circle me-1"></i> Terima kasih telah mendaftar!
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="nl-form">
            <input
              type="email"
              placeholder="Masukkan email Anda"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="nl-input"
            />
            <button type="submit" className="nl-btn">
              Langganan Gratis
            </button>
          </form>
        )}
      </div>

      <style jsx>{`
        .kompas-article-sidebar {
          display: flex;
          flex-direction: column;
          gap: 20px;
          font-family: 'Roboto', -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }

        .sidebar-box {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 16px;
        }

        .box-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 2px solid #e5e7eb;
          padding-bottom: 10px;
          margin-bottom: 12px;
        }

        .box-title-wrap {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .box-bar {
          display: inline-block;
          width: 4px;
          height: 18px;
          background: #0077d7;
          border-radius: 2px;
        }

        .box-title {
          font-size: 15px;
          font-weight: 800;
          color: #111827;
          margin: 0;
          letter-spacing: 0.3px;
        }

        .box-tabs {
          display: flex;
          align-items: center;
          gap: 3px;
        }

        .box-tab-btn {
          background: none;
          border: none;
          font-size: 11.5px;
          font-weight: 600;
          color: #6b7280;
          padding: 2px 7px;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .box-tab-btn.active {
          background: #0077d7;
          color: #ffffff;
        }

        /* Numbered Items */
        .popular-items-list {
          display: flex;
          flex-direction: column;
        }

        .popular-item {
          border-bottom: 1px solid #f3f4f6;
        }

        .popular-item:last-child {
          border-bottom: none;
        }

        .popular-link {
          text-decoration: none;
          display: block;
          padding: 11px 0;
        }

        .popular-flex {
          display: flex;
          gap: 12px;
          align-items: flex-start;
        }

        .popular-number {
          font-size: 24px;
          font-weight: 900;
          line-height: 1;
          color: #0077d7;
          min-width: 20px;
          text-align: center;
          padding-top: 2px;
        }

        .popular-content {
          flex: 1;
        }

        .popular-channel {
          display: inline-block;
          font-size: 10.5px;
          font-weight: 700;
          color: #0284c7;
          text-transform: uppercase;
          margin-bottom: 2px;
        }

        .popular-title {
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

        .popular-link:hover .popular-title {
          color: #0077d7;
        }

        .popular-meta {
          font-size: 11px;
          color: #9ca3af;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .dot-sep {
          color: #d1d5db;
        }

        /* Topic Chips */
        .topic-chips-cloud {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .topic-chip {
          font-size: 11.5px;
          font-weight: 600;
          color: #0077d7;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          padding: 4px 10px;
          border-radius: 14px;
          text-decoration: none;
          transition: all 0.15s ease;
        }

        .topic-chip:hover {
          background: #0077d7;
          color: #ffffff;
          border-color: #0077d7;
        }

        /* Fact Check Box */
        .fact-check-box {
          background: #f0fdf4;
          border-color: #bbf7d0;
        }

        .fact-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 10px;
        }

        .fact-badge-icon {
          width: 32px;
          height: 32px;
          background: #16a34a;
          color: #ffffff;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 15px;
        }

        .fact-title {
          font-size: 14px;
          font-weight: 800;
          color: #15803d;
          margin: 0;
        }

        .fact-subtitle {
          font-size: 11px;
          color: #166534;
        }

        .fact-intro {
          font-size: 12px;
          color: #1f2937;
          line-height: 1.5;
          margin-bottom: 12px;
        }

        .btn-fact-check {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          background: #16a34a;
          color: #ffffff;
          font-size: 12px;
          font-weight: 700;
          padding: 8px 12px;
          border-radius: 6px;
          text-decoration: none;
          transition: background 0.15s ease;
        }

        .btn-fact-check:hover {
          background: #15803d;
          color: #ffffff;
        }

        /* Newsletter Box */
        .newsletter-box {
          background: linear-gradient(135deg, #0077d7 0%, #004d8c 100%);
          color: #ffffff;
          border: none;
          text-align: center;
          padding: 20px 16px;
        }

        .nl-icon {
          font-size: 28px;
          color: #38bdf8;
          margin-bottom: 8px;
        }

        .nl-title {
          font-size: 15px;
          font-weight: 800;
          margin-bottom: 6px;
          color: #ffffff;
        }

        .nl-desc {
          font-size: 11.5px;
          color: #e0f2fe;
          line-height: 1.5;
          margin-bottom: 12px;
        }

        .nl-form {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .nl-input {
          background: #ffffff;
          border: none;
          padding: 9px 12px;
          border-radius: 6px;
          font-size: 12.5px;
          outline: none;
          color: #111827;
        }

        .nl-btn {
          background: #f97316;
          border: none;
          color: #ffffff;
          font-weight: 700;
          font-size: 12.5px;
          padding: 9px;
          border-radius: 6px;
          cursor: pointer;
          transition: background 0.15s ease;
        }

        .nl-btn:hover {
          background: #ea580c;
        }

        .nl-alert-success {
          background: rgba(255, 255, 255, 0.15);
          color: #ffffff;
          font-size: 12px;
          padding: 8px;
          border-radius: 6px;
        }
      `}</style>
    </aside>
  )
}

