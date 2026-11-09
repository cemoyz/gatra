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

export default function MobileMenu({ isMobileMenu, handleMobileMenu }) {
	const [isAccordion, setIsAccordion] = useState(null)
	const [categories, setCategories] = useState(defaultCategories)

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
			</div>
		</>
	)
}
