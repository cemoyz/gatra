import BlogPost from "@/components/blog/BlogPost"
import Layout from "@/components/layout/Layout"
import BlogSidebar from "@/components/sections/BlogSidebar"
import { useEffect, useState } from "react"

export default function Blog() {
    const [settings, setSettings] = useState({
        layout_grid: 'three-column',
        list_type: 'right-sidebar',
        posts_per_page: '8'
    })

    useEffect(() => {
        fetch('/api/settings')
            .then(res => res.json())
            .then(data => {
                if (data.success && data.settings) {
                    setSettings(prev => ({ ...prev, ...data.settings }))
                }
            })
            .catch(console.error)
    }, [])

    // Determine grid column class based on active setting
    const getGridColClass = () => {
        switch (settings.layout_grid) {
            case 'two-column': return 'col-xl-6 col-lg-6 col-md-6 mt-30'
            case 'three-column': return 'col-xl-4 col-lg-6 col-md-6 mt-30'
            case 'three-column-wide': return 'col-xl-4 col-lg-4 col-md-6 mt-30'
            case 'four-column': return 'col-xl-3 col-lg-4 col-md-6 mt-30'
            case 'four-column-wide': return 'col-xl-3 col-lg-3 col-md-6 mt-30'
            case 'five-column': return 'col-xl-3 col-lg-4 col-md-6 mt-30'
            case 'six-column': return 'col-xl-2 col-lg-3 col-md-4 mt-30'
            default: return 'col-xl-6 col-lg-6 mt-30'
        }
    }

    // Determine card style based on list_type
    const getCardStyle = () => {
        switch (settings.list_type) {
            case 'compact': return 6
            case 'info-right': return 4
            default: return 1
        }
    }

    const isNoSidebar = settings.list_type === 'no-sidebar' || settings.layout_grid === 'four-column' || settings.layout_grid === 'four-column-wide' || settings.layout_grid === 'five-column' || settings.layout_grid === 'six-column'
    const isLeftSidebar = settings.list_type === 'left-sidebar'
    const limit = parseInt(settings.posts_per_page) || 8

    return (
        <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="Blog">
            <div className="ta-blog-area pt-100 pb-100">
                <div className={settings.layout_grid?.includes('wide') ? "container-fluid px-lg-5" : "container"}>
                    {isNoSidebar ? (
                        /* No Sidebar / Grid View */
                        <div className="row ta-column-gap-30 mt-none-30">
                            <BlogPost
                                showItem={limit}
                                style={getCardStyle()}
                                showPagination
                                formatIcon
                                col={getGridColClass()}
                            />
                        </div>
                    ) : (
                        /* Sidebar Layout (Left or Right) */
                        <div className="row">
                            {isLeftSidebar && (
                                <div className="col-xl-4 order-2 order-xl-1">
                                    <BlogSidebar />
                                </div>
                            )}

                            <div className={`col-xl-8 ${isLeftSidebar ? 'order-1 order-xl-2' : ''}`}>
                                <div className="row ta-column-gap-30 mt-none-30">
                                    <BlogPost
                                        showItem={limit}
                                        style={getCardStyle()}
                                        showPagination
                                        formatIcon
                                        col={getGridColClass()}
                                    />
                                </div>
                            </div>

                            {!isLeftSidebar && (
                                <div className="col-xl-4">
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