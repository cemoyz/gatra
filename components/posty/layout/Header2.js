import Link from "next/link"
import ThemeSwitch from "../elements/ThemeSwitch"
import Menu from "./Menu"

export default function Header2({ scroll, isMobileMenu, handleMobileMenu, isSidebar, handleSidebar, isSearch, handleSearch }) {
	return (
		<>
			<header className="main-header">
				<div className="top-bar">
					<div className="container">
						<div className="top-bar-wrap">
							<div className="top-bar-left">
								<h4 className="link-title"><span>Quick Links:</span></h4>
								<ul>
									<li><Link href="/about">About Us</Link></li>
									<li><Link href="/contact">Contact us</Link></li>
									<li><Link href="/blog-default">Latest News</Link></li>
								</ul>
							</div>
							<div className="top-bar-right">
								<span className="date"><i className="las la-calendar" />Saturday , 20 May 2024</span>
							</div>
						</div>
					</div>
				</div>
				<div className="bottom-header">
					<div className="container">
						<div className="navigation-wrapper">
							<div className="navigation-inner">
								<div className="site-logo">
									<Link href="/"><img src="/assets/img/logo/logo-light-2.png" alt="" /></Link>
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
			</header>


		</>
	)
}
