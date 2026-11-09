import Layout from "@/components/posty/layout/Layout"
import Link from "next/link"
import Head from "next/head"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import { getImageUrl } from "@/lib/imageUtils"
import prisma from "@/lib/prisma"

function formatDate(dateString) {
    if (!dateString) return ""
    try {
        const d = new Date(dateString)
        return d.toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short",
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

export default function BlogFilterCategory({
    initialCategory = "",
    initialPosts = [],
    initialPopularPosts = [],
    initialCategories = [],
    initialTotalPosts = 0,
    initialPage = 1,
    pageSize = 8,
    settings = {}
}) {
    const router = useRouter()
    const { category: queryCategory, page: queryPage } = router.query

    const activeCat = (queryCategory !== undefined ? queryCategory : initialCategory) || ""
    const currentPage = parseInt(queryPage || initialPage || 1, 10)
    const totalPages = Math.ceil(initialTotalPosts / pageSize) || 1

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

    const currentCatObj = initialCategories.find(
        (c) =>
            c.slug.toLowerCase() === activeCat.toLowerCase() ||
            c.name.toLowerCase() === activeCat.toLowerCase()
    )
    const categoryDisplayName = currentCatObj ? currentCatObj.name : (activeCat ? activeCat.toUpperCase() : "Semua Berita")

    const siteTitle = settings.site_title || "Gatra Portal"
    const pageTitle = `Kanal ${categoryDisplayName} - ${siteTitle}`

    const handleSelectCategory = (slug) => {
        if (!slug) {
            router.push("/blog-filter-category")
        } else {
            router.push(`/blog-filter-category?category=${encodeURIComponent(slug)}`)
        }
    }

    return (
        <Layout headerStyle={1} footerStyle={1} breadcrumbTitle={`Kanal: ${categoryDisplayName}`} settings={settings}>
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content={`Kumpulan berita dan artikel terkini dari kanal ${categoryDisplayName} di ${siteTitle}.`} />
            </Head>

            {/* Filter Pills Bar */}
            <section className="category-filter-bar pt-4 pb-2 bg-grey-2 border-bottom">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="d-flex align-items-center flex-wrap gap-2 py-2" style={{ gap: "8px" }}>
                                <span className="me-2 fw-bold text-dark d-flex align-items-center" style={{ fontSize: "14px" }}>
                                    <i className="las la-filter me-1" style={{ fontSize: "18px", color: "#004CFF" }} />
                                    Pilih Kanal:
                                </span>
                                <button
                                    type="button"
                                    onClick={() => handleSelectCategory("")}
                                    className={`btn btn-sm ${!activeCat ? "btn-primary" : "btn-light"}`}
                                    style={{
                                        borderRadius: "20px",
                                        padding: "6px 16px",
                                        fontWeight: 600,
                                        fontSize: "13px",
                                        backgroundColor: !activeCat ? "#004CFF" : "#ffffff",
                                        borderColor: !activeCat ? "#004CFF" : "#e2e8f0",
                                        color: !activeCat ? "#ffffff" : "#334155",
                                        boxShadow: !activeCat ? "0 4px 12px rgba(0, 76, 255, 0.25)" : "none",
                                        transition: "all 0.2s ease"
                                    }}
                                >
                                    Semua Kanal
                                </button>
                                {initialCategories.map((c) => {
                                    const isSelected =
                                        activeCat.toLowerCase() === c.slug.toLowerCase() ||
                                        activeCat.toLowerCase() === c.name.toLowerCase()
                                    return (
                                        <button
                                            key={c.id}
                                            type="button"
                                            onClick={() => handleSelectCategory(c.slug)}
                                            className={`btn btn-sm ${isSelected ? "btn-primary" : "btn-light"}`}
                                            style={{
                                                borderRadius: "20px",
                                                padding: "6px 16px",
                                                fontWeight: 600,
                                                fontSize: "13px",
                                                backgroundColor: isSelected ? "#004CFF" : "#ffffff",
                                                borderColor: isSelected ? "#004CFF" : "#e2e8f0",
                                                color: isSelected ? "#ffffff" : "#334155",
                                                boxShadow: isSelected ? "0 4px 12px rgba(0, 76, 255, 0.25)" : "none",
                                                transition: "all 0.2s ease"
                                            }}
                                        >
                                            {c.name}
                                            <span
                                                className="badge ms-1"
                                                style={{
                                                    fontSize: "11px",
                                                    backgroundColor: isSelected ? "rgba(255,255,255,0.25)" : "#e2e8f0",
                                                    color: isSelected ? "#fff" : "#64748b",
                                                    fontWeight: 500,
                                                    borderRadius: "10px"
                                                }}
                                            >
                                                {c.postsCount}
                                            </span>
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content Area */}
            <section className="news-post-area padding">
                <div className="container">
                    <div className="row">
                        {/* Feed Column */}
                        <div className="col-lg-8">
                            <div className="news-post-wrap">
                                <div className="section-heading mb-40 d-flex justify-content-between align-items-center">
                                    <h3 className="section-title title-border">
                                        <span>
                                            {activeCat ? `Kanal: ${categoryDisplayName}` : "Semua Berita Terbaru"}
                                        </span>
                                    </h3>
                                    <span className="text-muted" style={{ fontSize: "14px" }}>
                                        Ditemukan <strong>{initialTotalPosts}</strong> berita
                                    </span>
                                </div>

                                {initialPosts.length === 0 ? (
                                    <div className="card border-0 shadow-sm p-5 text-center my-4" style={{ borderRadius: "12px", background: "#f8fafc" }}>
                                        <div className="mb-3">
                                            <i className="las la-newspaper" style={{ fontSize: "56px", color: "#94a3b8" }} />
                                        </div>
                                        <h4 className="fw-bold mb-2">Belum ada berita pada kanal ini</h4>
                                        <p className="text-muted mb-4">
                                            Saat ini belum ada publikasi berita di kanal &quot;{categoryDisplayName}&quot;. Silakan jelajahi kanal berita lainnya.
                                        </p>
                                        <div>
                                            <button
                                                onClick={() => handleSelectCategory("")}
                                                className="default-btn"
                                                style={{ cursor: "pointer" }}
                                            >
                                                Lihat Semua Berita
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        {initialPosts.map((post) => {
                                            const postUrl = `/blog/${post.slug || post.id}`
                                            const categoryName = post.category?.name || "News"
                                            const categorySlug = post.category?.slug || "news"
                                            const badgeClass = getCategoryBadgeColor(categoryName)
                                            const excerpt =
                                                post.excerpt ||
                                                (post.content
                                                    ? post.content.replace(/<[^>]*>/g, "").slice(0, 160) + "..."
                                                    : "")

                                            return (
                                                <div className="post-card news-post" key={post.id}>
                                                    <div className="post-thumb">
                                                        <Link href={postUrl}>
                                                            <img
                                                                src={getImageUrl(post.img, "/assets/img/post/sports-news-1.jpg")}
                                                                alt={post.title}
                                                                style={{ width: "100%", height: "210px", objectFit: "cover" }}
                                                            />
                                                        </Link>
                                                    </div>
                                                    <div className="post-content">
                                                        <Link
                                                            href={`/blog-filter-category?category=${categorySlug}`}
                                                            className={`card-btn ${badgeClass}`}
                                                        >
                                                            {categoryName}
                                                        </Link>
                                                        <h3 className="title">
                                                            <Link href={postUrl}>{post.title}</Link>
                                                        </h3>
                                                        <ul className="post-list">
                                                            <li className="author">
                                                                oleh <span>{post.author?.name || "Redaksi"}</span>
                                                            </li>
                                                            <li className="date">{formatDate(post.createdAt)}</li>
                                                            <li>
                                                                <i className="las la-eye" /> {post.views || 0}
                                                            </li>
                                                        </ul>
                                                        <p>{excerpt}</p>
                                                        <Link href={postUrl} className="news-post-btn" aria-label={`Baca: ${post.title}`}>
                                                            <i className="las la-arrow-right" />
                                                        </Link>
                                                    </div>
                                                </div>
                                            )
                                        })}

                                        {/* Pagination */}
                                        {totalPages > 1 && (
                                            <div className="post-pagination mt-40">
                                                <ul className="pagination-list">
                                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
                                                        const isCurrent = p === currentPage
                                                        const href = `/blog-filter-category?${activeCat ? `category=${encodeURIComponent(activeCat)}&` : ""}page=${p}`
                                                        return (
                                                            <li key={p} className={isCurrent ? "active" : ""}>
                                                                <Link href={href}>{p}</Link>
                                                            </li>
                                                        )
                                                    })}
                                                </ul>
                                                {currentPage < totalPages && (
                                                    <div className="pagination-right">
                                                        <Link
                                                            href={`/blog-filter-category?${activeCat ? `category=${encodeURIComponent(activeCat)}&` : ""}page=${currentPage + 1}`}
                                                            aria-label="Halaman berikutnya"
                                                        >
                                                            <i className="las la-angle-right" />
                                                        </Link>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Sidebar Column */}
                        <div className="col-lg-4">
                            {/* Portal Info Box */}
                            <div className="post-author-box text-center mb-40">
                                <div className="bg" />
                                <img
                                    src="/assets/img/post/post-author.png"
                                    alt={siteTitle}
                                    style={{ width: "90px", height: "90px", objectFit: "cover", borderRadius: "50%", margin: "0 auto" }}
                                />
                                <h3 className="author">{siteTitle}</h3>
                                <p>
                                    {settings.site_tagline ||
                                        "Menyajikan berita dan informasi terkini, akurat, dan terpercaya seputar peristiwa nasional dan internasional."}
                                </p>
                                <Link href="/about" className="default-btn">
                                    Tentang Kami
                                </Link>
                            </div>

                            {/* Trending Posts Widget */}
                            {initialPopularPosts.length > 0 && (
                                <div className="trending-post-wrap mb-40">
                                    <div className="section-heading mb-30">
                                        <h3 className="section-title title-border">
                                            <span>Berita Terpopuler</span>
                                        </h3>
                                    </div>
                                    <div className="list-post-area list-2">
                                        {initialPopularPosts.map((pop) => (
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

                            {/* Categories Widget */}
                            <div className="categorie-wrap mb-40">
                                <div className="section-heading mb-30">
                                    <h3 className="section-title title-border">
                                        <span>Daftar Kanal</span>
                                    </h3>
                                </div>
                                <ul className="categorie-list">
                                    {initialCategories.map((c) => {
                                        const isCatActive =
                                            activeCat.toLowerCase() === c.slug.toLowerCase() ||
                                            activeCat.toLowerCase() === c.name.toLowerCase()
                                        return (
                                            <li key={c.id} className={isCatActive ? "active" : ""}>
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

                            {/* Follow Us Social Box */}
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

export async function getServerSideProps(context) {
    const { category = "", page = 1 } = context.query
    const pageSize = 8
    const pageNum = Math.max(1, parseInt(page, 10) || 1)
    const categoryParam = typeof category === "string" ? category.trim() : ""

    try {
        // Fetch Settings
        const settingsRecords = await prisma.setting.findMany()
        const settings = {}
        settingsRecords.forEach((item) => {
            settings[item.key] = item.value
        })

        // Fetch Categories with published post count
        const categories = await prisma.category.findMany({
            include: {
                _count: {
                    select: {
                        posts: {
                            where: { status: "PUBLISHED" }
                        }
                    }
                }
            },
            orderBy: { name: "asc" }
        })

        const formattedCategories = categories.map((cat) => ({
            id: cat.id,
            name: cat.name,
            slug: cat.slug,
            postsCount: cat._count?.posts || 0
        }))

        // Where condition for posts
        const whereClause = { status: "PUBLISHED" }
        if (categoryParam && categoryParam !== "all") {
            whereClause.OR = [
                { category: { slug: { equals: categoryParam, mode: "insensitive" } } },
                { category: { name: { equals: categoryParam, mode: "insensitive" } } }
            ]
        }

        // Fetch posts and total count in parallel
        const [posts, totalCount, popularPosts] = await Promise.all([
            prisma.post.findMany({
                where: whereClause,
                orderBy: { createdAt: "desc" },
                take: pageSize,
                skip: (pageNum - 1) * pageSize,
                include: {
                    category: { select: { id: true, name: true, slug: true } },
                    author: { select: { id: true, name: true, avatar: true } }
                }
            }),
            prisma.post.count({
                where: whereClause
            }),
            prisma.post.findMany({
                where: { status: "PUBLISHED" },
                orderBy: { views: "desc" },
                take: 5,
                include: {
                    category: { select: { id: true, name: true, slug: true } }
                }
            })
        ])

        return {
            props: {
                initialCategory: categoryParam,
                initialPosts: JSON.parse(JSON.stringify(posts)),
                initialPopularPosts: JSON.parse(JSON.stringify(popularPosts)),
                initialCategories: JSON.parse(JSON.stringify(formattedCategories)),
                initialTotalPosts: totalCount,
                initialPage: pageNum,
                pageSize,
                settings
            }
        }
    } catch (err) {
        console.error("Error in blog-filter-category getServerSideProps:", err)
        return {
            props: {
                initialCategory: categoryParam,
                initialPosts: [],
                initialPopularPosts: [],
                initialCategories: [],
                initialTotalPosts: 0,
                initialPage: 1,
                pageSize,
                settings: {}
            }
        }
    }
}
