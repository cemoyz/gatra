import BlogPost from "@/components/blog/BlogPost"
import Layout from "@/components/layout/Layout"
import BlogSidebar from "@/components/sections/BlogSidebar"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"

export default function BlogFilterSearch() {
    const router = useRouter()
    const { search: searchParam } = router.query
    const [searchTerm, setSearchTerm] = useState(searchParam || "")
    const [activeQuery, setActiveQuery] = useState(searchParam || "")

    useEffect(() => {
        if (searchParam) {
            setSearchTerm(searchParam)
            setActiveQuery(searchParam)
        }
    }, [searchParam])

    const handleSearch = (e) => {
        e.preventDefault()
        setActiveQuery(searchTerm)
        router.push(`/blog-filter-search?search=${encodeURIComponent(searchTerm)}`, undefined, { shallow: true })
    }

    return (
        <Layout headerStyle={1} footerStyle={1} breadcrumbTitle={`Search: ${activeQuery || "All Articles"}`}>
            <div className="ta-blog-area pt-70 pb-100">
                <div className="container">
                    {/* Search Bar on page */}
                    <div className="row mb-50">
                        <div className="col-xl-8">
                            <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px' }}>
                                <input
                                    type="text"
                                    className="form-control"
                                    style={{
                                        padding: '14px 20px',
                                        fontSize: '15px',
                                        borderRadius: '8px',
                                        border: '1px solid #e2e8f0',
                                        backgroundColor: '#fff'
                                    }}
                                    placeholder="Type keyword and press Enter to search..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <button type="submit" className="ta-button" style={{ padding: '0 28px', whiteSpace: 'nowrap' }}>
                                    <i className="fa fa-search" style={{ marginRight: '6px' }} /> Search
                                </button>
                            </form>
                            {activeQuery && (
                                <div style={{ marginTop: '14px', fontSize: '14px', color: '#64748b' }}>
                                    Showing results for: <strong>"{activeQuery}"</strong>
                                </div>
                            )}
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
                                    search={activeQuery}
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