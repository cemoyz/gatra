import Link from "next/link"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"

export default function KompasHeader({ scroll = false, handleMobileMenu }) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("")

  useEffect(() => {
    if (router.query.category) {
      setActiveCategory(String(router.query.category).toLowerCase())
    } else if (router.pathname === '/') {
      setActiveCategory('home')
    }
  }, [router.query, router.pathname])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/blog-filter-search?search=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const navMenuItems = [
    { label: "News", slug: "news", href: "/blog-filter-category?category=news" },
    { label: "Kolom", slug: "kolom", href: "/blog-filter-category?category=kolom" },
    { label: "Event", slug: "event", href: "/blog-filter-category?category=event" },
    { label: "Jagat Literasi", slug: "jagat-literasi", href: "/blog-filter-category?category=jagat-literasi", isNew: true },
    { label: "Cahaya", slug: "cahaya", href: "/blog-filter-category?category=cahaya" },
    { label: "Tekno", slug: "tekno", href: "/blog-filter-category?category=tekno" },
    { label: "Otomotif", slug: "otomotif", href: "/blog-filter-category?category=otomotif" },
    { label: "Bola", slug: "bola", href: "/blog-filter-category?category=bola" },
    { label: "Lifestyle", slug: "lifestyle", href: "/blog-filter-category?category=lifestyle" },
    { label: "Tren", slug: "tren", href: "/blog-filter-category?category=tren" },
    { label: "Lestari", slug: "lestari", href: "/blog-filter-category?category=lestari" },
    { label: "Money", slug: "money", href: "/blog-filter-category?category=money" },
    { label: "Properti", slug: "properti", href: "/blog-filter-category?category=properti" },
    { label: "Edukasi", slug: "edukasi", href: "/blog-filter-category?category=edukasi" },
    { label: "Travel", slug: "travel", href: "/blog-filter-category?category=travel" }
  ]

  const trendingTopics = [
    { title: "#TimnasIndonesia", query: "timnas" },
    { title: "#Pilkada2024", query: "pilkada" },
    { title: "#HargaEmasHariIni", query: "emas" },
    { title: "#CuacaEkstrem", query: "cuaca" },
    { title: "#TeknologiAI", query: "ai" },
    { title: "#MobilListrik", query: "mobil" },
    { title: "#BursaSaham", query: "saham" },
    { title: "#GadgetTerbaru", query: "gadget" }
  ]

  return (
    <header className={`kompas-exact-header ${scroll ? 'kompas-header-sticky' : ''}`}>
      {/* 1. TOP ROW: Brand, Search Bar, PLUS Button, Action Icons */}
      <div className="kompas-top-row">
        <div className="kompas-container">
          <div className="kompas-top-row-inner">
            {/* Left: Brand Logo */}
            <div className="kompas-brand-col">
              <Link href="/" className="kompas-logo-anchor">
                <div className="kompas-logo-box">
                  {/* 31th Anniversary Logo */}
                  <div className="anniversary-badge">
                    <span className="anniversary-31">31</span>
                    <span className="anniversary-th">th</span>
                    <svg className="anniversary-wave" width="22" height="6" viewBox="0 0 22 6" fill="none">
                      <path d="M1 3C3.5 1 6.5 1 9 3C11.5 5 14.5 5 17 3C18.5 1.8 20 2 21 3" stroke="#0ea5e9" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </div>

                  {/* KOMPAS.com lettering */}
                  <div className="kompas-text-group">
                    <div className="kompas-title-line">
                      <span className="kompas-word">KOMPAS</span>
                      <span className="kompas-dotcom">.com</span>
                    </div>
                    <div className="kompas-slogan">
                      JERNIH MELIHAT DUNIA
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Center: Search Box */}
            <div className="kompas-search-col">
              <form onSubmit={handleSearch} className="kompas-search-box">
                <input
                  type="text"
                  placeholder="Cari tokoh, topik atau pe"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="kompas-search-input"
                />
                <button type="submit" className="kompas-search-btn" aria-label="Cari">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </button>
              </form>
            </div>

            {/* Right: Actions */}
            <div className="kompas-actions-col">
              {/* Gabung Kompas.com PLUS Button */}
              <Link href="/subscribe" className="btn-kompas-plus">
                Gabung Kompas.com PLUS
              </Link>

              {/* Shopping Bag Icon */}
              <Link href="/subscribe" className="kompas-action-icon" title="Belanja / Merchandise">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
              </Link>

              {/* Headphones Icon with Red Dot */}
              <Link href="/blog?postType=audio" className="kompas-action-icon" title="Dengarkan Berita / Podcast">
                <div className="icon-with-dot">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
                    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
                  </svg>
                  <span className="red-notification-dot"></span>
                </div>
              </Link>

              {/* K+ Badge */}
              <Link href="/subscribe" className="badge-kplus" title="Kompas.com+ Membership">
                K+
              </Link>

              {/* User Profile Avatar Icon */}
              <Link href="/login" className="kompas-action-icon user-avatar-icon" title="Profil / Masuk">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 2. BOTTOM ROW: Navigation Menu (Black background) */}
      <nav className="kompas-nav-row">
        <div className="kompas-container">
          <div className="kompas-nav-inner">
            <div className="kompas-nav-scroll-list">
              {navMenuItems.map((item) => (
                <div key={item.slug} className="kompas-nav-link-wrap">
                  <Link
                    href={item.href}
                    className={`kompas-nav-link ${activeCategory === item.slug ? 'active' : ''}`}
                  >
                    <span>{item.label}</span>
                    {item.isNew && (
                      <span className="badge-nav-new">NEW</span>
                    )}
                  </Link>
                </div>
              ))}
            </div>

            {/* Hamburger Icon at end */}
            <button
              className="kompas-nav-hamburger"
              onClick={handleMobileMenu}
              aria-label="Semua Kanal"
              title="Semua Kanal"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* 3. TOPIK PILIHAN STRIP (Trending Topics Strip) */}
      <div className="kompas-trending-strip">
        <div className="kompas-container">
          <div className="kompas-trending-inner">
            <div className="trending-title">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#ef4444" stroke="#ef4444" strokeWidth="1" className="me-1">
                <path d="M12 2c1.5 3 4 5.5 4 8.5a6 6 0 1 1-12 0c0-3 2.5-5.5 4-8.5 1 2 2.5 3.5 4 3.5z"/>
              </svg>
              <span>Topik Pilihan:</span>
            </div>
            <div className="trending-tags-scroll">
              {trendingTopics.map((topic, i) => (
                <Link
                  key={i}
                  href={`/blog-filter-search?search=${encodeURIComponent(topic.query)}`}
                  className="trending-tag-pill"
                >
                  {topic.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CSS matching the exact screenshot */}
      <style jsx>{`
        .kompas-exact-header {
          background-color: #000000;
          color: #ffffff;
          font-family: 'Roboto', -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          position: relative;
          z-index: 1000;
          border-bottom: 1px solid #e5e7eb;
        }
        .kompas-header-sticky {
          position: sticky;
          top: 0;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
        }

        .kompas-container {
          max-width: 1180px;
          margin: 0 auto;
          padding: 0 16px;
          width: 100%;
        }

        /* ── Top Row ── */
        .kompas-top-row {
          background-color: #000000;
          padding: 12px 0 10px;
        }
        .kompas-top-row-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }

        /* Brand / Logo */
        .kompas-brand-col {
          flex-shrink: 0;
        }
        .kompas-logo-anchor {
          text-decoration: none;
          display: inline-block;
        }
        .kompas-logo-box {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        /* 31th Badge */
        .anniversary-badge {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          padding-right: 2px;
          line-height: 1;
        }
        .anniversary-31 {
          font-size: 26px;
          font-weight: 900;
          font-style: italic;
          background: linear-gradient(135deg, #f59e0b 0%, #f97316 45%, #06b6d4 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          letter-spacing: -1px;
        }
        .anniversary-th {
          position: absolute;
          top: 0px;
          right: -8px;
          font-size: 10px;
          font-weight: 800;
          color: #f59e0b;
        }
        .anniversary-wave {
          margin-top: -2px;
        }

        /* KOMPAS.com lettering */
        .kompas-text-group {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .kompas-title-line {
          display: flex;
          align-items: baseline;
          line-height: 1.05;
        }
        .kompas-word {
          font-size: 25px;
          font-weight: 900;
          color: #ffffff;
          font-family: Georgia, "Times New Roman", serif;
          letter-spacing: 0.5px;
        }
        .kompas-dotcom {
          font-size: 23px;
          font-weight: 800;
          color: #f97316;
          font-family: Georgia, "Times New Roman", serif;
        }
        .kompas-slogan {
          font-size: 9.5px;
          color: #ffffff;
          font-weight: 600;
          letter-spacing: 2.2px;
          margin-top: 3px;
          opacity: 0.95;
        }

        /* Search Box */
        .kompas-search-col {
          flex: 1;
          max-width: 440px;
          margin: 0 10px;
        }
        .kompas-search-box {
          position: relative;
          display: flex;
          align-items: center;
          width: 100%;
          background: #1f2329;
          border: 1px solid #363c46;
          border-radius: 8px;
          padding: 2px 8px 2px 14px;
          transition: border-color 0.2s ease, background 0.2s ease;
        }
        .kompas-search-box:focus-within {
          border-color: #0077d7;
          background: #252a32;
        }
        .kompas-search-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: #ffffff;
          font-size: 13.5px;
          padding: 7px 0;
        }
        .kompas-search-input::placeholder {
          color: #8b95a5;
        }
        .kompas-search-btn {
          background: none;
          border: none;
          color: #9ca3af;
          cursor: pointer;
          padding: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color 0.15s ease;
        }
        .kompas-search-btn:hover {
          color: #ffffff;
        }

        /* Actions Column */
        .kompas-actions-col {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-shrink: 0;
        }
        .btn-kompas-plus {
          background: #0077d7;
          color: #ffffff;
          font-size: 13px;
          font-weight: 700;
          padding: 8px 16px;
          border-radius: 8px;
          text-decoration: none;
          white-space: nowrap;
          transition: background 0.15s ease, transform 0.15s ease;
          display: inline-flex;
          align-items: center;
        }
        .btn-kompas-plus:hover {
          background: #0066ba;
          color: #ffffff;
        }
        .kompas-action-icon {
          color: #ffffff;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          opacity: 0.95;
          transition: opacity 0.15s ease, color 0.15s ease;
        }
        .kompas-action-icon:hover {
          opacity: 1;
          color: #38bdf8;
        }
        .icon-with-dot {
          position: relative;
          display: inline-flex;
        }
        .red-notification-dot {
          position: absolute;
          top: -2px;
          right: -2px;
          width: 7px;
          height: 7px;
          background-color: #ef4444;
          border-radius: 50%;
          border: 1px solid #000000;
        }
        .badge-kplus {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 1.5px solid rgba(255, 255, 255, 0.9);
          border-radius: 5px;
          padding: 1px 6px;
          font-size: 11.5px;
          font-weight: 800;
          color: #ffffff;
          letter-spacing: 0.5px;
          text-decoration: none;
          line-height: 1.2;
          transition: all 0.15s ease;
        }
        .badge-kplus:hover {
          background: rgba(255, 255, 255, 0.15);
          color: #ffffff;
        }
        .user-avatar-icon {
          font-size: 20px;
        }

        /* ── Bottom Navigation Row ── */
        .kompas-nav-row {
          background-color: #000000;
          border-top: 1px solid #141414;
          padding: 8px 0 10px;
        }
        .kompas-nav-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
        }
        .kompas-nav-scroll-list {
          display: flex;
          align-items: center;
          gap: 18px;
          overflow-x: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
          white-space: nowrap;
          flex: 1;
        }
        .kompas-nav-scroll-list::-webkit-scrollbar {
          display: none;
        }
        .kompas-nav-link-wrap {
          flex-shrink: 0;
        }
        .kompas-nav-link {
          position: relative;
          display: inline-flex;
          align-items: center;
          color: #ffffff;
          font-size: 13.5px;
          font-weight: 700;
          text-decoration: none;
          transition: color 0.15s ease;
          padding: 4px 0;
        }
        .kompas-nav-link:hover,
        .kompas-nav-link.active {
          color: #0077d7;
        }
        .badge-nav-new {
          position: absolute;
          top: -6px;
          right: -24px;
          background: #ef4444;
          color: #ffffff;
          font-size: 8px;
          font-weight: 900;
          padding: 1px 4px;
          border-radius: 3px;
          line-height: 1.1;
          letter-spacing: 0.3px;
        }
        .kompas-nav-hamburger {
          background: none;
          border: none;
          color: #ffffff;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4px 6px;
          flex-shrink: 0;
          transition: color 0.15s ease;
        }
        .kompas-nav-hamburger:hover {
          color: #0077d7;
        }

        /* ── Topik Pilihan Strip (Trending) ── */
        .kompas-trending-strip {
          background: #ffffff;
          border-bottom: 1px solid #e5e7eb;
          padding: 8px 0;
          font-size: 12.5px;
        }
        .kompas-trending-inner {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .trending-title {
          display: flex;
          align-items: center;
          font-weight: 700;
          color: #111827;
          white-space: nowrap;
          flex-shrink: 0;
          font-size: 12.5px;
        }
        .trending-tags-scroll {
          display: flex;
          align-items: center;
          gap: 8px;
          overflow-x: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
          white-space: nowrap;
        }
        .trending-tags-scroll::-webkit-scrollbar {
          display: none;
        }
        .trending-tag-pill {
          display: inline-block;
          background: #f3f4f6;
          color: #374151;
          padding: 3px 10px;
          border-radius: 14px;
          text-decoration: none;
          font-weight: 500;
          font-size: 12px;
          border: 1px solid #e5e7eb;
          transition: all 0.15s ease;
        }
        .trending-tag-pill:hover {
          background: #0077d7;
          color: #ffffff;
          border-color: #0077d7;
        }

        @media (max-width: 991px) {
          .kompas-top-row-inner {
            flex-wrap: wrap;
          }
          .kompas-search-col {
            order: 3;
            max-width: 100%;
            margin: 6px 0 0;
            width: 100%;
          }
        }
      `}</style>
    </header>
  )
}
