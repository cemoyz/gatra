import BlogPost from "@/components/blog/BlogPost"
import Layout from "@/components/layout/Layout"
import BlogSidebar from "@/components/sections/BlogSidebar"
import HeroSlider3 from "@/components/slider/HeroSlider3"
export default function Home7() {

    return (
        <>
            <Layout headerStyle={7} footerStyle={7}>
                <div>
                    <div className="ta-featured-blog-area fix">
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-12">
                                    <div className="ta-fps-wrapper">
                                        <HeroSlider3 />
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
                                                <h2 className="ta-title mb-0">Recently Added
                                                    <span className="border-shape hide-after" />
                                                </h2>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mt-none-30">
                                        <div className="col-xl-12">
                                            <BlogPost showItem={5} showStart={33} showEnd={39} style={4} formatIcon showPagination />
                                        </div>
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