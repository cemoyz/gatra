
import Link from 'next/link'

export default function Categories({ categories = [] }) {
    const displayCats = categories && categories.length > 0 ? categories.slice(0, 4) : [
        { id: 1, name: "Teknologi", slug: "technology", count: 12 },
        { id: 2, name: "Bisnis", slug: "marketing", count: 8 },
        { id: 3, name: "Travel", slug: "travel", count: 15 },
        { id: 4, name: "Lifestyle", slug: "lifestyle", count: 9 }
    ]

    return (
        <>
            <section className="categories-section padding">
                <div className="container">
                    <div className="row">
                        {displayCats.map((cat, idx) => (
                            <div key={cat.id || idx} className="col-lg-3 col-md-6">
                                <div className="categorie-item">
                                    <div className="categorie-thumb">
                                        <Link href={`/blog-filter-category?category=${cat.slug}`}>
                                            <img src={`/assets/img/images/categori-img-${(idx % 4) + 1}.jpg`} alt={cat.name} />
                                        </Link>
                                    </div>
                                    <div className="categorie-content">
                                        <span>{cat.count || cat.postsCount || cat._count?.posts || 5} Posts</span>
                                        <h3 className="categorie-title">
                                            <Link href={`/blog-filter-category?category=${cat.slug}`}>{cat.name}</Link>
                                        </h3>
                                        <Link href={`/blog-filter-category?category=${cat.slug}`} className="default-btn categorie-btn">
                                            See All Post
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}
