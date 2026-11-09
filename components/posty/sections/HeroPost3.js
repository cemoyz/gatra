import Link from 'next/link'
import { getImageUrl } from "@/lib/imageUtils"

export default function HeroPost3({ posts = [], categoryName = "Travel" }) {
    const p1 = posts[0] || null
    const p2 = posts[1] || null
    const p3 = posts[2] || null

    const formatDate = (dateStr) => {
        if (!dateStr) return "Recently"
        try {
            return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
        } catch {
            return "Recently"
        }
    }

    return (
        <>
            <section className="hero-post-area area-2">
                <div className="container">
                    <div className="top-area mb-40 title-border">
                        <div className="section-heading">
                            <h3 className="section-title"><span className="bg-grey-2">{categoryName}</span></h3>
                        </div>
                        <div className="right-btn">
                            <Link href="/blog" className="default-btn">Lihat Semua</Link>
                        </div>
                    </div>
                    <div className="post-area-wrap wrap-2">
                        {p1 ? (
                            <div className="post-carousel-card">
                                <div className="post-carousel-thumb">
                                    <Link href={`/blog/${p1.slug || p1.id}`}>
                                        <img
                                            src={getImageUrl(p1.img, '/assets/img/post/travel-post-1.jpg')}
                                            alt={p1.title}
                                            onError={(e) => { e.currentTarget.src = '/assets/img/post/travel-post-1.jpg' }}
                                        />
                                    </Link>
                                </div>
                                <div className="post-carousel-content">
                                    <Link href={`/blog/${p1.slug || p1.id}`} className="card-btn bg-green">
                                        {p1.category?.name || (typeof p1.category === 'string' ? p1.category : categoryName)}
                                    </Link>
                                    <h3 className="title">
                                        <Link href={`/blog/${p1.slug || p1.id}`}>{p1.title}</Link>
                                    </h3>
                                    <ul className="post-list">
                                        <li className="author">
                                            by <span><Link href={`/blog/${p1.slug || p1.id}`}>{p1.author?.name || (typeof p1.author === 'string' ? p1.author : 'Redaksi')}</Link></span>
                                        </li>
                                        <li className="date" suppressHydrationWarning>{formatDate(p1.createdAt)}</li>
                                        {p1.views > 0 && <li><i className="las la-eye" />{p1.views}</li>}
                                    </ul>
                                </div>
                            </div>
                        ) : null}

                        <div className="post-area-right">
                            <div className="post-card-wrap wrap-2">
                                {[p2, p3].filter(Boolean).map((p, idx) => (
                                    <div key={p.id || idx} className="post-card">
                                        <div className="post-thumb">
                                            <Link href={`/blog/${p.slug || p.id}`}>
                                                <img
                                                    src={getImageUrl(p.img, `/assets/img/post/travel-post-${idx + 2}.jpg`)}
                                                    alt={p.title}
                                                    onError={(e) => { e.currentTarget.src = `/assets/img/post/travel-post-${idx + 2}.jpg` }}
                                                />
                                            </Link>
                                        </div>
                                        <div className="post-content">
                                            <Link href={`/blog/${p.slug || p.id}`} className="card-btn bg-blue">
                                                {p.category?.name || (typeof p.category === 'string' ? p.category : categoryName)}
                                            </Link>
                                            <h3 className="title">
                                                <Link href={`/blog/${p.slug || p.id}`}>{p.title}</Link>
                                            </h3>
                                            <ul className="post-list">
                                                <li className="author">
                                                    by <span><Link href={`/blog/${p.slug || p.id}`}>{p.author?.name || (typeof p.author === 'string' ? p.author : 'Redaksi')}</Link></span>
                                                </li>
                                                <li className="date" suppressHydrationWarning>{formatDate(p.createdAt)}</li>
                                            </ul>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
