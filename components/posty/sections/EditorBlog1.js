
import Link from 'next/link'
import { getImageUrl } from "@/lib/imageUtils"

export default function EditorBlog1({ posts = [], settings = {} }) {
    const p1 = posts[0] || null
    const p2 = posts[1] || null
    const p3 = posts[2] || null
    const p4 = posts[3] || null

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
            <section className="editor-blog-area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="section-heading mb-40">
                                <h3 className="section-title title-border"><span>Editor's Pick</span></h3>
                            </div>
                            {p1 ? (
                                <div className="post-card editor-post-card">
                                    <div className="post-thumb">
                                        <Link href={`/blog/${p1.slug || p1.id}`}>
                                            <img
                                                src={getImageUrl(p1.img, '/assets/img/post/editor-post-img-1.jpg')}
                                                alt={p1.title}
                                                onError={(e) => { e.currentTarget.src = '/assets/img/post/editor-post-img-1.jpg' }}
                                            />
                                        </Link>
                                    </div>
                                    <div className="post-content">
                                        <Link href={`/blog/${p1.slug || p1.id}`} className="card-btn bg-green">
                                            {p1.category?.name || (typeof p1.category === 'string' ? p1.category : 'Featured')}
                                        </Link>
                                        <h3 className="title">
                                            <Link href={`/blog/${p1.slug || p1.id}`}>{p1.title}</Link>
                                        </h3>
                                        {p1.excerpt && <p>{p1.excerpt}</p>}
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

                            <div className="editor-post-wrap">
                                {[p2, p3, p4].filter(Boolean).map((p, idx) => (
                                    <div key={p.id || idx} className="post-card editor-post">
                                        <div className="post-thumb">
                                            <Link href={`/blog/${p.slug || p.id}`}>
                                                <img
                                                    src={getImageUrl(p.img, `/assets/img/post/editor-post-img-${idx + 2}.jpg`)}
                                                    alt={p.title}
                                                    onError={(e) => { e.currentTarget.src = `/assets/img/post/editor-post-img-${idx + 2}.jpg` }}
                                                />
                                            </Link>
                                        </div>
                                        <div className="post-content">
                                            <Link href={`/blog/${p.slug || p.id}`} className={`card-btn ${idx === 0 ? 'bg-yellow' : idx === 1 ? 'bg-blue' : 'bg-blue-light'}`}>
                                                {p.category?.name || (typeof p.category === 'string' ? p.category : 'News')}
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
                        <div className="col-lg-4">
                            <div className="section-heading mb-40">
                                <h3 className="section-title title-border"><span>Follow Us</span></h3>
                            </div>
                            <div className="social-box-wrap">
                                <div className="social-box facebook">
                                    <Link href="/#"><i className="lab la-facebook-square" /></Link>
                                    <h4 className="title"><Link href="/#">Facebook</Link> <span>23k Likes</span></h4>
                                </div>
                                <div className="social-box twitter">
                                    <Link href="/#" className="icon"><i className="lab la-twitter" /></Link>
                                    <h4 className="title"><Link href="/#">Twitter</Link> <span>56k Followers</span></h4>
                                </div>
                                <div className="social-box youtube">
                                    <Link href="/#" className="icon"><i className="lab la-youtube" /></Link>
                                    <h4 className="title"><Link href="/#">Youtube</Link> <span>56k Subscribe</span></h4>
                                </div>
                                <div className="social-box spotify">
                                    <Link href="/#" className="icon"><i className="lab la-spotify" /></Link>
                                    <h4 className="title"><Link href="/#">Spotify</Link> <span>14k Followers</span></h4>
                                </div>
                                <div className="social-box insta">
                                    <Link href="/#" className="icon"><i className="lab la-instagram" /></Link>
                                    <h4 className="title"><Link href="/#">Instagram</Link> <span>5m Followers</span></h4>
                                </div>
                                <div className="social-box pinterest">
                                    <Link href="/#" className="icon"><i className="lab la-pinterest-p" /></Link>
                                    <h4 className="title"><Link href="/#">Pinterest</Link> <span>59k Followers</span></h4>
                                </div>
                            </div>
                            <div className="post-author-box text-center">
                                <div className="bg" />
                                <img src="/assets/img/post/post-author.png" alt="post" />
                                <h3 className="author">{settings.site_title || "Gatra Portal"}</h3>
                                <p>
                                    {settings.site_tagline || "Portal Berita Terkini, Akurat, dan Terpercaya Menyajikan Informasi Terhangat Seputar Politik, Ekonomi, dan Teknologi."}
                                </p>
                                <Link href="/blog" className="default-btn">Semua Berita</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
