import BlogPost from "@/components/blog/BlogPost"
import Layout from "@/components/layout/Layout"
import BlogSidebar from "@/components/sections/BlogSidebar"
import FeaturedSlider2 from "@/components/slider/FeaturedSlider2"
export default function Home6() {

    return (
        <>
            <Layout headerStyle={6} footerStyle={6}>
                <div>
                    <div className="ta-featured-blog-area fix pt-30">
                        <div className="container-fluid px-0">
                            <div className="row">
                                <div className="col-xl-12">
                                    <div className="ta-fps-wrapper position-relative">
                                        <div className="shape shape__1"><img src="/assets/img/shape/author-shape-1.webp" alt="" /></div>
                                        <div className="shape shape__2"><img src="/assets/img/shape/menu-shape-1.webp" alt="" /></div>
                                        <FeaturedSlider2 />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* featured blog end */}
                    {/* blog area start */}
                    <div className="ta-blog-area pt-100 pb-100">
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-8">
                                    <div className="row">
                                        <div className="col-xl-12">
                                            <div className="ta-section-heading ta-section-heading__with-border mb-45 pl-65 mt-none-15">
                                                <h2 className="ta-title mb-0">Popular Post
                                                    <span className="border-shape hide-after" />
                                                </h2>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row ta-column-gap-30 mt-none-30">
                                        <BlogPost showItem={8} showStart={0} showEnd={12} style={1} desc formatIcon showPagination col="col-xl-6 col-lg-6 mt-30" />
                                    </div>
                                </div>
                                <div className="col-xl-4">
                                    <BlogSidebar />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </Layout>
        </>
    )
}