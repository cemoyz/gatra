import Layout from "@/components/layout/Layout"
import { useRouter } from "next/router"
import { useEffect, useState, useRef } from "react"
import data from "../../util/blog.json"
import BlogDetailsArticle from "@/components/sections/BlogDetailsArticle"
import Comments from "@/components/sections/Comments"
import BlogSidebar from "@/components/sections/BlogSidebar"

export default function BlogDetails() {
    const router = useRouter()
    const [blogPost, setBlogPost] = useState(null)
    const [loading, setLoading] = useState(true)
    const { id } = router.query
    const fetchedRef = useRef(false)

    useEffect(() => {
        if (!id) return
        setLoading(true)

        fetch(`/api/posts/${id}`)
            .then(res => res.json())
            .then(resData => {
                if (resData.success && resData.post) {
                    setBlogPost(resData.post)
                } else {
                    const found = data.find((d) => d.id == id)
                    if (found) setBlogPost(found)
                }
            })
            .catch(() => {
                const found = data.find((d) => d.id == id)
                if (found) setBlogPost(found)
            })
            .finally(() => setLoading(false))
    }, [id])

    const layoutType = blogPost?.layout || 'right-sidebar'
    const isNoSidebar = layoutType === 'no-sidebar'
    const isLeftSidebar = layoutType === 'left-sidebar'

    return (
        <Layout headerStyle={1} footerStyle={1} breadcrumbTitle={blogPost?.title || "Detail Berita"}>
            <div className="ta-blog-area pt-70 pb-90" style={{ position: 'relative', zIndex: 1, clear: 'both' }}>
                <div className="container">
                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '80px 0', color: '#94a3b8' }}>
                            <i className="fa fa-spinner fa-spin fa-2x" style={{ marginBottom: '12px', display: 'block' }}></i>
                            Loading article...
                        </div>
                    ) : !blogPost ? (
                        <div style={{ textAlign: 'center', padding: '60px 0', color: '#64748b' }}>
                            <h3>Article Not Found</h3>
                            <p>The requested article could not be located in the database.</p>
                        </div>
                    ) : isNoSidebar ? (
                        /* No Sidebar (Full Width) Layout Template */
                        <div className="row justify-content-center" style={{ alignItems: 'flex-start' }}>
                            <div className="col-xl-10 col-lg-12">
                                <div className="ta-blog-details-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                                    <BlogDetailsArticle blogPost={blogPost} />
                                    <Comments postId={blogPost.id} />
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* Sidebar Layout Template (Left or Right) */
                        <div className="row" style={{ alignItems: 'flex-start' }}>
                            {isLeftSidebar && (
                                <div className="col-xl-4 col-lg-4 order-2 order-xl-1">
                                    <BlogSidebar />
                                </div>
                            )}

                            <div className={`col-xl-8 col-lg-8 ${isLeftSidebar ? 'order-1 order-xl-2' : ''}`}>
                                <div className="ta-blog-details-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                                    <BlogDetailsArticle blogPost={blogPost} />
                                    <Comments postId={blogPost.id} />
                                </div>
                            </div>

                            {!isLeftSidebar && (
                                <div className="col-xl-4 col-lg-4">
                                    <BlogSidebar />
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    )
}