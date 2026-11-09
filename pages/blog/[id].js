import Layout from "@/components/posty/layout/Layout"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import Comments from "@/components/sections/Comments"
import { getImageUrl } from "@/lib/imageUtils"
import prisma from "@/lib/prisma"

function formatDate(dateString) {
    if (!dateString) return ""
    try {
        const d = new Date(dateString)
        return d.toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric"
        })
    } catch {
        return ""
    }
}

function getCategoryBadgeColor(catName = "") {
    const lower = (catName || "").toLowerCase()
    if (lower.includes("tech") || lower.includes("tekno")) return "bg-blue"
    if (lower.includes("news") || lower.includes("berita")) return "bg-red"
    if (lower.includes("bola") || lower.includes("sport")) return "bg-green"
    if (lower.includes("money") || lower.includes("bisnis") || lower.includes("finansial")) return "bg-yellow"
    if (lower.includes("life") || lower.includes("gaya")) return "bg-pink"
    if (lower.includes("travel") || lower.includes("wisata")) return "bg-blue-light"
    return "bg-blue"
}

export default function BlogDetails({
    initialPost,
    popularPosts = [],
    categories = [],
    settings = {},
    domain = "http://localhost:3000"
}) {
    const router = useRouter()
    const blogPost = initialPost

    const siteTitle = settings.site_title || "Gatra Portal"
    const siteTagline = settings.site_tagline || "Portal Berita Terkini, Akurat, dan Terpercaya"
    const pageTitle = blogPost?.title ? `${blogPost.title} - ${siteTitle}` : `${siteTitle} - ${siteTagline}`
    const cleanDomain = domain.replace(/\/$/, "")
    const canonicalUrl = blogPost ? `${cleanDomain}/blog/${blogPost.slug || blogPost.id}` : cleanDomain
    const excerpt = blogPost?.excerpt || (blogPost?.content ? blogPost.content.replace(/<[^>]*>/g, "").slice(0, 160) : "")

    const rawImg = blogPost?.img || "blog-2-1.webp"
    const postImgUrl = rawImg.startsWith("http")
        ? rawImg
        : `${cleanDomain}/assets/img/blog/${rawImg}`

    const logoUrl = getImageUrl(settings.logo_header || settings.site_logo, `${cleanDomain}/assets/img/logo/logo-dark-2.png`)
    const datePublished = blogPost?.createdAt ? new Date(blogPost.createdAt).toISOString() : new Date().toISOString()
    const dateModified = blogPost?.updatedAt ? new Date(blogPost.updatedAt).toISOString() : datePublished

    const [copied, setCopied] = useState(false)
    const handleCopy = () => {
        if (typeof window !== "undefined") {
            navigator.clipboard.writeText(window.location.href)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        }
    }

    const [emailSub, setEmailSub] = useState("")
    const [subMessage, setSubMessage] = useState("")
    const handleSubscribe = async (e) => {
        e.preventDefault()
        if (!emailSub) return
        try {
            const res = await fetch("/api/subscribers", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: emailSub })
            })
            const data = await res.json()
            if (data.success) {
                setSubMessage("Terima kasih telah berlangganan!")
                setEmailSub("")
            } else {
                setSubMessage(data.message || "Email sudah terdaftar.")
            }
        } catch {
            setSubMessage("Gagal berlangganan. Silakan coba lagi.")
        }
    }

    // Google Schema.org NewsArticle
    const newsArticleSchema = blogPost ? {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": canonicalUrl
        },
        "headline": blogPost.title,
        "description": excerpt,
        "image": [{
            "@type": "ImageObject",
            "url": postImgUrl,
            ...(blogPost.imageCaption ? { "caption": blogPost.imageCaption } : {})
        }],
        "datePublished": datePublished,
        "dateModified": dateModified,
        "author": {
            "@type": "Person",
            "name": blogPost.author?.name || blogPost.editorName || "Redaksi"
        },
        "publisher": {
            "@type": "NewsMediaOrganization",
            "name": siteTitle,
            "url": cleanDomain,
            "logo": {
                "@type": "ImageObject",
                "url": logoUrl.startsWith("http") ? logoUrl : `${cleanDomain}${logoUrl}`
            }
        }
    } : null

    const categoryName = blogPost?.category?.name || "News"
    const categorySlug = blogPost?.category?.slug || "news"
    const badgeColor = getCategoryBadgeColor(categoryName)
    const shareUrl = typeof window !== "undefined" ? encodeURIComponent(window.location.href) : encodeURIComponent(canonicalUrl)
    const shareTitle = encodeURIComponent(blogPost?.title || siteTitle)

    return (
        <Layout
            headerStyle={1}
            footerStyle={1}
            breadcrumbTitle={blogPost ? blogPost.title : "Detail Berita"}
            settings={settings}
        >
            <Head>
                {blogPost && (
                    <>
                        <title>{pageTitle}</title>
                        <meta name="description" content={excerpt} />
                        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
                        <link rel="canonical" href={canonicalUrl} />

                        {/* OpenGraph */}
                        <meta property="og:locale" content="id_ID" />
                        <meta property="og:type" content="article" />
                        <meta property="og:title" content={blogPost.title} />
                        <meta property="og:description" content={excerpt} />
                        <meta property="og:url" content={canonicalUrl} />
                        <meta property="og:site_name" content={siteTitle} />
                        <meta property="og:image" content={postImgUrl} />
                        <meta property="article:published_time" content={datePublished} />
                        <meta property="article:modified_time" content={dateModified} />
                        <meta property="article:section" content={categoryName} />
                        <meta property="article:author" content={blogPost.author?.name || "Redaksi"} />

                        {/* Twitter */}
                        <meta name="twitter:card" content="summary_large_image" />
                        <meta name="twitter:title" content={blogPost.title} />
                        <meta name="twitter:description" content={excerpt} />
                        <meta name="twitter:image" content={postImgUrl} />

                        {/* JSON-LD */}
                        <script
                            type="application/ld+json"
                            dangerouslySetInnerHTML={{ __html: JSON.stringify(newsArticleSchema).replace(/</g, "\\u003c") }}
                        />
                    </>
                )}
            </Head>

            {!blogPost ? (
                <div className="container padding py-5 text-center my-5">
                    <div className="card border-0 shadow-sm p-5 mx-auto" style={{ maxWidth: "600px", borderRadius: "12px" }}>
                        <i className="las la-exclamation-circle text-danger mb-3" style={{ fontSize: "56px" }} />
                        <h2 className="fw-bold mb-2">Artikel Tidak Ditemukan</h2>
                        <p className="text-muted mb-4">
                            Artikel yang Anda cari tidak tersedia, telah diarsipkan, atau tautan yang dimasukkan salah.
                        </p>
                        <Link href="/" className="default-btn mx-auto" style={{ width: "fit-content" }}>
                            Kembali ke Beranda
                        </Link>
                    </div>
                </div>
            ) : (
                <section className="post-layout-1 padding">
                    <div className="container">
                        {/* Top Content Header */}
                        <div className="top-content">
                            <div className="post-card single-card">
                                <div className="post-content">
                                    <Link href={`/blog-filter-category?category=${categorySlug}`} className={`card-btn ${badgeColor}`}>
                                        {categoryName}
                                    </Link>
                                    <h1 className="title" style={{ fontSize: "clamp(22px, 4.5vw, 36px)", fontWeight: 700, lineHeight: 1.35, marginTop: "14px", marginBottom: "16px" }}>
                                        {blogPost.title}
                                    </h1>
                                    <ul className="post-list">
                                        <li className="author">
                                            oleh <span>{blogPost.author?.name || "Redaksi"}</span>
                                        </li>
                                        <li className="date">{formatDate(blogPost.createdAt)}</li>
                                        <li>
                                            <i className="las la-eye" /> {blogPost.views || 0} Pembaca
                                        </li>
                                        {blogPost._count?.comments !== undefined && (
                                            <li>
                                                <i className="las la-comments" /> {blogPost._count.comments} Komentar
                                            </li>
                                        )}
                                    </ul>
                                    {excerpt && (
                                        <p style={{ fontSize: "16px", color: "#475569", lineHeight: 1.7, marginTop: "15px" }}>
                                            {excerpt}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="post-social">
                                <span>Bagikan:</span>
                                <ul className="social-list d-flex align-items-center">
                                    <li>
                                        <a
                                            href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="facebook"
                                            title="Bagikan ke Facebook"
                                        >
                                            <i className="lab la-facebook-f" />
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="twitter"
                                            title="Bagikan ke Twitter/X"
                                        >
                                            <i className="lab la-twitter" />
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href={`https://api.whatsapp.com/send?text=${shareTitle}%20${shareUrl}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{ backgroundColor: "#25D366", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", width: "36px", height: "36px", borderRadius: "50%" }}
                                            title="Bagikan ke WhatsApp"
                                        >
                                            <i className="lab la-whatsapp" style={{ fontSize: "18px" }} />
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href={`https://t.me/share/url?url=${shareUrl}&text=${shareTitle}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{ backgroundColor: "#0088cc", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", width: "36px", height: "36px", borderRadius: "50%" }}
                                            title="Bagikan ke Telegram"
                                        >
                                            <i className="lab la-telegram-plane" style={{ fontSize: "18px" }} />
                                        </a>
                                    </li>
                                    <li>
                                        <button
                                            onClick={handleCopy}
                                            style={{ border: "none", backgroundColor: copied ? "#10b981" : "#e2e8f0", color: copied ? "#fff" : "#334155", width: "36px", height: "36px", borderRadius: "50%", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s ease" }}
                                            title="Salin Tautan"
                                        >
                                            <i className={copied ? "las la-check" : "las la-link"} style={{ fontSize: "18px" }} />
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Article Main & Sidebar Grid */}
                        <div className="row">
                            <div className="col-lg-8">
                                <div className="post-layout-content">
                                    {/* Featured Image */}
                                    <div className="layout-thumb mb-30" style={{ borderRadius: "8px", overflow: "hidden" }}>
                                        <img
                                            src={getImageUrl(blogPost.img, "/assets/img/blog/layout-img.jpg")}
                                            alt={blogPost.title}
                                            style={{ width: "100%", maxHeight: "500px", objectFit: "cover" }}
                                        />
                                        {blogPost.imageCaption && (
                                            <div className="text-muted mt-2 px-2" style={{ fontSize: "13px", fontStyle: "italic" }}>
                                                {blogPost.imageCaption}
                                            </div>
                                        )}
                                    </div>

                                    {/* Article Content */}
                                    <div
                                        className="post-body-content mb-40"
                                        style={{ fontSize: "16px", lineHeight: "1.8", color: "var(--bs-body-color, #334155)" }}
                                        dangerouslySetInnerHTML={{ __html: blogPost.content || "" }}
                                    />

                                    {/* Tags & Bottom Share */}
                                    <div className="layout-social-box mb-40">
                                        <div className="box-left">
                                            <h4 className="tag">Kategori & Tags:</h4>
                                            <ul>
                                                <li>
                                                    <Link href={`/blog-filter-category?category=${categorySlug}`}>
                                                        #{categoryName}
                                                    </Link>
                                                </li>
                                                {blogPost.tags?.map((t) => (
                                                    <li key={t.id}>
                                                        <Link href={`/blog-filter-tag?tag=${t.slug || t.name}`}>
                                                            #{t.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="box-right">
                                            <h4 className="share">Bagikan:</h4>
                                            <ul className="social-list d-flex align-items-center">
                                                <li>
                                                    <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank" rel="noopener noreferrer" className="facebook">
                                                        <i className="lab la-facebook-f" />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`} target="_blank" rel="noopener noreferrer" className="twitter">
                                                        <i className="lab la-twitter" />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href={`https://api.whatsapp.com/send?text=${shareTitle}%20${shareUrl}`} target="_blank" rel="noopener noreferrer" style={{ color: "#25D366" }}>
                                                        <i className="lab la-whatsapp" />
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Author Bio Box */}
                                    {blogPost.author && (
                                        <div className="card border-0 p-4 mb-40" style={{ background: "#f8fafc", borderRadius: "10px" }}>
                                            <div className="d-flex align-items-center gap-3">
                                                <img
                                                    src={getImageUrl(blogPost.author.avatar, "/assets/img/post/post-author.png")}
                                                    alt={blogPost.author.name}
                                                    style={{ width: "64px", height: "64px", borderRadius: "50%", objectFit: "cover" }}
                                                />
                                                <div>
                                                    <h4 className="mb-1" style={{ fontSize: "17px", fontWeight: 700 }}>
                                                        {blogPost.author.name}
                                                    </h4>
                                                    <span className="text-muted" style={{ fontSize: "13px" }}>
                                                        {blogPost.author.designation || blogPost.author.role || "Redaksi Jurnalis"}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Comments Section */}
                                    {settings.show_post_comments !== "false" && (
                                        <div className="comment-area-wrap mt-40">
                                            <Comments postId={blogPost.id} />
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Sidebar */}
                            <div className="col-lg-4">
                                {/* Portal Box */}
                                <div className="post-author-box text-center mb-40">
                                    <div className="bg" />
                                    <img
                                        src="/assets/img/post/post-author.png"
                                        alt={siteTitle}
                                        style={{ width: "90px", height: "90px", objectFit: "cover", borderRadius: "50%", margin: "0 auto" }}
                                    />
                                    <h3 className="author">{siteTitle}</h3>
                                    <p>{siteTagline}</p>
                                    <Link href="/about" className="default-btn">
                                        Tentang Kami
                                    </Link>
                                </div>

                                {/* Trending Posts */}
                                {popularPosts.length > 0 && (
                                    <div className="trending-post-wrap mb-40">
                                        <div className="section-heading mb-30">
                                            <h3 className="section-title title-border">
                                                <span>Berita Terpopuler</span>
                                            </h3>
                                        </div>
                                        <div className="list-post-area list-2">
                                            {popularPosts.map((pop) => (
                                                <div className="list-post-card" key={pop.id}>
                                                    <div className="post-img">
                                                        <Link href={`/blog/${pop.slug || pop.id}`}>
                                                            <img
                                                                src={getImageUrl(pop.img, "/assets/img/post/trending-post-1.jpg")}
                                                                alt={pop.title}
                                                                style={{ width: "80px", height: "70px", objectFit: "cover" }}
                                                            />
                                                        </Link>
                                                    </div>
                                                    <div className="post-content">
                                                        <h3 className="title">
                                                            <Link href={`/blog/${pop.slug || pop.id}`}>{pop.title}</Link>
                                                        </h3>
                                                        <span>{formatDate(pop.createdAt)}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Categories */}
                                {categories.length > 0 && (
                                    <div className="categorie-wrap mb-40">
                                        <div className="section-heading mb-30">
                                            <h3 className="section-title title-border">
                                                <span>Daftar Kanal</span>
                                            </h3>
                                        </div>
                                        <ul className="categorie-list">
                                            {categories.map((c) => {
                                                const isActive = c.slug === categorySlug
                                                return (
                                                    <li key={c.id} className={isActive ? "active" : ""}>
                                                        <Link href={`/blog-filter-category?category=${c.slug}`}>
                                                            <h4 className="list-title">
                                                                {c.name} <span>({c.postsCount})</span>
                                                            </h4>
                                                            <i className="las la-arrow-right" />
                                                        </Link>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    </div>
                                )}

                                {/* Social Box Follow */}
                                <div className="social-box-wrap mb-40">
                                    <div className="social-box bg-blue-2" style={{ color: "#fff" }}>
                                        <i className="lab la-facebook-f" />
                                        <div className="content">
                                            <h4 style={{ color: "#fff", fontSize: "14px", margin: 0 }}>Facebook</h4>
                                            <span style={{ fontSize: "12px", opacity: 0.9 }}>Ikuti Kami</span>
                                        </div>
                                    </div>
                                    <div className="social-box bg-blue" style={{ color: "#fff" }}>
                                        <i className="lab la-twitter" />
                                        <div className="content">
                                            <h4 style={{ color: "#fff", fontSize: "14px", margin: 0 }}>Twitter / X</h4>
                                            <span style={{ fontSize: "12px", opacity: 0.9 }}>Follow</span>
                                        </div>
                                    </div>
                                    <div className="social-box bg-pink" style={{ color: "#fff" }}>
                                        <i className="lab la-instagram" />
                                        <div className="content">
                                            <h4 style={{ color: "#fff", fontSize: "14px", margin: 0 }}>Instagram</h4>
                                            <span style={{ fontSize: "12px", opacity: 0.9 }}>Ikuti Kami</span>
                                        </div>
                                    </div>
                                    <div className="social-box bg-red" style={{ color: "#fff" }}>
                                        <i className="lab la-youtube" />
                                        <div className="content">
                                            <h4 style={{ color: "#fff", fontSize: "14px", margin: 0 }}>YouTube</h4>
                                            <span style={{ fontSize: "12px", opacity: 0.9 }}>Subscribe</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Newsletter Section */}
            <section className="subscribe-section bg-grey-2">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="subscribe-content">
                                <h3 className="title">Dapatkan berita dan analisis terhangat langsung di email Anda!</h3>
                                <form onSubmit={handleSubscribe} className="subscribe-form">
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={emailSub}
                                        onChange={(e) => setEmailSub(e.target.value)}
                                        className="form-control"
                                        placeholder="Masukkan alamat email Anda..."
                                        required
                                    />
                                    <button id="submit" className="default-btn" type="submit">
                                        <i className="lab la-telegram-plane" /> Langganan
                                    </button>
                                    <div className="form-icon">
                                        <i className="las la-envelope" />
                                    </div>
                                </form>
                                {subMessage && (
                                    <p className="mt-2 text-primary" style={{ fontSize: "14px", fontWeight: 600 }}>
                                        {subMessage}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="col-lg-6 text-center">
                            <div className="subscribe-thumb">
                                <div className="line" />
                                <img src="/assets/img/images/subscribe-img.png" alt="Subscribe newsletter" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export async function getServerSideProps({ params, req }) {
    try {
        const { id } = params
        const isNumeric = /^\d+$/.test(id)
        const whereCondition = isNumeric
            ? { OR: [{ id: parseInt(id, 10) }, { slug: id }] }
            : { slug: id }

        const post = await prisma.post.findFirst({
            where: whereCondition,
            include: {
                category: { select: { id: true, name: true, slug: true } },
                author: { select: { id: true, name: true, avatar: true, designation: true, role: true } },
                tags: { select: { id: true, name: true, slug: true } },
                _count: { select: { comments: true } }
            }
        })

        // Increment views
        if (post?.id) {
            prisma.post.update({
                where: { id: post.id },
                data: { views: { increment: 1 } }
            }).catch(() => {})
        }

        // Fetch popular posts for sidebar
        const popularPosts = await prisma.post.findMany({
            where: { status: "PUBLISHED" },
            orderBy: { views: "desc" },
            take: 5,
            include: {
                category: { select: { id: true, name: true, slug: true } }
            }
        })

        // Fetch categories with post count
        const categoriesList = await prisma.category.findMany({
            include: {
                _count: {
                    select: {
                        posts: { where: { status: "PUBLISHED" } }
                    }
                }
            },
            orderBy: { name: "asc" }
        })

        const formattedCategories = categoriesList.map((cat) => ({
            id: cat.id,
            name: cat.name,
            slug: cat.slug,
            postsCount: cat._count?.posts || 0
        }))

        // Fetch settings
        const settingsList = await prisma.setting.findMany()
        const settings = {}
        settingsList.forEach((s) => {
            settings[s.key] = s.value
        })

        const protocol = req.headers["x-forwarded-proto"] || "http"
        const host = req.headers["host"] || "localhost:3000"
        const domain = settings.site_url?.trim() || `${protocol}://${host}`

        return {
            props: {
                initialPost: post ? JSON.parse(JSON.stringify(post)) : null,
                popularPosts: popularPosts ? JSON.parse(JSON.stringify(popularPosts)) : [],
                categories: JSON.parse(JSON.stringify(formattedCategories)),
                settings,
                domain
            }
        }
    } catch (error) {
        console.error("Error in BlogDetails getServerSideProps:", error)
        return {
            props: {
                initialPost: null,
                popularPosts: [],
                categories: [],
                settings: {},
                domain: "http://localhost:3000"
            }
        }
    }
}
