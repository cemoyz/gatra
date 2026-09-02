import BlogPost from "@/components/blog/BlogPost"
import Layout from "@/components/layout/Layout"
export default function BlogCompact() {

    return (
        <>
            <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="Blog Compact">
                <div className="ta-featured-blog-area fix pt-100 pb-100">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="ta-fps-wrapper mt-none-40">
                                    <BlogPost showItem={4} showStart={49} showEnd={52} style={8} showPagination col="mt-40" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </Layout>
        </>
    )
}