import Link from "next/link"
import { getImageUrl } from "@/lib/imageUtils"

export default function Sidebar({ isSidebar, handleSidebar, settings = {} }) {
	const siteTitle = settings.site_title || "Gatra Portal"
	const siteTagline = settings.site_tagline || "Portal Berita Terkini, Akurat, dan Terpercaya Menyajikan Informasi Pilihan Seputar Peristiwa Nasional dan Internasional."
	const logoDark = getImageUrl(settings.logo_header || settings.site_logo, "/assets/img/logo/logo-dark-2.png")
	const logoLight = getImageUrl(settings.logo_header || settings.site_logo, "/assets/img/logo/logo-dark.png")
	const contactPhone = settings.contact_phone_1 || settings.contact_phone || "+62 21 555 7890"
	const contactEmail = settings.contact_email_1 || settings.contact_email || "redaksi@gatra.com"
	const contactAddress = settings.contact_address_1 || "Jakarta, Indonesia"

	return (
		<>
			<div id="sidebar-area" className={`sidebar-area ${isSidebar ? "open-sidebar" : ""}`}>
				<button className="sidebar-trigger close" onClick={handleSidebar} aria-label="Tutup Menu">
					<svg className="sidebar-close" xmlns="http://www.w3.org/2000/svg" width="16px" height="12.7px" viewBox="0 0 16 12.7" style={{ enableBackground: 'new 0 0 16 12.7' }}>
						<g>
							<rect x={0} y="5.4" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -2.1569 7.5208)" width={16} height={2} />
							<rect x={0} y="5.4" transform="matrix(0.7071 0.7071 -0.7071 0.7071 6.8431 -3.7929)" width={16} height={2} />
						</g>
					</svg>
				</button>
				<div className="sidebar-content">
					<div className="site-logo mb-3">
						<Link href="/" onClick={handleSidebar}>
							<img className="logo-dark" src={logoDark} alt={siteTitle} style={{ maxHeight: "38px", width: "auto" }} />
							<img className="logo-light" src={logoLight} alt={siteTitle} style={{ maxHeight: "38px", width: "auto" }} />
						</Link>
					</div>
					<p style={{ fontSize: "14px", lineHeight: "1.7", color: "#64748b", marginBottom: "20px" }}>
						{siteTagline}
					</p>
					<ul className="sidebar-info mb-4" style={{ listStyle: "none", padding: 0 }}>
						<li className="mb-2"><span className="fw-bold text-dark">Alamat:</span> {contactAddress}</li>
						<li className="mb-2"><span className="fw-bold text-dark">Telepon:</span> {contactPhone}</li>
						<li className="mb-2"><span className="fw-bold text-dark">Email:</span> {contactEmail}</li>
					</ul>

					<div className="sidebar-menu-links mb-4" style={{ borderTop: "1px solid #e2e8f0", paddingTop: "15px" }}>
						<h4 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "12px" }}>Navigasi Cepat</h4>
						<ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
							<li className="mb-2"><Link href="/" onClick={handleSidebar}>Beranda</Link></li>
							<li className="mb-2"><Link href="/blog" onClick={handleSidebar}>Semua Berita Terkini</Link></li>
							<li className="mb-2"><Link href="/breaking-news" onClick={handleSidebar}>Breaking News</Link></li>
							<li className="mb-2"><Link href="/blog-filter-category?category=news" onClick={handleSidebar}>Kanal News</Link></li>
							<li className="mb-2"><Link href="/blog-filter-category?category=tekno" onClick={handleSidebar}>Kanal Tekno</Link></li>
							<li className="mb-2"><Link href="/blog-filter-category?category=bola" onClick={handleSidebar}>Kanal Bola</Link></li>
							<li className="mb-2"><Link href="/about" onClick={handleSidebar}>Tentang Kami</Link></li>
							<li className="mb-2"><Link href="/contact" onClick={handleSidebar}>Hubungi Kami</Link></li>
							<li className="mb-2"><Link href="/pedoman-media-siber" onClick={handleSidebar}>Pedoman Siber</Link></li>
						</ul>
					</div>

					<ul className="sidebar-social">
						{settings.enable_facebook !== 'false' && settings.social_facebook && (
							<li><a href={settings.social_facebook} target="_blank" rel="noopener noreferrer" className="facebook" aria-label="Facebook"><i className="lab la-facebook-f" /></a></li>
						)}
						{settings.enable_twitter !== 'false' && settings.social_twitter && (
							<li><a href={settings.social_twitter} target="_blank" rel="noopener noreferrer" className="twitter" aria-label="Twitter"><i className="lab la-twitter" /></a></li>
						)}
						{settings.enable_instagram !== 'false' && settings.social_instagram && (
							<li><a href={settings.social_instagram} target="_blank" rel="noopener noreferrer" className="instagram" aria-label="Instagram"><i className="lab la-instagram" /></a></li>
						)}
						{settings.enable_youtube !== 'false' && settings.social_youtube && (
							<li><a href={settings.social_youtube} target="_blank" rel="noopener noreferrer" className="youtube" aria-label="YouTube"><i className="lab la-youtube" /></a></li>
						)}
						{settings.enable_whatsapp !== 'false' && settings.social_whatsapp && (
							<li><a href={`https://wa.me/${settings.social_whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="whatsapp" aria-label="WhatsApp"><i className="lab la-whatsapp" /></a></li>
						)}
						{!settings.social_facebook && !settings.social_twitter && !settings.social_instagram && (
							<>
								<li><Link href="/#" className="facebook" aria-label="Facebook"><i className="lab la-facebook-f" /></Link></li>
								<li><Link href="/#" className="twitter" aria-label="Twitter"><i className="lab la-twitter" /></Link></li>
								<li><Link href="/#" className="instagram" aria-label="Instagram"><i className="lab la-instagram" /></Link></li>
							</>
						)}
					</ul>
				</div>
			</div>

			{isSidebar && (
				<div id="sidebar-overlay" onClick={handleSidebar} />
			)}
		</>
	)
}
