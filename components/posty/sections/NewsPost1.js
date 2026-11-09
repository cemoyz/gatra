import Link from 'next/link'
import { getImageUrl } from "@/lib/imageUtils"

export default function NewsPost1({ posts = [], popularPosts = [], categories = [], settings = {} }) {
    const displayPosts = posts && posts.length > 0 ? posts.slice(0, 5) : null
    const displayPopular = popularPosts && popularPosts.length > 0 ? popularPosts.slice(0, 4) : posts.slice(0, 4)
    const displayCats = categories && categories.length > 0 ? categories.slice(0, 5) : [
        { id: 1, name: "Technology", slug: "technology", count: 15 },
        { id: 2, name: "Lifestyle", slug: "lifestyle", count: 24 },
        { id: 3, name: "Travel", slug: "travel", count: 12 },
        { id: 4, name: "Marketing", slug: "marketing", count: 9 },
        { id: 5, name: "News", slug: "news", count: 18 }
    ]
    const adTitle = settings.sidebar_ad_title || settings.site_title || "News & Magazine Portal"
    const adSubtitle = settings.sidebar_ad_subtitle || ""
    const adUrl = settings.sidebar_ad_url || "/blog"
    const adNewTab = settings.sidebar_ad_open_new_tab === "true"
    const showAd = settings.show_sidebar_ad !== "false"
    const trendingTitle = settings.title_trending_posts || "Trending Posts"

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
            <section className="news-post-area padding pt-0">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="news-post-wrap">
                                <div className="section-heading mb-40">
                                    <h3 className="section-title title-border"><span>Latest Posts</span></h3>
                                </div>
                                {displayPosts && displayPosts.length > 0 ? (
                                    displayPosts.map((post, idx) => {
                                        const catName = post.category?.name || (typeof post.category === 'string' ? post.category : 'General')
                                        const authorName = post.author?.name || (typeof post.author === 'string' ? post.author : 'Redaksi')
                                        return (
                                            <div key={post.id || idx} className="post-card news-post">
                                                <div className="post-thumb">
                                                    <Link href={`/blog/${post.slug || post.id}`}>
                                                        <img
                                                            src={getImageUrl(post.img, `/assets/img/post/news-post-${(idx % 5) + 1}.jpg`)}
                                                            alt={post.title}
                                                            onError={(e) => { e.currentTarget.src = `/assets/img/post/news-post-${(idx % 5) + 1}.jpg` }}
                                                        />
                                                    </Link>
                                                </div>
                                                <div className="post-content">
                                                    <Link href={`/blog/${post.slug || post.id}`} className={`card-btn ${idx % 2 === 0 ? 'bg-blue' : 'bg-blue-light'}`}>
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
                                                    {post.excerpt && <p>{post.excerpt}</p>}
                                                    <Link href={`/blog/${post.slug || post.id}`} className="news-post-btn">
                                                        <i className="las la-arrow-right" />
                                                    </Link>
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
                                                <Link href="/blog">How To Change The Icons For Your Favorite Apps On MacOS</Link>
                                            </h3>
                                            <ul className="post-list">
                                                <li className="author">by <span><Link href="/blog">David Bin</Link></span></li>
                                                <li className="date">July 29, 2024</li>
                                                <li><i className="las la-comments" />5</li>
                                            </ul>
                                            <p>Lorem ipsum dolor sit amet consectetur. Tellus suspen any more at disse reasy nulla aliquam.</p>
                                            <Link href="/blog" className="news-post-btn"><i className="las la-arrow-right" /></Link>
                                        </div>
                                    </div>
                                )}

                                <div className="post-pagination">
                                    <ul className="pagination-list">
                                        <li className="active"><Link href="/blog">1</Link></li>
                                        <li><Link href="/blog">2</Link></li>
                                        <li><Link href="/blog">3</Link></li>
                                    </ul>
                                    <div className="pagination-right">
                                        <Link href="/blog"><i className="las la-angle-right" /></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            {showAd && (
                                <div className="poster mb-40">
                                    <div className="bg-shape" />
                                    <div
                                        className="poster-men"
                                        style={settings.sidebar_ad_image ? {
                                            backgroundImage: `url(${getImageUrl(settings.sidebar_ad_image)})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center'
                                        } : {}}
                                    />
                                    <div className="poster-content">
                                        <Link href="/">
                                            <img
                                                src={getImageUrl(settings.logo_footer || settings.logo_header, "/assets/img/logo/logo-light.png")}
                                                alt={adTitle}
                                                style={{ maxHeight: '35px', width: 'auto' }}
                                            />
                                        </Link>
                                        <h4 className="title">{adTitle}</h4>
                                        {adSubtitle && <p style={{ color: '#fff', fontSize: '13px', opacity: 0.9 }}>{adSubtitle}</p>}
                                        <Link
                                            href={adUrl}
                                            className="default-btn poster-btn"
                                            target={adNewTab ? "_blank" : "_self"}
                                        >
                                            Baca Sekarang
                                        </Link>
                                    </div>
                                </div>
                            )}
                            <div className="trending-post-wrap">
                                <div className="section-heading mb-30">
                                    <h3 className="section-title title-border"><span>{trendingTitle}</span></h3>
                                </div>
                                <div className="list-post-area list-2">
                                    {displayPopular && displayPopular.length > 0 ? (
                                        displayPopular.map((post, idx) => (
                                            <div key={post.id || idx} className="list-post-card">
                                                <div className="post-img">
                                                    <Link href={`/blog/${post.slug || post.id}`}>
                                                        <img
                                                            src={getImageUrl(post.img, `/assets/img/post/trending-post-${(idx % 4) + 1}.jpg`)}
                                                            alt={post.title}
                                                            onError={(e) => { e.currentTarget.src = `/assets/img/post/trending-post-${(idx % 4) + 1}.jpg` }}
                                                        />
                                                    </Link>
                                                </div>
                                                <div className="post-content">
                                                    <h3 className="title">
                                                        <Link href={`/blog/${post.slug || post.id}`}>{post.title}</Link>
                                                    </h3>
                                                    <span suppressHydrationWarning>{formatDate(post.createdAt)}</span>
                                                </div>
                                            </div>
                                        ))
                                    ) : null}
                                </div>
                            </div>
                            <div className="categorie-wrap">
                                <div className="section-heading mb-30">
                                    <h3 className="section-title title-border"><span>Categories</span></h3>
                                </div>
                                <ul className="categorie-list">
                                    {displayCats.map((cat, idx) => (
                                        <li key={cat.id || idx}>
                                            <Link href={`/blog-filter-category?category=${cat.slug}`}>
                                                <h4 className="list-title">
                                                    {cat.name} <span>({cat.count || cat.postsCount || cat._count?.posts || 5})</span>
                                                </h4>
                                                <i className="las la-arrow-right" />
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
