'use client'
import { useState, useEffect } from 'react'
import Link from "next/link"

const defaultCategories = [
	{ id: 1, name: "News", slug: "news" },
	{ id: 2, name: "Tekno", slug: "tekno" },
	{ id: 3, name: "Bola", slug: "bola" },
	{ id: 4, name: "Money", slug: "money" },
	{ id: 5, name: "Lifestyle", slug: "lifestyle" },
	{ id: 6, name: "Travel", slug: "travel" },
	{ id: 7, name: "Tren", slug: "tren" },
]

export default function MobileMenu({ isMobileMenu, handleMobileMenu, settings = {} }) {
	const [isAccordion, setIsAccordion] = useState(null)
	const [categories, setCategories] = useState(defaultCategories)
	const logoHeader = settings.logo_header || settings.site_logo || null
	const siteTitle = settings.site_title || "Dua Narasi"

	useEffect(() => {
		fetch('/api/categories?headerOnly=true')
			.then(res => res.json())
			.then(data => {
				if (data.success && Array.isArray(data.categories) && data.categories.length > 0) {
					setCategories(data.categories)
				}
			})
			.catch(() => {})
	}, [])

	const handleAccordion = (key) => {
		setIsAccordion(prevState => prevState === key ? null : key)
	}

	return (
		<>
			{/* Backdrop Overlay to close menu on click outside */}
			<div 
				className={`mobile-menu-overlay ${isMobileMenu ? "active" : ""}`} 
				onClick={handleMobileMenu}
				aria-hidden="true"
			/>

			<div className={`mobile-navigation-menu ${isMobileMenu ? "open-mobile-menu" : ""}`}>
				<div className="mobile-menu-header d-flex align-items-center justify-content-between">
					<Link href="/" onClick={handleMobileMenu} style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
						{logoHeader ? (
							<img src={logoHeader} alt={siteTitle} style={{ maxHeight: '32px', width: 'auto' }} />
						) : (
							<span style={{ fontSize: '18px', fontWeight: 800, color: 'var(--primary-color, #da0105)', letterSpacing: '0.5px' }}>
								{siteTitle}
							</span>
						)}
					</Link>
					<button id="mobile-menu-close" onClick={handleMobileMenu} aria-label="Close menu">
						<i className="las la-times" />
					</button>
				</div>

				<ul className="main-menu">
					<li>
						<Link href="/" onClick={handleMobileMenu}>Beranda</Link>
					</li>
					<li className={isAccordion === 1 ? "dropdown_menu dropdown-open" : "dropdown_menu"}>
						<Link href="/blog" onClick={handleMobileMenu}>Kanal Berita</Link>
						<span className={isAccordion === 1 ? "dropdown-plus dropdown-open" : "dropdown-plus"} onClick={(e) => { e.stopPropagation(); handleAccordion(1); }} />
						<ul style={{ display: isAccordion === 1 ? "block" : "none" }}>
							{categories.map((cat) => (
								<li key={cat.id}>
									<Link href={`/blog-filter-category?category=${cat.slug || cat.name}`} onClick={handleMobileMenu}>
										{cat.name}
									</Link>
								</li>
							))}
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

				<div className="mobile-drawer-footer">
					<Link href="/login" onClick={handleMobileMenu} className="drawer-auth-btn">
						<i className="las la-user-circle" style={{ fontSize: '18px', color: 'var(--primary-color, #da0105)' }}></i>
						<span>Masuk / Akun Redaksi</span>
					</Link>
				</div>
			</div>
		</>
	)
}
