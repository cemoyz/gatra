import Link from 'next/link'
import { getImageUrl } from "@/lib/imageUtils"

export default function FashionBlog1({ posts = [], title = "Lifestyle & Fashion" }) {
    const displayPosts = posts && posts.length > 0 ? posts.slice(0, 3) : null

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
            <section className="fashion-blog-area padding">
                <div className="container">
                    <div className="top-area mb-40 title-border">
                        <div className="section-heading">
                            <h3 className="section-title"><span className="bg-grey-2">{title}</span></h3>
                        </div>
                        <div className="right-btn">
                            <Link href="/blog" className="default-btn">Lihat Semua</Link>
                        </div>
                    </div>
                    <div className="row justify-content-center fashion-blog-top">
                        {displayPosts && displayPosts.length > 0 ? (
                            displayPosts.map((post, idx) => {
                                const catName = post.category?.name || (typeof post.category === 'string' ? post.category : 'Lifestyle')
                                const authorName = post.author?.name || (typeof post.author === 'string' ? post.author : 'Redaksi')
                                return (
                                    <div key={post.id || idx} className="col-lg-4 col-md-6">
                                        <div className="post-card">
                                            <div className="post-thumb">
                                                <Link href={`/blog/${post.slug || post.id}`}>
                                                    <img
                                                        src={getImageUrl(post.img, `/assets/img/post/fasion-post-${idx + 1}.jpg`)}
                                                        alt={post.title}
                                                        onError={(e) => { e.currentTarget.src = `/assets/img/post/fasion-post-${idx + 1}.jpg` }}
                                                    />
                                                </Link>
                                            </div>
                                            <div className="post-content">
                                                <Link href={`/blog/${post.slug || post.id}`} className="card-btn bg-pink">
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
                                    </div>
                                )
                            })
                        ) : (
                            <>
                                <div className="col-lg-4 col-md-6">
                                    <div className="post-card">
                                        <div className="post-thumb">
                                            <Link href="/blog"><img src="/assets/img/post/fasion-post-1.jpg" alt="post" /></Link>
                                        </div>
                                        <div className="post-content">
                                            <Link href="/blog" className="card-btn bg-pink">Lifestyle</Link>
                                            <h3 className="title">
                                                <Link href="/blog">Timeless and Chic Outfits for Your Endless Wardrobe</Link>
                                            </h3>
                                            <ul className="post-list">
                                                <li className="author">by <span><Link href="/blog">David Bin</Link></span></li>
                                                <li className="date">July 29, 2024</li>
                                                <li><i className="las la-comments" />5</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6">
                                    <div className="post-card">
                                        <div className="post-thumb">
                                            <Link href="/blog"><img src="/assets/img/post/fasion-post-2.jpg" alt="post" /></Link>
                                        </div>
                                        <div className="post-content">
                                            <Link href="/blog" className="card-btn bg-pink">Lifestyle</Link>
                                            <h3 className="title">
                                                <Link href="/blog">Accessorizing for Impact with Top Trends of the Fall Season</Link>
                                            </h3>
                                            <ul className="post-list">
                                                <li className="author">by <span><Link href="/blog">David Bin</Link></span></li>
                                                <li className="date">July 29, 2024</li>
                                                <li><i className="las la-comments" />5</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6">
                                    <div className="post-card">
                                        <div className="post-thumb">
                                            <Link href="/blog"><img src="/assets/img/post/fasion-post-3.jpg" alt="post" /></Link>
                                        </div>
                                        <div className="post-content">
                                            <Link href="/blog" className="card-btn bg-pink">Lifestyle</Link>
                                            <h3 className="title">
                                                <Link href="/blog">The Ultimate Guide to Modern Minimalism in Daily Living</Link>
                                            </h3>
                                            <ul className="post-list">
                                                <li className="author">by <span><Link href="/blog">David Bin</Link></span></li>
                                                <li className="date">July 29, 2024</li>
                                                <li><i className="las la-comments" />5</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </section>
        </>
    )
}
