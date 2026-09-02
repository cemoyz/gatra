import BlogPost from "@/components/blog/BlogPost"
import Layout from "@/components/layout/Layout"
import BlogSidebar from "@/components/sections/BlogSidebar"
export default function BlogLeftSidebar() {

    return (
        <>
            <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="Blog Left Sidebar">
                <div className="ta-blog-area pt-100 pb-100">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-4 order-2 order-xl-1">
                                <BlogSidebar />
                            </div>
                            <div className="col-xl-8 order-1 order-xl-2">
                                <div className="row ta-column-gap-30 mt-none-30">
                                    <BlogPost showItem={4} showStart={0} showEnd={12} style={1} showPagination col="col-xl-6 col-lg-6 mt-30" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </Layout>
        </>
    )
}