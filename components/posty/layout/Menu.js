'use client'
import Link from 'next/link'

export default function Menu() {
	return (
		<>
			<ul className="main-menu">
				<li className="active">
					<Link href="/">Beranda</Link>
				</li>
				<li>
					<Link href="/blog">Kanal Berita</Link>
					<ul>
						<li><Link href="/blog-filter-category?category=news">News</Link></li>
						<li><Link href="/blog-filter-category?category=tekno">Tekno</Link></li>
						<li><Link href="/blog-filter-category?category=bola">Bola</Link></li>
						<li><Link href="/blog-filter-category?category=money">Money</Link></li>
						<li><Link href="/blog-filter-category?category=lifestyle">Lifestyle</Link></li>
						<li><Link href="/blog-filter-category?category=travel">Travel</Link></li>
						<li><Link href="/blog-filter-category?category=tren">Tren</Link></li>
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
