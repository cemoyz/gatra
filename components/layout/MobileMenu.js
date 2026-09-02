import Link from "next/link"
import { useEffect, useState } from "react"

export default function MobileMenu() {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        fetch('/api/categories?headerOnly=true')
            .then(res => res.json())
            .then(data => {
                if (data.success && Array.isArray(data.categories)) {
                    setCategories(data.categories.filter(c => c.showInHeader !== false))
                }
            })
            .catch(console.error)
    }, [])

    return (
        <>
            <div className="ta-mobile-menu mean-container">
                <div className="mean-bar">
                    <Link href="#nav" className="meanmenu-reveal" style={{ right: 0, left: 'auto', display: 'inline' }}>
                        <span /><span /><span />
                    </Link>
                    <nav className="mean-nav">
                        <ul className="justify-content-center">
                            <li><Link href="/">Beranda</Link></li>
                            {categories.map((cat) => (
                                <li key={cat.id} className="mean-last">
                                    <Link href={`/blog-filter-category?category=${cat.slug}`}>
                                        {cat.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    )
}
