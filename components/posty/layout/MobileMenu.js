'use client'
import { useState } from 'react'
import Link from "next/link"

export default function MobileMenu({ isMobileMenu, handleMobileMenu }) {
	const [isAccordion, setIsAccordion] = useState(null)
	const handleAccordion = (key) => {
		setIsAccordion(prevState => prevState === key ? null : key)
	}

	return (
		<>
			<div className={`mobile-navigation-menu ${isMobileMenu ? "open-mobile-menu" : ""}`}>
				<button id="mobile-menu-close" onClick={handleMobileMenu} aria-label="Close menu">
					<i className="las la-times" />
				</button>
				<ul className="main-menu">
					<li>
						<Link href="/" onClick={handleMobileMenu}>Beranda</Link>
					</li>
					<li className={isAccordion === 1 ? "dropdown_menu dropdown-open" : "dropdown_menu"}>
						<Link href="/blog">Kanal Berita</Link>
						<span className={isAccordion === 1 ? "dropdown-plus dropdown-open" : "dropdown-plus"} onClick={() => handleAccordion(1)} />
						<ul style={{ display: isAccordion === 1 ? "block" : "none" }}>
							<li><Link href="/blog-filter-category?category=news" onClick={handleMobileMenu}>News</Link></li>
							<li><Link href="/blog-filter-category?category=tekno" onClick={handleMobileMenu}>Tekno</Link></li>
							<li><Link href="/blog-filter-category?category=bola" onClick={handleMobileMenu}>Bola</Link></li>
							<li><Link href="/blog-filter-category?category=money" onClick={handleMobileMenu}>Money</Link></li>
							<li><Link href="/blog-filter-category?category=lifestyle" onClick={handleMobileMenu}>Lifestyle</Link></li>
							<li><Link href="/blog-filter-category?category=travel" onClick={handleMobileMenu}>Travel</Link></li>
							<li><Link href="/blog-filter-category?category=tren" onClick={handleMobileMenu}>Tren</Link></li>
						</ul>
					</li>
					<li>
						<Link href="/breaking-news" onClick={handleMobileMenu}>Breaking News</Link>
					</li>
					<li>
						<Link href="/blog" onClick={handleMobileMenu}>Semua Berita</Link>
					</li>
					<li>
						<Link href="/about" onClick={handleMobileMenu}>Tentang Kami</Link>
					</li>
					<li>
						<Link href="/contact" onClick={handleMobileMenu}>Kontak</Link>
					</li>
					<li>
						<Link href="/dashboard" onClick={handleMobileMenu}>Dashboard</Link>
					</li>
				</ul>
			</div>
		</>
	)
}
