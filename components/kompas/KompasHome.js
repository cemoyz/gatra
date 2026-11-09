import { useState, useEffect } from "react"
import Head from "next/head"
import KompasHeader from "./KompasHeader"
import KompasHeroSection from "./KompasHeroSection"
import KompasFokusSection from "./KompasFokusSection"
import KompasCategoryGrid from "./KompasCategoryGrid"
import KompasVideoSection from "./KompasVideoSection"
import KompasStreamSection from "./KompasStreamSection"
import KompasFooter from "./KompasFooter"
import BreakingNewsTicker from "@/components/elements/BreakingNewsTicker"
import BackToTop from "@/components/elements/BackToTop"
import Sidebar from "@/components/layout/Sidebar"

export default function KompasHome({ settings = {}, initialPosts = [] }) {
  const [scroll, setScroll] = useState(false)
  const [isMobileMenu, setIsMobileMenu] = useState(false)
  const [posts, setPosts] = useState(initialPosts)
  const [popularPosts, setPopularPosts] = useState([])
  const [loading, setLoading] = useState(initialPosts.length === 0)

  // Scroll handler for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 80)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Fetch posts if not passed via SSR
  useEffect(() => {
    fetch('/api/posts?limit=50&status=PUBLISHED')
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.posts) && data.posts.length > 0) {
          setPosts(data.posts)
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false))

    // Fetch popular posts for ranking
    fetch('/api/posts?limit=10&sortBy=popular&status=PUBLISHED')
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.posts)) {
          setPopularPosts(data.posts)
        }
      })
      .catch(console.error)
  }, [])

  const handleMobileMenu = () => setIsMobileMenu(!isMobileMenu)

  // Filter category posts
  const teknoPosts = posts.filter(p => {
    const s = (p.category?.slug || p.category?.name || "").toLowerCase()
    return s.includes('tekno') || s.includes('technology') || s.includes('design')
  })

  const bolaPosts = posts.filter(p => {
    const s = (p.category?.slug || p.category?.name || "").toLowerCase()
    return s.includes('bola') || s.includes('travel') || s.includes('sport')
  })

  const moneyPosts = posts.filter(p => {
    const s = (p.category?.slug || p.category?.name || "").toLowerCase()
    return s.includes('money') || s.includes('marketing') || s.includes('bisnis') || s.includes('ekonomi')
  })

  const factCheckPosts = posts.filter(p => {
    const s = (p.category?.slug || p.category?.name || "").toLowerCase()
    return s.includes('cek-fakta') || s.includes('fakta') || s.includes('edukasi') || s.includes('sains')
  })

  const editorPicks = posts.filter(p => p.featured).slice(0, 5).length > 0
    ? posts.filter(p => p.featured).slice(0, 5)
    : posts.slice(2, 7)

  // Stream posts (starting from post 6 onwards)
  const streamPosts = posts.length > 6 ? posts.slice(4) : posts

  return (
    <>
      <Head>
        <title>{settings.site_title || "KOMPAS.com"} - {settings.site_tagline || "Jernih Melihat Dunia"}</title>
        <meta name="description" content={settings.site_tagline || "Portal Berita Terkini, Akurat, dan Terpercaya"} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={settings.site_favicon || "/assets/img/logo/favicon.webp"} />
      </Head>

      <div className="kompas-layout-container">
        <BackToTop />
        <Sidebar isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu} settings={settings} />

        {/* 1. Header Kompas.com */}
        <KompasHeader
          settings={settings}
          scroll={scroll}
          handleMobileMenu={handleMobileMenu}
        />

        {/* 2. Breaking News Ticker (Kilas Berita) */}
        <div className="kompas-ticker-container">
          <div className="container">
            <BreakingNewsTicker settings={settings} />
          </div>
        </div>

        {/* 3. Hero Section (Sorotan Utama & Terpopuler Numbered List) */}
        <KompasHeroSection
          posts={posts.slice(0, 4)}
          popularPosts={popularPosts.length > 0 ? popularPosts : posts.slice(0, 5)}
        />

        {/* 4. Liputan Khusus & Fokus Section */}
        <KompasFokusSection posts={posts} />

        {/* 5. Kanal Pilihan (Tekno, Bola, Money) */}
        <section className="kompas-rubrik-container">
          <div className="container">
            <div className="row g-4">
              <div className="col-lg-6">
                <KompasCategoryGrid
                  title="KOMPAS TEKNO"
                  slug="tekno"
                  color="#004085"
                  posts={teknoPosts.length >= 3 ? teknoPosts : posts.slice(3, 7)}
                />
              </div>
              <div className="col-lg-6">
                <KompasCategoryGrid
                  title="KOMPAS BOLA"
                  slug="bola"
                  color="#059669"
                  posts={bolaPosts.length >= 3 ? bolaPosts : posts.slice(6, 10)}
                />
              </div>
            </div>

            <div className="row g-4 mt-1">
              <div className="col-12">
                <KompasCategoryGrid
                  title="KOMPAS MONEY & BISNIS"
                  slug="money"
                  color="#d97706"
                  posts={moneyPosts.length >= 3 ? moneyPosts : posts.slice(8, 12)}
                />
              </div>
            </div>
          </div>
        </section>

        {/* 6. Kompas Video Multimedia */}
        <KompasVideoSection posts={posts} />

        {/* 7. Stream Berita Terkini & Sticky Sidebar */}
        <KompasStreamSection
          streamPosts={streamPosts}
          editorPicks={editorPicks}
          factCheckPosts={factCheckPosts.length > 0 ? factCheckPosts : posts.slice(0, 3)}
        />

        {/* 8. Footer Kompas.com */}
        <KompasFooter settings={settings} />
      </div>

      <style jsx global>{`
        /* Kompas.com Clean Global Typography & Aesthetics */
        body {
          background-color: #ffffff !important;
          color: #1e293b !important;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif !important;
          -webkit-font-smoothing: antialiased;
        }

        .kompas-layout-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background: #ffffff;
        }

        .kompas-ticker-container {
          padding-top: 10px;
          padding-bottom: 2px;
          background: #ffffff;
        }

        .kompas-rubrik-container {
          padding: 24px 0 0;
          background: #ffffff;
        }

        /* Clean link styling inside Kompas components */
        .kompas-layout-container a {
          text-decoration: none;
        }

        /* Responsive image fixes */
        .kompas-layout-container img {
          max-width: 100%;
          height: auto;
        }
      `}</style>
    </>
  )
}

