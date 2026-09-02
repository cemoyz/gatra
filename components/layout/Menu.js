import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function Menu() {
    const router = useRouter()
    const currentCategory = router.query.category || ""
    const [categories, setCategories] = useState([])

    useEffect(() => {
        fetch('/api/categories?headerOnly=true')
            .then(res => res.json())
            .then(data => {
                if (data.success && Array.isArray(data.categories)) {
                    // Limit to 6 categories so with Beranda it fits 7 items in 1 single row
                    setCategories(data.categories.filter(c => c.showInHeader !== false).slice(0, 6))
                }
            })
            .catch(console.error)
    }, [])

    return (
        <>
            <nav id="ta-navbar" className="ta-navbar-wrapper">
                <style jsx>{`
                    :global(#ta-navbar) {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        width: 100%;
                    }
                    :global(#ta-navbar ul) {
                        display: flex !important;
                        flex-direction: row !important;
                        flex-wrap: nowrap !important;
                        align-items: center !important;
                        justify-content: center !important;
                        gap: 10px !important;
                        margin: 0 !important;
                        padding: 0 !important;
                        list-style: none !important;
                    }
                    :global(#ta-navbar ul li),
                    :global(.ta-main-menu ul li) {
                        display: inline-flex !important;
                        align-items: center !important;
                        justify-content: center !important;
                        text-align: center !important;
                        white-space: nowrap !important;
                        flex-shrink: 0 !important;
                        margin-right: 0 !important;
                        margin-left: 0 !important;
                        padding: 0 !important;
                        position: relative !important;
                    }
                    :global(#ta-navbar ul li a),
                    :global(.ta-main-menu ul li a) {
                        display: inline-flex !important;
                        align-items: center !important;
                        justify-content: center !important;
                        text-align: center !important;
                        padding: 24px 10px !important;
                        font-size: 13.5px !important;
                        font-weight: 700 !important;
                        color: #ffffff !important;
                        white-space: nowrap !important;
                        text-transform: uppercase !important;
                        letter-spacing: 0.3px !important;
                        transition: color 0.25s ease !important;
                        position: relative !important;
                    }
                    /* Garis bawah presisi center sejajar dengan teks */
                    :global(#ta-navbar ul li a::before),
                    :global(.ta-main-menu ul li a::before) {
                        content: "" !important;
                        position: absolute !important;
                        left: 50% !important;
                        bottom: 14px !important;
                        top: auto !important;
                        width: calc(100% - 20px) !important;
                        height: 2.5px !important;
                        background: #000000 !important;
                        border-radius: 2px !important;
                        transform: translateX(-50%) scaleX(0) !important;
                        transform-origin: center !important;
                        transition: transform 0.25s ease !important;
                        display: block !important;
                        opacity: 1 !important;
                    }
                    :global(#ta-navbar ul li a:hover::before),
                    :global(#ta-navbar ul li:hover > a::before),
                    :global(#ta-navbar ul li a.active::before),
                    :global(.ta-main-menu ul li a:hover::before),
                    :global(.ta-main-menu ul li:hover > a::before),
                    :global(.ta-main-menu ul li a.active::before) {
                        transform: translateX(-50%) scaleX(1) !important;
                    }
                    :global(#ta-navbar ul li:hover > a),
                    :global(#ta-navbar ul li a:hover),
                    :global(#ta-navbar ul li a.active),
                    :global(.ta-main-menu ul li:hover > a),
                    :global(.ta-main-menu ul li a:hover) {
                        color: #000000 !important;
                    }
                    @media (max-width: 1200px) {
                        :global(#ta-navbar ul) {
                            gap: 6px !important;
                        }
                        :global(#ta-navbar ul li a) {
                            padding: 20px 8px !important;
                            font-size: 12.5px !important;
                        }
                        :global(#ta-navbar ul li a::before) {
                            width: calc(100% - 16px) !important;
                            bottom: 11px !important;
                        }
                    }
                `}</style>
                <ul className="justify-content-center">
                    <li>
                        <Link href="/" className={router.pathname === "/" ? "active" : ""}>
                            Beranda
                        </Link>
                    </li>
                    {categories.map((cat) => {
                        const isActive = router.pathname === "/blog-filter-category" && currentCategory.toLowerCase() === cat.slug.toLowerCase()
                        return (
                            <li key={cat.id}>
                                <Link
                                    href={`/blog-filter-category?category=${cat.slug}`}
                                    className={isActive ? "active" : ""}
                                >
                                    {cat.name}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </>
    )
}
