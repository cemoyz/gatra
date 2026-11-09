import Link from "next/link"
import { useState } from "react"
import { getImageUrl } from "@/lib/imageUtils"

export default function KompasStreamSection({ streamPosts = [], editorPicks = [], factCheckPosts = [] }) {
  const [visibleCount, setVisibleCount] = useState(10)
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const currentPosts = streamPosts.slice(0, visibleCount)
  const hasMore = visibleCount < streamPosts.length

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

  return (
    <section className="kompas-stream-section">
      <div className="container">
        <div className="row g-4">
          {/* LEFT: Berita Terkini (Stream Feed) */}
          <div className="col-lg-8">
            <div className="stream-header">
              <div className="stream-title-box">
                <span className="stream-bar"></span>
                <h3 className="stream-title">BERITA TERKINI</h3>
              </div>
              <Link href="/blog" className="stream-index-link">
                Indeks Berita <i className="fas fa-chevron-right ms-1"></i>
              </Link>
            </div>

            {/* Stream List */}
            <div className="stream-list">
              {currentPosts.map((post) => (
                <article key={post.id} className="stream-card">
                  <Link href={`/blog/${post.slug || post.id}`} className="stream-img-box">
                    <img
                      src={getImageUrl(post.img)}
                      alt={post.title}
                      className="stream-img"
                      onError={(e) => {
                        e.currentTarget.src = "/assets/img/blog/blog-2-1.webp"
                      }}
                    />
                  </Link>

                  <div className="stream-card-body">
                    <div className="stream-top-meta">
                      {post.category && (
                        <span className="stream-cat-name">
                          {post.category.name}
                        </span>
                      )}
                    </div>

                    <h4 className="stream-card-title">
                      <Link href={`/blog/${post.slug || post.id}`}>
                        {post.title}
                      </Link>
                    </h4>

                    {post.excerpt && (
                      <p className="stream-card-excerpt">
                        {post.excerpt}
                      </p>
                    )}

                    <div className="stream-card-footer">
                      <span className="footer-source">Kompas.com</span>
                      <span className="footer-sep">•</span>
                      <span className="footer-time" suppressHydrationWarning>{formatTime(post.createdAt)}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Load More Button */}
            {hasMore ? (
              <div className="load-more-wrap">
                <button
                  className="btn-load-more"
                  onClick={() => setVisibleCount(prev => prev + 6)}
                >
                  <i className="fas fa-redo-alt me-2"></i> Lihat Berita Lainnya
                </button>
              </div>
            ) : (
              <div className="stream-end text-center py-4">
                <span className="text-muted" style={{ fontSize: '13px' }}>
                  Anda telah melihat semua berita terkini hari ini.
                </span>
              </div>
            )}
          </div>

          {/* RIGHT: Sidebar */}
          <div className="col-lg-4">
            <aside className="kompas-sidebar">
              {/* 1. Sorotan Redaksi (Editor's Pick) */}
              <div className="sidebar-widget">
                <div className="widget-header">
                  <span className="widget-bar"></span>
                  <h4 className="widget-title">SOROTAN REDAKSI</h4>
                </div>
                <div className="editor-picks-list">
                  {editorPicks.slice(0, 4).map((post, i) => (
                    <div key={post.id || i} className="editor-pick-item">
                      <span className="pick-bullet">{i + 1}</span>
                      <div className="pick-content">
                        {post.category && (
                          <span className="pick-cat">{post.category.name}</span>
                        )}
                        <h5 className="pick-title">
                          <Link href={`/blog/${post.slug || post.id}`}>
                            {post.title}
                          </Link>
                        </h5>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 2. Cek Fakta (Kompas Hoaks atau Fakta) */}
              <div className="sidebar-widget cek-fakta-widget">
                <div className="cek-fakta-header">
                  <div className="cek-fakta-brand">
                    <span className="badge-shield">
                      <i className="fas fa-shield-alt"></i>
                    </span>
                    <div>
                      <h4 className="cek-fakta-title">CEK FAKTA</h4>
                      <span className="cek-fakta-sub">Klarifikasi & Verifikasi Hoaks</span>
                    </div>
                  </div>
                  <Link href="/blog-filter-category?category=cek-fakta" className="cek-fakta-link">
                    Semua
                  </Link>
                </div>
                <div className="cek-fakta-list">
                  {factCheckPosts.slice(0, 3).map((post) => (
                    <div key={post.id} className="cek-fakta-item">
                      <span className="tag-verifikasi">
                        <i className="fas fa-check-circle me-1"></i> FAKTA
                      </span>
                      <h5 className="cek-fakta-post-title">
                        <Link href={`/blog/${post.slug || post.id}`}>
                          {post.title}
                        </Link>
                      </h5>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. Newsletter Subscribe */}
              <div className="sidebar-widget newsletter-widget">
                <div className="newsletter-card">
                  <i className="far fa-envelope-open newsletter-icon"></i>
                  <h4 className="newsletter-title">Koran Digital & Buletin Pagi</h4>
                  <p className="newsletter-desc">
                    Dapatkan rangkuman kurasi berita pilihan setiap pagi langsung ke email Anda.
                  </p>
                  {subscribed ? (
                    <div className="alert-subscribed">
                      <i className="fas fa-check-circle me-1"></i> Terima kasih telah berlangganan!
                    </div>
                  ) : (
                    <form onSubmit={handleSubscribe} className="newsletter-form">
                      <input
                        type="email"
                        placeholder="Masukkan alamat email Anda"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="newsletter-input"
                      />
                      <button type="submit" className="newsletter-btn">
                        Langganan Gratis
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>

      <style jsx>{`
        .kompas-stream-section {
          padding: 24px 0 48px;
          background: #ffffff;
        }

        /* Stream Header */
        .stream-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 2px solid #0077d7;
          padding-bottom: 10px;
          margin-bottom: 20px;
        }
        .stream-title-box {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .stream-bar {
          display: inline-block;
          width: 5px;
          height: 20px;
          background: #0077d7;
          border-radius: 2px;
        }
        .stream-title {
          font-size: 18px;
          font-weight: 800;
          color: #0f172a;
          margin: 0;
          letter-spacing: 0.3px;
        }
        .stream-index-link {
          font-size: 13px;
          font-weight: 600;
          color: #0077d7;
          text-decoration: none;
          transition: color 0.15s ease;
        }
        .stream-index-link:hover {
          color: #0284c7;
        }

        /* Stream List & Cards */
        .stream-list {
          display: flex;
          flex-direction: column;
        }
        .stream-card {
          display: flex;
          gap: 18px;
          padding: 16px 0;
          border-bottom: 1px solid #e2e8f0;
          align-items: flex-start;
        }
        .stream-card:first-child {
          padding-top: 0;
        }
        .stream-img-box {
          display: block;
          width: 190px;
          min-width: 190px;
          aspect-ratio: 16 / 10;
          overflow: hidden;
          border-radius: 6px;
          background: #f1f5f9;
        }
        .stream-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }
        .stream-img-box:hover .stream-img {
          transform: scale(1.04);
        }
        .stream-card-body {
          flex: 1;
        }
        .stream-top-meta {
          margin-bottom: 4px;
        }
        .stream-cat-name {
          font-size: 11.5px;
          font-weight: 800;
          color: #0077d7;
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }
        .stream-card-title {
          font-size: 17px;
          font-weight: 700;
          line-height: 1.35;
          color: #0f172a;
          margin-bottom: 6px;
        }
        .stream-card-title a {
          color: inherit;
          text-decoration: none;
          transition: color 0.15s ease;
        }
        .stream-card-title a:hover {
          color: #0077d7;
        }
        .stream-card-excerpt {
          font-size: 13px;
          color: #475569;
          line-height: 1.55;
          margin-bottom: 8px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .stream-card-footer {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11.5px;
          color: #94a3b8;
        }
        .footer-source {
          font-weight: 700;
          color: #64748b;
        }
        .footer-sep {
          color: #cbd5e1;
        }

        /* Load More */
        .load-more-wrap {
          text-align: center;
          padding: 24px 0;
        }
        .btn-load-more {
          background: #f8fafc;
          border: 1px solid #cbd5e1;
          color: #0077d7;
          font-size: 13.5px;
          font-weight: 700;
          padding: 10px 24px;
          border-radius: 24px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .btn-load-more:hover {
          background: #0077d7;
          color: #ffffff;
          border-color: #0077d7;
        }

        /* Sidebar Widgets */
        .kompas-sidebar {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .sidebar-widget {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 18px;
        }
        .widget-header {
          display: flex;
          align-items: center;
          gap: 8px;
          border-bottom: 2px solid #e2e8f0;
          padding-bottom: 10px;
          margin-bottom: 14px;
        }
        .widget-bar {
          display: inline-block;
          width: 4px;
          height: 16px;
          background: #0077d7;
          border-radius: 2px;
        }
        .widget-title {
          font-size: 15px;
          font-weight: 800;
          color: #0f172a;
          margin: 0;
        }

        /* Editor Picks List */
        .editor-picks-list {
          display: flex;
          flex-direction: column;
        }
        .editor-pick-item {
          display: flex;
          gap: 12px;
          padding: 10px 0;
          border-bottom: 1px solid #f1f5f9;
        }
        .editor-pick-item:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }
        .pick-bullet {
          font-size: 16px;
          font-weight: 800;
          color: #0077d7;
          min-width: 18px;
        }
        .pick-content {
          flex: 1;
        }
        .pick-cat {
          font-size: 10.5px;
          font-weight: 700;
          color: #0284c7;
          text-transform: uppercase;
          display: block;
          margin-bottom: 2px;
        }
        .pick-title {
          font-size: 13.5px;
          font-weight: 600;
          line-height: 1.35;
          color: #1e293b;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .pick-title a {
          color: inherit;
          text-decoration: none;
          transition: color 0.15s ease;
        }
        .pick-title a:hover {
          color: #0077d7;
        }

        /* Cek Fakta Widget */
        .cek-fakta-widget {
          background: #f0fdf4;
          border-color: #bbf7d0;
        }
        .cek-fakta-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid #bbf7d0;
          padding-bottom: 10px;
          margin-bottom: 14px;
        }
        .cek-fakta-brand {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .badge-shield {
          width: 32px;
          height: 32px;
          background: #16a34a;
          color: #ffffff;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
        }
        .cek-fakta-title {
          font-size: 15px;
          font-weight: 800;
          color: #15803d;
          margin: 0;
        }
        .cek-fakta-sub {
          font-size: 11px;
          color: #166534;
        }
        .cek-fakta-link {
          font-size: 12px;
          font-weight: 600;
          color: #15803d;
          text-decoration: none;
        }
        .cek-fakta-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .cek-fakta-item {
          padding-bottom: 10px;
          border-bottom: 1px dashed #bbf7d0;
        }
        .cek-fakta-item:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }
        .tag-verifikasi {
          display: inline-block;
          background: #16a34a;
          color: #ffffff;
          font-size: 10px;
          font-weight: 800;
          padding: 2px 6px;
          border-radius: 3px;
          margin-bottom: 4px;
        }
        .cek-fakta-post-title {
          font-size: 13px;
          font-weight: 600;
          line-height: 1.35;
          color: #1e293b;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .cek-fakta-post-title a {
          color: inherit;
          text-decoration: none;
        }
        .cek-fakta-post-title a:hover {
          color: #15803d;
        }

        /* Newsletter Widget */
        .newsletter-widget {
          background: linear-gradient(135deg, #0077d7 0%, #004d8c 100%);
          color: #ffffff;
          border: none;
          text-align: center;
        }
        .newsletter-icon {
          font-size: 32px;
          color: #38bdf8;
          margin-bottom: 10px;
        }
        .newsletter-title {
          font-size: 16px;
          font-weight: 800;
          margin-bottom: 8px;
          color: #ffffff;
        }
        .newsletter-desc {
          font-size: 12.5px;
          color: #cbd5e1;
          line-height: 1.5;
          margin-bottom: 14px;
        }
        .newsletter-form {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .newsletter-input {
          width: 100%;
          background: rgba(255, 255, 255, 0.15);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 6px;
          padding: 9px 12px;
          font-size: 13px;
          color: #ffffff;
          outline: none;
        }
        .newsletter-input::placeholder {
          color: #94a3b8;
        }
        .newsletter-btn {
          background: #0284c7;
          border: none;
          border-radius: 6px;
          padding: 9px;
          color: #ffffff;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.15s ease;
        }
        .newsletter-btn:hover {
          background: #0369a1;
        }
        .alert-subscribed {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 6px;
          padding: 10px;
          font-size: 13px;
          font-weight: 600;
        }

        @media (max-width: 767px) {
          .stream-card {
            flex-direction: column;
          }
          .stream-img-box {
            width: 100%;
            min-width: 100%;
          }
          .stream-card-title {
            font-size: 15px;
          }
        }
      `}</style>
    </section>
  )
}

