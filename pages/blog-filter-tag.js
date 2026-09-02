import BlogPost from "@/components/blog/BlogPost"
import Layout from "@/components/layout/Layout"
import BlogSidebar from "@/components/sections/BlogSidebar"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function BlogFilterTag() {
    const router = useRouter()
    const { tag: tagParam } = router.query
    const [activeTag, setActiveTag] = useState(tagParam || "design")

    useEffect(() => {
        if (tagParam) setActiveTag(tagParam)
    }, [tagParam])

    const tags = ['Design', 'Technology', 'UI/UX', 'Development', 'AI', 'Travel', 'Marketing', 'Podcast', 'Lifestyle']

    const handleSelectTag = (t) => {
        setActiveTag(t)
        router.push(`/blog-filter-tag?tag=${t.toLowerCase()}`, undefined, { shallow: true })
    }

    return (
        <Layout headerStyle={1} footerStyle={1} breadcrumbTitle={`Tag: #${activeTag}`}>
            <div className="ta-blog-area pt-70 pb-100">
                <div className="container">
                    {/* Tag Filter Pills */}
                    <div className="row mb-40">
                        <div className="col-12">
                            <div className="d-flex flex-wrap gap-2 align-items-center" style={{ gap: '8px' }}>
                                {tags.map(t => {
                                    const isSelected = activeTag.toLowerCase() === t.toLowerCase()
                                    return (
                                        <button
                                            key={t}
                                            onClick={() => handleSelectTag(t)}
                                            style={{
                                                padding: '7px 18px',
                                                fontSize: '13px',
                                                background: isSelected ? '#da0105' : '#f8fafc',
                                                color: isSelected ? '#fff' : '#475569',
                                                border: isSelected ? '1px solid #da0105' : '1px solid #e2e8f0',
                                                borderRadius: '20px',
                                                cursor: 'pointer',
                                                fontWeight: 600,
                                                boxShadow: isSelected ? '0 2px 8px rgba(218, 1, 5, 0.25)' : 'none',
                                                transition: 'all 0.2s ease'
                                            }}
                                        >
                                            #{t}
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-xl-8">
                            <div className="row ta-column-gap-30 mt-none-30">
                                <BlogPost
                                    showItem={8}
                                    style={1}
                                    formatIcon
                                    showPagination
                                    search={activeTag}
                                    col="col-xl-6 col-lg-6 mt-30"
                                />
                            </div>
                        </div>
                        <div className="col-xl-4">
                            <BlogSidebar />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}