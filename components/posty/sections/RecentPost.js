'use client'
import { useState } from 'react'
import Link from 'next/link'
import { getImageUrl } from "@/lib/imageUtils"

export default function RecentPost({ posts = [], settings = {} }) {
    if (settings.show_recent_posts === 'false') {
        return null
    }

    const title = settings.title_recent_posts || "Recent Posts"
    const configuredLimit = parseInt(settings.recent_posts_limit) || 12
    const offset = parseInt(settings.recent_posts_offset) || 0

    let sourceList = posts || []
    if (settings.recent_posts_category && settings.recent_posts_category !== 'all') {
        sourceList = sourceList.filter(p => {
            const catSlug = p.category?.slug || p.category?.name || (typeof p.category === 'string' ? p.category : '')
            return String(catSlug).toLowerCase() === String(settings.recent_posts_category).toLowerCase()
        })
    }

    // Terapkan offset jika jumlah artikel mencukupi
    const baseList = sourceList.length > (offset + 4) ? sourceList.slice(offset) : sourceList

    const [currentLimit, setCurrentLimit] = useState(configuredLimit)

    const visiblePosts = baseList.slice(0, currentLimit)
    const hasMore = baseList.length > currentLimit

    const half = Math.ceil(visiblePosts.length / 2)
    const leftCol = visiblePosts.slice(0, half)
    const rightCol = visiblePosts.slice(half)

    const formatDate = (dateStr) => {
        if (!dateStr) return "Baru Saja"
        try {
            return new Date(dateStr).toLocaleDateString("id-ID", { month: "short", day: "numeric", year: "numeric" })
        } catch {
            return "Baru Saja"
        }
    }

    const getBadgeClass = (index) => {
        const badges = ['bg-blue', 'bg-blue-light', 'bg-green', 'bg-yellow', 'bg-pink']
        return badges[index % badges.length]
    }

    const renderCard = (post, idx) => {
        const catName = post.category?.name || (typeof post.category === 'string' ? post.category : 'General')
        const authorName = post.author?.name || (typeof post.author === 'string' ? post.author : 'Redaksi')
        const postLink = `/blog/${post.slug || post.id}`

        return (
            <div key={post.id || idx} className="post-card news-post">
                <div className="post-thumb">
                    <Link href={postLink}>
                        <img
                            src={getImageUrl(post.img, `/assets/img/post/news-post-${(idx % 6) + 1}.jpg`)}
                            alt={post.title}
                            onError={(e) => { e.currentTarget.src = `/assets/img/post/news-post-${(idx % 6) + 1}.jpg` }}
                        />
                    </Link>
                </div>
                <div className="post-content">
                    <Link href={postLink} className={`card-btn ${getBadgeClass(idx)}`}>
                        {catName}
                    </Link>
                    <h3 className="title">
                        <Link href={postLink}>{post.title}</Link>
                    </h3>
                    {post.excerpt && (
                        <p className="post-excerpt">
                            {post.excerpt}
                        </p>
                    )}
                    <ul className="post-list">
                        <li className="author">
                            by <span><Link href={postLink}>{authorName}</Link></span>
                        </li>
                        <li className="date" suppressHydrationWarning>{formatDate(post.createdAt)}</li>
                        {post.views > 0 && <li><i className="las la-eye" />{post.views}</li>}
                    </ul>
                </div>
            </div>
        )
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
                        {/* Kolom 1 (Kiri) */}
                        <div className="col-lg-6">
                            <div className="news-post-wrap">
                                {leftCol && leftCol.length > 0 ? (
                                    leftCol.map((post, idx) => renderCard(post, idx))
                                ) : (
                                    <div className="post-card news-post">
                                        <div className="post-thumb">
                                            <Link href="/blog"><img src="/assets/img/post/news-post-1.jpg" alt="post" /></Link>
                                        </div>
                                        <div className="post-content">
                                            <Link href="/blog" className="card-btn bg-blue">Tech</Link>
                                            <h3 className="title">
                                                <Link href="/blog">Perkembangan Berita dan Informasi Terkini</Link>
                                            </h3>
                                            <ul className="post-list">
                                                <li className="author">by <span><Link href="/blog">Redaksi</Link></span></li>
                                                <li className="date">Baru Saja</li>
                                            </ul>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Kolom 2 (Kanan) */}
                        <div className="col-lg-6">
                            <div className="news-post-wrap">
                                {rightCol && rightCol.length > 0 ? (
                                    rightCol.map((post, idx) => renderCard(post, idx + half))
                                ) : (
                                    <div className="post-card news-post">
                                        <div className="post-thumb">
                                            <Link href="/blog"><img src="/assets/img/post/news-post-4.jpg" alt="post" /></Link>
                                        </div>
                                        <div className="post-content">
                                            <Link href="/blog" className="card-btn bg-pink">Lifestyle</Link>
                                            <h3 className="title">
                                                <Link href="/blog">Tren Gaya Hidup dan Wawasan Masa Depan</Link>
                                            </h3>
                                            <ul className="post-list">
                                                <li className="author">by <span><Link href="/blog">Redaksi</Link></span></li>
                                                <li className="date">Baru Saja</li>
                                            </ul>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Tombol Muat Lebih Banyak jika artikel masih tersedia */}
                    {hasMore && (
                        <div className="load-more-wrap text-center mt-30">
                            <button
                                type="button"
                                className="load-more-btn"
                                onClick={() => setCurrentLimit(prev => prev + 6)}
                                title="Klik untuk memuat 6 artikel lagi di halaman ini"
                            >
                                <i className="las la-plus-circle"></i>
                                <span>Tampilkan Lebih Banyak Berita ({baseList.length - currentLimit} artikel lagi)</span>
                            </button>
                        </div>
                    )}
                </div>
            </section>

            <style jsx>{`
                .load-more-wrap {
                    margin-top: 36px;
                    display: flex;
                    justify-content: center;
                }
                .load-more-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 12px 28px;
                    background: var(--white-color, #ffffff);
                    border: 1.5px solid #e2e8f0;
                    color: #1e293b;
                    font-size: 14px;
                    font-weight: 700;
                    border-radius: 50px;
                    cursor: pointer;
                    transition: all 0.25s ease;
                    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.04);
                }
                .load-more-btn:hover {
                    background: var(--primary-color, #004CFF);
                    border-color: var(--primary-color, #004CFF);
                    color: #ffffff;
                    transform: translateY(-2px);
                    box-shadow: 0 8px 20px rgba(0, 76, 255, 0.25);
                }
                .load-more-btn i {
                    font-size: 18px;
                }
                .post-excerpt {
                    font-size: 13.5px;
                    color: #64748b;
                    line-height: 1.5;
                    margin: 6px 0 10px 0;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
                [data-theme="dark"] .load-more-btn {
                    background: #1e293b;
                    border-color: rgba(255, 255, 255, 0.12);
                    color: #e2e8f0;
                }
                [data-theme="dark"] .load-more-btn:hover {
                    background: var(--primary-color, #004CFF);
                    color: #ffffff;
                }
                [data-theme="dark"] .post-excerpt {
                    color: #94a3b8;
                }
            `}</style>
        </>
    )
}
