import Link from "next/link"
import Marquee from "react-fast-marquee"
import { useEffect, useState } from "react"

export default function MargueePost({ cls = '', speed = 60, customCategories = null }) {
    const [categories, setCategories] = useState([])
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        if (customCategories && Array.isArray(customCategories) && customCategories.length > 0) {
            setCategories(customCategories)
            return
        }

        fetch('/api/categories')
            .then(res => res.json())
            .then(data => {
                if (data.success && data.categories && data.categories.length > 0) {
                    setCategories(data.categories)
                }
            })
            .catch(console.error)
    }, [customCategories])

    const defaultCategories = [
        { id: 1, name: 'Design', slug: 'design', postsCount: 6 },
        { id: 2, name: 'Tech & AI', slug: 'tech-ai', postsCount: 12 },
        { id: 3, name: 'UI / UX', slug: 'ui-ux', postsCount: 8 },
        { id: 4, name: 'Technology', slug: 'technology', postsCount: 14 },
        { id: 5, name: 'Development', slug: 'development', postsCount: 9 },
        { id: 6, name: 'Marketing', slug: 'marketing', postsCount: 5 },
        { id: 7, name: 'Lifestyle', slug: 'lifestyle', postsCount: 7 },
        { id: 8, name: 'Podcast', slug: 'podcast', postsCount: 4 }
    ]

    const displayCats = categories.length > 0 ? categories : defaultCategories

    if (!mounted) {
        return null
    }

    return (
        <div className="ta-moving-cats-wrapper" style={{ overflow: 'hidden' }}>
            <Marquee
                speed={speed}
                pauseOnHover={true}
                gradient={false}
                autoFill={true}
                className={`ta-moving-cats ${cls ? cls : ""}`}
            >
                {displayCats.map((cat) => {
                    const count = cat.postsCount ?? cat._count?.posts ?? 0
                    const countStr = String(count).padStart(2, '0')
                    const slug = cat.slug || cat.name?.toLowerCase()?.replace(/\s+/g, '-')

                    return (
                        <div key={cat.id || slug} className="item">
                            <Link href={`/blog-filter-category?category=${slug}`}>
                                {cat.name}{" "}
                            </Link>
                            <span className="count">{countStr}</span>
                        </div>
                    )
                })}
            </Marquee>
        </div>
    )
}
