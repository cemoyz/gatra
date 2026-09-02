import BlogPost from "@/components/blog/BlogPost"
import Layout from "@/components/layout/Layout"
import BlogSidebar from "@/components/sections/BlogSidebar"
export default function Home4() {

    return (
        <>
            <Layout headerStyle={4} footerStyle={4}>
                <div className="ta-blog-area pt-80 pb-100">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-8">
                                <div className="ta-blog-wrapper mt-none-60">
                                    <BlogPost showItem={4} showStart={39} showEnd={44} style={5} video showPagination />
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