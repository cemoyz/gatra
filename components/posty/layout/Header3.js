import Link from "next/link"
import ThemeSwitch from "../elements/ThemeSwitch"
import Menu from "./Menu"

export default function Header3({ scroll, isMobileMenu, handleMobileMenu, isSidebar, handleSidebar, isSearch, handleSearch }) {
	return (
		<>
			<header className="main-header">
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
