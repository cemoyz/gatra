import BlogPost from "@/components/blog/BlogPost"
import Layout from "@/components/layout/Layout"
export default function Home10() {
    return (
        <>
            <Layout headerStyle={8} footerStyle={10}>
                <div className="ta-blog-area pt-90 pb-90">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-xl-8">
                                <div className="ta-blog-wrapper mt-none-95">
                                    <BlogPost showItem={4} showStart={0} showEnd={6} style={9} showPagination />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}