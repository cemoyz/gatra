import Link from "next/link"
import { getImageUrl } from "@/lib/imageUtils"

export default function KompasFooter({ settings = {} }) {
  const siteLogo = getImageUrl(settings.logo_footer || settings.site_logo, "/assets/img/logo/logoredwhite.webp")

  const networkLinks = [
    { name: "Harian Kompas", url: "https://www.kompas.id" },
    { name: "Kompas TV", url: "https://www.kompas.tv" },
    { name: "Tribunnews.com", url: "https://www.tribunnews.com" },
    { name: "Kontan.co.id", url: "https://www.kontan.co.id" },
    { name: "BolaSport.com", url: "https://www.bolasport.com" },
    { name: "GridOto.com", url: "https://www.gridoto.com" },
    { name: "Kompasiana", url: "https://www.kompasiana.com" },
    { name: "Gramedia.com", url: "https://www.gramedia.com" }
  ]

  const channelLinks = [
    { name: "News", url: "/blog-filter-category?category=news" },
    { name: "Tren", url: "/blog-filter-category?category=tren" },
    { name: "Bola", url: "/blog-filter-category?category=bola" },
    { name: "Tekno", url: "/blog-filter-category?category=tekno" },
    { name: "Money", url: "/blog-filter-category?category=money" },
    { name: "Sains", url: "/blog-filter-category?category=sains" },
    { name: "Otomotif", url: "/blog-filter-category?category=otomotif" },
    { name: "Lifestyle", url: "/blog-filter-category?category=lifestyle" },
    { name: "Edukasi", url: "/blog-filter-category?category=edukasi" },
    { name: "Cek Fakta", url: "/blog-filter-category?category=cek-fakta" },
    { name: "Video", url: "/blog?postType=video" }
  ]

  return (
    <footer className="kompas-footer">
      {/* 1. Network Strip */}
      <div className="footer-network-strip">
        <div className="container">
          <div className="network-strip-inner">
            <span className="network-strip-label">KG Media Network:</span>
            <div className="network-strip-links">
              {networkLinks.map((item, i) => (
                <a key={i} href={item.url} target="_blank" rel="noreferrer" className="network-strip-a">
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Footer Body */}
      <div className="footer-main-body">
        <div className="container">
          <div className="row g-4">
            {/* Brand Column */}
            <div className="col-lg-4 col-md-6">
              <div className="footer-brand-box">
                <Link href="/" className="footer-logo-link">
                  <span className="footer-logo-text">KOMPAS<span className="dot">.com</span></span>
                </Link>
                <p className="footer-slogan">
                  {settings.site_tagline || "Jernih Melihat Dunia — Portal Berita & Opini Terpercaya"}
                </p>
                <p className="footer-about">
                  Menyajikan berita terkini, akurat, mendalam, dan terpercaya dari ranah politik, ekonomi, olahraga, teknologi, hiburan, dan peristiwa penting lainnya.
                </p>
                <div className="footer-social-links">
                  <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
                  <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
                  <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                  <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
                  <a href="https://tiktok.com" target="_blank" rel="noreferrer" aria-label="TikTok"><i className="fab fa-tiktok"></i></a>
                </div>
              </div>
            </div>

            {/* Rubrik / Channel Sitemap */}
            <div className="col-lg-4 col-md-6">
              <div className="footer-widget">
                <h4 className="footer-widget-title">Kanal Berita</h4>
                <div className="footer-channels-grid">
                  {channelLinks.map((c, i) => (
                    <Link key={i} href={c.url} className="footer-channel-link">
                      {c.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Corporate & Legal Links */}
            <div className="col-lg-4 col-md-12">
              <div className="footer-widget">
                <h4 className="footer-widget-title">Informasi & Redaksi</h4>
                <ul className="footer-info-links">
                  <li><Link href="/about-us">Tentang Kami</Link></li>
                  <li><Link href="/pedoman-media-siber">Pedoman Media Siber</Link></li>
                  <li><Link href="/author">Tim Redaksi & Penulis</Link></li>
                  <li><Link href="/contact">Kontak Kami</Link></li>
                  <li><Link href="/subscribe">Langganan Newsletter</Link></li>
                  <li><Link href="/dashboard">Panel Redaksi (Dashboard)</Link></li>
                </ul>

                <div className="footer-trust-badge">
                  <i className="fas fa-certificate text-warning me-2"></i>
                  <span>Terverifikasi Dewan Pers & IFCN Signatory</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Bottom Copyright Bar */}
      <div className="footer-bottom-bar">
        <div className="container">
          <div className="footer-bottom-inner">
            <span className="copyright-text" suppressHydrationWarning>
              © {new Date().getFullYear()} PT Kompas Cyber Media. Seluruh hak cipta dilindungi undang-undang.
            </span>
            <div className="footer-bottom-links">
              <Link href="/pedoman-media-siber">Kebijakan Privasi</Link>
              <span className="dot-sep">•</span>
              <Link href="/pedoman-media-siber">Syarat & Ketentuan</Link>
              <span className="dot-sep">•</span>
              <Link href="/contact">Bantuan</Link>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .kompas-footer {
          background: #0f172a;
          color: #94a3b8;
          font-size: 13px;
        }

        /* Network Strip */
        .footer-network-strip {
          background: #090e17;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding: 10px 0;
          font-size: 12px;
        }
        .network-strip-inner {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
        }
        .network-strip-label {
          font-weight: 700;
          color: #cbd5e1;
          white-space: nowrap;
        }
        .network-strip-links {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
        }
        .network-strip-a {
          color: #94a3b8;
          text-decoration: none;
          transition: color 0.15s ease;
        }
        .network-strip-a:hover {
          color: #38bdf8;
        }

        /* Main Body */
        .footer-main-body {
          padding: 40px 0;
        }
        .footer-brand-box {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .footer-logo-link {
          text-decoration: none;
          display: inline-block;
        }
        .footer-logo-text {
          font-size: 26px;
          font-weight: 900;
          color: #ffffff;
          letter-spacing: -0.5px;
        }
        .footer-logo-text .dot {
          color: #0284c7;
        }
        .footer-slogan {
          font-size: 13px;
          font-weight: 600;
          color: #e2e8f0;
          font-style: italic;
          margin: 0;
        }
        .footer-about {
          font-size: 12.5px;
          line-height: 1.6;
          color: #94a3b8;
          margin: 0;
        }
        .footer-social-links {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 6px;
        }
        .footer-social-links a {
          width: 32px;
          height: 32px;
          background: rgba(255, 255, 255, 0.08);
          color: #cbd5e1;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          font-size: 13px;
          transition: all 0.2s ease;
        }
        .footer-social-links a:hover {
          background: #0284c7;
          color: #ffffff;
        }

        /* Widget Titles & Links */
        .footer-widget-title {
          font-size: 15px;
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 16px;
          letter-spacing: 0.3px;
          border-left: 3px solid #0284c7;
          padding-left: 8px;
        }
        .footer-channels-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
        }
        .footer-channel-link {
          color: #94a3b8;
          text-decoration: none;
          font-size: 13px;
          transition: color 0.15s ease;
        }
        .footer-channel-link:hover {
          color: #38bdf8;
          padding-left: 3px;
        }

        /* Info Links */
        .footer-info-links {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 9px;
        }
        .footer-info-links a {
          color: #94a3b8;
          text-decoration: none;
          transition: color 0.15s ease;
        }
        .footer-info-links a:hover {
          color: #38bdf8;
        }
        .footer-trust-badge {
          margin-top: 16px;
          padding: 10px 14px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 6px;
          font-size: 11.5px;
          font-weight: 600;
          color: #cbd5e1;
          display: flex;
          align-items: center;
        }

        /* Bottom Bar */
        .footer-bottom-bar {
          background: #090e17;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding: 14px 0;
          font-size: 12px;
        }
        .footer-bottom-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 10px;
        }
        .copyright-text {
          color: #64748b;
        }
        .footer-bottom-links {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .footer-bottom-links a {
          color: #94a3b8;
          text-decoration: none;
          transition: color 0.15s ease;
        }
        .footer-bottom-links a:hover {
          color: #38bdf8;
        }
        .dot-sep {
          color: #475569;
        }
      `}</style>
    </footer>
  )
}

