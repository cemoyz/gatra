import Link from 'next/link'
import { getImageUrl } from "@/lib/imageUtils"

export default function RecentPost({ posts = [], settings = {} }) {
    if (settings.show_recent_posts === 'false') {
        return null
    }

    const title = settings.title_recent_posts || "Recent Posts"
    const recentList = posts && posts.length > 10 ? posts.slice(10, 16) : null
    const leftCol = recentList ? recentList.slice(0, 3) : (posts && posts.length > 0 ? posts.slice(0, 3) : null)
    const rightCol = recentList ? recentList.slice(3, 6) : (posts && posts.length > 3 ? posts.slice(3, 6) : null)

    const formatDate = (dateStr) => {
        if (!dateStr) return "Recently"
        try {
            return new Date(dateStr).toLocaleDateString("id-ID", { month: "short", day: "numeric", year: "numeric" })
        } catch {
            return "Recently"
        }
    }

    return (
        <>
            <section className="recent-post-area padding">
                <div className="container">
                    <div className="top-area mb-40 title-border">
                        <div className="section-heading">
                            <h3 className="section-title"><span className="bg-grey-2">{title}</span></h3>
                        </div>
                        <div className="right-btn">
                            <Link href="/blog" className="default-btn">Lihat Semua</Link>
                        </div>
                    </div>
                    <div className="row">
                        {/* Column 1 */}
                        <div className="col-lg-6">
                            <div className="news-post-wrap">
                                {leftCol && leftCol.length > 0 ? (
                                    leftCol.map((post, idx) => {
                                        const catName = post.category?.name || (typeof post.category === 'string' ? post.category : 'General')
                                        const authorName = post.author?.name || (typeof post.author === 'string' ? post.author : 'Redaksi')
                                        return (
                                            <div key={post.id || idx} className="post-card news-post">
                                                <div className="post-thumb">
                                                    <Link href={`/blog/${post.slug || post.id}`}>
                                                        <img
                                                            src={getImageUrl(post.img, `/assets/img/post/news-post-${idx + 1}.jpg`)}
                                                            alt={post.title}
                                                            onError={(e) => { e.currentTarget.src = `/assets/img/post/news-post-${idx + 1}.jpg` }}
                                                        />
                                                    </Link>
                                                </div>
                                                <div className="post-content">
                                                    <Link href={`/blog/${post.slug || post.id}`} className="card-btn bg-blue">
                                                        {catName}
                                                    </Link>
                                                    <h3 className="title">
                                                        <Link href={`/blog/${post.slug || post.id}`}>{post.title}</Link>
                                                    </h3>
                                                    <ul className="post-list">
                                                        <li className="author">
                                                            by <span><Link href={`/blog/${post.slug || post.id}`}>{authorName}</Link></span>
                                                        </li>
                                                        <li className="date" suppressHydrationWarning>{formatDate(post.createdAt)}</li>
                                                        {post.views > 0 && <li><i className="las la-eye" />{post.views}</li>}
                                                    </ul>
                                                </div>
                                            </div>
                                        )
                                    })
                                ) : (
                                    <div className="post-card news-post">
                                        <div className="post-thumb">
                                            <Link href="/blog"><img src="/assets/img/post/news-post-1.jpg" alt="post" /></Link>
                                        </div>
                                        <div className="post-content">
                                            <Link href="/blog" className="card-btn bg-blue">Tech</Link>
                                            <h3 className="title">
                                                <Link href="/blog">The 6 Best &amp; Worst Foods for Your Skin and Health</Link>
                                            </h3>
                                            <ul className="post-list">
                                                <li className="author">by <span><Link href="/blog">David Bin</Link></span></li>
                                                <li className="date">July 29, 2024</li>
                                                <li><i className="las la-comments" />5</li>
                                            </ul>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Column 2 */}
                        <div className="col-lg-6">
                            <div className="news-post-wrap">
                                {rightCol && rightCol.length > 0 ? (
                                    rightCol.map((post, idx) => {
                                        const catName = post.category?.name || (typeof post.category === 'string' ? post.category : 'General')
                                        const authorName = post.author?.name || (typeof post.author === 'string' ? post.author : 'Redaksi')
                                        return (
                                            <div key={post.id || idx} className="post-card news-post">
                                                <div className="post-thumb">
                                                    <Link href={`/blog/${post.slug || post.id}`}>
                                                        <img
                                                            src={getImageUrl(post.img, `/assets/img/post/news-post-${idx + 4}.jpg`)}
                                                            alt={post.title}
                                                            onError={(e) => { e.currentTarget.src = `/assets/img/post/news-post-${idx + 4}.jpg` }}
                                                        />
                                                    </Link>
                                                </div>
                                                <div className="post-content">
                                                    <Link href={`/blog/${post.slug || post.id}`} className="card-btn bg-blue-light">
                                                        {catName}
                                                    </Link>
                                                    <h3 className="title">
                                                        <Link href={`/blog/${post.slug || post.id}`}>{post.title}</Link>
                                                    </h3>
                                                    <ul className="post-list">
                                                        <li className="author">
                                                            by <span><Link href={`/blog/${post.slug || post.id}`}>{authorName}</Link></span>
                                                        </li>
                                                        <li className="date" suppressHydrationWarning>{formatDate(post.createdAt)}</li>
                                                        {post.views > 0 && <li><i className="las la-eye" />{post.views}</li>}
                                                    </ul>
                                                </div>
                                            </div>
                                        )
                                    })
                                ) : (
                                    <div className="post-card news-post">
                                        <div className="post-thumb">
                                            <Link href="/blog"><img src="/assets/img/post/news-post-4.jpg" alt="post" /></Link>
                                        </div>
                                        <div className="post-content">
                                            <Link href="/blog" className="card-btn bg-pink">Lifestyle</Link>
                                            <h3 className="title">
                                                <Link href="/blog">Navigation System Doesn Work in Space? We’ll See works.</Link>
                                            </h3>
                                            <ul className="post-list">
                                                <li className="author">by <span><Link href="/blog">David Bin</Link></span></li>
                                                <li className="date">July 29, 2024</li>
                                                <li><i className="las la-comments" />5</li>
                                            </ul>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
