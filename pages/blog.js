import Layout from "@/components/posty/layout/Layout"
import Link from "next/link"
import Head from "next/head"
import { useRouter } from "next/router"
import { useState } from "react"
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

export default function BlogPage({
    initialPosts = [],
    initialPopularPosts = [],
    initialCategories = [],
    initialTotalPosts = 0,
    initialPage = 1,
    pageSize = 8,
    settings = {}
}) {
    const router = useRouter()
    const { page: queryPage, search: querySearch } = router.query

    const currentPage = parseInt(queryPage || initialPage || 1, 10)
    const totalPages = Math.ceil(initialTotalPosts / pageSize) || 1
    const [searchKeyword, setSearchKeyword] = useState(querySearch || "")

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

    const handleSearchSubmit = (e) => {
        e.preventDefault()
        if (searchKeyword.trim()) {
            router.push(`/blog?search=${encodeURIComponent(searchKeyword.trim())}`)
        } else {
            router.push("/blog")
        }
    }

    const siteTitle = settings.site_title || "Gatra Portal"
    const pageTitle = `Indeks Berita Terkini - ${siteTitle}`

    return (
        <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="Indeks Berita" settings={settings}>
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content={`Indeks seluruh berita, liputan mendalam, dan artikel pilihan terkini dari ${siteTitle}.`} />
            </Head>

            {/* Filter Pills Bar */}
            <section className="category-filter-bar pt-4 pb-2 bg-grey-2 border-bottom">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-8">
                            <div className="d-flex align-items-center flex-wrap gap-2 py-2" style={{ gap: "8px" }}>
                                <span className="me-2 fw-bold text-dark d-flex align-items-center" style={{ fontSize: "14px" }}>
                                    <i className="las la-filter me-1" style={{ fontSize: "18px", color: "#004CFF" }} />
                                    Kanal Pilihan:
                                </span>
                                <Link
                                    href="/blog"
                                    className="btn btn-sm btn-primary"
                                    style={{
                                        borderRadius: "20px",
                                        padding: "6px 16px",
                                        fontWeight: 600,
                                        fontSize: "13px",
                                        backgroundColor: "#004CFF",
                                        borderColor: "#004CFF",
                                        boxShadow: "0 4px 12px rgba(0, 76, 255, 0.25)"
                                    }}
                                >
                                    Semua Berita
                                </Link>
                                {initialCategories.map((c) => (
                                    <Link
                                        key={c.id}
                                        href={`/blog-filter-category?category=${c.slug}`}
                                        className="btn btn-sm btn-light"
                                        style={{
                                            borderRadius: "20px",
                                            padding: "6px 16px",
                                            fontWeight: 600,
                                            fontSize: "13px",
                                            backgroundColor: "#ffffff",
                                            borderColor: "#e2e8f0",
                                            color: "#334155"
                                        }}
                                    >
                                        {c.name}
                                        <span
                                            className="badge ms-1"
                                            style={{
                                                fontSize: "11px",
                                                backgroundColor: "#e2e8f0",
                                                color: "#64748b",
                                                fontWeight: 500,
                                                borderRadius: "10px"
                                            }}
                                        >
                                            {c.postsCount}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <div className="col-lg-4 mt-2 mt-lg-0">
                            <form onSubmit={handleSearchSubmit} className="d-flex gap-2">
                                <input
                                    type="text"
                                    className="form-control form-control-sm"
                                    placeholder="Cari berita..."
                                    value={searchKeyword}
                                    onChange={(e) => setSearchKeyword(e.target.value)}
                                    style={{ borderRadius: "20px", padding: "6px 14px", fontSize: "13px" }}
                                />
                                <button
                                    type="submit"
                                    className="btn btn-sm btn-dark"
                                    style={{ borderRadius: "20px", padding: "6px 16px", fontSize: "13px" }}
                                >
                                    <i className="las la-search" />
                                </button>
                            </form>
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
                                            {querySearch ? `Hasil Pencarian: "${querySearch}"` : "Semua Berita Terkini"}
                                        </span>
                                    </h3>
                                    <span className="text-muted" style={{ fontSize: "14px" }}>
                                        Total <strong>{initialTotalPosts}</strong> berita
                                    </span>
                                </div>

                                {initialPosts.length === 0 ? (
                                    <div className="card border-0 shadow-sm p-5 text-center my-4" style={{ borderRadius: "12px", background: "#f8fafc" }}>
                                        <div className="mb-3">
                                            <i className="las la-newspaper" style={{ fontSize: "56px", color: "#94a3b8" }} />
                                        </div>
                                        <h4 className="fw-bold mb-2">Tidak ada berita ditemukan</h4>
                                        <p className="text-muted mb-4">
                                            {querySearch ? `Tidak ada berita yang cocok dengan kata kunci "${querySearch}".` : "Belum ada berita yang dipublikasikan."}
                                        </p>
                                        <div>
                                            <Link href="/blog" className="default-btn">
                                                Tampilkan Semua Berita
                                            </Link>
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
                                                        const href = `/blog?${querySearch ? `search=${encodeURIComponent(querySearch)}&` : ""}page=${p}`
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
                                                            href={`/blog?${querySearch ? `search=${encodeURIComponent(querySearch)}&` : ""}page=${currentPage + 1}`}
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
                                    {initialCategories.map((c) => (
                                        <li key={c.id}>
                                            <Link href={`/blog-filter-category?category=${c.slug}`}>
                                                <h4 className="list-title">
                                                    {c.name} <span>({c.postsCount})</span>
                                                </h4>
                                                <i className="las la-arrow-right" />
                                            </Link>
                                        </li>
                                    ))}
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
    const { page = 1, search = "" } = context.query
    const pageSize = 8
    const pageNum = Math.max(1, parseInt(page, 10) || 1)
    const searchQuery = typeof search === "string" ? search.trim() : ""

    try {
        const settingsRecords = await prisma.setting.findMany()
        const settings = {}
        settingsRecords.forEach((item) => {
            settings[item.key] = item.value
        })

        const categories = await prisma.category.findMany({
            include: {
                _count: {
                    select: {
                        posts: { where: { status: "PUBLISHED" } }
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

        const whereClause = { status: "PUBLISHED" }
        if (searchQuery) {
            whereClause.OR = [
                { title: { contains: searchQuery, mode: "insensitive" } },
                { excerpt: { contains: searchQuery, mode: "insensitive" } }
            ]
        }

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
        console.error("Error in blog getServerSideProps:", err)
        return {
            props: {
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
