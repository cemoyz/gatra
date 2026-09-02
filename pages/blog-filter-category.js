import BlogPost from "@/components/blog/BlogPost"
import Layout from "@/components/layout/Layout"
import BlogSidebar from "@/components/sections/BlogSidebar"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function BlogFilterCategory() {
    const router = useRouter()
    const { category: catParam } = router.query
    const [activeCat, setActiveCat] = useState(catParam || "")
    const [categories, setCategories] = useState([])

    useEffect(() => {
        if (catParam) setActiveCat(catParam)
    }, [catParam])

    useEffect(() => {
        fetch('/api/categories')
            .then(res => res.json())
            .then(data => {
                if (data.success && data.categories) {
                    setCategories(data.categories)
                }
            })
            .catch(console.error)
    }, [])

    const handleSelectCategory = (slug) => {
        setActiveCat(slug)
        router.push(`/blog-filter-category?category=${slug}`, undefined, { shallow: true })
    }

    return (
        <Layout headerStyle={1} footerStyle={1} breadcrumbTitle={`Category: ${activeCat || "All"}`}>
            <div className="ta-blog-area pt-70 pb-100">
                <div className="container">
                    {/* Category Filter Pills */}
                    <div className="row mb-40">
                        <div className="col-12">
                            <div className="d-flex flex-wrap gap-2 align-items-center" style={{ gap: '8px' }}>
                                <button
                                    onClick={() => handleSelectCategory("")}
                                    className={`ta-button ${!activeCat ? '' : 'btn-secondary'}`}
                                    style={{
                                        padding: '7px 18px',
                                        fontSize: '13px',
                                        background: !activeCat ? '#da0105' : '#f8fafc',
                                        color: !activeCat ? '#fff' : '#475569',
                                        border: !activeCat ? '1px solid #da0105' : '1px solid #e2e8f0',
                                        borderRadius: '20px',
                                        fontWeight: 600,
                                        boxShadow: !activeCat ? '0 2px 8px rgba(218, 1, 5, 0.25)' : 'none',
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    All Categories
                                </button>
                                {categories.map(c => {
                                    const isSelected = activeCat.toLowerCase() === c.slug.toLowerCase() || activeCat.toLowerCase() === c.name.toLowerCase()
                                    return (
                                        <button
                                            key={c.id}
                                            onClick={() => handleSelectCategory(c.slug)}
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
                                            {c.name} ({c.postsCount || 0})
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
                                    category={activeCat}
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