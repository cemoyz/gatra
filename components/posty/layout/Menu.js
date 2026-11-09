'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'

const defaultCategories = [
	{ id: 1, name: "News", slug: "news" },
	{ id: 2, name: "Tekno", slug: "tekno" },
	{ id: 3, name: "Bola", slug: "bola" },
	{ id: 4, name: "Money", slug: "money" },
	{ id: 5, name: "Lifestyle", slug: "lifestyle" },
	{ id: 6, name: "Travel", slug: "travel" },
	{ id: 7, name: "Tren", slug: "tren" },
]

export default function Menu() {
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

	return (
		<>
			<ul className="main-menu">
				<li className="active">
					<Link href="/">Beranda</Link>
				</li>
				<li>
					<Link href="/blog">Kanal Berita</Link>
					<ul>
						{categories.map((cat) => (
							<li key={cat.id}>
								<Link href={`/blog-filter-category?category=${cat.slug || cat.name}`}>
									{cat.name}
								</Link>
							</li>
						))}
					</ul>
				</li>
				<li>
					<Link href="/breaking-news">Breaking News</Link>
				</li>
				<li>
					<Link href="/blog">Semua Berita</Link>
				</li>
				<li>
					<Link href="/about">Tentang Kami</Link>
				</li>
				<li>
					<Link href="/contact">Kontak</Link>
				</li>
				<li>
					<Link href="/dashboard">Dashboard</Link>
				</li>
			</ul>
		</>
	)
}
