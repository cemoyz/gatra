import Layout from "@/components/layout/Layout"
import FeaturedSlider2 from "@/components/slider/FeaturedSlider2"
import HeroSlider1 from "@/components/slider/HeroSlider1"
import HeroSlider2 from "@/components/slider/HeroSlider2"
import HeroSlider3 from "@/components/slider/HeroSlider3"
import RecendlyAddedSlider1 from "@/components/slider/RecendlyAddedSlider1"
import TrendingSlider1 from "@/components/slider/TrendingSlider1"
export default function BlogSlider() {

    return (
        <>
            <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="title">
                <div>
                    {/* featured blog start */}
                    <div className="ta-featured-blog-area fix pt-100">
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
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-12 pt-90">
                                <div className="ta-section-heading text-center mb-50">
                                    <h2 className="ta-title ta-title--mid">Full Width Slider</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    <HeroSlider1 />
                    {/* featured blog end */}
                    {/* featured blog start */}
                    <div className="ta-featured-blog-area fix">
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-12">
                                    <div className="ta-section-heading text-center mb-50">
                                        <h2 className="ta-title ta-title--mid">Featured Posts Slider : Style 1</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xl-12">
                                    <HeroSlider2 />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* featured blog end */}
                    {/* featured blog start */}
                    <div className="ta-featured-blog-area fix pt-60">
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-12">
                                    <div className="ta-section-heading text-center mb-50">
                                        <h2 className="ta-title ta-title--mid">Featured Post Slider : Style 2</h2>
                                    </div>
                                </div>
                            </div>
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
                    {/* recnt post slider start */}
                    <div className="rcp-area pt-100">
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-12">
                                    <div className="ta-section-heading ta-section-heading__long-border mb-50">
                                        <h2 className="ta-title ta-title--mid pr-130">
                                            <span className="ta-title__tag">Trending Post</span>
                                            <span className="ta-long-border" />
                                        </h2>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xl-12">
                                    <TrendingSlider1 />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* recnt post slider end */}
                    {/* recnt post slider start */}
                    <div className="rcp-area pt-100 pb-100">
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-12">
                                    <div className="ta-section-heading mb-60">
                                        <h2 className="ta-title ta-title--mid">Recently Added</h2>
                                        <p>The opportunity to work abroad is a popular prospect, one </p>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xl-12">
                                    <RecendlyAddedSlider1 />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </Layout>
        </>
    )
}