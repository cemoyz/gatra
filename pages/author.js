import Layout from "@/components/layout/Layout"
import Newsletter2 from "@/components/sections/Newsletter2"
import SocialLinks from "@/components/elements/SocialLinks"
import BlogCard1 from "@/components/blog/BlogCard1"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function Author() {
    const router = useRouter()
    const { id, authorId, name } = router.query
    const [author, setAuthor] = useState(null)
    const [authorPosts, setAuthorPosts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchAuthorData = async () => {
            setLoading(true)
            try {
                const targetId = id || authorId

                if (targetId) {
                    const res = await fetch(`/api/authors/${targetId}`)
                    const data = await res.json()
                    if (data.success && data.author) {
                        setAuthor(data.author)
                        // Fetch posts written by this author
                        const resPosts = await fetch(`/api/posts?authorId=${targetId}`)
                        const postData = await resPosts.json()
                        if (postData.success && postData.posts) {
                            setAuthorPosts(postData.posts)
                        } else if (data.author.posts) {
                            setAuthorPosts(data.author.posts)
                        }
                        return
                    }
                }

                // If searched by name or loading first available author
                const res = await fetch('/api/authors')
                const data = await res.json()
                if (data.success && data.authors && data.authors.length > 0) {
                    let matchedAuthor = data.authors[0]
                    if (name) {
                        const found = data.authors.find(a => 
                            a.name.toLowerCase().includes(String(name).toLowerCase()) ||
                            String(name).toLowerCase().includes(a.name.toLowerCase())
                        )
                        if (found) matchedAuthor = found
                    }
                    setAuthor(matchedAuthor)
                    const resPosts = await fetch(`/api/posts?authorId=${matchedAuthor.id}`)
                    const postData = await resPosts.json()
                    if (postData.success && postData.posts) {
                        setAuthorPosts(postData.posts)
                    }
                }
            } catch (err) {
                console.error('Error fetching author profile:', err)
            } finally {
                setLoading(false)
            }
        }

        if (router.isReady) {
            fetchAuthorData()
        }
    }, [router.isReady, id, authorId, name])

    const authorName = author?.name || (name ? String(name) : "Alexis D. Dowson")
    const authorBio = author?.bio || "Headline-making Entrepreneur, Author, Podcaster, Speaker, and Lead Technology Columnist at Hoom Magazine."
    const authorRole = author?.role || "Senior Editor & Columnist"
    const authorAvatar = author?.avatar || "/assets/img/team/team-big-1.webp"

    return (
        <Layout headerStyle={1} footerStyle={1} breadcrumbTitle={`Author Profile: ${authorName}`}>
            <div>
                {/* About Author Section */}
                <div className="ta-about-section ta-about-me-section pt-100 pb-80">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-xl-4 col-lg-5">
                                <div className="thumb position-relative" style={{ borderRadius: '16px', overflow: 'hidden', backgroundColor: '#1e293b', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
                                    <img
                                        src={authorAvatar}
                                        alt={authorName}
                                        onError={(e) => { e.currentTarget.src = '/assets/img/author/author-1.webp' }}
                                        style={{ width: '100%', height: '420px', objectFit: 'cover' }}
                                    />
                                </div>
                            </div>
                            <div className="col-xl-7 col-lg-7 offset-xl-1">
                                <div className="info-wrapper">
                                    <span style={{ fontSize: '13px', color: '#da0105', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>
                                        {authorRole}
                                    </span>
                                    <h1 className="ta-name mb-15">
                                        Halo, Saya <span>{authorName}</span>
                                    </h1>
                                    <p className="ta-headline" style={{ fontSize: '18px', lineHeight: '1.6', color: '#334155', marginBottom: '16px' }}>
                                        {authorBio}
                                    </p>
                                    <p style={{ color: '#64748b', fontSize: '15px', lineHeight: '1.7' }}>
                                        Temukan berbagai wawasan terverifikasi seputar inovasi digital, tren media, dan analisis terkini yang dipublikasikan secara berkala di Hoom Magazine.
                                    </p>

                                    <div className="mt-30">
                                        <SocialLinks />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Author's Published Articles */}
                <div className="ta-blog-area pt-50 pb-100" style={{ backgroundColor: '#f8fafc' }}>
                    <div className="container">
                        <div className="section-title text-center mb-50">
                            <span style={{ color: '#da0105', fontWeight: 800, textTransform: 'uppercase', fontSize: '12px', letterSpacing: '0.8px' }}>
                                Karya Publikasi
                            </span>
                            <h2 style={{ fontSize: '30px', marginTop: '6px', fontWeight: 700 }}>
                                Artikel oleh {authorName} ({authorPosts.length})
                            </h2>
                        </div>

                        {loading ? (
                            <div style={{ textAlign: 'center', padding: '60px 0', color: '#94a3b8' }}>
                                <i className="fa fa-spinner fa-spin fa-2x" style={{ marginBottom: '10px', display: 'block' }}></i>
                                Loading articles...
                            </div>
                        ) : authorPosts.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '40px 0', color: '#64748b' }}>
                                <p>Belum ada artikel yang dipublikasikan oleh penulis ini.</p>
                            </div>
                        ) : (
                            <div className="row">
                                {authorPosts.map((post) => (
                                    <BlogCard1
                                        key={post.id}
                                        col="col-xl-4 col-lg-6 col-md-6 mt-30"
                                        item={post}
                                        desc={true}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Newsletter */}
                <Newsletter2 />
            </div>
        </Layout>
    )
}