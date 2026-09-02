import Layout from "@/components/layout/Layout"
import BlogDetailsArticle2 from "@/components/sections/BlogDetailsArticle2"
import BlogSidebar from "@/components/sections/BlogSidebar"
import Comments from "@/components/sections/Comments"
export default function BlogDetailsQuote() {

    return (
        <>
            <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="Blog Details Quotes">
                <div className="ta-blog-area pt-70 pb-100">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-8">
                                <div className="ta-blog-details-wrapper ta-blog-details-wrapper__prev">
                                    <div className="shape shape__1"><img src="/assets/img/shape/featerd-shape-1.webp" alt="" /></div>
                                    <div className="shape shape__2"><img src="/assets/img/shape/featerd-shape-2.webp" alt="" /></div>
                                    <div className="shape shape__3"><img src="/assets/img/shape/featerd-shape-3.webp" alt="" /></div>
                                    <BlogDetailsArticle2 type="quote" />
                                    <Comments />
                                </div>
                            </div>
                            <div className="col-xl-4">
                                <BlogSidebar />
                            </div>
                        </div>
                    </div>
                </div>

            </Layout>
        </>
    )
}