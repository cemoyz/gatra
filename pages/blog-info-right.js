import BlogPost from "@/components/blog/BlogPost"
import Layout from "@/components/layout/Layout"
export default function BlogInfoRight() {

    return (
        <>
            <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="Blog Info Right">
                <div className="ta-recent-post-section pt-100 pb-100">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="ta-rcps-wrapper mt-none-30">
                                    <BlogPost showItem={4} showStart={45} showEnd={49} style={6} showPagination col="mt-30" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </Layout>
        </>
    )
}