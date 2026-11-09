import Link from "next/link"
import ThemeSwitch from "../elements/ThemeSwitch"
import Menu from "./Menu"
import { getImageUrl } from "@/lib/imageUtils"

export default function Header1({ scroll, isMobileMenu, handleMobileMenu, isSidebar, handleSidebar, isSearch, handleSearch, settings = {} }) {
	const logoDark = getImageUrl(settings.logo_header || settings.site_logo, "/assets/img/logo/logo-dark-2.png")
	const logoLight = getImageUrl(settings.logo_header || settings.site_logo, "/assets/img/logo/logo-dark.png")

	return (
		<>
			<header className="main-header transparent">
				<div className="top-bar">
					<div className="container">
						<div className="top-bar-wrap">
							<div className="top-bar-left">
								<h4 className="link-title"><span>Menu Utama:</span></h4>
								<ul>
									<li><Link href="/about">Tentang Kami</Link></li>
									<li><Link href="/contact">Hubungi Kami</Link></li>
									<li><Link href="/blog">Berita Terkini</Link></li>
									<li><Link href="/breaking-news">Breaking News</Link></li>
								</ul>
							</div>
							<div className="top-bar-right">
								<span className="date" suppressHydrationWarning>
									<i className="las la-calendar" />
									{new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
								</span>
							</div>
						</div>
					</div>
				</div>
				<div className="mid-header">
					<div className="container">
						<div className="mid-header-wrap">
							<div className="mid-header-left">
								<ul className="header-social">
									<li>
										<Link href="/#" className="facebook"><i className="lab la-facebook-f" /></Link>
									</li>
									<li>
										<Link href="/#" className="twitter"><i className="lab la-twitter" /></Link>
									</li>
									<li>
										<Link href="/#" className="instagram"><i className="lab la-instagram" /></Link>
									</li>
									<li>
										<Link href="/#" className="linkedin"><i className="lab la-linkedin-in" /></Link>
									</li>
									<li>
										<Link href="/#" className="pinterest"><i className="lab la-pinterest-p" /></Link>
									</li>
								</ul>
							</div>
							<div className="site-logo">
								<Link href="/">
									<img className="logo-dark" src={logoDark} alt={settings.site_title || "Logo"} style={{ maxHeight: '42px', width: 'auto' }} />
									<img className="logo-light" src={logoLight} alt={settings.site_title || "Logo"} style={{ maxHeight: '42px', width: 'auto' }} />
								</Link>
							</div>
							<div className="mid-header-right">
								<Link href="/subscribe" className="default-btn header-btn">Langganan</Link>
								<Link href="/login" className="user" title="Masuk / Akun"><i className="las la-user" /></Link>
							</div>
						</div>
					</div>
				</div>
				<div className={`${scroll ? "sticky-header sticky-fixed-top" : ""} `}>
					<div className="bottom-header">
						<div className="container">
							<div className="navigation-wrapper">
								<div className="navigation-inner">
									<div className="sidebar-icon">
										<button className="sidebar-trigger open" onClick={handleSidebar}>
											<span />
											<span />
											<span />
										</button>
									</div>
									<div className="site-logo">
										<Link className="light" href="/"><img src={logoDark} alt={settings.site_title || "logo"} style={{ maxHeight: '36px', width: 'auto' }} /></Link>
										<Link className="dark" href="/"><img src={logoLight} alt={settings.site_title || "logo"} style={{ maxHeight: '36px', width: 'auto' }} /></Link>
									</div>
									<nav className="navigation-menu">
										<Menu />
									</nav>
									<div className="header-right">
										<ThemeSwitch />
										<div className="search-icon dl-search-icon" onClick={handleSearch}>
											<i className="las la-search" />
										</div>
										<div className="mobile-menu-icon" onClick={handleMobileMenu}>
											<div className="burger-menu">
												<div className="line-menu line-half first-line" />
												<div className="line-menu" />
												<div className="line-menu line-half last-line" />
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</header>

			{/* <HeaderAuthBtn /> */}
		</>
	)
}
