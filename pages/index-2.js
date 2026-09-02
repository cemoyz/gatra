import BlogPost from "@/components/blog/BlogPost"
import Layout from "@/components/layout/Layout"
import CategorySlider from "@/components/slider/CategorySlider"
export default function Home2() {

    return (
        <>
            <Layout headerStyle={2} footerStyle={2}>

                {/* hero search section start */}
                <div className="ta-hero-section pt-100 pb-100">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-12">
                                <h1 className="ta-title">Hey, I’m <span>Hoom
                                    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="183px" height="107px">
                                        <path fillRule="evenodd" stroke="#da0105" strokeWidth="2px" strokeLinecap="round" strokeLinejoin="round" fill="none" d="M2.316,73.276 C2.316,73.276 36.316,16.537 144.430,20.508 C252.544,24.479 78.072,95.165 40.747,89.710 C5.195,84.515 1.753,44.254 87.098,10.105 C172.443,-24.044 229.022,64.978 60.976,103.336 " />
                                    </svg>
                                </span> . I promote <br />
                                    positive culture through inspiring articles <br />
                                    on health, design, and web.</h1>
                            </div>
                        </div>
                    </div>
                </div>
                {/* hero search section end */}
                {/* blog cat slider start */}
                <div className="ta-blog-cat-section fix">
                    <div className="container-fluid px-0">
                        <div className="row">
                            <div className="col-xl-12">
                                <CategorySlider />
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-xl-6 col-lg-8 text-center mt-45">
                                <img src="/assets/img/ad-banner/ad-banner-1.webp" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
                {/* blog cat slider end */}
                {/* featured post area start */}
                <div className="featured-post-area pt-100 pb-100">
                    <div className="container">
                        <div className="row ta-column-gap-30 mt-none-30">
                            <div className="col-xl-8 mt-30">
                                <BlogPost showItem={4} showStart={31} showEnd={32} style={3} desc />
                            </div>
                            <div className="col-xl-4">
                                <BlogPost showItem={4} showStart={0} showEnd={2} style={1} col="mt-30" />
                            </div>
                        </div>
                    </div>
                </div>
                {/* featured post area end */}
                {/* blog area start */}
                <div className="ta-blog-area pb-100">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="ta-section-heading text-center mb-60">
                                    <h2 className="ta-title ta-title--mid">Hand-Picked Post</h2>
                                    <p>The opportunity to work abroad is a popular prospect, one </p>
                                </div>
                            </div>
                        </div>
                        <div className="row ta-column-gap-30 mt-none-30">
                            <BlogPost showItem={6} showStart={61} showEnd={67} style={1} formatIcon showPagination col="col-xl-4 col-lg-6 mt-30" />
                        </div>
                    </div>
                </div>
                {/* blog area end */}




            </Layout>
        </>
    )
}
